import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import

import { getAuth } from "firebase/auth";

// RatingSection Component (unchanged)
function RatingSection({ ratings }) {
  const totalReviews = ratings.length;
  const overallRating =
    totalReviews > 0
      ? (
          ratings.reduce((sum, rating) => sum + rating, 0) / totalReviews
        ).toFixed(1)
      : 0;
  const starDistribution = Array(5).fill(0);
  ratings.forEach((rating) => {
    if (rating >= 1 && rating <= 5) {
      starDistribution[5 - rating]++;
    }
  });

  const maxBarWidth = totalReviews > 0 ? Math.max(...starDistribution) : 1;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: windowWidth <= 576 ? "auto" : "850px",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#2D4495", marginRight: "8px" }}>★</span> Ratings
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
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        <div style={{ textAlign: "center", minWidth: "80px" }}>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
            {overallRating}/5
          </div>
          <div
            style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}
          >
            OVERALL
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < Math.round(overallRating) ? "#fadb14" : "#d9d9d9",
                  fontSize: "16px",
                  marginRight: "2px",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div style={{ fontSize: "12px", color: "#888" }}>
            Based on {totalReviews} Review
          </div>
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
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ width: "80px" }}>
                  {[...Array(5)].map((_, j) => (
                    <span
                      key={j}
                      style={{
                        color: j < starCount ? "#fadb14" : "#d9d9d9",
                        fontSize: "14px",
                        marginRight: "2px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "8px",
                    backgroundColor: "#e6ecef",
                    borderRadius: "4px",
                    margin: "0 10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: "100%",
                      backgroundColor: "#ff9800",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#888",
                    minWidth: "20px",
                    textAlign: "right",
                  }}
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// UserReviews Component (modified)
function UserReviews({
  reviews,
  onAddReview,
  onLike,
  onDislike,
  onAddReply,
  isAdmin,
  userId,
  user,
  hasReviewed,
  listingUserId,
  currentAdId,
}) {
  const [newReview, setNewReview] = useState({ review: "", rating: 0 });
  const [replyInputs, setReplyInputs] = useState({});
  const user1 = auth.currentUser.uid;
  console.log(user1, "user1_______________");
  console.log(listingUserId, "user1_______________166");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user &&
      newReview.review &&
      newReview.review.length <= 250 &&
      newReview.rating > 0 &&
      !hasReviewed
    ) {
      onAddReview({
        name: user.displayName || "Anonymous",
        email: user.email,
        review: newReview.review,
        rating: newReview.rating,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        by: `by ${user.email}`,
        images: [],
        likes: 0,
        dislikes: 0,
        replies: [],
        userId: userId,
      });
      setNewReview({ review: "", rating: 0 });
    }
  };

  const handleReplyInputChange = (index, value) => {
    setReplyInputs((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleReplySubmit = (index) => {
    if (replyInputs[index] && isAdmin) {
      const reply = {
        reply: replyInputs[index],
        by: user?.displayName || "Admin",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        userId: userId,
      };
      onAddReply(index, reply);
      setReplyInputs((prev) => {
        const updatedInputs = { ...prev };
        delete updatedInputs[index];
        return updatedInputs;
      });
    }
  };

  const toggleReplyInput = (index) => {
    if (isAdmin) {
      setReplyInputs((prev) => ({
        ...prev,
        [index]: prev[index] === undefined ? "" : undefined,
      }));
    }
  };

  return (
    <div
      style={{
        width: window.innerWidth <= 576 ? "auto" : "850px",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
          alt="Write Icon"
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        <span style={{ color: "black", fontWeight: "bold", fontSize: "16px" }}>
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
      {reviews.map((review, index) => (
        <div key={index}>
          <div
            style={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              marginBottom: "10px",
              marginRight: "20%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    {review.name}
                  </span>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < review.rating ? "#fadb14" : "#d9d9d9",
                        fontSize: "14px",
                        marginRight: "2px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  {review.date}
                </div>
              </div>
            </div>
            <p
              style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}
            >
              {review.review}
            </p>
            {review.images.length > 0 && (
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                {review.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt="Review"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: "20px",
                fontSize: "14px",
                color: "#888",
              }}
            >
              <span style={{ cursor: "pointer" }}>Was This Review...? 🖤</span>
              <span
                style={{
                  cursor: "pointer",
                  color: review.liked ? "#4CAF50" : "#888",
                }}
                onClick={() => onLike(index)}
              >
                👍 Like · {review.likes}
              </span>
              <span
                style={{
                  cursor: "pointer",
                  color: review.disliked ? "#ff4d4f" : "#888",
                }}
                onClick={() => onDislike(index)}
              >
                👎 Dislike · {review.dislikes}
              </span>
              {user1 === listingUserId ? (
                <span
                  style={{ cursor: "pointer", color: "#1890ff" }}
                  onClick={() => toggleReplyInput(index)}
                >
                  💬 Reply
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* {replyInputs[index] ? ( */}
          <div style={{ marginLeft: "20%", marginBottom: "10px" }}>
            <textarea
              placeholder="Write your reply..."
              value={replyInputs[index]}
              onChange={(e) => handleReplyInputChange(index, e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                width: "100%",
                minHeight: "60px",
                resize: "vertical",
              }}
            />
            <button
              onClick={() => handleReplySubmit(index)}
              style={{
                backgroundColor: "#2D4495",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                borderRadius: "20px",
                fontSize: "14px",
                cursor: "pointer",
                marginTop: "5px",
              }}
            >
              Submit Reply
            </button>
          </div>
          {review.replies && review.replies.length > 0 && (
            <div style={{ marginLeft: "20%", marginBottom: "20px" }}>
              {review.replies.map((reply, replyIndex) => (
                <div
                  key={replyIndex}
                  style={{
                    padding: "15px",
                    borderRadius: "8px",
                    backgroundColor: "#e6f7ff",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                    marginBottom: "10px",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "5px",
                    }}
                  >
                    {reply.date} by {reply.by}
                  </div>
                  <p style={{ fontSize: "14px", color: "#333" }}>
                    {reply.reply}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {user1 !== listingUserId && user ? (
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>
            Leave feedback about this
          </h3>
          {hasReviewed ? (
            <div style={{ color: "#888", textAlign: "center" }}>
              This product has already been reviewed
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                placeholder="Name*"
                value={user.displayName || "Anonymous"}
                disabled
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <input
                type="email"
                placeholder="Email*"
                value={user.email}
                disabled
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <div style={{ position: "relative" }}>
                <textarea
                  placeholder="Write a Review* (max 250 characters)"
                  value={newReview.review}
                  onChange={(e) => {
                    if (e.target.value.length <= 250) {
                      setNewReview({ ...newReview, review: e.target.value });
                    }
                  }}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    minHeight: "100px",
                    resize: "vertical",
                    width: "100%",
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    textAlign: "right",
                    marginTop: "5px",
                  }}
                >
                  {newReview.review.length}/250
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "14px" }}>Rating</span>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < newReview.rating ? "#fadb14" : "#d9d9d9",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setNewReview({ ...newReview, rating: i + 1 })
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                disabled={!newReview.review || newReview.rating === 0}
                style={{
                  backgroundColor:
                    !newReview.review || newReview.rating === 0
                      ? "#cccccc"
                      : "#2D4495",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "14px",
                  cursor:
                    !newReview.review || newReview.rating === 0
                      ? "not-allowed"
                      : "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
          {/* Please log in to write a review */}
        </div>
      )}
    </div>
  );
}

// Parent Component (RatingAndReviews)
function RatingAndReviews({ currentAdId, listingUserId }) {
  const [reviews, setReviews] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  // Check if the logged-in user is an admin and get user UID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
        const adminEmails = ["admin@example.com"]; // Update with actual admin emails
        setIsAdmin(adminEmails.includes(currentUser.email));
      } else {
        setUser(null);
        setUserId(null);
        setIsAdmin(false);
        setHasReviewed(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Function to log all reviews in the reviews collection
  const logAllReviews = async () => {
    try {
      const reviewsCollection = collection(db, "reviews");
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const allReviews = reviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("=== All Reviews in Firestore (reviews collection) ===");
      console.log(`Total Reviews: ${allReviews.length}`);
      allReviews.forEach((review, index) => {
        console.log(`Review ${index + 1}:`, {
          id: review.id,
          adId: review.adId,
          name: review.name,
          email: review.email,
          review: review.review,
          rating: review.rating,
          date: review.date,
          by: review.by,
          likes: review.likes,
          dislikes: review.dislikes,
          liked: review.liked,
          disliked: review.disliked,
          replies: review.replies,
          userId: review.userId,
          createdAt: review.createdAt?.toDate().toLocaleString(),
        });
      });
      console.log("========================================");
    } catch (error) {
      console.error("Error logging all reviews:", error);
    }
  };

  // Fetch reviews for the current ad and check if a review exists
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, "reviews");
        const reviewsSnapshot = await getDocs(reviewsCollection);
        const reviewsList = reviewsSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            liked: doc.data().liked || false,
            disliked: doc.data().disliked || false,
            replies: doc.data().replies || [],
            userId: doc.data().userId || "",
          }))
          .filter((review) => review.adId === currentAdId);

        console.log(`=== Fetched Reviews for adId: ${currentAdId} ===`);
        console.log(`Total Reviews: ${reviewsList.length}`);
        reviewsList.forEach((review, index) => {
          console.log(`Review ${index + 1}:`, {
            id: review.id,
            adId: review.adId,
            name: review.name,
            email: review.email,
            review: review.review,
            rating: review.rating,
            date: review.date,
            by: review.by,
            likes: review.likes,
            dislikes: review.dislikes,
            liked: review.liked,
            disliked: review.disliked,
            replies: review.replies,
            userId: review.userId,
            createdAt: review.createdAt?.toDate().toLocaleString(),
          });
        });
        console.log("========================================");

        setReviews(reviewsList);
        setHasReviewed(reviewsList.length > 0); // Set to true if any review exists for this ad

        await logAllReviews();
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (currentAdId) {
      fetchReviews();
    }
  }, [currentAdId]);

  // Add a new review to Firestore
  const handleAddReview = async (newReview) => {
    try {
      const reviewsCollection = collection(db, "reviews");
      const docRef = await addDoc(reviewsCollection, {
        ...newReview,
        adId: currentAdId,
        liked: false,
        disliked: false,
        createdAt: new Date(),
        replies: [],
        userId: newReview.userId,
      });
      const updatedReview = {
        id: docRef.id,
        ...newReview,
        adId: currentAdId,
        liked: false,
        disliked: false,
        replies: [],
        userId: newReview.userId,
      };
      setReviews([...reviews, updatedReview]);
      setHasReviewed(true);

      console.log("New review added:", updatedReview);
      await logAllReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Handle like action
  const handleLike = async (index) => {
    const review = reviews[index];
    const reviewRef = doc(db, "reviews", review.id);

    try {
      let updatedReview;
      if (review.liked) {
        updatedReview = { ...review, likes: review.likes - 1, liked: false };
        await updateDoc(reviewRef, { likes: review.likes - 1, liked: false });
      } else {
        updatedReview = { ...review, likes: review.likes + 1, liked: true };
        if (review.disliked) {
          updatedReview.dislikes = review.dislikes - 1;
          updatedReview.disliked = false;
        }
        await updateDoc(reviewRef, {
          likes: updatedReview.likes,
          liked: true,
          dislikes: updatedReview.dislikes,
          disliked: false,
        });
      }
      setReviews(reviews.map((r, i) => (i === index ? updatedReview : r)));
      console.log("Review liked:", updatedReview);
      await logAllReviews();
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  // Handle dislike action
  const handleDislike = async (index) => {
    const review = reviews[index];
    const reviewRef = doc(db, "reviews", review.id);

    try {
      let updatedReview;
      if (review.disliked) {
        updatedReview = {
          ...review,
          dislikes: review.dislikes - 1,
          disliked: false,
        };
        await updateDoc(reviewRef, {
          dislikes: review.dislikes - 1,
          disliked: false,
        });
      } else {
        updatedReview = {
          ...review,
          dislikes: review.dislikes + 1,
          disliked: true,
        };
        if (review.liked) {
          updatedReview.likes = review.likes - 1;
          updatedReview.liked = false;
        }
        await updateDoc(reviewRef, {
          dislikes: updatedReview.dislikes,
          disliked: true,
          likes: updatedReview.likes,
          liked: false,
        });
      }
      setReviews(reviews.map((r, i) => (i === index ? updatedReview : r)));
      console.log("Review disliked:", updatedReview);
      await logAllReviews();
    } catch (error) {
      console.error("Error updating dislike:", error);
    }
  };

  // Handle adding a reply
  const handleAddReply = async (index, reply) => {
    const review = reviews[index];
    const reviewRef = doc(db, "reviews", review.id);

    try {
      const updatedReplies = [...(review.replies || []), reply];
      await updateDoc(reviewRef, { replies: updatedReplies });
      const updatedReview = { ...review, replies: updatedReplies };
      setReviews(reviews.map((r, i) => (i === index ? updatedReview : r)));
      console.log("Reply added to review:", updatedReview);
      await logAllReviews();
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const ratings = reviews.map((review) => review.rating);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <RatingSection ratings={ratings} />
      <UserReviews
        reviews={reviews}
        onAddReview={handleAddReview}
        onLike={handleLike}
        onDislike={handleDislike}
        onAddReply={handleAddReply}
        isAdmin={isAdmin}
        userId={userId}
        user={user}
        hasReviewed={hasReviewed}
        listingUserId={listingUserId}
        currentAdId={currentAdId}
      />
    </div>
  );
}

export default RatingAndReviews;
