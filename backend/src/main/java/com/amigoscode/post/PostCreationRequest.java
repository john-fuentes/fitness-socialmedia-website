package com.amigoscode.post;

public record PostCreationRequest(String caption,
                                  Integer customerId) {
}
