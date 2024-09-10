package com.amigoscode.like;

import com.amigoscode.customer.Customer;
import com.amigoscode.post.Post;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class LikeRowMapper implements RowMapper<Like> {
    @Override
    public Like mapRow(ResultSet rs, int rowNum) throws SQLException {
        Like like = new Like();

        Post post = new Post();
        post.setId(rs.getInt("post_id"));
        Customer customer = new Customer();
        customer.setId(rs.getInt("customer_id"));
        like.setCustomer(customer);
        like.setPost(post);
        return like;
    }
}