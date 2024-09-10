package com.amigoscode.like;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class LikeController {

    private final LikeService likeService;
    public LikeController(LikeService likeService) {this.likeService = likeService;}

    @GetMapping("{}")
    public
}
