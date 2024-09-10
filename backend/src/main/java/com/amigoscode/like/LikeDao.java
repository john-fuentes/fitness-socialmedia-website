package com.amigoscode.like;

import java.util.List;

public interface LikeDao {
    public void saveLike(Like like);

    public void deleteLike(Like like);

    List<Like> findAllByCustomerId(Integer customerId);
}
