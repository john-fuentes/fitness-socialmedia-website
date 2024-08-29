package com.amigoscode.s3;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aws.s3.buckets")
public class S3Buckets {

    private String customer;
    private String post;

    public String getCustomer() {
        return customer;
    }

    public String getPost(){ return post;}

    public void setPost(String post) {this.post = post;}

    public void setCustomer(String customer) {
        this.customer = customer;
    }
}
