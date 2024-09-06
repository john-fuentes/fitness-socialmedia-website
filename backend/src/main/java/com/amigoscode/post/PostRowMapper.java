package com.amigoscode.post;

import com.amigoscode.customer.Customer;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class PostRowMapper implements RowMapper<Post> {
    @Override
    public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
        Post post = new Post();
        post.setId(rs.getInt("id")); // Use Long for BIGSERIAL
        post.setCaption(rs.getString("caption"));
        post.setPostImageId(rs.getString("post_image_id"));

        // Map the customer details
        Customer customer = new Customer();
        customer.setId(rs.getInt("customer_id")); // Use Long for BIGINT
        customer.setName(rs.getString("name")); // Ensure this matches your SQL query
        customer.setProfileImageId(rs.getString("profile_image_id")); // Ensure this matches your SQL query
        post.setCustomer(customer);

        return post;
    }
}
