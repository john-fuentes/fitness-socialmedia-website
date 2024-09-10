package com.amigoscode.comment;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) { this.commentService = commentService; }

    @GetMapping("{commentId}")
    public CommentDTO getComment(@PathVariable Integer commentId) { return commentService.getComment(commentId);}

    @GetMapping("/post/{postId}")
    public List<CommentDTO> getCommentsByPost(@PathVariable("postId") Integer postId){
        return commentService.getAllPostComments(postId);
    }

    @DeleteMapping("{commentId}")
    public void deleteComment(@PathVariable("commentId") Integer commentId){
        commentService.deleteComment(commentId);
    }

    @PostMapping("/{postId}/create")
    public ResponseEntity<?> createComment(@PathVariable Integer postId, @RequestParam String content,@RequestParam Integer customerId) {
        commentService.addComment(content,postId,customerId);
        return ResponseEntity.ok().build();
    }


}
