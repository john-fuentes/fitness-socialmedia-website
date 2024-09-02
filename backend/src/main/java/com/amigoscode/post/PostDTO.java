package com.amigoscode.post;


import com.amigoscode.customer.CustomerDTO;

public record PostDTO
    (
            Integer id,
            String caption,
            String postImageId,
            Integer customerId,
            String customerName,
            String customerProfileImageId) {
    }

//need id for post, this is an it. and then id for photo, that is a string