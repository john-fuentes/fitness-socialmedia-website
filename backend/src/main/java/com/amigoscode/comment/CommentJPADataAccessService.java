package com.amigoscode.comment;

import com.amigoscode.comment.Comment;
import com.amigoscode.comment.CommentDao;
import com.amigoscode.comment.CommentRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository("commentjpa")
public class CommentJPADataAccessService implements CommentDao {

    private final CommentRepository commentRepository;

    public CommentJPADataAccessService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Optional<Comment> selectCommentById(Integer commentId) {
        return commentRepository.findById(commentId);
    }

    @Override
    public List<Comment> selectCommentsByPostId(Integer postId) {
        return commentRepository.findByPostId(postId);  // Use the custom query method
    }

    @Override
    public void insertComment(Comment comment) {
        commentRepository.save(comment);  // Save the comment entity
    }

    @Override
    public void deleteComment(Integer commentId) {
        commentRepository.deleteById(commentId);  // Delete the comment by id
    }
}
