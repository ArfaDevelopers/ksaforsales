import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const carData = [
  {
    title: "Honda Civic Turbo",
    location: "Honda location",
    Createdat: "1 days ago",
    price: "4,200,000 PKR",
    image:
      "https://res.cloudinary.com/dgmjg9zr4/image/upload/v1751689723/stories/1751689720247-Frame%20427319411.png.png",
  },
  {
    title: "Toyota Corolla Altis",
    location: "sss location",
    Createdat: "1 days ago",
    price: "3,500,000 PKR",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkFpTmjPXoXlRpAUedBmXBJJHsKhR2x2hJCQ&s",
  },
  {
    title: "Suzuki Swift GLX",
    location: "civic location",
    Createdat: "1 days ago",
    price: "2,800,000 PKR",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlrGruIVKsj2uzjjlOYkwHg98VDONShEW9dQ&s",
  },
  {
    title: "KIA Sportage AWD",
    location: "new location",
    Createdat: "1 days ago",
    price: "5,500,000 PKR",
    image:
      "https://a.storyblok.com/f/112937/568x464/22e7c02116/soccer_american_football_hero.jpg/m/620x0/filters:quality(70)/",
  },
  {
    title: "Hyundai Tucson",
    location: "hybrid location",
    Createdat: "1 days ago",
    price: "5,400,000 PKR",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcxCA7H5QporIzkGUXa4qK3pxmmR7nYNNwAg&s",
  },
];

export default function Relateddata() {
  return (
    <div className="relative w-full px-12 pb-10">
      <Swiper
        slidesPerView={3}
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
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {carData.map((car, index) => (
          <SwiperSlide key={index}>
            <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
              <img
                style={{ width: "100%", height: "186px" }}
                src={car.image}
                alt={car.title}
                className="w-full h-[186px] object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-800">{car.title}</h3>
                <p className="text-md text-gray-700">{car.price}</p>
                <p className="text-md text-gray-700">{car.location}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Arrow */}
      <div
        className="
          swiper-button-prev-custom
          absolute
          top-1/2
          left-0
          transform -translate-y-1/2
          z-20
          cursor-pointer
          p-3 bg-white rounded-full shadow-md
          hover:bg-gray-100 transition-colors
          flex items-center justify-center
          text-gray-700 hover:text-gray-900
        "
        style={{ marginLeft: "0" }} // Remove -ml-8
      >
        <FaChevronLeft className="text-xl" />
      </div>

      {/* Right Arrow */}
      <div
        className="
          swiper-button-next-custom
          absolute
          top-1/2
          right-0
          transform -translate-y-1/2
          z-20
          cursor-pointer
          p-3 bg-white rounded-full shadow-md
          hover:bg-gray-100 transition-colors
          flex items-center justify-center
          text-gray-700 hover:text-gray-900
        "
        style={{ marginRight: "0" }} // Remove -mr-8
      >
        <FaChevronRight className="text-xl" />
      </div>

      {/* Pagination Dots */}
      <div className="swiper-pagination absolute bottom-4 w-full flex justify-center mt-4"></div>
    </div>
  );
}
