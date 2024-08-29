package com.amigoscode.post;

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
    public Optional<Post> selectPostById(Integer postId) {
        var sql = """
                SELECT id, caption, post_image_id, customer_id
                FROM post
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, postRowMapper, postId).stream().findFirst();
    }

    @Override
    public List<Post> selectAllPosts() {
        var sql = """
                SELECT id, caption, post_image_id, customer_id
                FROM post
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
