import React from "react";
import { Link } from "react-router-dom";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

const Rooms = (props) => {
  console.log(props, "userDataitemData__________itemDataprops");

  // Map the gallery images from props
  const galleryItems =
    props.filteredData?.galleryImages?.map((img) => ({ original: img })) || [];

  // Limit to the first 4 images
  const limitedGalleryItems = galleryItems.slice(0, 3);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          justifyContent: "center",
        }}
      >
        {limitedGalleryItems.length > 0 ? (
          limitedGalleryItems.map((item, index) => (
            <div key={index} style={{ flex: "0 0 auto" }}>
              <Link to="#" data-fancybox="gallery1">
                <SlideshowLightbox>
                  <img
                    src={item.original}
                    alt={`Gallery ${index + 1}`}
                    style={{
                      width: "380px",
                      height: "600px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      display: "block",
                    }}
                  />
                </SlideshowLightbox>
              </Link>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "16px", color: "#666" }}>No images available</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
