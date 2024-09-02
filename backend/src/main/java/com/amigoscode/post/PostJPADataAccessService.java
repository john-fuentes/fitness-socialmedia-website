package com.amigoscode.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("postjpa")
public class PostJPADataAccessService implements PostDao{

    private final PostRepository postRepository;

    public PostJPADataAccessService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void insertPost(Post post) {
        postRepository.save(post);

    }

    @Override
    public void deletePostById(Integer postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public void updatePost(Post update) {
        postRepository.save(update);

    }

    @Override
    public List<Post> selectPostsByCustomerId(Integer customerId) {
        return postRepository.findPostsByCustomerId(customerId);
    }


    @Override
    public Optional<Post> selectPostById(Integer postId) {
        return postRepository.findPostWithCustomerById(postId);
    }


    @Override
    public List<Post> selectAllPosts() {
        Page<Post> posts = postRepository.findAll(Pageable.ofSize(1000));
        return posts.getContent();
    }

    @Override
    public boolean existsPostById(Integer postId) {
        return postRepository.existsPostById(postId);
    }


}
