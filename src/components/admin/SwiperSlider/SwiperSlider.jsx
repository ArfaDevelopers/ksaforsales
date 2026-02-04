"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

export default function SwiperSlider(props) {
  const { images } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const imageList = images && images.length > 0 ? images : [];

  if (imageList.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "550px",
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
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        className="mySwiper2 swiper_main_wrap"
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "550px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => {
                // Set index THEN open the lightbox in the next tick
                setCurrentIndex(index);
                setTimeout(() => setIsOpen(true), 0);
              }}
            />
          </SwiperSlide>
        ))}
        <div
          className="swiper_pagination"
          style={{ textAlign: "center", marginTop: "10px", fontWeight: "500" }}
        >
          {`${currentIndex + 1} of ${imageList.length} photos`}
        </div>
      </Swiper>

      <Swiper
        style={{ marginTop: "20px" }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper thumbnail_wrapper"
        breakpoints={{
          480: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
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
                borderRadius: "12px",
                display: "block",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox Implementation */}
      {isOpen && (
        <Lightbox
          mainSrc={imageList[currentIndex]}
          nextSrc={imageList[(currentIndex + 1) % imageList.length]}
          prevSrc={
            imageList[(currentIndex + imageList.length - 1) % imageList.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setCurrentIndex(
              (currentIndex + imageList.length - 1) % imageList.length
            )
          }
          onMoveNextRequest={() =>
            setCurrentIndex((currentIndex + 1) % imageList.length)
          }
        />
      )}
    </>
  );
}
