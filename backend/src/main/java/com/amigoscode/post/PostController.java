package com.amigoscode.post;

import com.amigoscode.jwt.JWTUtil;
import com.amigoscode.s3.S3Buckets;
import com.amigoscode.s3.S3Service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService, JWTUtil jwtUtil) {
        this.postService = postService;
    }

    @GetMapping("{postId}")
    public PostDTO getPost(@PathVariable("postId") Integer postId) {
        return postService.getPost(postId);
    }

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    // Updated createPost method to accept customerId via the URL
    @PostMapping(
            value = "/{customerId}/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> createPost(
            @PathVariable("customerId") Integer customerId,
            @RequestParam("caption") String caption,
            @RequestParam("file") MultipartFile file) {
        postService.addPost(caption, file, customerId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{postId}")
    public void deletePost(@PathVariable("postId") Integer postId) {
        postService.deletePostById(postId);
    }

    @PutMapping("{postId}")
    public void updatePost(@PathVariable("postId") Integer postId, @RequestBody PostUpdateRequest updateRequest) {
        postService.updatePost(postId, updateRequest);
    }

}