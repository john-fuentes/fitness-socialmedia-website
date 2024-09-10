package com.amigoscode.comment;

import org.apache.catalina.mapper.Mapper;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CommentDTOMapper implements Function<Comment, CommentDTO> {
    @Override
    public CommentDTO apply(Comment comment){
        Integer customerId = (comment.getCustomer()!=null) ? comment.getCustomer().getId() : null;
        String customerName = (comment.getCustomer()!=null) ? comment.getCustomer().getName() : null;
        Integer postId = (comment.getPost()!=null) ? comment.getPost().getId() : null;
        return new CommentDTO(
                comment.getId(),
                comment.getContent(),
                postId,
                customerId,
                customerName
        );
    }
}
