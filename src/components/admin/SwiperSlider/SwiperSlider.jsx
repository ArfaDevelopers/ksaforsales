"use client";

import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SwiperSlider(props) {
  const { images } = props;
  console.log(images, "images_____________");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Fallback to empty array if images is not provided or empty
  const imageList = images && images.length > 0 ? images : [];

  if (imageList.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "#666" }}>No images available</p>
      </div>
    );
  }

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
