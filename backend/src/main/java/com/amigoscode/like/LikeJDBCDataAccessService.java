package com.amigoscode.like;


import com.amigoscode.post.PostDao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("likejdbc")
public class LikeJDBCDataAccessService implements LikeDao {

    private final LikeRowMapper likeRowMapper;
    private final JdbcTemplate jdbcTemplate;

    public LikeJDBCDataAccessService(LikeRowMapper likeRowMapper, JdbcTemplate jdbcTemplate) {
        this.likeRowMapper = likeRowMapper;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void saveLike(Like like) {
        var sql = """
        INSERT INTO likes (post_id, customer_id) 
        VALUES (?, ?)
    """;
        jdbcTemplate.update(sql, like.getPost().getId(), like.getCustomer().getId());
    }


    @Override
    public void deleteLike(Like like) {
        var sql = """
        DELETE FROM likes 
        WHERE post_id = ? AND customer_id = ?
    """;
        jdbcTemplate.update(sql, like.getPost().getId(), like.getCustomer().getId());
    }


    @Override
    public List<Like> findAllByCustomerId(Integer customerId) {
        var sql = """
        SELECT * FROM likes 
        WHERE customer_id = ?
    """;
        return jdbcTemplate.query(sql, likeRowMapper, customerId);
    }

}
