import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
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
import { db } from "./../../Firebase/FirebaseConfig";
const HeaderLower = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const location = useLocation();

  const [loading, setLoading] = useState(false); // Add loading state
  const [OurCategoryAutomativeTitle, setOurCategoryAutomativeTitle] =
    useState("");
  const [ElectronicsTitle, setElectronicsTitle] = useState("");
  const [FashionStyleTitle, setFashionStyleTitle] = useState("");
  const [OurCategoryHealthCareTitle, setOurCategoryHealthCareTitle] =
    useState("");
  console.log("title1111", OurCategoryHealthCareTitle);

  const [OurCategoryJobBoardTitle, setOurCategoryJobBoardTitle] = useState("");
  const [OurCategoryRealEstateTitle, setOurCategoryRealEstateTitle] =
    useState("");
  const [OurCategoryTravelTitle, setOurCategoryTravelTitle] = useState("");
  const [OurCategorySportGamesTitle, setOurCategorySportGamesTitle] =
    useState("");
  const [OurCategoryPetAnimalsTitle, setOurCategoryPetAnimalsTitle] =
    useState("");
  const [OurCategoryEducationTitle, setOurCategoryEducationTitle] =
    useState("");

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

        // setOurCategoryAutomative(imageOnly[0].image);
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
        // setElectronics(imageOnly[0].image);
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
        // setFashionStyle(imageOnly[0].image);
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
        // setOurCategoryHealthCare(imageOnly[0].image);
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
        // setOurCategoryJobBoard(imageOnly[0].image);
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
        // setOurCategoryRealEstate(imageOnly[0].image);
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
        // setOurCategoryTravel(imageOnly[0].image);
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
        // setOurCategorySportGames(imageOnly[0].image);
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
        // setOurCategoryPetAnimals(imageOnly[0].image);
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
        // setOurCategoryEducation(imageOnly[0].image);
        setOurCategoryEducationTitle(imageOnly[0].Title);

        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };
  const { id } = useParams();
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const subCatgory = getQueryParam("subCatgory");
    const NestedSubCategory = getQueryParam("NestedSubCategory");

    const ids = getQueryParam("id");
    console.log("callingFrom______ID:ids", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    console.log(subCatgory, "subCatgory___________");
    console.log(NestedSubCategory, "subCatgory___________1");

    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);
  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  const categories = [
    {
      name: "Automotive",
      path: "/AutomotiveComp",
      subcategories: [
        {
          name: "Cars For Sale",
          path: "/AutomotiveComp?subCatgory=Cars For Sale",
        },
        { name: "Car Rental", path: "/AutomotiveComp?subCatgory=Car Rental" },
        {
          name: "Plates Number",
          path: "/AutomotiveComp?subCatgory=Plates Number",
        },
        {
          name: "Spare Parts",
          path: "/AutomotiveComp?subCatgory=Spare Parts",
          subSubcategories: [
            {
              name: "Body Parts",
              // path: "/AutomotiveComp/SpareParts?NestedSubCategory=BodyParts",
              path: "/AutomotiveComp?subCatgory=Spare Parts&NestedSubCategory=Body Parts",
            },
            {
              name: "Mechanical Parts",
              path: "/AutomotiveComp?subCatgory=Spare Parts&NestedSubCategory=Mechanical Parts",
            },
            {
              name: "Spare Parts",
              path: "/AutomotiveComp?subCatgory=Spare Parts&NestedSubCategory=Spare Parts",
            },
            {
              name: "Batteries",
              path: "/AutomotiveComp/?subCatgory=Spare Parts&NestedSubCategory=Batteries",
            },
            {
              name: "Others",
              path: "/AutomotiveComp/?subCatgory=Spare Parts&NestedSubCategory=Others",
            },
          ],
        },
        { name: "Accessories", path: "/AutomotiveComp?subCatgory=Accessories" },
        {
          name: "Wheels & Rims",
          path: "/AutomotiveComp?subCatgory=Wheels Rims",
        },
        {
          name: "Trucks & Heavy Machinery",
          path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery",
          subSubcategories: [
            {
              name: "Trucks",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Trucks",
              // path: "/AutomotiveComp/TrucksHeavyMachinery/Trucks",
            },
            {
              name: "Dump Truck",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Dump Truck",
            },
            {
              name: "Wheel Loader",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Wheel Loader",
            },
            {
              name: "Recovery",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Recovery",
            },
            {
              name: "Agricultural Equipment",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Agricultural Equipment",
            },
            {
              name: "Crane",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Crane",
            },
            {
              name: "Bulldozer",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Bulldozer",
            },
            {
              name: "Crusher",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Crusher",
            },
            {
              name: "Excavator",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Excavator",
            },
            {
              name: "Heavy Equipment",
              path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&NestedSubCategory=Heavy Equipment",
            },
          ],
        },
        { name: "Tshaleeh", path: "/AutomotiveComp?subCatgory=Tshaleeh" },
        {
          name: "Boats & Jet Ski",
          path: "/AutomotiveComp?subCatgory=Boats & Jet Ski",
          subSubcategories: [
            {
              name: "Motorboats",
              path: "/AutomotiveComp?subCatgory=Boats & Jet Ski&NestedSubCategory=Motor boats",
              // path: "/AutomotiveComp/BoatsJetSki/Motorboats",
            },
            {
              name: "Jet-ski",
              path: "/AutomotiveComp?subCatgory=Boats & Jet Ski&NestedSubCategory=Jet-ski",
            },
            {
              name: "Others",
              path: "/AutomotiveComp?subCatgory=Boats & Jet Ski&NestedSubCategory=Others",
            },
          ],
        },
        {
          name: "Classic Cars",
          path: "/AutomotiveComp?subCatgory=Classic Cars",
        },
        {
          name: "Salvage Cars",
          path: "/AutomotiveComp?subCatgory=Salvage Cars",
        },
        {
          name: "Mortgaged Cars",
          path: "/AutomotiveComp?subCatgory=Mortgaged Cars",
        },
        { name: "Recovery", path: "/AutomotiveComp?subCatgory=Recovery" },
        { name: "Food Truck", path: "/AutomotiveComp?subCatgory=Food Truck" },
        { name: "Caravans", path: "/AutomotiveComp?subCatgory=Caravans" },
        { name: "Reports", path: "/AutomotiveComp?subCatgory=Reports" },
        {
          name: "Car Cleaning",
          path: "/AutomotiveComp?subCatgory=Car Cleaning",
        },
      ],
    },
    {
      name: "Electronics",
      path: "/ElectronicComp",
      subcategories: [
        {
          name: "Mobile Phones",
          path: "/ElectronicComp?subCatgory=Mobile Phones",
          subSubcategories: [
            {
              name: "Smart Watches",
              path: "/ElectronicComp?subCatgory=Mobile Phones&NestedSubCategory=Smart Watches",
            },
            {
              name: "Headsets",
              path: "/ElectronicComp?subCatgory=Mobile Phones&NestedSubCategory=Headsets",
            },
            {
              name: "Chargers & Cables",
              path: "/ElectronicComp?subCatgory=Mobile Phones&NestedSubCategory=Chargers & Cables",
            },
            {
              name: "Covers & Protectors",
              path: "/ElectronicComp?subCatgory=Mobile Phones&NestedSubCategory=Covers & Protectors",
            },
          ],
        },
        {
          name: "Tablet Devices",
          path: "/ElectronicComp?subCatgory=Tablet Devices",
          subSubcategories: [
            // { name: "iPad", path: "/ElectronicComp/TabletDevices/iPad" },
            {
              name: "iPad",
              path: "/ElectronicComp?subCatgory=Tablet Devices&NestedSubCategory=iPad",
            },

            {
              name: "Galaxy Tab",
              path: "/ElectronicComp?subCatgory=Tablet Devices&NestedSubCategory=Galaxy Tab",
            },
          ],
        },

        {
          name: "Computers & Laptops",
          path: "/ElectronicComp?subCatgory=Computers & Laptops",
        },
        {
          name: "Video Games",
          path: "/ElectronicComp?subCatgory=Video Games",
          subSubcategories: [
            {
              name: "VR Glasses",
              // path: "/ElectronicComp/VideoGames/VRGlasses",
              path: "/ElectronicComp?subCatgory=Video Games&NestedSubCategory=VR Glasses",
            },
            {
              name: "PlayStation (PS) Devices",
              path: "/ElectronicComp?subCatgory=Video Games&NestedSubCategory=PlayStation (PS) Devices",
            },
            {
              name: "PlayStation (PS) Games",
              path: "/ElectronicComp?subCatgory=Video Games&NestedSubCategory=PlayStation (PS) Games",
            },
            {
              name: "Xbox Devices",
              path: "/ElectronicComp?subCatgory=Video Games&NestedSubCategory=Xbox Devices",
            },
            {
              name: "Xbox Games",
              path: "/ElectronicComp?subCatgory=Video Games&NestedSubCategory=Xbox Games",
            },
            {
              name: "Nintendo",
              path: "/ElectronicComp?subCatgory=Video Games&NestedSubCategory=Nintendo",
            },
          ],
        },
        {
          name: "Television & Audio System",
          path: "/ElectronicComp?subCatgory=Television & Audio System",
        },
        {
          name: "Accounts & Subscriptions",
          path: "/ElectronicComp?subCatgory=Accounts & Subscriptions",
          subSubcategories: [
            {
              name: "PUBG",
              // path: "/ElectronicComp/Accounts&Subscriptions/PUBG",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=PUBG",
            },
            {
              name: "Fortnite",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Fortnite",
            },
            {
              name: "FIFA",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=FIFA",
            },
            {
              name: "Clash of Clans",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Clash of Clans",
            },
            {
              name: "Clash Royale",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Clash Royale",
            },
            {
              name: "Instagram Accounts",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Instagram Accounts",
            },
            {
              name: "Twitter Accounts",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Twitter Accounts",
            },
            {
              name: "TikTok Accounts",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=TikTok Accounts",
            },
            {
              name: "Snapchat Accounts",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Snapchat Accounts",
            },
            {
              name: "Facebook Accounts",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Facebook Accounts",
            },
            {
              name: "YouTube Accounts",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=YouTub eAccounts",
            },
            {
              name: "Other Accounts",
              path: "/ElectronicComp?subCatgory=Accounts & Subscriptions&NestedSubCategory=Other Accounts",
            },
          ],
        },
        {
          name: "Special Number",
          path: "/ElectronicComp?subCatgory=Special Number",
          subSubcategories: [
            // { name: "STC", path: "/ElectronicComp/SpecialNumber/STC" },
            { name: "STC", path: "/ElectronicComp?NestedSubCategory=STC" },

            {
              name: "Mobily",
              path: "/ElectronicComp?subCatgory=Special Number&NestedSubCategory=Mobily",
            },
            {
              name: "Zain",
              path: "/ElectronicComp?subCatgory=Special Number&NestedSubCategory=Zain",
            },
          ],
        },
        {
          name: "Home & Kitchen Appliance",
          path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance",
          subSubcategories: [
            {
              name: "Stoves & Ovens",
              // path: "/ElectronicComp/Home&KitchenAppliance/Stoves&Ovens",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Stoves & Ovens",
            },
            {
              name: "Refrigerators & Coolers",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Refrigerators & Coolers",
            },
            {
              name: "Mixers & Blenders",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Mixers & Blenders",
            },
            {
              name: "Washing Machines",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Washing Machines",
            },
            {
              name: "Kettles",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Kettles",
            },
            {
              name: "Fryers",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Fryers",
            },
            {
              name: "Coffee Machines",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Coffee Machines",
            },
            {
              name: "Microwaves & Toasters",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=MicrowavesS & Toasters",
            },
            {
              name: "Vacuum Cleaners",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Vacuum Cleaners",
            },
            {
              name: "Clothing Irons",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Clothing Irons",
            },
            {
              name: "Air Conditioners",
              path: "/ElectronicComp?subCatgory=Home & Kitchen Appliance&NestedSubCategory=Air Conditioners",
            },
          ],
        },
        {
          name: "Motors & Generators",
          path: "/ElectronicComp?subCatgory=Motors & Generators",
        },
        {
          name: "Cameras",
          path: "/ElectronicComp?subCatgory=Cameras",
          subSubcategories: [
            // { name: "Lenses", path: "/ElectronicComp/Cameras/Lenses" },
            {
              name: "Lenses",
              path: "/ElectronicComp?subCatgory=Cameras&NestedSubCategory=Lenses",
            },

            {
              name: "Drone",
              path: "/ElectronicComp?subCatgory=Cameras&NestedSubCategory=Drone ",
            },
            {
              name: "Camera Accessories",
              path: "/ElectronicComp?subCatgory=Cameras&NestedSubCategory=Camera Accessories",
            },
          ],
        },

        {
          name: "Networking Devices",
          path: "/ElectronicComp?subCatgory=Networking Devices",
        },
        {
          name: "Screens & Projectors",
          path: "/ElectronicComp?subCatgory=Screens & Projectors",
        },
        {
          name: "Printer & Scanner",
          path: "/ElectronicComp?subCatgory=Printer & Scanner",
        },
        {
          name: "Computer Accessories",
          path: "/ElectronicComp?subCatgory=Computer Accessories",
        },
      ],
    },
    {
      name: "Fashion Style",
      path: "/FashionStyle",
      subcategories: [
        {
          name: "Watches",
          path: "/FashionStyle?subCatgory=Watches",
          subSubcategories: [
            {
              name: "Other Watches",
              // path: "/FashionStyle/Watches/OtherWatches",
              path: "/FashionStyle?subCatgory=Watches&NestedSubCategory=Other Watches",
            },
            {
              name: "Men's Watches",
              path: "/FashionStyle?subCatgory=Watches&NestedSubCategory=Men' sWatches",
            },
            {
              name: "Women's Watches",
              path: "/FashionStyle?subCatgory=Watches&NestedSubCategory=Women' sWatches",
            },
          ],
        },
        {
          name: "Perfumes & Incense",
          path: "/FashionStyle?subCatgory=Perfumes & Incense",
          subSubcategories: [
            {
              name: "Other Perfumes",
              path: "/FashionStyle?subCatgory=Perfumes & Incense&NestedSubCategory=Other Perfumes",
              // path: "/FashionStyle/Perfumes&Incense/OtherPerfumes",
            },
            {
              name: "Men's Perfumes",
              path: "/FashionStyle?subCatgory=Perfumes & Incense&NestedSubCategory=Men's Perfumes",
            },
            {
              name: "Women's Perfumes",
              path: "/FashionStyle?subCatgory=Perfumes & Incense&NestedSubCategory=Women's Perfumes",
            },
            {
              name: "Oud & Incense",
              path: "/FashionStyle?subCatgory=Perfumes & Incense&NestedSubCategory=Oud & Incense",
            },
          ],
        },
        {
          name: "Sports Equipment",
          path: "/FashionStyle?subCatgory=Sports Equipment",
          subSubcategories: [
            {
              name: "Eyeglasses",
              // path: "/FashionStyle/SportsEquipment/Eyeglasses",
              path: "/FashionStyle?subCatgory=Sports Equipment&NestedSubCategory=Eyeglasses",
            },
            {
              name: "Other Eyeglasses",
              path: "/FashionStyle?subCatgory=Sports Equipment&NestedSubCategory=Other Eyeglasses",
            },
            {
              name: "Men's Eyeglasses",
              path: "/FashionStyle?subCatgory=Sports Equipment&NestedSubCategory=Men's Eyeglasses",
            },
            {
              name: "HeadsWomen's Eyeglassesets",
              path: "/FashionStyle?subCatgory=Sports Equipment&NestedSubCategory=Women's Eyeglasses",
            },
          ],
        },
        {
          name: "Men's Fashion",
          path: "/FashionStyle?subCatgory=Men's Fashion",
          subSubcategories: [
            {
              name: "Men's Shemaghs",
              // path: "/FashionStyle/Men'sFashion/Men'sShemaghs",
              path: "/FashionStyle?subCatgory=Men's Fashion&NestedSubCategory=Men's Shemaghs",
            },
            {
              name: "Men's Accessories",
              path: "/FashionStyle?subCatgory=Men's Fashion&NestedSubCategory=Men's Accessories",
            },
            {
              name: "Men's Clothing",
              path: "/FashionStyle?subCatgory=Men's Fashion&NestedSubCategory=Men's Clothing",
            },
            {
              name: "Men's Jackets",
              path: "/FashionStyle?subCatgory=Men's Fashion&NestedSubCategory=Men's Jackets",
            },
            {
              name: "Men's Bags",
              path: "/FashionStyle?subCatgory=Men's Fashion&NestedSubCategory=Men's Bags",
            },
            {
              name: "Men's Shirts & Trousers",
              path: "/FashionStyle?subCatgory=Men's Fashion&NestedSubCategory=Men's Shirts & Trousers",
            },
            {
              name: "Men's Sportswear",
              path: "/FashionStyle?subCatgory=Men's Fashion&NestedSubCategory=Men's Sportswear",
            },
          ],
        },
        {
          name: "Women's Fashion",
          path: "/FashionStyle?subCatgory=Women's Fashion",
          subSubcategories: [
            {
              name: "Women's Accessories & Jewelry",
              // path: "/FashionStyle/Women'sFashion/Women'sAccessories&Jewelry",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Women's Accessories & Jewelry",
            },
            {
              name: "Women's Blouses & T-Shirts",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Women's Blouses & T-Shirts",
            },
            {
              name: "Women's Skirts & Trousers",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Women's Skirts & Trousers",
            },
            {
              name: "Women's Jackets",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Women's Jackets",
            },
            {
              name: "Kaftans",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Kaftans",
            },
            {
              name: "Women's Bags",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Women's Bags",
            },
            {
              name: "Abayas",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Abayas",
            },
            {
              name: "Dresses",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Dresses",
            },
            {
              name: "Lingerie",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Lingerie",
            },
            {
              name: "Women's Sportswear",
              path: "/FashionStyle?subCatgory=Women's Fashion&NestedSubCategory=Women's Sportswear",
            },
          ],
        },
        {
          name: "Children's Clothing & Accessories",
          path: "/FashionStyle?subCatgory=Children's Clothing & Accessories",
          subSubcategories: [
            {
              name: "Baby Care Products",
              // path: "/FashionStyle/Children'sClothing&Accessories/BabyCareProducts",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Baby Care Products",
            },
            {
              name: "Children's Accessories",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Children's Accessories",
            },
            {
              name: "Toys for Kids",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Toys for Kids",
            },
            {
              name: "Children's Cribs & Chairs",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Children's Cribs & Chairs",
            },
            {
              name: "Children's Bags",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Children's Bags",
            },
            {
              name: "Strollers",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Strollers",
            },
            {
              name: "Car Seats for Kids",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Car Seats for Kids",
            },
            {
              name: "Girls' Clothing",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Girl's Clothing",
            },
            {
              name: "Boys' Clothing",
              path: "/FashionStyle?subCatgory=Children's Clothing & Accessories&NestedSubCategory=Boys's Clothing",
            },
          ],
        },
        { name: "Gifts", path: "/FashionStyle?subCatgory=Gifts" },
        { name: "Luggage", path: "/FashionStyle?subCatgory=Luggage" },
        {
          name: "Health & Beauty",
          path: "/FashionStyle?subCatgory=Health & Beauty",
          subSubcategories: [
            // { name: "Skincare", path: "/FashionStyle/Health&Beauty/Skincare" },
            {
              name: "Skincare",
              path: "/FashionStyle?subCatgory=Health & Beauty&NestedSubCategory=Skincare",
            },

            {
              name: "Hair Care",
              path: "/FashionStyle?subCatgory=Health & Beauty&NestedSubCategory=Hair Care",
            },
            {
              name: "Makeup",
              path: "/FashionStyle?subCatgory=Health & Beauty&NestedSubCategory=Makeup",
            },
            {
              name: "Other Beauty Products",
              path: "/FashionStyle?subCatgory=Health & Beauty&NestedSubCategory=Other Beauty Products",
            },
          ],
        },
      ],
    },
    {
      name: "Home & Furniture",
      path: "/HealthCareComp",
      subcategories: [
        {
          name: "Outdoor Furniture",
          path: "/HealthCareComp?subCatgory=Outdoor Furniture",
        },
        {
          name: "Majlis & Sofas",
          path: "/HealthCareComp?subCatgory=Majlis & Sofas",
        },
        {
          name: "Cabinets & Wardrobes",
          path: "/HealthCareComp?subCatgory=Cabinets & Wardrobes",
        },
        {
          name: "Beds & Mattresses",
          path: "/HealthCareComp?subCatgory=Beds & Mattresses",
        },
        {
          name: "Tables & Chairs",
          path: "/HealthCareComp?subCatgory=Tables & Chairs",
        },
        { name: "Kitchens", path: "/HealthCareComp?subCatgory=Kitchens" },
        { name: "Bathrooms", path: "/HealthCareComp?subCatgory=Bathrooms" },
        { name: "Carpets", path: "/HealthCareComp?subCatgory=Carpets" },
        { name: "Curtains", path: "/HealthCareComp?subCatgory=Curtains" },
        {
          name: "Decoration & Accessories",
          path: "/HealthCareComp?subCatgory=Decoration & Accessories",
        },
        { name: "Lighting", path: "/HealthCareComp?subCatgory=Lighting" },
        {
          name: "Household Items",
          path: "/HealthCareComp?subCatgory=Household Items",
        },
        {
          name: "Garden - Plants",
          path: "/HealthCareComp?subCatgory=Garden Plants",
        },
        {
          name: "Office Furniture",
          path: "/HealthCareComp?subCatgory=Office Furniture",
        },
        {
          name: "Doors - Windows - Aluminium",
          path: "/HealthCareComp?subCatgory=Doors Windows Aluminium",
        },
        {
          name: "Tiles & Flooring",
          path: "/HealthCareComp?subCatgory=Tiles & Flooring",
        },
      ],
    },
    {
      name: "Job Board",
      path: "/JobBoard",
      subcategories: [
        {
          name: "Administrativjbe Jobs",
          path: "/JobBoard?subCatgory=Administrative Jobs",
          subSubcategories: [
            {
              name: "Marketing & Sales",
              // path: "/JobBoard/AdministrativeJobs/Marketing&Sales",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Marketing & Sales",
            },
            {
              name: "Customer Service",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Customer Service",
            },
            {
              name: "Secretary",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Secretary",
            },
            {
              name: "Tourism & Hospitality",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Tourism & Hospitality",
            },
            {
              name: "Accountant",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Accountant",
            },
            {
              name: "Delivery Representative",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Delivery Representative",
            },
            {
              name: "Other Administrative Jobs",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Other Administrative Jobs",
            },
            {
              name: "Public Relations & Media",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Public Relations & Media",
            },
            {
              name: "Translator",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Translator",
            },
            {
              name: "Lawyer & Legal Jobs",
              path: "/JobBoard?subCatgory=Administrative Jobs&NestedSubCategory=Lawyer & LegalJobs",
            },
          ],
        },
        {
          name: "Fashion & Beauty Jobs",
          path: "/JobBoard?subCatgory=Fashion & Beauty Jobs",
          subSubcategories: [
            // { name: "Tailor", path: "/JobBoard/Fashion&BeautyJobs/Tailor" },
            {
              name: "Tailor",
              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs&NestedSubCategory=Tailor",
            },

            {
              name: "Female Hairdresser",
              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs&NestedSubCategory=Female Hair dresser",
            },
            {
              name: "Fashion Designer",
              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs&NestedSubCategory=Fashion Designer",
            },
            {
              name: "Model",
              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs&NestedSubCategory=Model",
            },
            {
              name: "Makeup Artist",
              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs&NestedSubCategory=Makeup Artist",
            },
            {
              name: "Hair Stylist",
              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs&NestedSubCategory=Hair Stylist",
            },
            {
              name: "Other Beauty Jobs",
              path: "/JobBoard?subCatgory=Fashion & Beauty Jobs&NestedSubCategory=Other Beauty Jobs",
            },
          ],
        },
        {
          name: "Security & Safety Jobs",
          path: "/JobBoard?subCatgory=Security & Safety Jobs",
          subSubcategories: [
            {
              name: "Security Guard",
              // path: "/JobBoard/Security&SafetyJobs/SecurityGuard",
              path: "/JobBoard?subCatgory=Security & Safety Jobs&NestedSubCategory=Security Guard",
            },
            {
              name: "Safety Technician",
              path: "/JobBoard?subCatgory=Security & Safety Jobs&NestedSubCategory=Safety Technician",
            },
          ],
        },
        { name: "Teaching Jobs", path: "/JobBoard?subCatgory=Teaching Jobs" },

        {
          name: "IT & Design Jobs",
          path: "/JobBoard?subCatgory=IT & DesignJobs",
          subSubcategories: [
            {
              name: "Other IT Jobs",
              // path: "/JobBoard/IT&DesignJobs/OtherITJobs",
              path: "/JobBoard?subCatgory=IT & DesignJobs&NestedSubCategory=Other IT Jobs",
            },
            {
              name: "Network & Telecommunications Specialist",
              path: "/JobBoard?subCatgory=IT & DesignJobs&NestedSubCategory=Network & Telecommunications Specialist",
            },
            {
              name: "Content Writer",
              path: "/JobBoard?subCatgory=IT & DesignJobs&NestedSubCategory=Content Writer",
            },
            {
              name: "Programmer",
              path: "/JobBoard?subCatgory=IT & DesignJobs&NestedSubCategory=Programmer",
            },
            {
              name: "Media Designer",
              path: "/JobBoard?subCatgory=IT & DesignJobs&NestedSubCategory=Media Designer",
            },
          ],
        },
        {
          name: "Agriculture & Farming Jobs",
          // path: "/JobBoard/Agriculture&FarmingJobs",
          path: "/JobBoard?subCatgory=Agriculture & Farming Jobs",

          subSubcategories: [
            {
              name: "Farm Worker",
              path: "/JobBoard?subCatgory=Agriculture & Farming Jobs&NestedSubCategory=Farm Worker",
            },
            {
              name: "Other Agricultural Jobs",
              path: "/JobBoard?subCatgory=Agriculture & Farming Jobs&NestedSubCategory=Other Agricultural Jobs",
            },
          ],
        },
        {
          name: "Industrial Jobs",
          path: "/JobBoard?subCatgory=Industrial Jobs",
          subSubcategories: [
            {
              name: "Bodywork Technician",
              path: "/JobBoard?subCatgory=Industrial Jobs&NestedSubCategory=Bodywork Technician",
            },
            {
              name: "Auto Electrician",
              path: "/JobBoard?subCatgory=Industrial Jobs&NestedSubCategory=Auto Electrician",
            },
            {
              name: "Car Mechanic",
              path: "/JobBoard?subCatgory=Industrial Jobs&NestedSubCategory=Car Mechanic",
            },
            {
              name: "Other Industrial Jobs",
              path: "/JobBoard?subCatgory=Industrial Jobs&NestedSubCategory=Other Industrial Jobs",
            },
          ],
        },
        {
          name: "Medical & Nursing Jobs",
          path: "/JobBoard?subCatgory=Medical & Nursing Jobs",
          subSubcategories: [
            {
              name: "Pharmacist",
              // path: "/JobBoard/Medical&NursingJobs/Pharmacist",
              path: "/JobBoard?subCatgory=Medical & Nursing Jobs&NestedSubCategory=Pharmacist",
            },
            {
              name: "Doctor",
              path: "/JobBoard?subCatgory=Medical & Nursing Jobs&NestedSubCategory=Doctor",
            },
            {
              name: "Physical Therapy Technician",
              path: "/JobBoard?subCatgory=Medical & Nursing Jobs&NestedSubCategory=Physical Therapy Technician",
            },
            {
              name: "Massage Therapist",
              path: "/JobBoard?subCatgory=Medical & Nursing Jobs&NestedSubCategory=Massage Therapist",
            },
            {
              name: "Nurse",
              path: "/JobBoard?subCatgory=Medical & Nursing Jobs&NestedSubCategory=Nurse",
            },
            {
              name: "Other Medical Jobs",
              path: "/JobBoard?subCatgory=Medical & Nursing Jobs&NestedSubCategory=Other Medical Jobs",
            },
          ],
        },
        {
          name: "Architecture & Construction Jobs",
          path: "/JobBoard?subCatgory=Architecture & Construction Jobs",
          subSubcategories: [
            {
              name: "Building Painter",
              // path: "/JobBoard/Architecture&ConstructionJobs/BuildingPainter",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Building Painter",
            },
            {
              name: "AC Technician",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=AC Technician",
            },
            {
              name: "Decorator",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Decorator",
            },
            {
              name: "Building Electrician",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Building Electrician",
            },
            {
              name: "Tiler",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Tiler",
            },
            {
              name: "Building Supervisor",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Building Supervisor",
            },
            {
              name: "Building Contractor",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Building Contractor",
            },
            {
              name: "Plasterer",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Plasterer",
            },
            {
              name: "Carpenter",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Carpenter",
            },
            {
              name: "Other Construction Jobs",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Other Construction Jobs",
            },
            {
              name: "Plumber",
              path: "/JobBoard?subCatgory=Architecture & Construction Jobs&NestedSubCategory=Plumber",
            },
          ],
        },
        {
          name: "Housekeeping Jobs",
          path: "/JobBoard?subCatgory=Housekeeping Jobs",
          subSubcategories: [
            {
              name: "Private Driver",
              // path: "/JobBoard/HousekeepingJobs/PrivateDriver",
              path: "/JobBoard?subCatgory=Housekeeping Jobs&NestedSubCategory=Private Driver",
            },
            {
              name: "Household Worker",
              path: "/JobBoard?subCatgory=Housekeeping Jobs&NestedSubCategory=Household Worker",
            },
            {
              name: "Domestic Worker",
              path: "/JobBoard?subCatgory=Housekeeping Jobs&NestedSubCategory=Domestic Worker",
            },
            {
              name: "Other Labor Jobs",
              path: "/JobBoard?subCatgory=Housekeeping Jobs&NestedSubCategory=Other Labor Jobs",
            },
          ],
        },
        {
          name: "Restaurant Jobs",
          path: "/JobBoard?subCatgory=Restaurant Jobs",
          subSubcategories: [
            {
              name: "Chef & Cook Instructor",
              // path: "/JobBoard/RestaurantJobs/Chef&CookInstructor",
              path: "/JobBoard?subCatgory=Restaurant Jobs&NestedSubCategory=Chef & Cook Instructor",
            },
            {
              name: "Waiter & Host",
              path: "/JobBoard?subCatgory=Restaurant Jobs&NestedSubCategory=Waiter & Host",
            },
            {
              name: "Other Restaurant Jobs",
              path: "/JobBoard?subCatgory=Restaurant Jobs&NestedSubCategory=Other Restaurant Jobs",
            },
          ],
        },
      ],
    },
    {
      name: "Real Estate",
      path: "/RealEstateComp",
      subcategories: [
        {
          name: "Apartments for Rent",
          path: "/RealEstateComp?subCatgory=Apartments for Rent",
        },
        {
          name: "Apartments for Sale",
          path: "/RealEstateComp?subCatgory=Apartments for Sale",
        },
        {
          name: "Building for Rent",
          path: "/RealEstateComp?subCatgory=Building for Rent",
        },
        {
          name: "Building for Sale",
          path: "/RealEstateComp?subCatgory=Building for Sale",
        },
        {
          name: "Camps for Rent",
          path: "/RealEstateComp?subCatgory=Camps for Rent",
        },
        {
          name: "Chalets for Sale",
          path: "/RealEstateComp?subCatgory=Chalets for Sale",
        },
        {
          name: "Commercial Lands for Sale",
          path: "/RealEstateComp?subCatgory=Commercial Lands for Sale",
        },
        {
          name: "Compound for Rent",
          path: "/RealEstateComp?subCatgory=Compound for Rent",
        },
        {
          name: "Compound for Sale",
          path: "/RealEstateComp?subCatgory=Compound for Sale",
        },
        {
          name: "Farm for Rent",
          path: "/RealEstateComp?subCatgory=Farm for Rent",
        },
        {
          name: "Farms for Sale",
          path: "/RealEstateComp?subCatgory=Farms for Sale",
        },
        {
          name: "Floor for Sale",
          path: "/RealEstateComp?subCatgory=Floor for Sale",
        },
        {
          name: "Floors for Rent",
          path: "/RealEstateComp?subCatgory=Floors for Rent",
        },
        {
          name: "Hall for Rent",
          path: "/RealEstateComp?subCatgory=Hall for Rent",
        },
        {
          name: "Houses for Rent",
          path: "/RealEstateComp?subCatgory=Houses for Rent",
        },
        {
          name: "Houses for Sale",
          path: "/RealEstateComp?subCatgory=Houses for Sale",
        },
        {
          name: "Lands for Sale",
          path: "/RealEstateComp?subCatgory=Lands for Sale",
        },
        {
          name: "Offices for Rent",
          path: "/RealEstateComp?subCatgory=Offices for Rent",
        },
        {
          name: "Rest Houses for Rent",
          path: "/RealEstateComp?subCatgory=RestHouses for Rent",
        },
        {
          name: "Rest Houses for Sale",
          path: "/RealEstateComp?subCatgory=RestHouses for Sale",
        },
        {
          name: "Rooms for Rent",
          path: "/RealEstateComp?subCatgory=Rooms for Rent",
        },
        {
          name: "Shops for Rent",
          path: "/RealEstateComp?subCatgory=Shops for Rent",
        },
        {
          name: "Shops for Transfer",
          path: "/RealEstateComp?subCatgory=Shops for Transfer",
        },
        {
          name: "Villas for Rent",
          path: "/RealEstateComp?subCatgory=Villas for Rent",
        },
        {
          name: "Villas for Sale",
          path: "/RealEstateComp?subCatgory=Villas for Sale",
        },
        {
          name: "Warehouse for Sale",
          path: "/RealEstateComp?subCatgory=Warehouse for Sale",
        },
        {
          name: "Warehouse for Rent",
          path: "/RealEstateComp?subCatgory=Warehouse for Rent",
        },
      ],
    },
    {
      name: "Services",
      path: "/TravelComp",
      subcategories: [
        {
          name: "Other Services",
          path: "/TravelComp?subCatgory=Other Services",
        },
        {
          name: "Contracting Services",
          path: "/TravelComp?subCatgory=Contracting Services",
        },
        {
          name: "Government Paperwork Services",
          path: "/TravelComp?subCatgory=Government Paperwork Services",
        },
        {
          name: "Delivery Services",
          path: "/TravelComp?subCatgory=Delivery Services",
        },
        {
          name: "Furniture Moving Services",
          path: "/TravelComp?subCatgory=Furniture Moving Services",
        },
        {
          name: "Cleaning Services",
          path: "/TravelComp?subCatgory=Cleaning Services",
        },
        {
          name: "International Shopping Services",
          path: "/TravelComp?subCatgory=International Shopping Services",
        },
        {
          name: "Legal Services",
          path: "/TravelComp?subCatgory=Legal Services",
        },
        {
          name: "Accounting & Financial Services",
          path: "/TravelComp?subCatgory=Accounting & Financial Services",
        },
      ],
    },
    {
      name: "Sport & Games",
      path: "/SportGamesComp",
      subcategories: [
        {
          name: "Gaming Consoles",
          path: "/SportGamesComp?subCatgory=Gaming Consoles",
        },
        { name: "Video Games", path: "/SportGamesComp?subCatgory=Video Games" },
        { name: "Controllers", path: "/SportGamesComp?subCatgory=Controllers" },
        {
          name: "Gaming Accessories",
          path: "/SportGamesComp?subCatgory=Gaming Accessories",
        },
        { name: "Gift Cards", path: "/SportGamesComp?subCatgory=Gift Cards" },
        { name: "Accounts", path: "/SportGamesComp?subCatgory=Accounts" },
        { name: "Toys", path: "/SportGamesComp?subCatgory=Toys" },
      ],
    },
    {
      name: "Pet & Animals",
      path: "/PetAnimalsComp",
      subcategories: [
        {
          name: "Sheep",
          path: "/PetAnimalsComp?subCatgory=Sheep",
          subSubcategories: [
            {
              name: "Barbary Sheep",
              // path: "/PetAnimalsComp/Sheep/BarbarySheep",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Barbary Sheep",
            },
            {
              name: "Hure Sheep",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Hure Sheep",
            },
            {
              name: "Romanian Sheep",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Romanian Sheep",
            },
            {
              name: "Sawakni Sheep",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Sawakni Sheep",
            },
            {
              name: "Najdi Sheep",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Najdi Sheep",
            },
            {
              name: "Naemi Sheep",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Naemi Sheep",
            },
            {
              name: "Rafidi Sheep",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Rafidi Sheep",
            },
            {
              name: "Sheep Supplies",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Sheep Supplies",
            },
            {
              name: "Sheep Products",
              path: "/PetAnimalsComp?subCatgory=Sheep&NestedSubCategory=Sheep Products",
            },
          ],
        },
        {
          name: "Goats",
          path: "/PetAnimalsComp?subCatgory=Goats",
          subSubcategories: [
            // { name: "Local Goats", path: "/PetAnimalsComp/Goats/LocalGoats" },
            {
              name: "Local Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Local Goats",
            },

            {
              name: "Bishi Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Bishi Goats",
            },
            {
              name: "Southern Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Southern Goats",
            },
            {
              name: "Hejaz Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Hejaz Goats",
            },
            {
              name: "Shami Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Shami Goats",
            },
            {
              name: "Ardi Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Ardi Goats",
            },
            {
              name: "Dutch Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Dutch Goats",
            },
            {
              name: "Dwarf Goats",
              path: "/PetAnimalsComp?subCatgory=Goats&NestedSubCategory=Dwarf Goats",
            },
          ],
        },
        {
          name: "Parrot",
          path: "/PetAnimalsComp?subCatgory=Parrot",
          subSubcategories: [
            {
              name: "Amazoni Parrot",
              // path: "/PetAnimalsComp/Parrot/AmazoniParrot",
              path: "/PetAnimalsComp?subCatgory=Parrot&NestedSubCategory=Amazoni Parrot",
            },
            {
              name: "Congo African Grey Parrot",
              path: "/PetAnimalsComp?subCatgory=Parrot&NestedSubCategory=Congo African Grey Parrot",
            },
            {
              name: "Cockatoo Parrot",
              path: "/PetAnimalsComp?subCatgory=Parrot&NestedSubCategory=Cockatoo Parrot",
            },
            {
              name: "Macaw Parrot",
              path: "/PetAnimalsComp?subCatgory=Parrot&NestedSubCategory=Macaw Parrot",
            },
            {
              name: "Pet Birds",
              path: "/PetAnimalsComp?subCatgory=Parrot&NestedSubCategory=Pet Birds",
            },
            {
              name: "Bird Supplies",
              path: "/PetAnimalsComp?subCatgory=Parrot&NestedSubCategory=Bird Supplies",
            },
          ],
        },
        {
          name: "Dove/Pigeon",
          path: "/PetAnimalsComp?subCatgory=Dove & Pigeon",
          subSubcategories: [
            {
              name: "Pakistani Pigeon",
              // path: "/PetAnimalsComp/Dove&Pigeon/PakistaniPigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Pakistani Pigeon",
            },
            {
              name: "Turkish Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Turkish Pigeon",
            },
            {
              name: "Homers (Pigeons)",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Homers",
            },
            {
              name: "Sudanese Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Sudanese Pigeon",
            },
            {
              name: "Shami Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Shami Pigeon",
            },
            {
              name: "Sanaani Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Sanaani Pigeon",
            },
            {
              name: "French Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=French Pigeon",
            },
            {
              name: "Egyptian Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Egyptian Pigeon",
            },
            {
              name: "Indian Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Indian Pigeon",
            },
            {
              name: "Dutch Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Dutch Pigeon",
            },
            {
              name: "Qatifi Pigeon",
              path: "/PetAnimalsComp?subCatgory=Dove & Pigeon&NestedSubCategory=Qatifi Pigeon",
            },
          ],
        },
        {
          name: "Cats",
          path: "/PetAnimalsComp?subCatgory=Cats",
          subSubcategories: [
            {
              name: "Scottish Cats",
              // path: "/PetAnimalsComp/Cats/ScottishCats",
              path: "/PetAnimalsComp?subCatgory=Cats&NestedSubCategory=Scottish Cats",
            },
            {
              name: "Persian Cats",
              path: "/PetAnimalsComp?subCatgory=Cats&NestedSubCategory=Persian Cats",
            },
            {
              name: "Cats for Adoption",
              path: "/PetAnimalsComp?subCatgory=Cats&NestedSubCategory=Cats for Adoption",
            },
            {
              name: "Himalayan Cats",
              path: "/PetAnimalsComp?subCatgory=Cats&NestedSubCategory=Himalayan Cats",
            },
            {
              name: "Cat Supplies",
              path: "/PetAnimalsComp?subCatgory=Cats&NestedSubCategory=Cat Supplies",
            },
          ],
        },
        {
          name: "Chickens",
          path: "/PetAnimalsComp?subCatgory=Chickens",
          subSubcategories: [
            {
              name: "Brahma Chickens",
              // path: "/PetAnimalsComp/Chickens/BrahmaChickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Brahma Chickens",
            },
            {
              name: "Local Chickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Local Chickens",
            },
            {
              name: "Turkish Chickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Turkish Chickens",
            },
            {
              name: "Turkey Chickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Turkey Chickens",
            },
            {
              name: "Persian Chickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Persian Chickens",
            },
            {
              name: "French Chickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=French Chickens",
            },
            {
              name: "Fayoumi Chickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Fayoumi Chickens",
            },
            {
              name: "Pakistani Chickens",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Pakistani Chickens",
            },
            {
              name: "Poultry Supplies",
              path: "/PetAnimalsComp?subCatgory=Chickens&NestedSubCategory=Poultry Supplies",
            },
          ],
        },
        {
          name: "Camels",
          path: "/PetAnimalsComp?subCatgory=Camels",
          subSubcategories: [
            {
              name: "Bakar Camels",
              // path: "/PetAnimalsComp/Camels/BakarCamels",
              path: "/PetAnimalsComp?subCatgory=Camels&NestedSubCategory=Bakar Camels",
            },
            {
              name: "Stud Camels",
              path: "/PetAnimalsComp?subCatgory=Camels&NestedSubCategory=Stud Camels",
            },
            {
              name: "Camel Stallions",
              path: "/PetAnimalsComp?subCatgory=Camels&NestedSubCategory=Camel Stallions",
            },
            {
              name: "Female Camels",
              path: "/PetAnimalsComp?subCatgory=Camels&NestedSubCategory=FemaleCamels",
            },
            {
              name: "Camel Supplies",
              path: "/PetAnimalsComp?subCatgory=Camels&NestedSubCategory=Camel Supplies",
            },
          ],
        },
        {
          name: "Horses",
          path: "/PetAnimalsComp?subCatgory=Horses",
          subSubcategories: [
            {
              name: "Popular Horses",
              // path: "/PetAnimalsComp/Horses/PopularHorses",
              path: "/PetAnimalsComp?subCatgory=Horses&NestedSubCategory=Popular Horses",
            },
            {
              name: "Mixed Horses",
              path: "/PetAnimalsComp?subCatgory=Horses&NestedSubCategory=Mixed Horses",
            },
            {
              name: "Wahho Horses",
              path: "/PetAnimalsComp?subCatgory=Horses&NestedSubCategory=Wahho Horses",
            },
            {
              name: "English Horses",
              path: "/PetAnimalsComp?subCatgory=Horses&NestedSubCategory=English Horses",
            },
            {
              name: "Horse Supplies",
              path: "/PetAnimalsComp?subCatgory=Horses&NestedSubCategory=Horse Supplies",
            },
          ],
        },
        {
          name: "Dogs",
          path: "/PetAnimalsComp?subCatgory=Dogs",
          subSubcategories: [
            // { name: "Pitbull Dogs", path: "/PetAnimalsComp/Dogs/PitbullDogs" },
            {
              name: "Pitbull Dogs",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=Pitbull Dogs",
            },

            {
              name: "Pomeranian Dogs",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=Pomeranian Dogs",
            },
            {
              name: "Golden Retriever Dogs",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=Golden Retriever Dogs",
            },
            {
              name: "German Shepherd Dogs",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=German Shepherd Dogs",
            },
            {
              name: "Shih Tzu Dog",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=ShihTzu Dog",
            },
            {
              name: "Chihuahua Dog",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=Chihuahua Dog",
            },
            {
              name: "Maltese Dog",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=Maltese Dog",
            },
            {
              name: "Husky Dog",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=Husky Dog",
            },
            {
              name: "Dog Supplies",
              path: "/PetAnimalsComp?subCatgory=Dogs&NestedSubCategory=Dog Supplies",
            },
          ],
        },
        {
          name: "Cows",
          path: "/PetAnimalsComp?subCatgory=Cows",
          subSubcategories: [
            {
              name: "German Cows",
              path: "/PetAnimalsComp?subCatgory=Cows&NestedSubCategory=German Cows",
            },
            {
              name: "Local Cows",
              path: "/PetAnimalsComp?subCatgory=Cows&NestedSubCategory=Local Cows",
            },
            {
              name: "Jersey Cows",
              path: "/PetAnimalsComp?subCatgory=Cows&NestedSubCategory=Jersey Cows",
            },
            {
              name: "Swiss Cows",
              path: "/PetAnimalsComp?subCatgory=Cows&NestedSubCategory=Swiss Cows",
            },
            {
              name: "Dutch Cows",
              path: "/PetAnimalsComp?subCatgory=Cows&NestedSubCategory=Dutch Cows",
            },
            {
              name: "Dairy Products",
              path: "/PetAnimalsComp?subCatgory=Cows&NestedSubCategory=Dairy Products",
            },
          ],
        },
        {
          name: "Fish & Turtles",
          path: "/PetAnimalsComp?subCatgory=Fish & Turtles",
        },
        { name: "Rabbits", path: "/PetAnimalsComp?subCatgory=Rabbits" },

        {
          name: "Ducks",
          path: "/PetAnimalsComp?subCatgory=Ducks",
          subSubcategories: [
            // { name: "Bikini Ducks", path: "/PetAnimalsComp/Ducks/BikiniDucks" },
            {
              name: "Bikini Ducks",
              path: "/PetAnimalsComp?subCatgory=Ducks&NestedSubCategory=Bikini Ducks",
            },

            {
              name: "Sharshari Ducks",
              path: "/PetAnimalsComp?subCatgory=Ducks&NestedSubCategory=Sharshari Ducks",
            },
            {
              name: "Geese",
              path: "/PetAnimalsComp?subCatgory=Ducks&NestedSubCategory=Geese",
            },
            {
              name: "Fish",
              path: "/PetAnimalsComp?subCatgory=Ducks&NestedSubCategory=Fish",
            },
            {
              name: "Bikini Ducks",
              path: "/PetAnimalsComp?subCatgory=Ducks&NestedSubCategory=Bikini Ducks",
            },
          ],
        },
        {
          name: "Squirrels",
          path: "/PetAnimalsComp?subCatgory=Squirrels",
          subSubcategories: [
            // { name: "Turtles", path: "/PetAnimalsComp/Squirrels/Turtles" },
            {
              name: "Turtles",
              path: "/PetAnimalsComp?subCatgory=Squirrels&NestedSubCategory=Turtles",
            },

            {
              name: "Sharshari Ducks",
              path: "/PetAnimalsComp?subCatgory=Squirrels&NestedSubCategory=Sharshari Ducks",
            },
          ],
        },

        {
          name: "Hamsters",
          path: "/PetAnimalsComp?subCatgory=Hamsters",
          subSubcategories: [
            {
              name: "Geese",
              path: "/PetAnimalsComp?subCatgory=Hamsters&NestedSubCategory=Geese",
            },
          ],
        },
        { name: "Fur", path: "/PetAnimalsComp?subCatgory=Fur" },
      ],
    },
    {
      name: "Other",
      path: "/Education",
      subcategories: [
        {
          name: "Hunting & Trips",
          path: "/Education?subCatgory=Hunting & Trips",
        },
        {
          name: "Gardening & Agriculture",
          path: "/Education?subCatgory=Gardening & Agriculture",
        },
        {
          name: "Parties & Events",
          path: "/Education?subCatgory=Parties & Events",
        },
        {
          name: "Travel & Tourism",
          path: "/Education?subCatgory=Travel & Tourism",
        },
        { name: "Roommate", path: "/Education?subCatgory=Roommate" },
        { name: "Lost & Found", path: "/Education?subCatgory=Lost & Found" },
        {
          name: "Education & Training",
          path: "/Education?subCatgory=Education & Training",
        },
        {
          name: "Sports Training",
          path: "/Education?subCatgory=Sports Training",
        },
        {
          name: "Stock & Forex Education",
          path: "/Education?subCatgory=Stock & Forex Education",
        },
        {
          name: "Driving Lessons",
          path: "/Education?subCatgory=Driving Lessons",
        },
        {
          name: "Private Tutoring",
          path: "/Education?subCatgory=Private Tutoring",
        },
        {
          name: "Training Courses",
          path: "/Education?subCatgory=Training Courses",
        },
        {
          name: "Antiques & Collectibles",
          path: "/Education?subCatgory=Antiques & Collectibles",
        },
        {
          name: "Projects & Investments",
          path: "/Education?subCatgory=Projects & Investments",
        },
        { name: "Books & Arts", path: "/Education?subCatgory=Books&Arts" },
        {
          name: "Programming & Design",
          path: "/Education?subCatgory=Programming & Design",
        },
        {
          name: "Food & Beverages",
          path: "/Education?subCatgory=Food & Beverages",
        },
      ],
    },
    {
      name: "Commercial",
      path: "/CommercialAdscom",
    },
  ];
  const updatedCategories = categories.map((category) => {
    switch (category.name) {
      case "Automotive":
        return {
          ...category,
          name: OurCategoryAutomativeTitle, // Keep null until data is fetched
        };
      case "Electronics":
        return {
          ...category,
          name: ElectronicsTitle,
        };
      case "Fashion Style":
        return {
          ...category,
          name: FashionStyleTitle,
        };
      case "Home & Furniture":
        return {
          ...category,
          name: OurCategoryHealthCareTitle,
        };
      case "Job Board":
        return {
          ...category,
          name: OurCategoryJobBoardTitle,
        };
      case "Real Estate":
        return {
          ...category,
          name: OurCategoryRealEstateTitle,
        };
      case "Services":
        return {
          ...category,
          name: OurCategoryTravelTitle,
        };
      case "Sport & Games":
        return {
          ...category,
          name: OurCategorySportGamesTitle,
        };
      case "Pet & Animals":
        return {
          ...category,
          name: OurCategoryPetAnimalsTitle,
        };
      case "Other":
        return {
          ...category,
          name: OurCategoryEducationTitle,
        };
      case "Commercial":
        return {
          ...category,
          name: "Commercial",
        };
      default:
        return category;
    }
  });

  console.log(updatedCategories, "updatedCategories");
  if (isMobile) {
    return null;
  }

  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        {updatedCategories.map((category, index) => (
          <div
            key={index}
            className="nav-link-wrapper"
            onMouseEnter={() => setOpenDropdown(category.name)}
            onMouseLeave={() => {
              setOpenDropdown(null);
              setOpenSubDropdown(null);
            }}
          >
            <NavLink
              to={category.path}
              className={({ isActive }) =>
                isActive || location.pathname.includes(category.path)
                  ? "nav-link active-link"
                  : "nav-link"
              }
            >
              {category.name}
            </NavLink>
            {openDropdown === category.name &&
              category.subcategories?.length > 0 && (
                <div className="mega-menu">
                  <ul
                    className={`submenu-list ${
                      category.name === "Real Estate"
                        ? "real-estate-scroll"
                        : ""
                    }`}
                  >
                    {category.subcategories?.map((subcategory) => (
                      <li
                        key={subcategory.name}
                        className="submenu-item"
                        onMouseEnter={() =>
                          setOpenSubDropdown(subcategory.name)
                        }
                        onMouseLeave={() => setOpenSubDropdown(null)}
                      >
                        <NavLink
                          to={subcategory.path}
                          className={({ isActive }) =>
                            isActive
                              ? "submenu-link active-link"
                              : "submenu-link"
                          }
                        >
                          {subcategory.name}
                          {subcategory.subSubcategories && (
                            <span className="arrow"> </span>
                          )}
                        </NavLink>
                        {subcategory.subSubcategories &&
                          openSubDropdown === subcategory.name && (
                            <div className="sub-submenu">
                              <ul className="submenu-list">
                                {subcategory.subSubcategories?.map(
                                  (subSubcategory) => (
                                    <li
                                      key={subSubcategory.name}
                                      className="submenu-item"
                                    >
                                      <NavLink
                                        to={subSubcategory.path}
                                        className={({ isActive }) =>
                                          isActive
                                            ? "submenu-link active-link"
                                            : "submenu-link"
                                        }
                                      >
                                        {subSubcategory.name}
                                      </NavLink>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default HeaderLower;
