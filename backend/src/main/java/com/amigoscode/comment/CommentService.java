package com.amigoscode.comment;

import com.amigoscode.customer.Customer;
import com.amigoscode.customer.CustomerRepository;
import com.amigoscode.exception.ResourceNotFoundException;
import com.amigoscode.post.Post;
import com.amigoscode.post.PostDTO;
import com.amigoscode.post.PostDTOMapper;
import com.amigoscode.post.PostRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentDao commentDao;
    private final CommentDTOMapper commentDTOMapper;
    private final CustomerRepository customerRepository;
    private final PostRepository postRepository;


    //methods need, get comment by postid, that way you can show all the comments,
    // getcomment by customerid, that way you can have a personal comments tab for each customer

    public CommentService(@Qualifier("commentjdbc")
                          CommentDao commentDao,
                          PostDTOMapper postDTOMapper, CommentDTOMapper commentDTOMapper,
                          CustomerRepository customerRepository,
                          PostRepository postRepository) {
        this.commentDao = commentDao;
        this.commentDTOMapper = commentDTOMapper;
        this.customerRepository = customerRepository;
        this.postRepository = postRepository;
    }



    public CommentDTO getComment(Integer commentId) {
        return commentDao.selectCommentById(commentId)
                .map(commentDTOMapper)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Comment with id [%s] not found".formatted(commentId)));
    }

    public List<CommentDTO> getAllPostComments(Integer postId) {
        checkIfPostExistsOrThrow(postId);
        return commentDao.selectCommentsByPostId(postId)
                .stream()
                .map(commentDTOMapper) // Ensure this is correct
                .collect(Collectors.toList());
    }


    private void checkIfPostExistsOrThrow(Integer postId) {
        if (!postRepository.existsPostById(postId)){
            throw new ResourceNotFoundException(
                    "post with id [%s] not found".formatted(postId));
        }
    }

    public void addComment(String content, Integer postId, Integer customerId) {
        try {
            checkIfPostExistsOrThrow(postId);
            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Customer with id [%s] not found".formatted(customerId)));
            Post post = postRepository.findById(postId)
                    .orElseThrow(() -> new ResourceNotFoundException("Post with id [%s] not found".formatted(postId)));

            Comment comment = new Comment(content, customer, post);

            commentDao.insertComment(comment);

        }catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteComment(Integer commentId) {
        commentDao.deleteComment(commentId);
    }
}
