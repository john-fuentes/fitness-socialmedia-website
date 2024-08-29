package com.amigoscode.post;

public record PostUpdateRequest(
        String caption,
        String postImageId) {
}
