CREATE TABLE post (
            id BIGSERIAL PRIMARY KEY,
            caption TEXT,
            post_image_id VARCHAR(36),
            customer_id BIGINT NOT NULL,
            FOREIGN KEY (customer_id) REFERENCES customer(id)
);