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
const images = [
  banner1,
  banner2,
  // "https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_1280.jpg",
  // "https://cdn.pixabay.com/photo/2015/06/18/15/20/old-813814_1280.jpg",
  // "https://cdn.pixabay.com/photo/2016/01/06/12/52/camera-1124074_960_720.jpg",

  // "https://hiline.pk/wp-content/uploads/2024/08/hiline-interior-design-architecture-firm-construction-building-shopping-mart-design-lahore-pakistan-main-3d-renders-portfolio-img-easy-mart-01.jpg",
  // "https://media.gettyimages.com/id/1412353022/photo/empty-aisle-at-a-supermarket.jpg?s=612x612&w=gi&k=20&c=kUFpM4Sz3Uw_MwRF3zDXe-sfarFz3fbSqzx_vD8ek7Q=",
  // "data:image/jpeg;base64,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",
];
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
    // Manually initialize Bootstrap carousel
    const bootstrap = require("bootstrap");
    const carouselElement = document.getElementById(
      "carouselExampleIndicators"
    );
    new bootstrap.Carousel(carouselElement, {
      interval: 3000, // Auto-slide every 3 seconds
      ride: "carousel",
    });
  }, []);
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
            {images.map((_, index) => (
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
            {images.map((img, index) => {
              const isMobile = windowWidth <= 576;
              const isTablet = windowWidth > 576 && windowWidth <= 768;

              return (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={img}
                    className="d-block"
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: isMobile ? "180px" : isTablet ? "300px" : "auto",
                      objectFit: "contain",
                      borderRadius: "8px",
                      marginTop: isMobile ? "100px" : "170px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      maxWidth: "100%",
                    }}
                  />
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
          className="trendingprodct_wrapper container mt-3 pt-0"
          style={{ marginBottom: 0, paddingBottom: 0 }}
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
            <button
              style={{ width: window.innerWidth <= 576 ? "32%" : "auto" }}
              onClick={() => {
                navigate("/SportGamesComp");
              }}
              className="trendingProductsallname"
            >
              Cricket Kit
            </button>
            <button
              style={{ width: window.innerWidth <= 576 ? "32%" : "auto" }}
              onClick={() => {
                navigate("/SportGamesComp");
              }}
              className="trendingProductsallname"
            >
              Bags
            </button>
            <button
              style={{ width: window.innerWidth <= 576 ? "32%" : "auto" }}
              onClick={() => {
                navigate("/HealthCareComp");
              }}
              className="trendingProductsallname"
            >
              Apparel
            </button>
            <button
              style={{ width: window.innerWidth <= 576 ? "32%" : "auto" }}
              onClick={() => {
                navigate("/SportGamesComp");
              }}
              className="trendingProductsallname"
            >
              Mens Hoodies
            </button>
            <button
              style={{ width: window.innerWidth <= 576 ? "32%" : "auto" }}
              onClick={() => {
                navigate("/MAGAZINESCOMP");
              }}
              className="trendingProductsallname"
            >
              Apparel
            </button>
            <button
              style={{ width: window.innerWidth <= 576 ? "32%" : "auto" }}
              onClick={() => {
                navigate("/MAGAZINESCOMP");
              }}
              className="trendingProductsallname"
            >
              Magazines
            </button>
          </div>
        </div>

        {/* Category Section */}
        <section className="category-section">
          <div className="container">
            <div className="allMedia_Icons d-none d-md-flex">
              <div>
                <img src={xIcon} alt="Xicon" style={{ cursor: "pointer" }} />
              </div>
              <div>
                <img
                  src={insta}
                  alt="instagram"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <img src={fb} alt="facebook" style={{ cursor: "pointer" }} />
              </div>
              <div>
                <img src={tiktok} alt="tiktok" style={{ cursor: "pointer" }} />
              </div>
              <div>
                <img
                  src={whatapp}
                  alt="whatsapp"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
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
                gap: window.innerWidth <= 576 ? "5px" : "10px",
              }}
            >
              {/* Row 1: 5 items */}
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/AutomotiveComp"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryAutomativeTitle}</h5>
                  <img
                    src={OurCategoryAutomative}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/ElectronicComp"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{ElectronicsTitle}</h5>
                  <img
                    src={Electronics}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/FashionStyle"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{FashionStyleTitle}</h5>
                  <img
                    src={FashionStyle}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/HealthCareComp"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryHealthCareTitle}</h5>
                  <img
                    src={OurCategoryHealthCare}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/JobBoard"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryJobBoardTitle}</h5>
                  <img
                    src={OurCategoryJobBoard}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/Education"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryEducationTitle}</h5>
                  <img
                    src={OurCategoryEducation}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
            </div>
            <div
              className="row cat_icon_main"
              style={{
                marginTop: window.innerWidth <= 576 ? "0.5rem" : "-1rem",
                gap: window.innerWidth <= 576 ? "5px" : "10px",
              }}
            >
              {/* Row 2: Next 5 items */}

              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/RealEstateComp"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryRealEstateTitle}</h5>
                  <img
                    src={OurCategoryRealEstate}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/TravelComp"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryTravelTitle}</h5>
                  <img
                    src={OurCategoryTravel}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/SportGamesComp"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategorySportGamesTitle}</h5>
                  <img
                    src={OurCategorySportGames}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/MAGAZINESCOMP"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryMAGAZINESTitle}</h5>
                  <img
                    src={OurCategoryMAGAZINES}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/PetAnimalsComp"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryPetAnimalsTitle}</h5>
                  <img
                    src={OurCategoryPetAnimals}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 p-0 category_icons"
                style={{
                  maxWidth: window.innerWidth <= 576 ? "45%" : "210px",
                  marginBottom: window.innerWidth <= 576 ? "-20px" : "10px",
                }}
              >
                <Link
                  to="/index"
                  className="category-links"
                  style={{ textDecoration: "none" }}
                >
                  <h5>{OurCategoryHouseHoldTitle}</h5>
                  <img
                    src={OurCategoryHouseHold}
                    alt="icon"
                    style={{ height: "48px", objectFit: "contain" }}
                  />{" "}
                </Link>
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
          {isVisible && (
            <div
              className="popup_cnt"
              onClick={handleClose} // Close modal when clicking outside the image
            >
                {ads.length > 0 && (
              <div className="img" onClick={(e) => e.stopPropagation()}>
                <div className="close_btn" onClick={handleClose}>
                  X
                </div>
              
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      height: "750px",
                      width: "750px",
                      // position: "fixed",
                      top: "20%",
                      left: "20%",
                      // zIndex: 99999,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img src={ads[0].imageUrl} alt="popup" />
                  </div>
               
              </div>
               )}
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
