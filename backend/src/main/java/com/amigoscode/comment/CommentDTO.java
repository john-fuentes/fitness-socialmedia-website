package com.amigoscode.comment;

public record CommentDTO
   (Integer id,
    String content,
    Integer postId,
    Integer customerId,
    String customerName) {

}

