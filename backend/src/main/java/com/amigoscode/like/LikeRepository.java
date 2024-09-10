package com.amigoscode.like;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    List<Like> findByPostId(Integer postId);
    Optional<Like> findByPostIdAndCustomerId(Integer postId, Integer customerId);
    Long countByPostId(Integer postId);  // To count the number of likes for a post

    List<Like> findAllByCustomerId(Integer customerId);
}
