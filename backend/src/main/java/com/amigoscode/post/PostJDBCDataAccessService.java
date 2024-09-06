package com.amigoscode.post;

import com.amigoscode.customer.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("postjdbc")
public class PostJDBCDataAccessService implements PostDao {

    private final PostRowMapper postRowMapper;
    private final JdbcTemplate jdbcTemplate;

    public PostJDBCDataAccessService(PostRowMapper postRowMapper, JdbcTemplate jdbcTemplate) {
        this.postRowMapper = postRowMapper;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void insertPost(Post post) {
        var sql = """
                INSERT INTO post(caption, post_image_id, customer_id)
                VALUES (?, ?, ?)
                """;
        jdbcTemplate.update(
                sql,
                post.getCaption(),
                post.getPostImageId(),
                post.getCustomer().getId()
        );
    }

    @Override
    public void deletePostById(Integer postId) {
        var sql = "DELETE FROM post WHERE id = ?";
        jdbcTemplate.update(sql, postId);
    }

    @Override
    public void updatePost(Post post) {
        var sql = """
                UPDATE post
                SET caption = ?, post_image_id = ?, customer_id = ?
                WHERE id = ?
                """;
        jdbcTemplate.update(
                sql,
                post.getCaption(),
                post.getPostImageId(),
                post.getCustomer().getId(),
                post.getId()
        );
    }

    @Override
    public List<Post> selectPostsByCustomerId(Integer customerId) {
        var sql = """
        SELECT p.id, p.caption, p.post_image_id, p.customer_id, c.name, c.profile_image_id
        FROM post p
        JOIN customer c ON p.customer_id = c.id
        WHERE p.customer_id = ?
        """;
        return jdbcTemplate.query(sql, postRowMapper, customerId);
    }


    @Override
    public Optional<Post> selectPostById(Integer postId) {
        var sql = """
        SELECT p.id, p.caption, p.post_image_id, p.customer_id, c.name, c.profile_image_id
        FROM post p
        JOIN customer c ON p.customer_id = c.id
        WHERE p.id = ?
        """;
        return jdbcTemplate.query(sql, resultSet -> {
            if (resultSet.next()) {
                Post post = new Post(
                        resultSet.getInt("id"),
                        resultSet.getString("caption"),
                        resultSet.getString("post_image_id"),
                        new Customer(
                                resultSet.getInt("customer_id"),
                                resultSet.getString("name"),
                                resultSet.getString("profile_image_id")
                        )
                );
                return Optional.of(post);
            }
            return Optional.empty();
        }, postId);
    }


    @Override
    public List<Post> selectAllPosts() {
        var sql = """
            SELECT p.id, p.caption, p.post_image_id, p.customer_id, c.name, c.profile_image_id
            FROM post p
            JOIN customer c ON p.customer_id = c.id
            LIMIT 1000
            """;
        return jdbcTemplate.query(sql, postRowMapper);
    }

    @Override
    public boolean existsPostById(Integer postId) {
        var sql = "SELECT COUNT(1) FROM post WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, postId);
        return count != null && count > 0;
    }


}
