package com.amigoscode.like;

import com.amigoscode.customer.Customer;
import com.amigoscode.post.Post;
import jakarta.persistence.*;

@Entity
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "like_id_seq")
    @SequenceGenerator(name = "like_id_seq",
            sequenceName = "like_id_seq",
            allocationSize = 1)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;



    // Constructors, getters, setters


    public Like(Integer id, Customer customer, Post post) {
        this.id = id;
        this.customer = customer;
        this.post = post;
    }

    public Like() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "Like{" +
                "id=" + id +
                ", post=" + post +
                ", customer=" + customer +
                '}';
    }
}