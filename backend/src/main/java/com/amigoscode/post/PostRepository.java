package com.amigoscode.post;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Transactional
public interface PostRepository extends
        JpaRepository<Post, Integer> {
    boolean existsPostById(Integer id);
    @Modifying
    @Query("UPDATE Post p SET p.postImageId = :postImageId WHERE p.id = :postId")
    int updatePostImageId(String postImageId, Integer postId);
    @Query("SELECT p FROM Post p JOIN FETCH p.customer WHERE p.id = :postId")
    Optional<Post> findPostWithCustomerById(@Param("postId") Integer postId);
    @Query("SELECT p FROM Post p WHERE p.customer.id = :customerId")
    List<Post> findPostsByCustomerId(@Param("customerId") Integer customerId);

}
