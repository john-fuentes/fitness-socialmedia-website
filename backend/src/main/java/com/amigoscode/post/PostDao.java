package com.amigoscode.post;

import com.amigoscode.customer.Customer;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface PostDao {
    List<Post> selectAllPosts();
    Optional<Post> selectPostById(Integer postId);
    void insertPost(Post post);
    boolean existsPostById(Integer postId);
    void deletePostById(Integer postId);
    void updatePost(Post update);
    List<Post> selectPostsByCustomerId(Integer customerId);

}

