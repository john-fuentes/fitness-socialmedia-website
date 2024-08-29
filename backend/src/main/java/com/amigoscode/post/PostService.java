package com.amigoscode.post;

import com.amigoscode.customer.Customer;
import com.amigoscode.customer.CustomerRepository;
import com.amigoscode.exception.RequestValidationException;
import com.amigoscode.exception.ResourceNotFoundException;
import com.amigoscode.s3.S3Buckets;
import com.amigoscode.s3.S3Service;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostDao postDao;
    private final PostDTOMapper postDTOMapper;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final CustomerRepository customerRepository;

    public PostService(@Qualifier("postjdbc") PostDao postDao,
                       PostDTOMapper postDTOMapper,
                       S3Service s3Service,
                       S3Buckets s3Buckets, CustomerRepository customerRepository) {
        this.postDao = postDao;
        this.postDTOMapper = postDTOMapper;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.customerRepository = customerRepository;
    }

    public List<PostDTO> getAllPosts() {
        return postDao.selectAllPosts()
                .stream()
                .map(postDTOMapper)
                .collect(Collectors.toList());
    }

    public PostDTO getPost(Integer id) {
        return postDao.selectPostById(id)
                .map(postDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "post with id [%s] not found".formatted(id)
                ));
    }

    private void checkIfCustomerExistsOrThrow(Integer customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new ResourceNotFoundException("Customer with id [%s] not found".formatted(customerId));
        }
    }


    public void addPost(String caption, MultipartFile file, Integer customerId) {
        try {
            checkIfCustomerExistsOrThrow(customerId); // Ensure the customer exists
            // Generate a unique image ID
            String postImageId = UUID.randomUUID().toString();
            // Upload the image to S3 bucket
            s3Service.putObject(
                    s3Buckets.getPost(),
                    "post-images/%s/%s".formatted(customerId, postImageId),
                    file.getBytes()
            );


            // Retrieve the Customer entity from the repository
            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Customer with id [%s] not found".formatted(customerId)));

            // Create a new Post entity
            Post post = new Post(caption, postImageId, customer);

            // Insert the post into the database
            postDao.insertPost(post);
        }catch (IOException e) {
            throw new RuntimeException("Failed to upload post image", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create post", e);
        }
    }



    public void deletePostById(Integer postId) {
        checkIfPostExistsOrThrow(postId);
        postDao.deletePostById(postId);
    }

    private void checkIfPostExistsOrThrow(Integer postId) {
        if (!postDao.existsPostById(postId)) {
            throw new ResourceNotFoundException(
                    "post with id [%s] not found".formatted(postId)
            );
        }
    }

    public void updatePost(Integer postId, PostUpdateRequest updateRequest) {
        Post post = postDao.selectPostById(postId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "post with id [%s] not found".formatted(postId)
                ));

        boolean changes = false;

        if (updateRequest.caption() != null && !updateRequest.caption().equals(post.getCaption())) {
            post.setCaption(updateRequest.caption());
            changes = true;
        }

        if (updateRequest.postImageId() != null && !updateRequest.postImageId().equals(post.getPostImageId())) {
            post.setPostImageId(updateRequest.postImageId());
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("no data changes found");
        }

        postDao.updatePost(post);
    }



}
