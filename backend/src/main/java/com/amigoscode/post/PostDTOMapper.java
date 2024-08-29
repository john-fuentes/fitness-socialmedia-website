package com.amigoscode.post;

import com.amigoscode.post.Post;
import com.amigoscode.post.PostDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class PostDTOMapper implements Function<Post, PostDTO> {
    @Override
    public PostDTO apply(Post post) {
        Integer customerId = (post.getCustomer() != null) ? post.getCustomer().getId() : null;
        return new PostDTO(
                post.getId(),
                post.getCaption(),
                post.getPostImageId(),
                customerId
        );
    }

}
