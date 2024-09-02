package com.amigoscode.post;

import com.amigoscode.post.Post;
import com.amigoscode.post.PostDTO;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PostDTOMapper implements Function<Post, PostDTO> {
    @Override
    public PostDTO apply(Post post) {
        Integer customerId = (post.getCustomer() != null) ? post.getCustomer().getId() : null;
        String customerName = (post.getCustomer() != null) ? post.getCustomer().getName() : null;
        String customerProfileImageId = (post.getCustomer() != null) ? post.getCustomer().getProfileImageId() : null;
        return new PostDTO(
                post.getId(),
                post.getCaption(),
                post.getPostImageId(),
                customerId,
                customerName,
                customerProfileImageId
        );
    }
}
