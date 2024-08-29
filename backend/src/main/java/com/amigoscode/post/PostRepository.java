package com.amigoscode.post;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

@Transactional
public interface PostRepository extends
        JpaRepository<Post, Integer> {
    boolean existsPostById(Integer id);
    @Modifying
    @Query("UPDATE Post p SET p.postImageId = :postImageId WHERE p.id = :postId")
    int updatePostImageId(String postImageId, Integer postId);

}
