package com.amigoscode.comment;


import java.util.List;
import java.util.Optional;

public interface CommentDao {
    Optional<Comment> selectCommentById(Integer commentId);

    List<Comment> selectCommentsByPostId(Integer postId);

    void insertComment(Comment comment);

    void deleteComment(Integer commentId);
}
