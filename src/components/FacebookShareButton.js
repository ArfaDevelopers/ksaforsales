// components/FacebookShareButton.jsx
import React from "react";
import axios from "axios";

const FacebookShareButton = ({ item }) => {
  const handleShare = async () => {
    try {
      const response = await axios.post("/route/api/share/facebook", {
        itemId: item.id,
        itemName: item.name,
        itemPrice: item.price,
        itemImage: item.imageUrl,
        itemUrl: window.location.href,
      });

      if (response.data.success) {
        alert("Item shared successfully!");
      }
    } catch (error) {
      console.error("Error sharing to Facebook:", error);
      alert("Failed to share item. Please try again.");
    }
  };

  return <button onClick={handleShare}>Share on Facebook</button>;
};

export default FacebookShareButton;
