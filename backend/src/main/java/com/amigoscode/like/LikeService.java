package com.amigoscode.like;

import com.amigoscode.customer.Customer;
import com.amigoscode.customer.CustomerRepository;
import com.amigoscode.post.Post;
import com.amigoscode.post.PostDTO;
import com.amigoscode.post.PostRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeService {

    private final LikeDao likeDao;
    private final LikeDTOMapper likeDTOMapper;
    private final CustomerRepository customerRepository;
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;

    public LikeService(@Qualifier("likejdbc") LikeDao likeDao,
                       LikeDTOMapper likeDTOMapper,
                       CustomerRepository customerRepository,
                       PostRepository postRepository, LikeRepository likeRepository) {
        this.likeDao = likeDao;
        this.likeDTOMapper = likeDTOMapper;
        this.customerRepository = customerRepository;
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
    }

    public void likePost(Integer postId, Integer customerId) {
        if(likeRepository.findByPostIdAndCustomerId(postId, customerId).isPresent()) {
            throw new IllegalArgumentException("Post already liked!");
        }
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found!"));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found!"));
        Like like = new Like();
        like.setPost(post);
        like.setCustomer(customer);
        likeDao.saveLike(like);

        post.setLikeCount(post.getLikeCount() + 1);
        postRepository.save(post);
    }

    public void unlikePost(Integer postId, Integer customerId) {
        Like like = likeRepository.findByPostIdAndCustomerId(postId, customerId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found!"));
        likeDao.deleteLike(like);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found!"));

        post.setLikeCount(post.getLikeCount() - 1);
        postRepository.save(post);
    }

    public List<PostDTO> getCustomerLikes(Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found!"));
        List<Like> likes = likeDao.findAllByCustomerId(customerId);
        return likes.stream()
                .map(like -> new PostDTO(
                        like.getPost().getId(),
                        like.getPost().getCaption(),
                        like.getPost().getPostImageId(),
                        like.getPost().getCustomer().getId(),
                        like.getPost().getCustomer().getName(),
                        like.getPost().getCustomer().getProfileImageId()
                ))
                .collect(Collectors.toList());

    }


}
