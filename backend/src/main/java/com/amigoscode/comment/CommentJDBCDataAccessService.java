package com.amigoscode.comment;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.sql.ResultSet;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository("commentjdbc")
public class CommentJDBCDataAccessService implements CommentDao{
    private final CommentRowMapper commentRowMapper;
    private final JdbcTemplate jdbcTemplate;

    public CommentJDBCDataAccessService(CommentRowMapper commentRowMapper, JdbcTemplate jdbcTemplate) {
        this.commentRowMapper = commentRowMapper;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<Comment> selectCommentById(Integer commentId) {
        var sql = """
                SELECT id, content, post_id, customer_id, customer_name
                FROM comment
                where id = ?
                """;

        return jdbcTemplate.query(sql, new Object[]{commentId}, commentRowMapper)
                .stream()
                .findFirst();
    }

    @Override
    public List<Comment> selectCommentsByPostId(Integer postId) {
        var sql = """
                SELECT id, content, post_id, customer_id, customer_name
                FROM comment
                WHERE post_id = ?
                """;
        return jdbcTemplate.query(sql, new Object[]{postId}, commentRowMapper);
    }

    @Override
    public void insertComment(Comment comment) {
        var sql = """
                INSERT INTO comment(content, post_id, customer_id, customer_name)
                VALUES (?, ?, ?, ?)
                """;
        jdbcTemplate.update(
                sql,
                comment.getContent(),
                comment.getPost().getId(),
                comment.getCustomer().getId(),
                comment.getCustomer().getName()
        );
    }

    @Override
    public void deleteComment(Integer commentId) {
        var sql = "DELETE FROM comment WHERE id = ?";
        jdbcTemplate.update(sql, commentId);
    }
}
