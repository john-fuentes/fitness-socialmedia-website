package com.amigoscode.post;

import com.amigoscode.customer.Customer;
import jakarta.persistence.*;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @SequenceGenerator(
            name = "post_id_seq",
            sequenceName = "post_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "post_id_seq"
    )
    private Integer id;
    private String postImageId;
    private String caption;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public Post(Integer id, String caption, String postImageId, Customer customer) {
        this.id = id;
        this.postImageId = postImageId;
        this.caption = caption;
        this.customer = customer;
    }
    public Post(String caption, String postImageId, Customer customer) {
        this.postImageId = postImageId;
        this.caption = caption;
        this.customer = customer;
    }

    public Post() {
    }

    public String getPostImageId() {
        return postImageId;
    }

    public void setPostImageId(String postImageId) {
        this.postImageId = postImageId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", postImageId='" + postImageId + '\'' +
                ", caption='" + caption + '\'' +
                ", customerId=" + customer.getId() +
                '}';
    }
}
