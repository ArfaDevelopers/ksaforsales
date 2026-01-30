import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTranslatedField } from "../../../../utils/autoTranslate";

const carData = [
  {
    title: "Honda Civic Turbo",
    location: "Honda location",
    Createdat: "1 days ago",
    price: "4,200",
    image:
      "https://res.cloudinary.com/dgmjg9zr4/image/upload/v1751689723/stories/1751689720247-Frame%20427319411.png.png",
  },
  {
    title: "Toyota Corolla Altis",
    location: "sss location",
    Createdat: "1 days ago",
    price: "3,500",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkFpTmjPXoXlRpAUedBmXBJJHsKhR2x2hJCQ&s",
  },
  {
    title: "Suzuki Swift GLX",
    location: "civic location",
    Createdat: "1 days ago",
    price: "2,800",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlrGruIVKsj2uzjjlOYkwHg98VDONShEW9dQ&s",
  },
  {
    title: "KIA Sportage AWD",
    location: "new location",
    Createdat: "1 days ago",
    price: "5,500",
    image:
      "https://a.storyblok.com/f/112937/568x464/22e7c02116/soccer_american_football_hero.jpg/m/620x0/filters:quality(70)/",
  },
  {
    title: "Hyundai Tucson",
    location: "hybrid location",
    Createdat: "1 days ago",
    price: "5,400",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcxCA7H5QporIzkGUXa4qK3pxmmR7nYNNwAg&s",
  },
];

export default function Relateddata(props) {
  const { t, i18n } = useTranslation();
  const [relatedCars, setRelatedCars] = useState([]);
  console.log(relatedCars, "relatedCars______________");

  var itemData = props.itemData.title || {};
  console.log(props.itemData, "relatedCars______________itemData");

  useEffect(() => {
    if (itemData) {
      axios
        .post("http://168.231.80.24:9002/api/relatedcars", {
          title: props.itemData.title,
          category: props.itemData.category,
        })

        .then((res) => {
          console.log(res.data, "relatedCars______________res.data");

          setRelatedCars(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch related cars:", err);
        });
    }
  }, [itemData]);

  return (
    <>
      {" "}
      {relatedCars.length === 0 ? (
        <h2 className="similarads" style={{ textAlign: i18n.language.startsWith('ar') ? 'right' : 'left' }}>
          {t("detailsPage.noSimilarAds") || "No Similar Ads Found"}
        </h2>
      ) : (
        <h2 className="similarads" style={{ textAlign: i18n.language.startsWith('ar') ? 'right' : 'left' }}>
          {t("detailsPage.similarAds") || "SIMILAR ADS"}
        </h2>
      )}
      <div className="position-relative w-full px-12 pb-10 relative_swiper">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass:
              "swiper-pagination-bullet bg-gray-400 !w-2 !h-2 rounded-full !mx-1",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-blue-500",
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {relatedCars.map((car, index) => (
            <SwiperSlide key={index}>
              <Link
                // onClick={() => handleView(car.id)}
                //  to={`/car-details/${ad.id}`}
                to={`/Dynamic_Route?id=${car.id}&callingFrom=${
                  car.category === "Motors"
                    ? "AutomotiveComp"
                    : car.category === "Automotive"
                    ? "AutomotiveComp"
                    : car.category === "Electronics"
                    ? "ElectronicComp"
                    : car.category === "Other"
                    ? "Education"
                    : car.category === "Other"
                    ? "Education"
                    : car.category === "Pet & Animals"
                    ? "PetAnimalsComp"
                    : car.category === "Sports & Game"
                    ? "SportGamesComp"
                    : car.category === "Services"
                    ? "TravelComp"
                    : car.category === "Real Estate"
                    ? "RealEstateComp"
                    : car.category === "Job Board"
                    ? "JobBoard"
                    : car.category === "Home & Furnituer"
                    ? "HealthCareComp"
                    : car.category === "Fashion Style"
                    ? "FashionStyle"
                    : "Other"
                }`}
              >
                <div className="relateable_card_wrap_main" style={{
                  direction: i18n.language.startsWith('ar') ? 'rtl' : 'ltr',
                  textAlign: i18n.language.startsWith('ar') ? 'right' : 'left'
                }}>
                  <img
                    src={
                      car.galleryImages?.length > 0
                        ? car.galleryImages[0]
                        : car.photoURL || "/default-car.jpg"
                    }
                    alt={getTranslatedField(car, 'title', i18n.language) || car.title}
                    className="relateable_image"
                  />
                  <div className="relateable_content_wrap_main">
                    <h3 className="title">{getTranslatedField(car, 'title', i18n.language) || car.title || "No Title"}</h3>
                    <p className="location">
                      {getTranslatedField(car, 'City', i18n.language) || car.location || car.City || "N/A"}
                    </p>
                    <div className="content_footer" style={{
                      flexDirection: i18n.language.startsWith('ar') ? 'row-reverse' : 'row'
                    }}>
                      <p className="price">
                        {car.Price ? `${car.Price} SAR` : "—"}
                      </p>
                      <p className="date">
                        {car.createdAt?._seconds
                          ? new Date(
                              car.createdAt._seconds * 1000
                            ).toLocaleDateString()
                          : "No Date"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation Arrows */}
        <div
          className="swiper-button-prev-custom swiper_btn_gen"
          style={{ display: relatedCars.length <= 1 ? 'none' : 'flex' }}
        >
          <FaChevronLeft className="text-xl" />
        </div>
        <div
          className="swiper-button-next-custom swiper_btn_gen"
          style={{ display: relatedCars.length <= 1 ? 'none' : 'flex' }}
        >
          <FaChevronRight className="text-xl" />
        </div>
      </div>
    </>
  );
}
