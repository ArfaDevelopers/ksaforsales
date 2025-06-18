import React, { useState, useEffect } from "react";
import {
  ArrowBanner,
  BannerArrow,
  Bannerbg,
  BannerEllipse,
  Blog1,
  Blog2,
  Blog3,
  Category10Svg,
  Category11Svg,
  Category12Svg,
  Category2Svg,
  Category3Svg,
  Category4Svg,
  Category5Svg,
  Category6Svg,
  Category7Svg,
  Category8Svg,
  Category9Svg,
  Category1Svg,
} from "../imagepath";
import Carousel from "./slider/Carousel";
import Footer from "./footer/Footer";
import Header from "./header";
import { Link, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import AutomativeCarosuel from "..//home/slider/AutomativeCarousel.jsx";
import RealEstateCarousel from "..//home/slider/RealEstateCarousel.jsx";
import ElectronicCarousel from "..//home/slider/ElectronicCarousel.jsx";
import HealthCareCarousel from "..//home/slider/HealthCareCarousel.jsx";
import SportandgameCarouseCarousel from "..//home/slider/SportandgameCarouseCarousel.jsx";
import ComercialsAds from "./ComercialsAds/ComercialsAds.jsx";
import automative from "./automative.png";
import electronic from "./electronic.png";
import fashion from "./fashion.png";
import healthcare from "./healthcare.png";
import job from "./job.png";
import education from "./education.png";
import realestate from "./realestate (2).png";
import travel from "./travel.png";
import sport from "./sportandgames.png";
import magazine from "./magazine.png";
import pet from "./pet .png";
import iron from "./iron.png";
import { useNavigate } from "react-router-dom";

import image1 from "../../assets/img/banner/bannerimage1.png";
import image2 from "../../assets/img/banner/bannerimage2.png";
import image3 from "../../assets/img/banner/bannerimage3.png";
import image4 from "../../assets/img/banner/bannerimage4.png";
import LatestBlog from "../blog/BlogList/LatestBlog/LatestBlog.jsx";
import xIcon from "./x.png";
import insta from "./insta.png";
import fb from "./fb.png";
import tiktok from "./tiktoc.png";
import whatapp from "./whatapp (3).png";
import popup from "./popup_image.png";
import banner1 from "../../../public/Banner 1.png";
import banner2 from "../../../public/Banner 2 (1).png";

import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./../Firebase/FirebaseConfig.jsx";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const [loading, setLoading] = useState(false); // Add loading state
  const [OurCategoryAutomative, setOurCategoryAutomative] = useState([]);
  const [OurCategoryAutomativeTitle, setOurCategoryAutomativeTitle] = useState(
    []
  );

  const [ElectronicsTitle, setElectronicsTitle] = useState([]);

  const [Electronics, setElectronics] = useState([]);
  const [FashionStyle, setFashionStyle] = useState([]);
  const [FashionStyleTitle, setFashionStyleTitle] = useState([]);

  const [OurCategoryHealthCare, setOurCategoryHealthCare] = useState([]);
  const [OurCategoryHealthCareTitle, setOurCategoryHealthCareTitle] = useState(
    []
  );

  const [OurCategoryJobBoard, setOurCategoryJobBoard] = useState([]);
  const [OurCategoryJobBoardTitle, setOurCategoryJobBoardTitle] = useState([]);

  const [OurCategoryRealEstate, setOurCategoryRealEstate] = useState([]);
  const [OurCategoryRealEstateTitle, setOurCategoryRealEstateTitle] = useState(
    []
  );

  const [OurCategoryTravel, setOurCategoryTravel] = useState([]);
  const [OurCategoryTravelTitle, setOurCategoryTravelTitle] = useState([]);

  const [OurCategorySportGames, setOurCategorySportGames] = useState([]);
  const [OurCategorySportGamesTitle, setOurCategorySportGamesTitle] = useState(
    []
  );

  const [OurCategoryPetAnimals, setOurCategoryPetAnimals] = useState([]);
  const [OurCategoryPetAnimalsTitle, setOurCategoryPetAnimalsTitle] = useState(
    []
  );

  const [OurCategoryHouseHold, setOurCategoryHouseHold] = useState([]);
  const [OurCategoryHouseHoldTitle, setOurCategoryHouseHoldTitle] = useState(
    []
  );

  const [OurCategoryEducation, setOurCategoryEducation] = useState([]);
  const [OurCategoryEducationTitle, setOurCategoryEducationTitle] = useState(
    []
  );

  const [OurCategoryMAGAZINES, setOurCategoryMAGAZINES] = useState([]);
  const [OurCategoryMAGAZINESTitle, setOurCategoryMAGAZINESTitle] = useState(
    []
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageHeight = () => {
    if (windowWidth <= 576) return "180px";
    if (windowWidth <= 768) return "300px";
    return "600px";
  };

  const getMarginTop = () => {
    if (windowWidth <= 576) return "100px";
    return "170px";
  };
  console.log(OurCategoryHouseHold, "adsList___________OurCategoryAutomative1");
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryEducation"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategoryMAGAZINES(imageOnly[0].image);
        setOurCategoryMAGAZINESTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  console.log(OurCategoryHouseHold, "adsList___________OurCategoryAutomative1");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryEducation"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategoryEducation(imageOnly[0].image);
        setOurCategoryEducationTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryHouseHoldAutomative"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        console.log(imageOnly, "adsList___________OurCategoryAutomative2");

        setOurCategoryHouseHold(imageOnly[0].image);
        setOurCategoryHouseHoldTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategorySportGamesAutomative"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategorySportGames(imageOnly[0].image);
        setOurCategorySportGamesTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryPetAnimalsAutomative"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategoryPetAnimals(imageOnly[0].image);
        setOurCategoryPetAnimalsTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryTravelAutomative"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategoryTravel(imageOnly[0].image);
        setOurCategoryTravelTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryRealEstateAutomative"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategoryRealEstate(imageOnly[0].image);
        setOurCategoryRealEstateTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryJobBoardAutomative"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategoryJobBoard(imageOnly[0].image);
        setOurCategoryJobBoardTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryHealthCare"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setOurCategoryHealthCare(imageOnly[0].image);
        setOurCategoryHealthCareTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryFashionStyle"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setFashionStyle(imageOnly[0].image);
        setFashionStyleTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryElectronics"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));
        setElectronics(imageOnly[0].image);
        setElectronicsTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "OurCategoryAutomative"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList___________OurCategoryAutomative");
        const imageOnly = adsList.map((item) => ({
          image: item.image,
          Title: item.Title,
        }));

        setOurCategoryAutomative(imageOnly[0].image);
        setOurCategoryAutomativeTitle(imageOnly[0].Title);

        console.log(imageOnly, "imageOnly________________");
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const handleSwitchClick = () => {
      if ($("body").hasClass("light")) {
        $("body").removeClass("light");
        $(".switch").removeClass("switched");
      } else {
        $("body").addClass("light");
        $(".switch").addClass("switched");
      }
    };

    const handleScroll = () => {
      const e = document.querySelector(".progress-wrap path");
      const t = e.getTotalLength();
      const o = window.scrollY;
      const r = document.body.clientHeight - window.innerHeight;
      const i = t - (o * t) / r;
      e.style.strokeDashoffset = i;

      if ($(window).scrollTop() > 50) {
        $(".progress-wrap").addClass("active-progress");
      } else {
        $(".progress-wrap").removeClass("active-progress");
      }
    };

    $(".switch").on("click", handleSwitchClick);
    $(window).on("scroll", handleScroll);

    $(".progress-wrap").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 550);
      return false;
    });

    return () => {
      $(".switch").off("click", handleSwitchClick);
      $(window).off("scroll", handleScroll);
      $(".progress-wrap").off("click");
    };
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasBeenVisible = sessionStorage.getItem("hasBeenVisible"); // Or localStorage
    if (!hasBeenVisible) {
      setIsVisible(true);
      sessionStorage.setItem("hasBeenVisible", "true"); // Or localStorage
    }
  }, []);
  const [ads, setCarsData] = useState([]);
  console.log(ads, "FaBuysellads________");
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsCollectionRef = collection(db, "Bannermainimg");
        const querySnapshot = await getDocs(carsCollectionRef);
        const cars = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCarsData(cars); // Set the state with fetched data
      } catch (error) {
        console.error("Error getting cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  const handleClose = () => {
    setIsVisible(false);
  };

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [existingImageId, setExistingImageId] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const fetchExistingImage = async () => {
      const querySnapshot = await getDocs(collection(db, "HeroBanner"));
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setExistingImageId(docData.id);
        setPreview(docData.data().imageUrl);
        console.log(docData.data().imageUrl, "___________________");
      }
    };
    fetchExistingImage();
  }, []);
  useEffect(() => {
    const fetchSliderImages = async () => {
      const querySnapshot = await getDocs(collection(db, "SliderImage"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.imageUrls && Array.isArray(data.imageUrls)) {
            setImageUrls(data.imageUrls);
            console.log("Fetched image URLs:", data.imageUrls);
          }
        });
      } else {
        console.log("No documents found in SliderImage table");
      }
    };
    fetchSliderImages();
  }, []);
  useEffect(() => {
    if (imageUrls.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [imageUrls]);
  useEffect(() => {
    // Manually initialize Bootstrap carousel
    const bootstrap = require("bootstrap");
    const carouselElement = document.getElementById(
      "carouselExampleIndicators"
    );
    new bootstrap.Carousel(carouselElement, {
      interval: 10000, // Auto-slide every 3 seconds
      ride: "carousel",
    });
  }, []);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(
          "http://168.231.80.24:9002/route/trendingProducts"
        );
        const data = await response.json();
        setTrendingProducts(data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    fetchTrendingProducts();
  }, []);

  // Map category to navigation route
  const getCallingFrom = (category) => {
    switch (category.toLowerCase()) {
      case "automotive":
        return "AutomotiveComp";
      case "electronics":
        return "ElectronicComp";
      case "fashion style":
        return "FashionStyle";
      case "home & furniture":
        return "HealthCareComp";
      case "job board":
        return "JobBoard";
      case "real estate":
        return "RealEstateComp";
      case "services":
        return "TravelComp";
      case "sports & game":
        return "SportGamesComp";
      case "pet & animals":
        return "PetAnimalsComp";
      case "other":
        return "Education";
      default:
        return "/"; // Fallback for unmapped categories
    }
  };
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <div
          id="carouselExampleIndicators"
          className="carousel slide container"
          data-bs-ride="carousel"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          {/* Carousel Items */}
          <div className="carousel-inner">
            {imageUrls.map((img, index) => {
              const isMobile = windowWidth <= 576;
              const isTablet = windowWidth > 576 && windowWidth <= 768;

              return (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                >
                  <Link to="/login">
                    <img
                      src={img}
                      className="d-block"
                      alt={`Slide ${index + 1}`}
                      style={{
                        width: "100%",
                        height: isMobile
                          ? "180px"
                          : isTablet
                          ? "300px"
                          : "auto",
                        objectFit: "contain",
                        borderRadius: "8px",
                        marginTop: isMobile ? "120px" : "200px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <button
            style={{ marginTop: "12rem" }}
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            style={{ marginTop: "12rem" }}
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* Trending Products */}
        <div
          className="trendingprodct_wrapper container pt-0"
          style={{
            marginBottom: 0,
            paddingBottom: 0,
            marginTop:
              imageUrls.length === 0
                ? window.innerWidth <= 576
                  ? "9rem"
                  : "13rem"
                : "1rem",
          }}
        >
          <h2 className="trendingproduct_heading">Our Trending Product</h2>
          <div
            className="trendingproducts_container"
            style={{
              marginTop: 0,
              paddingTop: 0,
              gap: window.innerWidth <= 576 ? "5px" : "10px",
              fontSize: window.innerWidth <= 576 ? "12px" : "16px",
            }}
          >
            {trendingProducts.map((product) => (
              <Link
                key={product.id}
                to={`/Dynamic_Route?id=${
                  product.id
                }&callingFrom=${getCallingFrom(product.category)}`}
                className="trendingProductsallname"
                style={{
                  width: window.innerWidth <= 576 ? "32%" : "auto",
                  textDecoration: "none", // Ensure Link looks like a button
                }}
              >
                {product.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <section className="category-section">
          <div className="container">
            <div className="section-heading">
              <div className="row align-items-center">
                <div
                  className="col-md-6 aos aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h2
                    className="our_categoryPara"
                    style={{ marginTop: "-2rem" }}
                  >
                    Our Category
                  </h2>
                </div>
                <div
                  className="col-md-6 text-md-end aos aos-init aos-animate"
                  data-aos="fade-up"
                ></div>
              </div>
            </div>
            <div
              className="row cat_icon_main"
              style={{
                marginTop: "-1rem",
                marginBottom: window.innerWidth <= 576 ? "0rem" : "-2rem",
                gap: window.innerWidth <= 576 ? "5px" : "10px",
              }}
            >
              {/* Row 1: 5 items */}
              <div
                className="category_icons flex flex-col items-center"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "auto",
                  // marginBottom: "-20px",
                  width: "110px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {/* Icon inside gray rounded box */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/AutomotiveComp"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategoryAutomative}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title below the icon box */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategoryAutomativeTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "auto",
                  // marginBottom: "-20px",
                  width: "110px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {/* Icon Box with background */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/ElectronicComp"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={Electronics}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the box, below the icon */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {ElectronicsTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  width: "110px",
                  margin: "0 auto",
                }}
              >
                {/* Icon Box with Light Gray Background */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/FashionStyle"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={FashionStyle}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title Below the Icon */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {FashionStyleTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  width: "110px",
                  margin: "0 auto",
                }}
              >
                {/* Icon container with grey background */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/HealthCareComp"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategoryHealthCare}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey box */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategoryHealthCareTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  width: "110px",
                  margin: "0 auto",
                }}
              >
                {/* Icon inside grey background */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/JobBoard"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategoryJobBoard}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside grey box */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategoryJobBoardTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  width: "110px",
                  margin: "0 auto",
                }}
              >
                {/* Icon inside grey background */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/RealEstateComp"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategoryRealEstate}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategoryRealEstateTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  width: "110px",
                  margin: "0 auto",
                }}
              >
                {/* Icon inside grey background */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/TravelComp"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategoryTravel}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategoryTravelTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  width: "110px",
                  margin: "0 auto",
                }}
              >
                {/* Grey box for icon */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/SportGamesComp"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategorySportGames}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategorySportGamesTitle}
                </h5>
              </div>

              <div
                className="category_icons flex flex-col items-center"
                style={{
                  width: "110px",
                  margin: "0 auto",
                }}
              >
                {/* Icon inside grey background */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/PetAnimalsComp"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategoryPetAnimals}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategoryPetAnimalsTitle}
                </h5>
              </div>

              <div
                className="category_icons rounded flex flex-col items-center"
                style={{
                  width: "110px", // total width
                  margin: "0 auto", // center horizontally
                }}
              >
                {/* Grey background wrapping only the icon */}
                <div
                  style={{
                    backgroundColor: "#f7f8fa",
                    borderRadius: "8px",
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/Education"
                    style={{
                      textDecoration: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                  >
                    <img
                      src={OurCategoryEducation}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey area */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {OurCategoryPetAnimalsTitle}
                </h5>
              </div>
            </div>
            {/* Add more rows as needed */}
          </div>
        </section>
        {/* Category Section */}

        {/* Featured Ads Section */}
        <Carousel />
        {/* Featured Ads Section */}

        {/* All carousel */}
        <div className="allCarosuel_wrapper">
          <AutomativeCarosuel />
          <RealEstateCarousel />
          <ElectronicCarousel />
          <HealthCareCarousel />
          <SportandgameCarouseCarousel />
        </div>
        {/* All carousel */}

        <ComercialsAds />

        {/* Latest Blogs components */}
        <LatestBlog />

        {/* Footer */}
        <Footer />
        {/* Footer */}

        <div>
          {isVisible && ads.length > 0 && (
            <div
              className="popup_cnt"
              onClick={handleClose} // Close modal when clicking outside the image
            >
              <div className="img" onClick={(e) => e.stopPropagation()}>
                <div className="close_btn" onClick={handleClose}>
                  X
                </div>
                <div>
                  <img src={ads[0].imageUrl} alt="popup" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* scrollToTop start */}
      <div className="progress-wrap active-progress">
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              transition: "stroke-dashoffset 10ms linear 0s",
              strokeDasharray: "307.919px, 307.919px",
              strokeDashoffset: "228.265px",
            }}
          />
        </svg>
      </div>
      {/* scrollToTop end */}
    </>
  );
};

export default Home;
