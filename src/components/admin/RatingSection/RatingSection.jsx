import React, { useState, useEffect } from 'react';

// RatingSection Component
function RatingSection({ ratings }) {
  const totalReviews = ratings.length;
  const overallRating = totalReviews > 0 ? (ratings.reduce((sum, rating) => sum + rating, 0) / totalReviews).toFixed(1) : 0;
  const starDistribution = Array(5).fill(0); // [0, 0, 0, 0, 0] for 5 to 1 stars
  ratings.forEach(rating => {
    if (rating >= 1 && rating <= 5) {
      starDistribution[5 - rating]++;
    }
  });

  const maxBarWidth = totalReviews > 0 ? Math.max(...starDistribution) : 1;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

        width: window.innerWidth <= 576 ? "auto" : "850px",
        marginBottom: '20px'
      }}
    >
      <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#2D4495', marginRight: '8px' }}>★</span> Ratings
      </h3>
      <hr
        style={{
          color: "#000000",
          marginTop: "14.83px",
          marginBottom: "14.3px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{ textAlign: 'center', minWidth: '80px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>{overallRating}/5</div>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '10px' }}>OVERALL</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < Math.round(overallRating) ? '#fadb14' : '#d9d9d9',
                  fontSize: '16px',
                  marginRight: '2px'
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>Based on {totalReviews} Review</div>
        </div>
        <div style={{ flex: 1 }}>
          {[...Array(5)].map((_, i) => {
            const starCount = 5 - i;
            const count = starDistribution[i];
            const barWidth = maxBarWidth > 0 ? (count / maxBarWidth) * 100 : 0;

            return (
              <div
                key={starCount}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}
              >
                <div style={{ width: '80px' }}>
                  {[...Array(5)].map((_, j) => (
                    <span
                      key={j}
                      style={{
                        color: j < starCount ? '#fadb14' : '#d9d9d9',
                        fontSize: '14px',
                        marginRight: '2px'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '8px',
                    backgroundColor: '#e6ecef',
                    borderRadius: '4px',
                    margin: '0 10px',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: '100%',
                      backgroundColor: '#ff9800',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <span style={{ fontSize: '14px', color: '#888', minWidth: '20px', textAlign: 'right' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// UserReviews Component
function UserReviews({ reviews, onAddReview, onLike, onDislike }) {
  const [newReview, setNewReview] = useState({ name: '', email: '', review: '', rating: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.email && newReview.review && newReview.rating > 0) {
      onAddReview({
        ...newReview,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), // e.g., "April 17, 2025"
        by: `by ${newReview.email}`,
        images: [],
        likes: 0,
        dislikes: 0
      });
      setNewReview({ name: '', email: '', review: '', rating: 0 });
    }
  };

  return (
    <div
    style={{
      width: window.innerWidth <= 576 ? 'auto' : '850px',
      padding: '20px',
      borderRadius: '12px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      margin: '0 auto',
    }}
  >
    {/* Write a Review Button */}
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
  <img
    src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
    alt="Write Icon"
    style={{ width: '20px', height: '20px', marginRight: '8px' }}
  />
  <span style={{ color: '#2D4495', fontWeight: 'bold', fontSize: '16px' }}>
    Write a Review
  </span>
</div>

    <hr
        style={{
          color: "#000000",
          marginTop: "14.83px",
          marginBottom: "14.3px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    {/* All Reviews */}
    {reviews.map((review, index) => (
      <div
        key={index}
        style={{
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          {/* <img
            src="https://via.placeholder.com/40"
            alt="User"
            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
          /> */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{review.name}</span>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < review.rating ? '#fadb14' : '#d9d9d9',
                    fontSize: '14px',
                    marginRight: '2px'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>
              {review.date} {review.by}
            </div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#333', marginBottom: '10px' }}>{review.review}</p>
        {review.images.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            {review.images.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={img}
                alt="Review"
                style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
              />
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#888' }}>
          <span style={{ cursor: 'pointer' }}>Was This Review...? 🖤</span>
          <span
            style={{ cursor: 'pointer',color: review.liked ? '#4CAF50' : '#888', }}
            onClick={() => onLike(index)}
          >
          👍  Like · {review.likes}
          </span>
          <span
            style={{ cursor: 'pointer', color: review.disliked ? '#ff4d4f' : '#888' }}
            onClick={() => onDislike(index)}
          >
            👎 Dislike · {review.dislikes}
          </span>
        </div>
      </div>
    ))}
  
    {/* Leave Feedback Form */}
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Leave feedback about this</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Name*"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <input
          type="email"
          placeholder="Email*"
          value={newReview.email}
          onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <textarea
          placeholder="Write a Review*"
          value={newReview.review}
          onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            minHeight: '100px',
            resize: 'vertical'
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px' }}>Rating</span>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                color: i < newReview.rating ? '#fadb14' : '#d9d9d9',
                fontSize: '20px',
                cursor: 'pointer'
              }}
              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
            >
              ★
            </span>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#2D4495',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>
  
  );
}

// Parent Component to Combine RatingSection and UserReviews
function RatingAndReviews({ currentAdId }) {

    const [reviews, setReviews] = useState(() => {
        const savedReviews = localStorage.getItem(`reviews-${currentAdId}`);
        return savedReviews ? JSON.parse(savedReviews) : [];
      });
      

  useEffect(() => {
    localStorage.setItem(`reviews-${currentAdId}`, JSON.stringify(reviews));
  }, [reviews, currentAdId]);

  const ratings = reviews.map(review => review.rating);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, { ...newReview, liked: false, disliked: false }]);
  };

  const handleLike = (index) => {
    setReviews(reviews.map((review, i) => {
      if (i === index) {
        if (review.liked) {
          return { ...review, likes: review.likes - 1, liked: false };
        } else {
          const updatedReview = { ...review, likes: review.likes + 1, liked: true };
          if (review.disliked) {
            updatedReview.dislikes = review.dislikes - 1;
            updatedReview.disliked = false;
          }
          return updatedReview;
        }
      }
      return review;
    }));
  };

  const handleDislike = (index) => {
    setReviews(reviews.map((review, i) => {
      if (i === index) {
        if (review.disliked) {
          return { ...review, dislikes: review.dislikes - 1, disliked: false };
        } else {
          const updatedReview = { ...review, dislikes: review.dislikes + 1, disliked: true };
          if (review.liked) {
            updatedReview.likes = review.likes - 1;
            updatedReview.liked = false;
          }
          return updatedReview;
        }
      }
      return review;
    }));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <RatingSection ratings={ratings} />
      <UserReviews
        reviews={reviews}
        onAddReview={handleAddReview}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}

export default RatingAndReviews;