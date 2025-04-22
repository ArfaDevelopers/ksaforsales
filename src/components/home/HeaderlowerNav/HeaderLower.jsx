import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const HeaderLower = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const location = useLocation();

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };

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
          path: "/AutomotiveComp?subCatgory=CarsForSale",
        },
        { name: "Car Rental", path: "/AutomotiveComp?subCatgory=CarRental" },
        {
          name: "Plates Number",
          path: "/AutomotiveComp?subCatgory=PlatesNumber",
        },
        {
          name: "Spare Parts",
          path: "/AutomotiveComp?subCatgory=SpareParts",
          subSubcategories: [
            {
              name: "Body Parts",
              // path: "/AutomotiveComp/SpareParts?NestedSubCategory=BodyParts",
              path: "/AutomotiveComp?NestedSubCategory=BodyParts",
            },
            {
              name: "Mechanical Parts",
              path: "/AutomotiveComp?NestedSubCategory=MechanicalParts",
            },
            {
              name: "Spare Parts",
              path: "/AutomotiveComp?NestedSubCategory=SpareParts",
            },
            {
              name: "Batteries",
              path: "/AutomotiveComp/?NestedSubCategory=Batteries",
            },
            {
              name: "Others",
              path: "/AutomotiveComp/?NestedSubCategory=Others",
            },
          ],
        },
        { name: "Accessories", path: "/AutomotiveComp?subCatgory=Accessories" },
        {
          name: "Wheels & Rims",
          path: "/AutomotiveComp?subCatgory=WheelsRims",
        },
        {
          name: "Trucks & Heavy Machinery",
          path: "/AutomotiveComp?subCatgory=TrucksHeavyMachinery",
          subSubcategories: [
            {
              name: "Trucks",
              path: "/AutomotiveComp?NestedSubCategory=Trucks",
              // path: "/AutomotiveComp/TrucksHeavyMachinery/Trucks",
            },
            {
              name: "Dump Truck",
              path: "/AutomotiveComp?NestedSubCategory=DumpTruck",
            },
            {
              name: "Wheel Loader",
              path: "/AutomotiveComp?NestedSubCategory=WheelLoader",
            },
            {
              name: "Recovery",
              path: "/AutomotiveComp?NestedSubCategory=Recovery",
            },
            {
              name: "Agricultural Equipment",
              path: "/AutomotiveComp?NestedSubCategory=AgriculturalEquipment",
            },
            {
              name: "Crane",
              path: "/AutomotiveComp?NestedSubCategory=Crane",
            },
            {
              name: "Bulldozer",
              path: "/AutomotiveComp?NestedSubCategory=Bulldozer",
            },
            {
              name: "Crusher",
              path: "/AutomotiveComp?NestedSubCategory=Crusher",
            },
            {
              name: "Excavator",
              path: "/AutomotiveComp?NestedSubCategory=Excavator",
            },
            {
              name: "Heavy Equipment",
              path: "/AutomotiveComp?NestedSubCategory=HeavyEquipment",
            },
          ],
        },
        { name: "Tshaleeh", path: "/AutomotiveComp?subCatgory=Tshaleeh" },
        {
          name: "Boats & Jet Ski",
          path: "/AutomotiveComp?subCatgory=BoatsJetSki",
          subSubcategories: [
            {
              name: "Motorboats",
              path: "/AutomotiveComp?NestedSubCategory=Motorboats",
              // path: "/AutomotiveComp/BoatsJetSki/Motorboats",
            },
            {
              name: "Jet-ski",
              path: "/AutomotiveComp?NestedSubCategory=Jet-ski",
            },
            {
              name: "Others",
              path: "/AutomotiveComp?NestedSubCategory=Others",
            },
          ],
        },
        {
          name: "Classic Cars",
          path: "/AutomotiveComp?subCatgory=ClassicCars",
        },
        {
          name: "Salvage Cars",
          path: "/AutomotiveComp?subCatgory=SalvageCars",
        },
        {
          name: "Mortgaged Cars",
          path: "/AutomotiveComp?subCatgory=MortgagedCars",
        },
        { name: "Recovery", path: "/AutomotiveComp?subCatgory=Recovery" },
        { name: "Food Truck", path: "/AutomotiveComp?subCatgory=FoodTruck" },
        { name: "Caravans", path: "/AutomotiveComp?subCatgory=Caravans" },
        { name: "Reports", path: "/AutomotiveComp?subCatgory=Reports" },
        {
          name: "Car Cleaning",
          path: "/AutomotiveComp?subCatgory=CarCleaning",
        },
      ],
    },
    {
      name: "Electronics",
      path: "/ElectronicComp",
      subcategories: [
        {
          name: "Mobile Phones",
          path: "/ElectronicComp?subCatgory=MobilePhones",
          subSubcategories: [
            {
              name: "Smart Watches",
              // path: "/ElectronicComp/MobilePhones/SmartWatches",
              path: "/ElectronicComp?NestedSubCategory=SmartWatches",
            },
            {
              name: "Headsets",
              path: "/ElectronicComp?NestedSubCategory=Headsets",
            },
            {
              name: "Chargers & Cables",
              path: "/ElectronicComp?NestedSubCategory=Chargers&Cables",
            },
            {
              name: "Covers & Protectors",
              path: "/ElectronicComp?NestedSubCategory=Covers&Protectors",
            },
          ],
        },
        {
          name: "Tablet Devices",
          path: "/ElectronicComp?subCatgory=TabletDevices",
          subSubcategories: [
            // { name: "iPad", path: "/ElectronicComp/TabletDevices/iPad" },
            { name: "iPad", path: "/ElectronicComp?NestedSubCategory=iPad" },

            {
              name: "Galaxy Tab",
              path: "/ElectronicComp?NestedSubCategory=GalaxyTab",
            },
          ],
        },

        {
          name: "Computers & Laptops",
          path: "/ElectronicComp?subCatgory=Computers&Laptops",
        },
        {
          name: "Video Games",
          path: "/ElectronicComp?subCatgory=VideoGames",
          subSubcategories: [
            {
              name: "VR Glasses",
              // path: "/ElectronicComp/VideoGames/VRGlasses",
              path: "/ElectronicComp?NestedSubCategory=VRGlasses",
            },
            {
              name: "PlayStation (PS) Devices",
              path: "/ElectronicComp?NestedSubCategory=PlayStationDevices",
            },
            {
              name: "PlayStation (PS) Games",
              path: "/ElectronicComp?NestedSubCategory=PlayStationGames",
            },
            {
              name: "Xbox Devices",
              path: "/ElectronicComp?NestedSubCategory=XboxDevices",
            },
            {
              name: "Xbox Games",
              path: "/ElectronicComp?NestedSubCategory=XboxGames",
            },
            {
              name: "Nintendo",
              path: "/ElectronicComp?NestedSubCategory=Nintendo",
            },
          ],
        },
        {
          name: "Television & Audio System",
          path: "/ElectronicComp?subCatgory=Television&AudioSystem",
        },
        {
          name: "Accounts & Subscriptions",
          path: "/ElectronicComp?subCatgory=Accounts&Subscriptions",
          subSubcategories: [
            {
              name: "PUBG",
              // path: "/ElectronicComp/Accounts&Subscriptions/PUBG",
              path: "/ElectronicComp?NestedSubCategory=PUBG",
            },
            {
              name: "Fortnite",
              path: "/ElectronicComp?NestedSubCategory=Fortnite",
            },
            {
              name: "FIFA",
              path: "/ElectronicComp?NestedSubCategory=FIFA",
            },
            {
              name: "Clash of Clans",
              path: "/ElectronicComp?NestedSubCategory=ClashofClans",
            },
            {
              name: "Clash Royale",
              path: "/ElectronicComp?NestedSubCategory=ClashRoyale",
            },
            {
              name: "Instagram Accounts",
              path: "/ElectronicComp?NestedSubCategory=InstagramAccounts",
            },
            {
              name: "Twitter Accounts",
              path: "/ElectronicComp?NestedSubCategory=TwitterAccounts",
            },
            {
              name: "TikTok Accounts",
              path: "/ElectronicComp?NestedSubCategory=TikTokAccounts",
            },
            {
              name: "Snapchat Accounts",
              path: "/ElectronicComp?NestedSubCategory=SnapchatAccounts",
            },
            {
              name: "Facebook Accounts",
              path: "/ElectronicComp?NestedSubCategory=FacebookAccounts",
            },
            {
              name: "YouTube Accounts",
              path: "/ElectronicComp?NestedSubCategory=YouTubeAccounts",
            },
            {
              name: "Other Accounts",
              path: "/ElectronicComp?NestedSubCategory=OtherAccounts",
            },
          ],
        },
        {
          name: "Special Number",
          path: "/ElectronicComp?subCatgory=SpecialNumber",
          subSubcategories: [
            // { name: "STC", path: "/ElectronicComp/SpecialNumber/STC" },
            { name: "STC", path: "/ElectronicComp?NestedSubCategory=STC" },

            {
              name: "Mobily",
              path: "/ElectronicComp?NestedSubCategory=Mobily",
            },
            { name: "Zain", path: "/ElectronicComp?NestedSubCategory=Zain" },
          ],
        },
        {
          name: "Home & Kitchen Appliance",
          path: "/ElectronicComp?subCatgory=Home&KitchenAppliance",
          subSubcategories: [
            {
              name: "Stoves & Ovens",
              // path: "/ElectronicComp/Home&KitchenAppliance/Stoves&Ovens",
              path: "/ElectronicComp?NestedSubCategory=Stoves&Ovens",
            },
            {
              name: "Refrigerators & Coolers",
              path: "/ElectronicComp?NestedSubCategory=Refrigerators&Coolers",
            },
            {
              name: "Mixers & Blenders",
              path: "/ElectronicComp?NestedSubCategory=Mixers&Blenders",
            },
            {
              name: "Washing Machines",
              path: "/ElectronicComp?NestedSubCategory=WashingMachines",
            },
            {
              name: "Kettles",
              path: "/ElectronicComp?NestedSubCategory=Kettles",
            },
            {
              name: "Fryers",
              path: "/ElectronicComp?NestedSubCategory=Fryers",
            },
            {
              name: "Coffee Machines",
              path: "/ElectronicComp?NestedSubCategory=CoffeeMachines",
            },
            {
              name: "Microwaves & Toasters",
              path: "/ElectronicComp?NestedSubCategory=MicrowavesS&Toasters",
            },
            {
              name: "Vacuum Cleaners",
              path: "/ElectronicComp?NestedSubCategory=VacuumCleaners",
            },
            {
              name: "Clothing Irons",
              path: "/ElectronicComp?NestedSubCategory=ClothingIrons",
            },
            {
              name: "Air Conditioners",
              path: "/ElectronicComp?NestedSubCategory=AirConditioners",
            },
          ],
        },
        {
          name: "Motors & Generators",
          path: "/ElectronicComp?subCatgory=Motors&Generators",
        },
        {
          name: "Cameras",
          path: "/ElectronicComp?subCatgory=Cameras",
          subSubcategories: [
            // { name: "Lenses", path: "/ElectronicComp/Cameras/Lenses" },
            {
              name: "Lenses",
              path: "/ElectronicComp?NestedSubCategory=Lenses",
            },

            { name: "Drone", path: "/ElectronicComp?NestedSubCategory=Drone " },
            {
              name: "Camera Accessories",
              path: "/ElectronicComp?NestedSubCategory=CameraAccessories",
            },
          ],
        },

        {
          name: "Networking Devices",
          path: "/ElectronicComp?subCatgory=NetworkingDevices",
        },
        {
          name: "Screens & Projectors",
          path: "/ElectronicComp?subCatgory=Screens&Projectors",
        },
        {
          name: "Printer & Scanner",
          path: "/ElectronicComp?subCatgory=Printer&Scanner",
        },
        {
          name: "Computer Accessories",
          path: "/ElectronicComp?subCatgory=ComputerAccessories",
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
              path: "/FashionStyle?NestedSubCategory=OtherWatches",
            },
            {
              name: "Men's Watches",
              path: "/FashionStyle?NestedSubCategory=Men'sWatches",
            },
            {
              name: "Women's Watches",
              path: "/FashionStyle?NestedSubCategory=Women'sWatches",
            },
          ],
        },
        {
          name: "Perfumes & Incense",
          path: "/FashionStyle?subCatgory=Perfumes&Incense",
          subSubcategories: [
            {
              name: "Other Perfumes",
              path: "/FashionStyle?NestedSubCategory=OtherPerfumes",
              // path: "/FashionStyle/Perfumes&Incense/OtherPerfumes",
            },
            {
              name: "Men's Perfumes",
              path: "/FashionStyle?NestedSubCategory=Men'sPerfumes",
            },
            {
              name: "Women's Perfumes",
              path: "/FashionStyle?NestedSubCategory=Women'sPerfumes",
            },
            {
              name: "Oud & Incense",
              path: "/FashionStyle?NestedSubCategory=Oud&Incense",
            },
          ],
        },
        {
          name: "Sports Equipment",
          path: "/FashionStyle?subCatgory=SportsEquipment",
          subSubcategories: [
            {
              name: "Eyeglasses",
              // path: "/FashionStyle/SportsEquipment/Eyeglasses",
              path: "/FashionStyle?NestedSubCategory=Eyeglasses",
            },
            {
              name: "Other Eyeglasses",
              path: "/FashionStyle?NestedSubCategory=OtherEyeglasses",
            },
            {
              name: "Men's Eyeglasses",
              path: "/FashionStyle?NestedSubCategory=Men'sEyeglasses",
            },
            {
              name: "HeadsWomen's Eyeglassesets",
              path: "/FashionStyle?NestedSubCategory=Women'sEyeglasses",
            },
          ],
        },
        {
          name: "Men's Fashion",
          path: "/FashionStyle?subCatgory=Men'sFashion",
          subSubcategories: [
            {
              name: "Men's Shemaghs",
              // path: "/FashionStyle/Men'sFashion/Men'sShemaghs",
              path: "/FashionStyle?subCatgory=Men'sShemaghs",
            },
            {
              name: "Men's Accessories",
              path: "/FashionStyle?subCatgory=Men'sAccessories",
            },
            {
              name: "Men's Clothing",
              path: "/FashionStyle?subCatgory=Men'sClothing",
            },
            {
              name: "Men's Jackets",
              path: "/FashionStyle?subCatgory=Men'sJackets",
            },
            {
              name: "Men's Bags",
              path: "/FashionStyle?subCatgory=Men'sBags",
            },
            {
              name: "Men's Shirts & Trousers",
              path: "/FashionStyle?subCatgory=Men'sShirts&Trousers",
            },
            {
              name: "Men's Sportswear",
              path: "/FashionStyle?subCatgory=Men'sSportswear",
            },
          ],
        },
        {
          name: "Women's Fashion",
          path: "/FashionStyle?subCatgory=Women'sFashion",
          subSubcategories: [
            {
              name: "Women's Accessories & Jewelry",
              // path: "/FashionStyle/Women'sFashion/Women'sAccessories&Jewelry",
              path: "/FashionStyle?NestedSubCategory=Women'sAccessories&Jewelry",
            },
            {
              name: "Women's Blouses & T-Shirts",
              path: "/FashionStyle?NestedSubCategory=Women'sBlouses&T-Shirts",
            },
            {
              name: "Women's Skirts & Trousers",
              path: "/FashionStyle?NestedSubCategory=Women'sSkirts&Trousers",
            },
            {
              name: "Women's Jackets",
              path: "/FashionStyle?NestedSubCategory=Women'sJackets",
            },
            {
              name: "Kaftans",
              path: "/FashionStyle?NestedSubCategory=Kaftans",
            },
            {
              name: "Women's Bags",
              path: "/FashionStyle?NestedSubCategory=Women'sBags",
            },
            { name: "Abayas", path: "/FashionStyle?NestedSubCategory=Abayas" },
            {
              name: "Dresses",
              path: "/FashionStyle?NestedSubCategory=Dresses",
            },
            {
              name: "Lingerie",
              path: "/FashionStyle?NestedSubCategory=Lingerie",
            },
            {
              name: "Women's Sportswear",
              path: "/FashionStyle?NestedSubCategory=Women'sSportswear",
            },
          ],
        },
        {
          name: "Children's Clothing & Accessories",
          path: "/FashionStyle?subCatgory=Children'sClothing&Accessories",
          subSubcategories: [
            {
              name: "Baby Care Products",
              // path: "/FashionStyle/Children'sClothing&Accessories/BabyCareProducts",
              path: "/FashionStyle?NestedSubCategory=BabyCareProducts",
            },
            {
              name: "Children's Accessories",
              path: "/FashionStyle?NestedSubCategory=Children'sAccessories",
            },
            {
              name: "Toys for Kids",
              path: "/FashionStyle?NestedSubCategory=ToysforKids",
            },
            {
              name: "Children's Cribs & Chairs",
              path: "/FashionStyle?NestedSubCategory=Children'sCribs&Chairs",
            },
            {
              name: "Children's Bags",
              path: "/FashionStyle?NestedSubCategory=Children'sBags",
            },
            {
              name: "Strollers",
              path: "/FashionStyle?NestedSubCategory=Strollers",
            },
            {
              name: "Car Seats for Kids",
              path: "/FashionStyle?NestedSubCategory=CarSeatsforKids",
            },
            {
              name: "Girls' Clothing",
              path: "/FashionStyle?NestedSubCategory=Girls'Clothing",
            },
            {
              name: "Boys' Clothing",
              path: "/FashionStyle?NestedSubCategory=Boys'Clothing",
            },
          ],
        },
        { name: "Sleepwear", path: "/FashionStyle?subCatgory=Sleepwear" },
        { name: "Gifts", path: "/FashionStyle?subCatgory=Gifts" },
        { name: "Luggage", path: "/FashionStyle?subCatgory=Luggage" },
        {
          name: "Health & Beauty",
          path: "/FashionStyle?subCatgory=Health&Beauty",
          subSubcategories: [
            // { name: "Skincare", path: "/FashionStyle/Health&Beauty/Skincare" },
            {
              name: "Skincare",
              path: "/FashionStyle?NestedSubCategory=Skincare",
            },

            {
              name: "Hair Care",
              path: "/FashionStyle?NestedSubCategory=HairCare",
            },
            { name: "Makeup", path: "/FashionStyle?NestedSubCategory=Makeup" },
            {
              name: "Other Beauty Products",
              path: "/FashionStyle?NestedSubCategory=OtherBeautyProducts",
            },
          ],
        },
      ],
    },
    {
      name: "Home & Furnituer",
      path: "/HealthCareComp",
      subcategories: [
        {
          name: "Outdoor Furniture",
          path: "/HealthCareComp?subCatgory=OutdoorFurniture",
        },
        {
          name: "Majlis & Sofas",
          path: "/HealthCareComp?subCatgory=Majlis&Sofas",
        },
        {
          name: "Cabinets & Wardrobes",
          path: "/HealthCareComp?subCatgory=Cabinets&Wardrobes",
        },
        {
          name: "Beds & Mattresses",
          path: "/HealthCareComp?subCatgory=Beds&Mattresses",
        },
        {
          name: "Tables & Chairs",
          path: "/HealthCareComp?subCatgory=Tables&Chairs",
        },
        { name: "Kitchens", path: "/HealthCareComp?subCatgory=Kitchens" },
        { name: "Bathrooms", path: "/HealthCareComp?subCatgory=Bathrooms" },
        { name: "Carpets", path: "/HealthCareComp?subCatgory=Carpets" },
        { name: "Curtains", path: "/HealthCareComp?subCatgory=Curtains" },
        {
          name: "Decoration & Accessories",
          path: "/HealthCareComp?subCatgory=Decoration&Accessories",
        },
        { name: "Lighting", path: "/HealthCareComp?subCatgory=Lighting" },
        {
          name: "Household Items",
          path: "/HealthCareComp?subCatgory=HouseholdItems",
        },
        {
          name: "Garden - Plants",
          path: "/HealthCareComp?subCatgory=GardenPlants",
        },
        {
          name: "Office Furniture",
          path: "/HealthCareComp?subCatgory=OfficeFurniture",
        },
        {
          name: "Doors - Windows - Aluminium",
          path: "/HealthCareComp?subCatgory=DoorsWindowsAluminium",
        },
        {
          name: "Tiles & Flooring",
          path: "/HealthCareComp?subCatgory=Tiles&Flooring",
        },
      ],
    },
    {
      name: "Job Board",
      path: "/JobBoard",
      subcategories: [
        {
          name: "Administrative Jobs",
          path: "/JobBoard?subCatgory=AdministrativeJobs",
          subSubcategories: [
            {
              name: "Marketing & Sales",
              // path: "/JobBoard/AdministrativeJobs/Marketing&Sales",
              path: "/JobBoard?NestedSubCategory=Marketing&Sales",
            },
            {
              name: "Customer Service",
              path: "/JobBoard?NestedSubCategory=CustomerService",
            },
            {
              name: "Secretary",
              path: "/JobBoard?NestedSubCategory=Secretary",
            },
            {
              name: "Tourism & Hospitality",
              path: "/JobBoard?NestedSubCategory=Tourism&Hospitality",
            },
            {
              name: "Accountant",
              path: "/JobBoard?NestedSubCategory=Accountant",
            },
            {
              name: "Delivery Representative",
              path: "/JobBoard?NestedSubCategory=DeliveryRepresentative",
            },
            {
              name: "Other Administrative Jobs",
              path: "/JobBoard?NestedSubCategory=OtherAdministrativeJobs",
            },
            {
              name: "Public Relations & Media",
              path: "/JobBoard?NestedSubCategory=PublicRelations&Media",
            },
            {
              name: "Translator",
              path: "/JobBoard?NestedSubCategory=Translator",
            },
            {
              name: "Lawyer & Legal Jobs",
              path: "/JobBoard?NestedSubCategory=Lawyer&LegalJobs",
            },
          ],
        },
        {
          name: "Fashion & Beauty Jobs",
          path: "/JobBoard?subCatgory=Fashion&BeautyJobs",
          subSubcategories: [
            // { name: "Tailor", path: "/JobBoard/Fashion&BeautyJobs/Tailor" },
            { name: "Tailor", path: "/JobBoard?NestedSubCategory=Tailor" },

            {
              name: "Female Hairdresser",
              path: "/JobBoard?NestedSubCategory=FemaleHairdresser",
            },
            {
              name: "Fashion Designer",
              path: "/JobBoard?NestedSubCategory=FashionDesigner",
            },
            { name: "Model", path: "/JobBoard?NestedSubCategory=Model" },
            {
              name: "Makeup Artist",
              path: "/JobBoard?NestedSubCategory=MakeupArtist",
            },
            {
              name: "Hair Stylist",
              path: "/JobBoard?NestedSubCategory=HairStylist",
            },
            {
              name: "Other Beauty Jobs",
              path: "/JobBoard?NestedSubCategory=OtherBeautyJobs",
            },
          ],
        },
        {
          name: "Security & Safety Jobs",
          path: "/JobBoard?subCatgory=Security&SafetyJobs",
          subSubcategories: [
            {
              name: "Security Guard",
              // path: "/JobBoard/Security&SafetyJobs/SecurityGuard",
              path: "/JobBoard?NestedSubCategory=SecurityGuard",
            },
            {
              name: "Safety Technician",
              path: "/JobBoard?NestedSubCategory=SafetyTechnician",
            },
          ],
        },
        { name: "Teaching Jobs", path: "/JobBoard?subCatgory=TeachingJobs" },

        {
          name: "IT & Design Jobs",
          path: "/JobBoard?subCatgory=IT&DesignJobs",
          subSubcategories: [
            {
              name: "Other IT Jobs",
              // path: "/JobBoard/IT&DesignJobs/OtherITJobs",
              path: "/JobBoard?NestedSubCategory=OtherITJobs",
            },
            {
              name: "Network & Telecommunications Specialist",
              path: "/JobBoard?NestedSubCategory=Network&TelecommunicationsSpecialist",
            },
            {
              name: "Content Writer",
              path: "/JobBoard?NestedSubCategory=ContentWriter",
            },
            {
              name: "Programmer",
              path: "/JobBoard?NestedSubCategory=Programmer",
            },
            {
              name: "Media Designer",
              path: "/JobBoard?NestedSubCategory=MediaDesigner",
            },
          ],
        },
        {
          name: "Agriculture & Farming Jobs",
          // path: "/JobBoard/Agriculture&FarmingJobs",
          path: "/JobBoard?subCatgory=Agriculture&FarmingJobs",

          subSubcategories: [
            {
              name: "Farm Worker",
              path: "/JobBoard?NestedSubCategory=FarmWorker",
            },
            {
              name: "Other Agricultural Jobs",
              path: "/JobBoard?NestedSubCategory=OtherAgriculturalJobs",
            },
          ],
        },
        {
          name: "Industrial Jobs",
          path: "/JobBoard?subCatgory=IndustrialJobs",
          subSubcategories: [
            {
              name: "Bodywork Technician",
              path: "/JobBoard?NestedSubCategory=BodyworkTechnician",
            },
            {
              name: "Auto Electrician",
              path: "/JobBoard?NestedSubCategory=AutoElectrician",
            },
            {
              name: "Car Mechanic",
              path: "/JobBoard?NestedSubCategory=CarMechanic",
            },
            {
              name: "Other Industrial Jobs",
              path: "/JobBoard?NestedSubCategory=OtherIndustrialJobs",
            },
          ],
        },
        {
          name: "Medical & Nursing Jobs",
          path: "/JobBoard?subCatgory=Medical&NursingJobs",
          subSubcategories: [
            {
              name: "Pharmacist",
              // path: "/JobBoard/Medical&NursingJobs/Pharmacist",
              path: "/JobBoard?NestedSubCategory=Pharmacist",
            },
            { name: "Doctor", path: "/JobBoard?NestedSubCategory=Doctor" },
            {
              name: "Physical Therapy Technician",
              path: "/JobBoard?NestedSubCategory=PhysicalTherapyTechnician",
            },
            {
              name: "Massage Therapist",
              path: "/JobBoard?NestedSubCategory=MassageTherapist",
            },
            { name: "Nurse", path: "/JobBoard?NestedSubCategory=Nurse" },
            {
              name: "Other Medical Jobs",
              path: "/JobBoard?NestedSubCategory=OtherMedicalJobs",
            },
          ],
        },
        {
          name: "Architecture & Construction Jobs",
          path: "/JobBoard?subCatgory=Architecture&ConstructionJobs",
          subSubcategories: [
            {
              name: "Building Painter",
              // path: "/JobBoard/Architecture&ConstructionJobs/BuildingPainter",
              path: "/JobBoard?NestedSubCategory=BuildingPainter",
            },
            {
              name: "AC Technician",
              path: "/JobBoard?NestedSubCategory=ACTechnician",
            },
            {
              name: "Decorator",
              path: "/JobBoard?NestedSubCategory=Decorator",
            },
            {
              name: "Building Electrician",
              path: "/JobBoard?NestedSubCategory=BuildingElectrician",
            },
            {
              name: "Tiler",
              path: "/JobBoard?NestedSubCategory=Tiler",
            },
            {
              name: "Building Supervisor",
              path: "/JobBoard?NestedSubCategory=BuildingSupervisor",
            },
            {
              name: "Building Contractor",
              path: "/JobBoard?NestedSubCategory=BuildingContractor",
            },
            {
              name: "Plasterer",
              path: "/JobBoard?NestedSubCategory=Plasterer",
            },
            {
              name: "Carpenter",
              path: "/JobBoard?NestedSubCategory=Carpenter",
            },
            {
              name: "Other Construction Jobs",
              path: "/JobBoard?NestedSubCategory=OtherConstructionJobs",
            },
            {
              name: "Plumber",
              path: "/JobBoard?NestedSubCategory=Plumber",
            },
          ],
        },
        {
          name: "Housekeeping Jobs",
          path: "/JobBoard?subCatgory=HousekeepingJobs",
          subSubcategories: [
            {
              name: "Private Driver",
              // path: "/JobBoard/HousekeepingJobs/PrivateDriver",
              path: "/JobBoard?NestedSubCategory=PrivateDriver",
            },
            {
              name: "Household Worker",
              path: "/JobBoard?NestedSubCategory=HouseholdWorker",
            },
            {
              name: "Domestic Worker",
              path: "/JobBoard?NestedSubCategory=DomesticWorker",
            },
            {
              name: "Other Labor Jobs",
              path: "/JobBoard?NestedSubCategory=OtherLaborJobs",
            },
          ],
        },
        {
          name: "Restaurant Jobs",
          path: "/JobBoard?subCatgory=RestaurantJobs",
          subSubcategories: [
            {
              name: "Chef & Cook Instructor",
              // path: "/JobBoard/RestaurantJobs/Chef&CookInstructor",
              path: "/JobBoard?NestedSubCategory=Chef&CookInstructor",
            },
            {
              name: "Waiter & Host",
              path: "/JobBoard?NestedSubCategory=Waiter&Host",
            },
            {
              name: "Other Restaurant Jobs",
              path: "/JobBoard?NestedSubCategory=OtherRestaurantJobs",
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
          path: "/RealEstateComp?subCatgory=ApartmentsforRent",
        },
        {
          name: "Apartments for Sale",
          path: "/RealEstateComp?subCatgory=ApartmentsforSale",
        },
        {
          name: "Building for Rent",
          path: "/RealEstateComp?subCatgory=BuildingforRent",
        },
        {
          name: "Building for Sale",
          path: "/RealEstateComp?subCatgory=BuildingforSale",
        },
        {
          name: "Camps for Rent",
          path: "/RealEstateComp?subCatgory=CampsforRent",
        },
        {
          name: "Chalets for Sale",
          path: "/RealEstateComp?subCatgory=ChaletsforSale",
        },
        {
          name: "Commercial Lands for Sale",
          path: "/RealEstateComp?subCatgory=CommercialLandsforSale",
        },
        {
          name: "Compound for Rent",
          path: "/RealEstateComp?subCatgory=CompoundforRent",
        },
        {
          name: "Compound for Sale",
          path: "/RealEstateComp?subCatgory=CompoundforSale",
        },
        {
          name: "Farm for Rent",
          path: "/RealEstateComp?subCatgory=FarmforRent",
        },
        {
          name: "Farms for Sale",
          path: "/RealEstateComp?subCatgory=FarmsforSale",
        },
        {
          name: "Floor for Sale",
          path: "/RealEstateComp?subCatgory=FloorforSale",
        },
        {
          name: "Floors for Rent",
          path: "/RealEstateComp?subCatgory=FloorsforRent",
        },
        {
          name: "Hall for Rent",
          path: "/RealEstateComp?subCatgory=HallforRent",
        },
        {
          name: "Houses for Rent",
          path: "/RealEstateComp?subCatgory=HousesforRent",
        },
        {
          name: "Houses for Sale",
          path: "/RealEstateComp?subCatgory=HousesforSale",
        },
        {
          name: "Lands for Sale",
          path: "/RealEstateComp?subCatgory=LandsforSale",
        },
        {
          name: "Offices for Rent",
          path: "/RealEstateComp?subCatgory=OfficesforRent",
        },
        {
          name: "Rest Houses for Rent",
          path: "/RealEstateComp?subCatgory=RestHousesforRent",
        },
        {
          name: "Rest Houses for Sale",
          path: "/RealEstateComp?subCatgory=RestHousesforSale",
        },
        {
          name: "Rooms for Rent",
          path: "/RealEstateComp?subCatgory=RoomsforRent",
        },
        {
          name: "Shops for Rent",
          path: "/RealEstateComp?subCatgory=ShopsforRent",
        },
        {
          name: "Shops for Transfer",
          path: "/RealEstateComp?subCatgory=ShopsforTransfer",
        },
        {
          name: "Villas for Rent",
          path: "/RealEstateComp?subCatgory=VillasforRent",
        },
        {
          name: "Villas for Sale",
          path: "/RealEstateComp?subCatgory=VillasforSale",
        },
        {
          name: "Warehouse for Sale",
          path: "/RealEstateComp?subCatgory=WarehouseforSale",
        },
        {
          name: "Warehouse for Rent",
          path: "/RealEstateComp?subCatgory=WarehouseforRent",
        },
      ],
    },
    {
      name: "Services",
      path: "/TravelComp",
      subcategories: [
        {
          name: "Other Services",
          path: "/TravelComp?subCatgory=OtherServices",
        },
        {
          name: "Contracting Services",
          path: "/TravelComp?subCatgory=ContractingServices",
        },
        {
          name: "Government Paperwork Services",
          path: "/TravelComp?subCatgory=GovernmentPaperworkServices",
        },
        {
          name: "Delivery Services",
          path: "/TravelComp?subCatgory=DeliveryServices",
        },
        {
          name: "Furniture Moving Services",
          path: "/TravelComp?subCatgory=FurnitureMovingServices",
        },
        {
          name: "Cleaning Services",
          path: "/TravelComp?subCatgory=CleaningServices",
        },
        {
          name: "International Shopping Services",
          path: "/TravelComp?subCatgory=InternationalShoppingServices",
        },
        {
          name: "Legal Services",
          path: "/TravelComp?subCatgory=LegalServices",
        },
        {
          name: "Accounting & Financial Services",
          path: "/TravelComp?subCatgory=Accounting&FinancialServices",
        },
      ],
    },
    {
      name: "Sport & Games",
      path: "/SportGamesComp",
      subcategories: [
        {
          name: "Gaming Consoles",
          path: "/SportGamesComp?subCatgory=GamingConsoles",
        },
        { name: "Video Games", path: "/SportGamesComp?subCatgory=Video Games" },
        { name: "Controllers", path: "/SportGamesComp?subCatgory=Controllers" },
        {
          name: "Gaming Accessories",
          path: "/SportGamesComp?subCatgory=GamingAccessories",
        },
        { name: "Gift Cards", path: "/SportGamesComp?subCatgory=GiftCards" },
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
              path: "/PetAnimalsComp?NestedSubCategory=BarbarySheep",
            },
            {
              name: "Hure Sheep",
              path: "/PetAnimalsComp?NestedSubCategory=HureSheep",
            },
            {
              name: "Romanian Sheep",
              path: "/PetAnimalsComp?NestedSubCategory=RomanianSheep",
            },
            {
              name: "Sawakni Sheep",
              path: "/PetAnimalsComp?NestedSubCategory=SawakniSheep",
            },
            {
              name: "Najdi Sheep",
              path: "/PetAnimalsComp?NestedSubCategory=NajdiSheep",
            },
            {
              name: "Naemi Sheep",
              path: "/PetAnimalsComp?NestedSubCategory=NaemiSheep",
            },
            {
              name: "Rafidi Sheep",
              path: "/PetAnimalsComp?NestedSubCategory=RafidiSheep",
            },
            {
              name: "Sheep Supplies",
              path: "/PetAnimalsComp?NestedSubCategory=SheepSupplies",
            },
            {
              name: "Sheep Products",
              path: "/PetAnimalsComp?NestedSubCategory=Sheep Products",
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
              path: "/PetAnimalsComp?NestedSubCategory=LocalGoats",
            },

            {
              name: "Bishi Goats",
              path: "/PetAnimalsComp?NestedSubCategory=BishiGoats",
            },
            {
              name: "Southern Goats",
              path: "/PetAnimalsComp?NestedSubCategory=SouthernGoats",
            },
            {
              name: "Hejaz Goats",
              path: "/PetAnimalsComp?NestedSubCategory=HejazGoats",
            },
            {
              name: "Shami Goats",
              path: "/PetAnimalsComp?NestedSubCategory=ShamiGoats",
            },
            {
              name: "Ardi Goats",
              path: "/PetAnimalsComp?NestedSubCategory=ArdiGoats",
            },
            {
              name: "Dutch Goats",
              path: "/PetAnimalsComp?NestedSubCategory=DutchGoats",
            },
            {
              name: "Dwarf Goats",
              path: "/PetAnimalsComp?NestedSubCategory=DwarfGoats",
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
              path: "/PetAnimalsComp?NestedSubCategory=AmazoniParrot",
            },
            {
              name: "Congo African Grey Parrot",
              path: "/PetAnimalsComp?NestedSubCategory=CongoAfricanGreyParrot",
            },
            {
              name: "Cockatoo Parrot",
              path: "/PetAnimalsComp?NestedSubCategory=CockatooParrot",
            },
            {
              name: "Macaw Parrot",
              path: "/PetAnimalsComp?NestedSubCategory=MacawParrot",
            },
            {
              name: "Pet Birds",
              path: "/PetAnimalsComp?NestedSubCategory=PetBirds",
            },
            {
              name: "Bird Supplies",
              path: "/PetAnimalsComp?NestedSubCategory=Bird Supplies",
            },
          ],
        },
        {
          name: "Dove/Pigeon",
          path: "/PetAnimalsComp?subCatgory=Dove&Pigeon",
          subSubcategories: [
            {
              name: "Pakistani Pigeon",
              // path: "/PetAnimalsComp/Dove&Pigeon/PakistaniPigeon",
              path: "/PetAnimalsComp?NestedSubCategory=PakistaniPigeon",
            },
            {
              name: "Turkish Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=TurkishPigeon",
            },
            {
              name: "Homers (Pigeons)",
              path: "/PetAnimalsComp?NestedSubCategory=Homers",
            },
            {
              name: "Sudanese Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=SudanesePigeon",
            },
            {
              name: "Shami Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=ShamiPigeon",
            },
            {
              name: "Sanaani Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=SanaaniPigeon",
            },
            {
              name: "French Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=FrenchPigeon",
            },
            {
              name: "Egyptian Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=EgyptianPigeon",
            },
            {
              name: "Indian Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=IndianPigeon",
            },
            {
              name: "Dutch Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=DutchPigeon",
            },
            {
              name: "Qatifi Pigeon",
              path: "/PetAnimalsComp?NestedSubCategory=QatifiPigeon",
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
              path: "/PetAnimalsComp?NestedSubCategory=ScottishCats",
            },
            {
              name: "Persian Cats",
              path: "/PetAnimalsComp?NestedSubCategory=PersianCats",
            },
            {
              name: "Cats for Adoption",
              path: "/PetAnimalsComp?NestedSubCategory=CatsforAdoption",
            },
            {
              name: "Himalayan Cats",
              path: "/PetAnimalsComp?NestedSubCategory=HimalayanCats",
            },
            {
              name: "Cat Supplies",
              path: "/PetAnimalsComp?NestedSubCategory=CatSupplies",
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
              path: "/PetAnimalsComp?NestedSubCategory=BrahmaChickens",
            },
            {
              name: "Local Chickens",
              path: "/PetAnimalsComp?NestedSubCategory=LocalChickens",
            },
            {
              name: "Turkish Chickens",
              path: "/PetAnimalsComp?NestedSubCategory=TurkishChickens",
            },
            {
              name: "Turkey Chickens",
              path: "/PetAnimalsComp?NestedSubCategory=TurkeyChickens",
            },
            {
              name: "Persian Chickens",
              path: "/PetAnimalsComp?NestedSubCategory=PersianChickens",
            },
            {
              name: "French Chickens",
              path: "/PetAnimalsComp?NestedSubCategory=FrenchChickens",
            },
            {
              name: "Fayoumi Chickens",
              path: "/PetAnimalsComp?NestedSubCategory=FayoumiChickens",
            },
            {
              name: "Pakistani Chickens",
              path: "/PetAnimalsComp?NestedSubCategory=PakistaniChickens",
            },
            {
              name: "Poultry Supplies",
              path: "/PetAnimalsComp?NestedSubCategory=PoultrySupplies",
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
              path: "/PetAnimalsComp?NestedSubCategory=BakarCamels",
            },
            {
              name: "Stud Camels",
              path: "/PetAnimalsComp?NestedSubCategory=StudCamels",
            },
            {
              name: "Camel Stallions",
              path: "/PetAnimalsComp?NestedSubCategory=CamelStallions",
            },
            {
              name: "Female Camels",
              path: "/PetAnimalsComp?NestedSubCategory=FemaleCamels",
            },
            {
              name: "Camel Supplies",
              path: "/PetAnimalsComp?NestedSubCategory=CamelSupplies",
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
              path: "/PetAnimalsComp?NestedSubCategory=PopularHorses",
            },
            {
              name: "Mixed Horses",
              path: "/PetAnimalsComp?NestedSubCategory=MixedHorses",
            },
            {
              name: "Wahho Horses",
              path: "/PetAnimalsComp?NestedSubCategory=WahhoHorses",
            },
            {
              name: "English Horses",
              path: "/PetAnimalsComp?NestedSubCategory=EnglishHorses",
            },
            {
              name: "Horse Supplies",
              path: "/PetAnimalsComp?NestedSubCategory=HorseSupplies",
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
              path: "/PetAnimalsComp?NestedSubCategory=PitbullDogs",
            },

            {
              name: "Pomeranian Dogs",
              path: "/PetAnimalsComp?NestedSubCategory=PomeranianDogs",
            },
            {
              name: "Golden Retriever Dogs",
              path: "/PetAnimalsComp?NestedSubCategory=GoldenRetrieverDogs",
            },
            {
              name: "German Shepherd Dogs",
              path: "/PetAnimalsComp?NestedSubCategory=GermanShepherdDogs",
            },
            {
              name: "Shih Tzu Dog",
              path: "/PetAnimalsComp?NestedSubCategory=ShihTzuDog",
            },
            {
              name: "Chihuahua Dog",
              path: "/PetAnimalsComp?NestedSubCategory=ChihuahuaDog",
            },
            {
              name: "Maltese Dog",
              path: "/PetAnimalsComp?NestedSubCategory=MalteseDog",
            },
            {
              name: "Husky Dog",
              path: "/PetAnimalsComp?NestedSubCategory=HuskyDog",
            },
            {
              name: "Dog Supplies",
              path: "/PetAnimalsComp?NestedSubCategory=DogSupplies",
            },
          ],
        },
        {
          name: "Cows",
          path: "/PetAnimalsComp?subCatgory=Cows",
          subSubcategories: [
            {
              name: "German Cows",
              path: "/PetAnimalsComp?NestedSubCategory=GermanCows",
            },
            {
              name: "Local Cows",
              path: "/PetAnimalsComp?NestedSubCategory=LocalCows",
            },
            {
              name: "Jersey Cows",
              path: "/PetAnimalsComp?NestedSubCategory=JerseyCows",
            },
            {
              name: "Swiss Cows",
              path: "/PetAnimalsComp?NestedSubCategory=SwissCows",
            },
            {
              name: "Dutch Cows",
              path: "/PetAnimalsComp?NestedSubCategory=DutchCows",
            },
            {
              name: "Dairy Products",
              path: "/PetAnimalsComp?NestedSubCategory=DairyProducts",
            },
          ],
        },
        {
          name: "Fish & Turtles",
          path: "/PetAnimalsComp?subCatgory=Fish&Turtles",
        },
        { name: "Rabbits", path: "/PetAnimalsComp?subCatgory=Rabbits" },

        {
          name: "Ducks",
          path: "/PetAnimalsComp?subCatgory=Ducks",
          subSubcategories: [
            // { name: "Bikini Ducks", path: "/PetAnimalsComp/Ducks/BikiniDucks" },
            {
              name: "Bikini Ducks",
              path: "/PetAnimalsComp?NestedSubCategory=BikiniDucks",
            },

            {
              name: "Sharshari Ducks",
              path: "/PetAnimalsComp?NestedSubCategory=SharshariDucks",
            },
            { name: "Geese", path: "/PetAnimalsComp?NestedSubCategory=Geese" },
            { name: "Fish", path: "/PetAnimalsComp?NestedSubCategory=Fish" },
            {
              name: "Bikini Ducks",
              path: "/PetAnimalsComp?NestedSubCategory=BikiniDucks",
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
              path: "/PetAnimalsComp?NestedSubCategory=Turtles",
            },

            {
              name: "Sharshari Ducks",
              path: "/PetAnimalsComp?NestedSubCategory=SharshariDucks",
            },
          ],
        },

        {
          name: "Hamsters",
          path: "/PetAnimalsComp?subCatgory=Hamsters",
          subSubcategories: [
            { name: "Geese", path: "/PetAnimalsComp?NestedSubCategory=Geese" },
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
          path: "/Education?subCatgory=Hunting&Trips",
        },
        {
          name: "Gardening & Agriculture",
          path: "/Education?subCatgory=Gardening&Agriculture",
        },
        {
          name: "Parties & Events",
          path: "/Education?subCatgory=Parties&Events",
        },
        {
          name: "Travel & Tourism",
          path: "/Education?subCatgory=Travel&Tourism",
        },
        { name: "Roommate", path: "/Education?subCatgory=Roommate" },
        { name: "Lost & Found", path: "/Education?subCatgory=Lost&Found" },
        {
          name: "Education & Training",
          path: "/Education?subCatgory=Education&Training",
        },
        {
          name: "Sports Training",
          path: "/Education?subCatgory=SportsTraining",
        },
        {
          name: "Stock & Forex Education",
          path: "/Education?subCatgory=Stock&ForexEducation",
        },
        {
          name: "Driving Lessons",
          path: "/Education?subCatgory=DrivingLessons",
        },
        {
          name: "Private Tutoring",
          path: "/Education?subCatgory=PrivateTutoring",
        },
        {
          name: "Training Courses",
          path: "/Education?subCatgory=TrainingCourses",
        },
        {
          name: "Antiques & Collectibles",
          path: "/Education?subCatgory=Antiques&Collectibles",
        },
        {
          name: "Projects & Investments",
          path: "/Education?subCatgory=Projects&Investments",
        },
        { name: "Books & Arts", path: "/Education?subCatgory=Books&Arts" },
        {
          name: "Programming & Design",
          path: "/Education?subCatgory=Programming&Design",
        },
        {
          name: "Food & Beverages",
          path: "/Education?subCatgory=Food&Beverages",
        },
      ],
    },
    {
      name: "Commercial",
      path: "/CommercialAdscom",
    },
  ];

  if (isMobile) {
    return null;
  }

  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        {categories.map((category) => (
          <div
            key={category.name}
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
                            <span className="arrow"> ></span>
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
