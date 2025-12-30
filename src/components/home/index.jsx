import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import react from "@heroicons/react";
import { useRef } from "react";
const Home = () => {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Helper function to translate category names from backend
  const translateCategoryTitle = (title) => {
    const categoryMap = {
      "Motors": t("categories.motors"),
      "Motor": t("categories.motors"),
      "Automotive": t("categories.motors"),
      "Electronics": t("categories.electronics"),
      "Fashion Style": t("categories.fashionStyle"),
      "Home & Furniture": t("categories.homeFurniture"),
      "Home and Furniture": t("categories.homeFurniture"),
      "Job Board": t("categories.jobBoard"),
      "Real Estate": t("categories.realEstate"),
      "Realestate": t("categories.realEstate"),
      "Services": t("categories.services"),
      "Sport & Game": t("categories.sportGame"),
      "Pet & Animals": t("categories.petAnimals"),
      "Other": t("categories.other")
    };
    return categoryMap[title] || title;
  };

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
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryEducation"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategoryMAGAZINES(imageOnly[0].image);
  //       setOurCategoryMAGAZINESTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  console.log(OurCategoryHouseHold, "adsList___________OurCategoryAutomative1");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Optimized combined data fetching with caching
  useEffect(() => {
    const fetchAllHomeData = async () => {
      const cacheKey = "home_page_data";
      const cacheTimestamp = "home_page_timestamp";
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

      try {
        setLoading(true);

        // Check cache first
        const cachedData = sessionStorage.getItem(cacheKey);
        const cachedTime = sessionStorage.getItem(cacheTimestamp);

        if (cachedData && cachedTime) {
          const age = Date.now() - parseInt(cachedTime);
          if (age < CACHE_DURATION) {
            // Add 400ms delay for smooth transition
            await new Promise(resolve => setTimeout(resolve, 400));
            const parsedData = JSON.parse(cachedData);

            // Set all state from cache
            setOurCategoryAutomative(parsedData.automative.image);
            setOurCategoryAutomativeTitle(parsedData.automative.title);
            setElectronics(parsedData.electronics.image);
            setElectronicsTitle(parsedData.electronics.title);
            setFashionStyle(parsedData.fashion.image);
            setFashionStyleTitle(parsedData.fashion.title);
            setOurCategoryHealthCare(parsedData.healthcare.image);
            setOurCategoryHealthCareTitle(parsedData.healthcare.title);
            setOurCategoryJobBoard(parsedData.jobBoard.image);
            setOurCategoryJobBoardTitle(parsedData.jobBoard.title);
            setOurCategoryRealEstate(parsedData.realEstate.image);
            setOurCategoryRealEstateTitle(parsedData.realEstate.title);
            setOurCategoryTravel(parsedData.travel.image);
            setOurCategoryTravelTitle(parsedData.travel.title);
            setOurCategorySportGames(parsedData.sportGames.image);
            setOurCategorySportGamesTitle(parsedData.sportGames.title);
            setOurCategoryPetAnimals(parsedData.petAnimals.image);
            setOurCategoryPetAnimalsTitle(parsedData.petAnimals.title);
            setOurCategoryEducation(parsedData.education.image);
            setOurCategoryEducationTitle(parsedData.education.title);
            setOurCategoryHouseHold(parsedData.houseHold.image);
            setOurCategoryHouseHoldTitle(parsedData.houseHold.title);
            setImageUrls(parsedData.sliderImages);
            setTrendingProducts(parsedData.trendingProducts);

            setLoading(false);
            return;
          }
        }

        // Fetch all data in parallel
        const [
          automativeRes,
          electronicsRes,
          fashionRes,
          healthcareRes,
          jobBoardRes,
          realEstateRes,
          travelRes,
          sportGamesRes,
          petAnimalsRes,
          educationRes,
          houseHoldRes,
          sliderRes,
          trendingRes
        ] = await Promise.all([
          fetch("http://168.231.80.24:9002/api/our-category-automative1").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryElectronics").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryFashionStyle").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryHealthCare").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryJobBoardAutomative").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryRealEstateAutomative").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryTravelAutomative").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategorySportGamesAutomative").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryPetAnimalsAutomative").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryEducation").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/our-category-OurCategoryHouseHoldAutomative").then(r => r.json()),
          fetch("http://168.231.80.24:9002/api/slider-images").then(r => r.json()),
          fetch("http://168.231.80.24:9002/route/trendingProducts").then(r => r.json())
        ]);

        // Process and set all data
        const processedData = {
          automative: automativeRes.items?.[0] || { image: "", title: "" },
          electronics: electronicsRes.items?.[0] || { image: "", title: "" },
          fashion: fashionRes.items?.[0] || { image: "", title: "" },
          healthcare: healthcareRes.items?.[0] || { image: "", title: "" },
          jobBoard: jobBoardRes.items?.[0] || { image: "", title: "" },
          realEstate: realEstateRes.items?.[0] || { image: "", title: "" },
          travel: travelRes.items?.[0] || { image: "", title: "" },
          sportGames: sportGamesRes.items?.[0] || { image: "", title: "" },
          petAnimals: petAnimalsRes.items?.[0] || { image: "", title: "" },
          education: educationRes.items?.[0] || { image: "", title: "" },
          houseHold: houseHoldRes.items?.[0] || { image: "", title: "" },
          sliderImages: sliderRes.images || [],
          trendingProducts: trendingRes || []
        };

        // Set all state
        setOurCategoryAutomative(processedData.automative.image);
        setOurCategoryAutomativeTitle(processedData.automative.title);
        setElectronics(processedData.electronics.image);
        setElectronicsTitle(processedData.electronics.title);
        setFashionStyle(processedData.fashion.image);
        setFashionStyleTitle(processedData.fashion.title);
        setOurCategoryHealthCare(processedData.healthcare.image);
        setOurCategoryHealthCareTitle(processedData.healthcare.title);
        setOurCategoryJobBoard(processedData.jobBoard.image);
        setOurCategoryJobBoardTitle(processedData.jobBoard.title);
        setOurCategoryRealEstate(processedData.realEstate.image);
        setOurCategoryRealEstateTitle(processedData.realEstate.title);
        setOurCategoryTravel(processedData.travel.image);
        setOurCategoryTravelTitle(processedData.travel.title);
        setOurCategorySportGames(processedData.sportGames.image);
        setOurCategorySportGamesTitle(processedData.sportGames.title);
        setOurCategoryPetAnimals(processedData.petAnimals.image);
        setOurCategoryPetAnimalsTitle(processedData.petAnimals.title);
        setOurCategoryEducation(processedData.education.image);
        setOurCategoryEducationTitle(processedData.education.title);
        setOurCategoryHouseHold(processedData.houseHold.image);
        setOurCategoryHouseHoldTitle(processedData.houseHold.title);
        setImageUrls(processedData.sliderImages);
        setTrendingProducts(processedData.trendingProducts);

        // Cache the results
        sessionStorage.setItem(cacheKey, JSON.stringify(processedData));
        sessionStorage.setItem(cacheTimestamp, Date.now().toString());

        setLoading(false);
      } catch (error) {
        console.error("Error fetching home page data:", error);
        setLoading(false);
      }
    };

    fetchAllHomeData();
  }, []);
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryEducation"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategoryEducation(imageOnly[0].image);
  //       setOurCategoryEducationTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategoryEducation fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryHouseHoldAutomative"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       console.log(imageOnly, "adsList___________OurCategoryAutomative2");

  //       setOurCategoryHouseHold(imageOnly[0].image);
  //       setOurCategoryHouseHoldTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategoryHouseHold fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategorySportGamesAutomative"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategorySportGames(imageOnly[0].image);
  //       setOurCategorySportGamesTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategorySportGames fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryPetAnimalsAutomative"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategoryPetAnimals(imageOnly[0].image);
  //       setOurCategoryPetAnimalsTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategoryPetAnimals fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryTravelAutomative"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategoryTravel(imageOnly[0].image);
  //       setOurCategoryTravelTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategoryTravel fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryRealEstateAutomative"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategoryRealEstate(imageOnly[0].image);
  //       setOurCategoryRealEstateTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategoryRealEstate fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryJobBoardAutomative"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategoryJobBoard(imageOnly[0].image);
  //       setOurCategoryJobBoardTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategoryJobBoard fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryHealthCare"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setOurCategoryHealthCare(imageOnly[0].image);
  //       setOurCategoryHealthCareTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: OurCategoryHealthCare fetch - now handled by fetchAllHomeData (lines 190-327)
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const adsCollection = collection(db, "OurCategoryFashionStyle"); // Get reference to the 'ads' collection
  //       const adsSnapshot = await getDocs(adsCollection); // Fetch the data
  //       const adsList = adsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // Spread the document data
  //       }));
  //       console.log(adsList, "adsList___________OurCategoryAutomative");
  //       const imageOnly = adsList.map((item) => ({
  //         image: item.image,
  //         Title: item.Title,
  //       }));
  //       setFashionStyle(imageOnly[0].image);
  //       setFashionStyleTitle(imageOnly[0].Title);

  //       setLoading(false); // Stop loading when data is fetched
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAds();
  // }, []);
  // Removed: FashionStyle fetch - now handled by fetchAllHomeData (lines 190-327)
  // Removed: Electronics fetch - now handled by fetchAllHomeData (lines 190-327)
  // Removed: OurCategoryAutomative fetch - now handled by fetchAllHomeData (lines 190-327)
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
      const t = e?.getTotalLength();
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
  // useEffect(() => {
  //   const fetchSliderImages = async () => {
  //     const querySnapshot = await getDocs(collection(db, "SliderImage"));
  //     if (!querySnapshot.empty) {
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         if (data.imageUrls && Array.isArray(data.imageUrls)) {
  //           setImageUrls(data.imageUrls);
  //           console.log("Fetched image URLs:", data.imageUrls);
  //         }
  //       });
  //     } else {
  //       console.log("No documents found in SliderImage table");
  //     }
  //   };
  //   fetchSliderImages();
  // }, []);
  // Removed: Slider images fetch - now handled by fetchAllHomeData (lines 190-327)
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

  // Removed: Trending products fetch - now handled by fetchAllHomeData (lines 190-327)

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
      <div className={`main-wrapper ${!loading ? 'fade-in-ads' : ''}`}>
        <Header />
        <div
          id="carouselExampleIndicators"
          className="carousel slide container hero_slider"
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
                  {/* <Link to="/login"> */}
                  <img
                    src={img}
                    className="d-block"
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: isMobile ? "auto" : isTablet ? "300px" : "auto",
                      objectFit: "contain",
                      borderRadius: "8px",
                      // marginTop: isMobile ? "120px" : "200px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      maxWidth: "100%",
                    }}
                  />
                  {/* </Link> */}
                </div>
              );
            })}
          </div>

          {/* Controls */}
          {/* Prev Button */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
            style={{
              position: "absolute",
              top: "60%",
              marginTop: window.innerWidth <= 576 ? "60px" : "40px",
              left: "20px",
              transform: "translateY(-50%)",
              width: window.innerWidth <= 576 ? "25px" : "48px",
              height: window.innerWidth <= 576 ? "25px" : "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(5px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              opacity: 1,
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.6)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            {/* Custom white arrow icon using inline SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              viewBox="0 0 16 16"
              style={{ marginRight: "3px" }}
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L6.707 7l4.647 4.646a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"
              />
            </svg>
            <span className="visually-hidden">Previous</span>
          </button>

          {/* Next Button */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
            style={{
              position: "absolute",
              top: "60%",
              marginTop: window.innerWidth <= 576 ? "60px" : "40px",
              right: "20px",
              transform: "translateY(-50%)",
              width: window.innerWidth <= 576 ? "25px" : "48px",
              height: window.innerWidth <= 576 ? "25px" : "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 1)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(5px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              opacity: 1,
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.6)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            {/* Custom white arrow icon using inline SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              viewBox="0 0 16 16"
              style={{ marginLeft: "3px" }}
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 7 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
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
                  : "10rem"
                : "30px",
          }}
        >
          <h2
            className="trendingproduct_heading"
            style={{
              marginBottom: "20px",
            }}
          >
            {t("home.ourTrendingProduct")}
          </h2>
          <div
            ref={scrollRef}
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
        <section className="category-section" id="our_category">
          <div className="container">
            <div className="section-heading">
              <div className="row align-items-center">
                <div
                  className="col-md-6 aos aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h2
                    className="our_categoryPara"
                    // style={{ marginTop: "-2.5rem" }}
                  >
                    {t("home.ourCategory")}
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
                // marginTop: window.innerWidth <= 576 ? "-2rem" : "-1rem",
                // marginBottom: window.innerWidth <= 576 ? "0rem" : "-2rem",
                gap: window.innerWidth <= 576 ? "8px" : "10px",
                padding: window.innerWidth <= 576 ? "12px 10px 10px 10px" : "0",
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
                  className="category_icon_inner"
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
                    {/* <img
            src={OurCategoryAutomative}
            alt="icon"
            className="h-10 w-10 object-contain"
            style={{ border: "none" }}
          /> */}
                    <img
                      src={OurCategoryAutomative}
                      alt="Automative"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title below the icon box */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategoryAutomativeTitle)}
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
                  className="category_icon_inner"
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
                    {/* <img
                      src={Electronics}
                      alt="icon"
                      className="h-10 w-10 object-contain"
                      style={{ border: "none" }}
                    /> */}
                    <img
                      src={Electronics}
                      alt="Electronics"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the box, below the icon */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(ElectronicsTitle)}
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
                  className="category_icon_inner"
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
                      alt="FashionStyle"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-8 w-10 object-contain border-none block"
                    />
                  </Link>
                </div>

                {/* Title Below the Icon */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(FashionStyleTitle)}
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
                  className="category_icon_inner"
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
                    {/* <img
            src={OurCategoryHealthCare}
            alt="icon"
            className="h-10 w-10 object-contain"
            style={{ border: "none" }}
          /> */}
                    <img
                      src={OurCategoryHealthCare}
                      alt="HealthCare"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey box */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategoryHealthCareTitle)}
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
                  className="category_icon_inner"
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
                    {/* <img
            src={OurCategoryJobBoard}
            alt="icon"
            className="h-10 w-10 object-contain"
            style={{ border: "none" }}
          /> */}
                    <img
                      src={OurCategoryJobBoard}
                      alt="JobBoard"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside grey box */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategoryJobBoardTitle)}
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
                  className="category_icon_inner"
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
                      alt="RealEstate"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategoryRealEstateTitle)}
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
                  className="category_icon_inner"
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
                    {/* <img
            src={OurCategoryTravel}
            alt="icon"
            className="h-10 w-10 object-contain"
            style={{ border: "none" }}
          /> */}
                    <img
                      src={OurCategoryTravel}
                      alt="Travel"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategoryTravelTitle)}
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
                  className="category_icon_inner"
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
                    {/* <img
            src={OurCategorySportGames}
            alt="icon"
            className="h-10 w-10 object-contain"
          /> */}
                    <img
                      src={OurCategorySportGames}
                      alt="SportGames"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategorySportGamesTitle)}
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
                  className="category_icon_inner"
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
                    {/* <img
            src={OurCategoryPetAnimals}
            alt="icon"
            className="h-10 w-10 object-contain"
            style={{ border: "none" }}
          /> */}
                    <img
                      src={OurCategoryPetAnimals}
                      alt="PetAnimals"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey background */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategoryPetAnimalsTitle)}
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
                  className="category_icon_inner"
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
                    {/* <img
            src={OurCategoryEducation}
            alt="icon"
            className="h-10 w-10 object-contain"
            style={{ border: "none" }}
          /> */}
                    <img
                      src={OurCategoryEducation}
                      alt="OurCategoryEducation"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="h-10 w-10 object-contain border-none"
                      style={{ border: "none" }}
                    />
                  </Link>
                </div>

                {/* Title outside the grey area */}
                <h5
                  className="font-semibold text-black text-center"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    marginTop: "6px",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {translateCategoryTitle(OurCategoryEducationTitle)}
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
