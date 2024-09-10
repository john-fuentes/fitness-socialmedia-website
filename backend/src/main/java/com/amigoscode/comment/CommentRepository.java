package com.amigoscode.comment;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Transactional
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    boolean existsById(int id);
    List<Comment> findByPostId(Integer postId);
}
