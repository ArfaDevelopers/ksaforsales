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
        { name: "Cars For Sale", path: "/AutomotiveComp/CarsForSale" },
        { name: "Car Rental", path: "/AutomotiveComp/CarRental" },
        { name: "Plates Number", path: "/AutomotiveComp/PlatesNumber" },
        {
          name: "Spare Parts",
          path: "/AutomotiveComp/SpareParts",
          subSubcategories: [
            { name: "Body Parts", path: "/AutomotiveComp/SpareParts/BodyParts" },
            { name: "Mechanical Parts", path: "/AutomotiveComp/SpareParts/MechanicalParts" },
            { name: "Spare Parts", path: "/AutomotiveComp/SpareParts/SpareParts" },
            { name: "Batteries", path: "/AutomotiveComp/SpareParts/Batteries" },
            { name: "Others", path: "/AutomotiveComp/SpareParts/Others" },
          ],
        },
        { name: "Accessories", path: "/AutomotiveComp/Accessories" },
        { name: "Wheels & Rims", path: "/AutomotiveComp/WheelsRims" },
        {
          name: "Trucks & Heavy Machinery",
          path: "/AutomotiveComp/TrucksHeavyMachinery",
          subSubcategories: [
            { name: "Trucks", path: "/AutomotiveComp/TrucksHeavyMachinery/Trucks" },
            { name: "Dump Truck", path: "/AutomotiveComp/TrucksHeavyMachinery/DumpTruck" },
            { name: "Wheel Loader", path: "/AutomotiveComp/TrucksHeavyMachinery/WheelLoader" },
            { name: "Recovery", path: "/AutomotiveComp/TrucksHeavyMachinery/Recovery" },
            { name: "Agricultural Equipment", path: "/AutomotiveComp/TrucksHeavyMachinery/AgriculturalEquipment" },
            { name: "Crane", path: "/AutomotiveComp/TrucksHeavyMachinery/Crane" },
            { name: "Bulldozer", path: "/AutomotiveComp/TrucksHeavyMachinery/Bulldozer" },
            { name: "Crusher", path: "/AutomotiveComp/TrucksHeavyMachinery/Crusher" },
            { name: "Excavator", path: "/AutomotiveComp/TrucksHeavyMachinery/Excavator" },
            { name: "Heavy Equipment", path: "/AutomotiveComp/TrucksHeavyMachinery/HeavyEquipment" },
          
          ],
        },
        { name: "Tshaleeh", path: "/AutomotiveComp/Tshaleeh" },
        { name: "Boats & Jet Ski",
          path: "/AutomotiveComp/BoatsJetSki", 
          subSubcategories: [
            { name: "Motorboats", path: "/AutomotiveComp/BoatsJetSki/Motorboats" },
            { name: "Jet-ski", path: "/AutomotiveComp/BoatsJetSki/Jet-ski" },
            { name: "Others", path: "/AutomotiveComp/BoatsJetSki/Others" },          
          ],
        },
        { name: "Classic Cars", path: "/AutomotiveComp/ClassicCars" },
        { name: "Salvage Cars", path: "/AutomotiveComp/SalvageCars" },
        { name: "Mortgaged Cars", path: "/AutomotiveComp/MortgagedCars" },
        { name: "Recovery", path: "/AutomotiveComp/Recovery" },
        { name: "Food Truck", path: "/AutomotiveComp/FoodTruck" },
        { name: "Caravans", path: "/AutomotiveComp/Caravans" },
        { name: "Reports", path: "/AutomotiveComp/Reports" },
        { name: "Car Cleaning", path: "/AutomotiveComp/CarCleaning" },
      ],
    },
    {
      name: "Electronics",
      path: "/ElectronicComp",
      subcategories: [
        { name: "Mobile Phones",
          path: "/ElectronicComp/MobilePhones",
          subSubcategories: [          
            { name: "Smart Watches", path: "/ElectronicComp/MobilePhones/SmartWatches" }, 
            { name: "Headsets", path: "/ElectronicComp/MobilePhones/Headsets" },          
            { name: "Chargers & Cables", path: "/ElectronicComp/MobilePhones/Chargers&Cables" },  
            { name: "Covers & Protectors", path: "/ElectronicComp/MobilePhones/Covers&Protectors" },          
          ],
        },
        { name: "Tablet Devices",
          path: "/ElectronicComp/TabletDevices",
          subSubcategories: [
            
            { name: "iPad", path: "/ElectronicComp/TabletDevices/iPad" },   
            { name: "Galaxy Tab", path: "/ElectronicComp/TabletDevices/GalaxyTab" },          

          ],
        },
    
        { name: "Computers & Laptops", path: "/ElectronicComp/Computers&Laptops" },
        { name: "Video Games",
          path: "/ElectronicComp/VideoGames",
          subSubcategories: [    
            { name: "VR Glasses", path: "/ElectronicComp/VideoGames/VRGlasses" },   
            { name: "PlayStation (PS) Devices", path: "/ElectronicComp/VideoGames/PlayStationDevices" },          
            { name: "PlayStation (PS) Games", path: "/ElectronicComp/VideoGames/PlayStationGames" },          
            { name: "Xbox Devices", path: "/ElectronicComp/VideoGames/XboxDevices" },          
            { name: "Xbox Games", path: "/ElectronicComp/VideoGames/XboxGames" },          
            { name: "Nintendo", path: "/ElectronicComp/VideoGames/Nintendo" },          
          ],
        },
        { name: "Television & Audio System", path: "/ElectronicComp/Television&AudioSystem" },
        { name: "Accounts & Subscriptions",
          path: "/ElectronicComp/Accounts&Subscriptions",
          subSubcategories: [
            { name: "PUBG", path: "/ElectronicComp/Accounts&Subscriptions/PUBG" },   
            { name: "Fortnite", path: "/ElectronicComp/Accounts&Subscriptions/Fortnite" },   
            { name: "FIFA", path: "/ElectronicComp/Accounts&Subscriptions/FIFA" },          
            { name: "Clash of Clans", path: "/ElectronicComp/Accounts&Subscriptions/ClashofClans" },   
            { name: "Clash Royale", path: "/ElectronicComp/Accounts&Subscriptions/ClashRoyale" },   
            { name: "Instagram Accounts", path: "/ElectronicComp/Accounts&Subscriptions/InstagramAccounts" },   
            { name: "Twitter Accounts", path: "/ElectronicComp/Accounts&Subscriptions/TwitterAccounts" },   
            { name: "TikTok Accounts", path: "/ElectronicComp/Accounts&Subscriptions/TikTokAccounts" },   
            { name: "Snapchat Accounts", path: "/ElectronicComp/Accounts&Subscriptions/SnapchatAccounts" },   
            { name: "Facebook Accounts", path: "/ElectronicComp/Accounts&Subscriptions/FacebookAccounts" },   
            { name: "YouTube Accounts", path: "/ElectronicComp/Accounts&Subscriptions/YouTubeAccounts" },   
            { name: "Other Accounts", path: "/ElectronicComp/Accounts&Subscriptions/OtherAccounts" },   
          ],
        },
        { name: "Special Number",
          path: "/ElectronicComp/SpecialNumber",
          subSubcategories: [
            { name: "STC", path: "/ElectronicComp/SpecialNumber/STC" },   
            { name: "Mobily", path: "/ElectronicComp/SpecialNumber/Mobily" }, 
            { name: "Zain", path: "/ElectronicComp/SpecialNumber/Zain" },          
          ],
        },
        { name: "Home & Kitchen Appliance",
          path: "/ElectronicComp/Home&KitchenAppliance",
          subSubcategories: [      
            { name: "Stoves & Ovens", path: "/ElectronicComp/Home&KitchenAppliance/Stoves&Ovens" },   
            { name: "Refrigerators & Coolers", path: "/ElectronicComp/Home&KitchenAppliance/Refrigerators&Coolers" },  
            { name: "Mixers & Blenders", path: "/ElectronicComp/Home&KitchenAppliance/Mixers&Blenders" },          
            { name: "Washing Machines", path: "/ElectronicComp/Home&KitchenAppliance/WashingMachines" },          
            { name: "Kettles", path: "/ElectronicComp/Home&KitchenAppliance/Kettles" },          
            { name: "Fryers", path: "/ElectronicComp/Home&KitchenAppliance/Fryers" },          
            { name: "Coffee Machines", path: "/ElectronicComp/Home&KitchenAppliance/CoffeeMachines" },          
            { name: "Microwaves & Toasters", path: "/ElectronicComp/Home&KitchenAppliance/MicrowavesS&Toasters" },          
            { name: "Vacuum Cleaners", path: "/ElectronicComp/Home&KitchenAppliance/VacuumCleaners" },          
            { name: "Clothing Irons", path: "/ElectronicComp/Home&KitchenAppliance/ClothingIrons" },          
            { name: "Air Conditioners", path: "/ElectronicComp/Home&KitchenAppliance/AirConditioners" },          
          ],
        },
        { name: "Motors & Generators", path: "/ElectronicComp/Motors&Generators" },
        { name: "Cameras",
          path: "/ElectronicComp/Cameras",
          subSubcategories: [        
            { name: "Lenses", path: "/ElectronicComp/Cameras/Lenses" },   
            { name: "Drone", path: "/ElectronicComp/Cameras/Drone " },          
            { name: "Camera Accessories", path: "/ElectronicComp/Cameras/CameraAccessories" },          


          ],
        },

        { name: "Networking Devices", path: "/ElectronicComp/NetworkingDevices" },
        { name: "Screens & Projectors", path: "/ElectronicComp/Screens&Projectors" },
        { name: "Printer & Scanner", path: "/ElectronicComp/Printer&Scanner" },
        { name: "Computer Accessories", path: "/ElectronicComp/ComputerAccessories" },

      ],
    },
    {
      name: "Fashion Style",
      path: "/FashionStyle",
      subcategories: [
        { name: "Watches",
        path: "/FashionStyle/Watches",
        subSubcategories: [          
          { name: "Other Watches", path: "/FashionStyle/Watches/OtherWatches" },              
          { name: "Men's Watches", path: "/FashionStyle/Watches/Men'sWatches" },              
          { name: "Women's Watches", path: "/FashionStyle/Watches/Women'sWatches" },              
        ],
      },
      { name: "Perfumes & Incense",
      path: "/FashionStyle/Perfumes&Incense",
      subSubcategories: [          
        { name: "Other Perfumes", path: "/FashionStyle/Perfumes&Incense/OtherPerfumes" },              
        { name: "Men's Perfumes", path: "/FashionStyle/Perfumes&Incense/Men'sPerfumes" },              
        { name: "Women's Perfumes", path: "/FashionStyle/Perfumes&Incense/Women'sPerfumes" },      
        { name: "Oud & Incense", path: "/FashionStyle/Perfumes&Incense/Oud&Incense" },              
      ],
    }, 
     { name: "Sports Equipment",
    path: "/FashionStyle/SportsEquipment",
    subSubcategories: [          
      { name: "Eyeglasses", path: "/FashionStyle/SportsEquipment/Eyeglasses" },              
      { name: "Other Eyeglasses", path: "/FashionStyle/SportsEquipment/OtherEyeglasses" },              
      { name: "Men's Eyeglasses", path: "/FashionStyle/SportsEquipment/Men'sEyeglasses" },              
      { name: "HeadsWomen's Eyeglassesets", path: "/FashionStyle/SportsEquipment/Women'sEyeglasses" },              
    ],
  }, 
   { name: "Men's Fashion",
  path: "/FashionStyle/Men'sFashion",
  subSubcategories: [          
    { name: "Men's Shemaghs", path: "/FashionStyle/Men'sFashion/Men'sShemaghs" },              
    { name: "Men's Accessories", path: "/FashionStyle/Men'sFashion/Men'sAccessories" },              
    { name: "Men's Clothing", path: "/FashionStyle/Men'sFashion/Men'sClothing" },   
    { name: "Men's Jackets", path: "/FashionStyle/Men'sFashion/Men'sJackets" },              
    { name: "Men's Bags", path: "/FashionStyle/Men'sFashion/Men'sBags" },              
    { name: "Men's Shirts & Trousers", path: "/FashionStyle/Men'sFashion/Men'sShirts&Trousers" },              
    { name: "Men's Sportswear", path: "/FashionStyle/Men'sFashion/Men'sSportswear" },              
  ],
},
{ name: "Women's Fashion",
  path: "/FashionStyle/Women'sFashion",
  subSubcategories: [          
    { name: "Women's Accessories & Jewelry", path: "/FashionStyle/Women'sFashion/Women'sAccessories&Jewelry" },              
    { name: "Women's Blouses & T-Shirts", path: "/FashionStyle/Women'sFashion/Women'sBlouses&T-Shirts" },              
    { name: "Women's Skirts & Trousers", path: "/FashionStyle/Women'sFashion/Women'sSkirts&Trousers" }, 
    { name: "Women's Jackets", path: "/FashionStyle/Women'sFashion/Women'sJackets" },              
    { name: "Kaftans", path: "/FashionStyle/Women'sFashion/Kaftans" },              
    { name: "Women's Bags", path: "/FashionStyle/Women'sFashion/Women'sBags" },              
    { name: "Abayas", path: "/FashionStyle/Women'sFashion/Abayas" },              
    { name: "Dresses", path: "/FashionStyle/Women'sFashion/Dresses" },              
    { name: "Lingerie", path: "/FashionStyle/Women'sFashion/Lingerie" },              
    { name: "Women's Sportswear", path: "/FashionStyle/Women'sFashion/Women'sSportswear" },              
  ],
},
{ name: "Children's Clothing & Accessories",
  path: "/FashionStyle/Children'sClothing&Accessories",
  subSubcategories: [          
    { name: "Baby Care Products", path: "/FashionStyle/Children'sClothing&Accessories/BabyCareProducts" },              
    { name: "Children's Accessories", path: "/FashionStyle/Children'sClothing&Accessories/Children'sAccessories" },              
    { name: "Toys for Kids", path: "/FashionStyle/Children'sClothing&Accessories/ToysforKids" },  
    { name: "Children's Cribs & Chairs", path: "/FashionStyle/Children'sClothing&Accessories/Children'sCribs&Chairs" },              
    { name: "Children's Bags", path: "/FashionStyle/Children'sClothing&Accessories/Children'sBags" },              
    { name: "Strollers", path: "/FashionStyle/Children'sClothing&Accessories/Strollers" },              
    { name: "Car Seats for Kids", path: "/FashionStyle/Children'sClothing&Accessories/CarSeatsforKids" },              
    { name: "Girls' Clothing", path: "/FashionStyle/Children'sClothing&Accessories/Girls'Clothing" },  
    { name: "Boys' Clothing", path: "/FashionStyle/Children'sClothing&Accessories/Boys'Clothing" },              


  ],
},
{ name: "Sleepwear", path: "/FashionStyle/Sleepwear" },
{ name: "Gifts", path: "/FashionStyle/Gifts" },
{ name: "Luggage", path: "/FashionStyle/Luggage" },
{ name: "Health & Beauty",
  path: "/FashionStyle/Health&Beauty",
  subSubcategories: [          
    { name: "Skincare", path: "/FashionStyle/Health&Beauty/Skincare" },              
    { name: "Hair Care", path: "/FashionStyle/Health&Beauty/HairCare" },              
    { name: "Makeup", path: "/FashionStyle/Health&Beauty/Makeup" },              
    { name: "Other Beauty Products", path: "/FashionStyle/Health&Beauty/OtherBeautyProducts" },              

  ],
},

      ],
    },
    {
      name: "Home & Furnituer",
      path: "/HealthCareComp",
      subcategories: [
        { name: "Outdoor Furniture", path: "/HealthCareComp/OutdoorFurniture" },
        { name: "Majlis & Sofas", path: "/HealthCareComp/Majlis&Sofas" },
        { name: "Cabinets & Wardrobes", path: "/HealthCareComp/Cabinets&Wardrobes" },
        { name: "Beds & Mattresses", path: "/HealthCareComp/Beds&Mattresses" },
        { name: "Tables & Chairs", path: "/HealthCareComp/Tables&Chairs" },
        { name: "Kitchens", path: "/HealthCareComp/Kitchens" },
        { name: "Bathrooms", path: "/HealthCareComp/Bathrooms" },
        { name: "Carpets", path: "/HealthCareComp/Carpets" },
        { name: "Curtains", path: "/HealthCareComp/Curtains" },
        { name: "Decoration & Accessories", path: "/HealthCareComp/Decoration&Accessories" },
        { name: "Lighting", path: "/HealthCareComp/Lighting" },
        { name: "Household Items", path: "/HealthCareComp/HouseholdItems" },
        { name: "Garden - Plants", path: "/HealthCareComp/GardenPlants" },
        { name: "Office Furniture", path: "/HealthCareComp/OfficeFurniture" },
        { name: "Doors - Windows - Aluminium", path: "/HealthCareComp/DoorsWindowsAluminium" },
        { name: "Tiles & Flooring", path: "/HealthCareComp/Tiles&Flooring" },
      ],
    },
    {
      name: "Job Board",
      path: "/JobBoard",
      subcategories: [
        { name: "Administrative Jobs",
          path: "/JobBoard/AdministrativeJobs",
          subSubcategories: [          
            { name: "Marketing & Sales", path: "/JobBoard/AdministrativeJobs/Marketing&Sales" },  
            { name: "Customer Service", path: "/JobBoard/AdministrativeJobs/CustomerService" },              
            { name: "Secretary", path: "/JobBoard/AdministrativeJobs/Secretary" },              
            { name: "Tourism & Hospitality", path: "/JobBoard/AdministrativeJobs/Tourism&Hospitality" },              
            { name: "Accountant", path: "/JobBoard/AdministrativeJobs/Accountant" },   
            { name: "Delivery Representative", path: "/JobBoard/AdministrativeJobs/DeliveryRepresentative" },              
            { name: "Other Administrative Jobs", path: "/JobBoard/AdministrativeJobs/OtherAdministrativeJobs" },              
            { name: "Public Relations & Media", path: "/JobBoard/AdministrativeJobs/PublicRelations&Media" },              
            { name: "Translator", path: "/JobBoard/AdministrativeJobs/Translator" },              
            { name: "Lawyer & Legal Jobs", path: "/JobBoard/AdministrativeJobs/Lawyer&LegalJobs" },              
            ],
        },
        { name: "Fashion & Beauty Jobs",
        path: "/JobBoard/Fashion&BeautyJobs",
        subSubcategories: [          
          { name: "Tailor", path: "/JobBoard/Fashion&BeautyJobs/Tailor" },
          { name: "Female Hairdresser", path: "/JobBoard/Fashion&BeautyJobs/FemaleHairdresser" },              
          { name: "Fashion Designer", path: "/JobBoard/Fashion&BeautyJobs/FashionDesigner" },              
          { name: "Model", path: "/JobBoard/Fashion&BeautyJobs/Model" },              
          { name: "Makeup Artist", path: "/JobBoard/Fashion&BeautyJobs/MakeupArtist" },              
          { name: "Hair Stylist", path: "/JobBoard/Fashion&BeautyJobs/HairStylist" },              
          { name: "Other Beauty Jobs", path: "/JobBoard/Fashion&BeautyJobs/OtherBeautyJobs" },                           
          ],
      },
      { name: "Security & Safety Jobs",
      path: "/JobBoard/Security&SafetyJobs",
      subSubcategories: [          
        { name: "Security Guard", path: "/JobBoard/Security&SafetyJobs/SecurityGuard" },   
        { name: "Safety Technician", path: "/JobBoard/Security&SafetyJobs/SafetyTechnician" },              
        ],
    },
        { name: "Teaching Jobs", path: "/JobBoard/TeachingJobs" },
     
      { name: "IT & Design Jobs",
      path: "/JobBoard/IT&DesignJobs",
      subSubcategories: [          
        { name: "Other IT Jobs", path: "/JobBoard/IT&DesignJobs/OtherITJobs" },   
        { name: "Network & Telecommunications Specialist", path: "/JobBoard/IT&DesignJobs/Network&TelecommunicationsSpecialist" },              
        { name: "Content Writer", path: "/JobBoard/IT&DesignJobs/ContentWriter" },              
        { name: "Programmer", path: "/JobBoard/IT&DesignJobs/Programmer" },              
        { name: "Media Designer", path: "/JobBoard/IT&DesignJobs/MediaDesigner" },              
        ],
    },
    { name: "Agriculture & Farming Jobs",
    path: "/JobBoard/Agriculture&FarmingJobs",
    subSubcategories: [          
      { name: "Farm Worker", path: "/JobBoard/Agriculture&FarmingJobs/FarmWorker" },  
      { name: "Other Agricultural Jobs", path: "/JobBoard/Agriculture&FarmingJobs/OtherAgriculturalJobs" },              
      ],
  },
  { name: "Industrial Jobs",
  path: "/JobBoard/IndustrialJobs",
  subSubcategories: [          
    { name: "Bodywork Technician", path: "/JobBoard/IndustrialJobs/BodyworkTechnician" },            
    { name: "Auto Electrician", path: "/JobBoard/IndustrialJobs/AutoElectrician" },              
    { name: "Car Mechanic", path: "/JobBoard/IndustrialJobs/CarMechanic" },              
    { name: "Other Industrial Jobs", path: "/JobBoard/IndustrialJobs/OtherIndustrialJobs" },              
    ],
},
{ name: "Medical & Nursing Jobs",
path: "/JobBoard/Medical&NursingJobs",
subSubcategories: [          
  { name: "Pharmacist", path: "/JobBoard/Medical&NursingJobs/Pharmacist" },   
  { name: "Doctor", path: "/JobBoard/Medical&NursingJobs/Doctor" },              
  { name: "Physical Therapy Technician", path: "/JobBoard/Medical&NursingJobs/PhysicalTherapyTechnician" },              
  { name: "Massage Therapist", path: "/JobBoard/Medical&NursingJobs/MassageTherapist" },              
  { name: "Nurse", path: "/JobBoard/Medical&NursingJobs/Nurse" },   
  { name: "Other Medical Jobs", path: "/JobBoard/Medical&NursingJobs/OtherMedicalJobs" },                           
  ],
},
{ name: "Architecture & Construction Jobs",
path: "/JobBoard/Architecture&ConstructionJobs",
subSubcategories: [          
  { name: "Building Painter", path: "/JobBoard/Architecture&ConstructionJobs/BuildingPainter" },
  { name: "AC Technician", path: "/JobBoard/Architecture&ConstructionJobs/ACTechnician" },              
  { name: "Decorator", path: "/JobBoard/Architecture&ConstructionJobs/Decorator" },              
  { name: "Building Electrician", path: "/JobBoard/Architecture&ConstructionJobs/BuildingElectrician" },              
  { name: "Tiler", path: "/JobBoard/Architecture&ConstructionJobs/Tiler" },              
  { name: "Building Supervisor", path: "/JobBoard/Architecture&ConstructionJobs/BuildingSupervisor" },              
  { name: "Building Contractor", path: "/JobBoard/Architecture&ConstructionJobs/BuildingContractor" },              
  { name: "Plasterer", path: "/JobBoard/Architecture&ConstructionJobs/Plasterer" },              
  { name: "Carpenter", path: "/JobBoard/Architecture&ConstructionJobs/Carpenter" },              
  { name: "Other Construction Jobs", path: "/JobBoard/Architecture&ConstructionJobs/OtherConstructionJobs" },              
  { name: "Plumber", path: "/JobBoard/Architecture&ConstructionJobs/Plumber" },              
  ],
},
{ name: "Housekeeping Jobs",
path: "/JobBoard/HousekeepingJobs",
subSubcategories: [          
  { name: "Private Driver", path: "/JobBoard/HousekeepingJobs/PrivateDriver" },              
  { name: "Household Worker", path: "/JobBoard/HousekeepingJobs/HouseholdWorker" },              
  { name: "Domestic Worker", path: "/JobBoard/HousekeepingJobs/DomesticWorker" },              
  { name: "Other Labor Jobs", path: "/JobBoard/HousekeepingJobs/OtherLaborJobs" },              

  ],
},
{ name: "Restaurant Jobs",
path: "/JobBoard/RestaurantJobs",
subSubcategories: [          
  { name: "Chef & Cook Instructor", path: "/JobBoard/RestaurantJobs/Chef&CookInstructor" },              
  { name: "Waiter & Host", path: "/JobBoard/RestaurantJobs/Waiter&Host" },              
  { name: "Other Restaurant Jobs", path: "/JobBoard/RestaurantJobs/OtherRestaurantJobs" },              

  ],
},
      ],
    },
   
    {
      name: "Real Estate",
      path: "/RealEstateComp",
      subcategories: [
        { name: "Apartments for Rent", path: "/RealEstateComp/ApartmentsforRent" },
        { name: "Apartments for Sale", path: "/RealEstateComp/ApartmentsforSale" },
        { name: "Building for Rent", path: "/RealEstateComp/BuildingforRent" },
        { name: "Building for Sale", path: "/RealEstateComp/BuildingforSale" },
        { name: "Camps for Rent", path: "/RealEstateComp/CampsforRent" },
        { name: "Chalets for Sale", path: "/RealEstateComp/ChaletsforSale" },
        { name: "Commercial Lands for Sale", path: "/RealEstateComp/CommercialLandsforSale" },
        { name: "Compound for Rent", path: "/RealEstateComp/CompoundforRent" },
        { name: "Compound for Sale", path: "/RealEstateComp/CompoundforSale" },
        { name: "Farm for Rent", path: "/RealEstateComp/FarmforRent" },
        { name: "Farms for Sale", path: "/RealEstateComp/FarmsforSale" },
        { name: "Floor for Sale", path: "/RealEstateComp/FloorforSale" },
        { name: "Floors for Rent", path: "/RealEstateComp/FloorsforRent" },
        { name: "Hall for Rent", path: "/RealEstateComp/HallforRent" },
        { name: "Houses for Rent", path: "/RealEstateComp/HousesforRent" },
        { name: "Houses for Sale", path: "/RealEstateComp/HousesforSale" },
        { name: "Lands for Sale", path: "/RealEstateComp/LandsforSale" },
        { name: "Offices for Rent", path: "/RealEstateComp/OfficesforRent" },
        { name: "Rest Houses for Rent", path: "/RealEstateComp/RestHousesforRent" },
        { name: "Rest Houses for Sale", path: "/RealEstateComp/RestHousesforSale" },
        { name: "Rooms for Rent", path: "/RealEstateComp/RoomsforRent" },
        { name: "Shops for Rent", path: "/RealEstateComp/ShopsforRent" },
        { name: "Shops for Transfer", path: "/RealEstateComp/ShopsforTransfer" },
        { name: "Villas for Rent", path: "/RealEstateComp/VillasforRent" },
        { name: "Villas for Sale", path: "/RealEstateComp/VillasforSale" },
        { name: "Warehouse for Sale", path: "/RealEstateComp/WarehouseforSale" },
        { name: "Warehouse for Rent", path: "/RealEstateComp/WarehouseforRent" },


      ],
    },
    {
      name: "Services",
      path: "/TravelComp",
      subcategories: [
        { name: "Other Services", path: "/TravelComp/OtherServices" },
        { name: "Contracting Services", path: "/TravelComp/ContractingServices" },
        { name: "Government Paperwork Services", path: "/TravelComp/GovernmentPaperworkServices" },
        { name: "Delivery Services", path: "/TravelComp/DeliveryServices" },
        { name: "Furniture Moving Services", path: "/TravelComp/FurnitureMovingServices" },
        { name: "Cleaning Services", path: "/TravelComp/CleaningServices" },
        { name: "International Shopping Services", path: "/TravelComp/InternationalShoppingServices" },
        { name: "Legal Services", path: "/TravelComp/LegalServices" },
        { name: "Accounting & Financial Services", path: "/TravelComp/Accounting&FinancialServices" },
      ],
    },
    {
      name: "Sport & Games",
      path: "/SportGamesComp",
      subcategories: [
        { name: "Gaming Consoles", path: "/SportGamesComp/GamingConsoles" },
        { name: "Video Games", path: "/SportGamesComp/Video Games" },
        { name: "Controllers", path: "/SportGamesComp/Controllers" },
        { name: "Gaming Accessories", path: "/SportGamesComp/GamingAccessories" },
        { name: "Gift Cards", path: "/SportGamesComp/GiftCards" },
        { name: "Accounts", path: "/SportGamesComp/Accounts" },
        { name: "Toys", path: "/SportGamesComp/Toys" },
      ],
    },
    {
      name: "Pet & Animals",
      path: "/PetAnimalsComp",
      subcategories: [
        { name: "Sheep",
        path: "/PetAnimalsComp/Sheep",
        subSubcategories: [          
          { name: "Barbary Sheep", path: "/PetAnimalsComp/Sheep/BarbarySheep" },  
          { name: "Hure Sheep", path: "/PetAnimalsComp/Sheep/HureSheep" },                 
          { name: "Romanian Sheep", path: "/PetAnimalsComp/Sheep/RomanianSheep" },                 
          { name: "Sawakni Sheep", path: "/PetAnimalsComp/Sheep/SawakniSheep" },                 
          { name: "Najdi Sheep", path: "/PetAnimalsComp/Sheep/NajdiSheep" },                 
          { name: "Naemi Sheep", path: "/PetAnimalsComp/Sheep/NaemiSheep" },                 
          { name: "Rafidi Sheep", path: "/PetAnimalsComp/Sheep/RafidiSheep" },                 
          { name: "Sheep Supplies", path: "/PetAnimalsComp/Sheep/SheepSupplies" },                 
          { name: "Sheep Products", path: "/PetAnimalsComp/Sheep/Sheep Products" },                                 

        ],
      },
      { name: "Goats",
      path: "/PetAnimalsComp/Goats",
      subSubcategories: [          
        { name: "Local Goats", path: "/PetAnimalsComp/Goats/LocalGoats" },     
        { name: "Bishi Goats", path: "/PetAnimalsComp/Goats/BishiGoats" },                 
        { name: "Southern Goats", path: "/PetAnimalsComp/Goats/SouthernGoats" },                 
        { name: "Hejaz Goats", path: "/PetAnimalsComp/Goats/HejazGoats" },                 
        { name: "Shami Goats", path: "/PetAnimalsComp/Goats/ShamiGoats" },                 
        { name: "Ardi Goats", path: "/PetAnimalsComp/Goats/ArdiGoats" },                 
        { name: "Dutch Goats", path: "/PetAnimalsComp/Goats/DutchGoats" },                 
        { name: "Dwarf Goats", path: "/PetAnimalsComp/Goats/DwarfGoats" },            
      ],
    },
    { name: "Parrot",
    path: "/PetAnimalsComp/Parrot",
    subSubcategories: [          
      { name: "Amazoni Parrot", path: "/PetAnimalsComp/Parrot/AmazoniParrot" },     
      { name: "Congo African Grey Parrot", path: "/PetAnimalsComp/Parrot/CongoAfricanGreyParrot" },                 
      { name: "Cockatoo Parrot", path: "/PetAnimalsComp/Parrot/CockatooParrot" },                 
      { name: "Macaw Parrot", path: "/PetAnimalsComp/Parrot/MacawParrot" },                 
      { name: "Pet Birds", path: "/PetAnimalsComp/Parrot/PetBirds" },                 
      { name: "Bird Supplies", path: "/PetAnimalsComp/Parrot/Bird Supplies" },                                
    ],
  },
  { name: "Dove/Pigeon",
  path: "/PetAnimalsComp/Dove&Pigeon",
  subSubcategories: [          
    { name: "Pakistani Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/PakistaniPigeon" },    
    { name: "Turkish Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/TurkishPigeon" },                 
    { name: "Homers (Pigeons)", path: "/PetAnimalsComp/Dove&Pigeon/Homers" },                 
    { name: "Sudanese Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/SudanesePigeon" },                 
    { name: "Shami Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/ShamiPigeon" },                 
    { name: "Sanaani Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/SanaaniPigeon" },                 
    { name: "French Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/FrenchPigeon" },                 
    { name: "Egyptian Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/EgyptianPigeon" },                 
    { name: "Indian Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/IndianPigeon" },                 
    { name: "Dutch Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/DutchPigeon" },                 
    { name: "Qatifi Pigeon", path: "/PetAnimalsComp/Dove&Pigeon/QatifiPigeon" },                               
  ],
},
{ name: "Cats",
path: "/PetAnimalsComp/Cats",
subSubcategories: [          
  { name: "Scottish Cats", path: "/PetAnimalsComp/Cats/ScottishCats" },                 
  { name: "Persian Cats", path: "/PetAnimalsComp/Cats/PersianCats" },                 
  { name: "Cats for Adoption", path: "/PetAnimalsComp/Cats/CatsforAdoption" },                 
  { name: "Himalayan Cats", path: "/PetAnimalsComp/Cats/HimalayanCats" },                 
  { name: "Cat Supplies", path: "/PetAnimalsComp/Cats/CatSupplies" },                 
],
},
{ name: "Chickens",
path: "/PetAnimalsComp/Chickens",
subSubcategories: [          
  { name: "Brahma Chickens", path: "/PetAnimalsComp/Chickens/BrahmaChickens" },     
  { name: "Local Chickens", path: "/PetAnimalsComp/Chickens/LocalChickens" },                 
  { name: "Turkish Chickens", path: "/PetAnimalsComp/Chickens/TurkishChickens" },                 
  { name: "Turkey Chickens", path: "/PetAnimalsComp/Chickens/TurkeyChickens" },                 
  { name: "Persian Chickens", path: "/PetAnimalsComp/Chickens/PersianChickens" },                 
  { name: "French Chickens", path: "/PetAnimalsComp/Chickens/FrenchChickens" },                 
  { name: "Fayoumi Chickens", path: "/PetAnimalsComp/Chickens/FayoumiChickens" },                 
  { name: "Pakistani Chickens", path: "/PetAnimalsComp/Chickens/PakistaniChickens" },                 
  { name: "Poultry Supplies", path: "/PetAnimalsComp/Chickens/PoultrySupplies" },                 
],
},
{ name: "Camels",
path: "/PetAnimalsComp/Camels",
subSubcategories: [          
  { name: "Bakar Camels", path: "/PetAnimalsComp/Camels/BakarCamels" },                 
  { name: "Stud Camels", path: "/PetAnimalsComp/Camels/StudCamels" },                 
  { name: "Camel Stallions", path: "/PetAnimalsComp/Camels/CamelStallions" },                 
  { name: "Female Camels", path: "/PetAnimalsComp/Camels/FemaleCamels" },                 
  { name: "Camel Supplies", path: "/PetAnimalsComp/Camels/CamelSupplies" },                 
],
},
{ name: "Horses",
path: "/PetAnimalsComp/Horses",
subSubcategories: [          
  { name: "Popular Horses", path: "/PetAnimalsComp/Horses/PopularHorses" },     
  { name: "Mixed Horses", path: "/PetAnimalsComp/Horses/MixedHorses" },                 
  { name: "Wahho Horses", path: "/PetAnimalsComp/Horses/WahhoHorses" },                 
  { name: "English Horses", path: "/PetAnimalsComp/Horses/EnglishHorses" },                 
  { name: "Horse Supplies", path: "/PetAnimalsComp/Horses/HorseSupplies" },                 
],
},
{ name: "Dogs",
path: "/PetAnimalsComp/Dogs",
subSubcategories: [          
  { name: "Pitbull Dogs", path: "/PetAnimalsComp/Dogs/PitbullDogs" },                 
  { name: "Pomeranian Dogs", path: "/PetAnimalsComp/Dogs/PomeranianDogs" },                 
  { name: "Golden Retriever Dogs", path: "/PetAnimalsComp/Dogs/GoldenRetrieverDogs" },                 
  { name: "German Shepherd Dogs", path: "/PetAnimalsComp/Dogs/GermanShepherdDogs" },                 
  { name: "Shih Tzu Dog", path: "/PetAnimalsComp/Dogs/ShihTzuDog" },                 
  { name: "Chihuahua Dog", path: "/PetAnimalsComp/Dogs/ChihuahuaDog" },                 
  { name: "Maltese Dog", path: "/PetAnimalsComp/Dogs/MalteseDog" },                 
  { name: "Husky Dog", path: "/PetAnimalsComp/Dogs/HuskyDog" },                 
  { name: "Dog Supplies", path: "/PetAnimalsComp/Dogs/DogSupplies" },                 
],
},
{ name: "Cows",
path: "/PetAnimalsComp/Cows",
subSubcategories: [          
  { name: "German Cows", path: "/PetAnimalsComp/Cows/GermanCows" },
  { name: "Local Cows", path: "/PetAnimalsComp/Cows/LocalCows" },                 
  { name: "Jersey Cows", path: "/PetAnimalsComp/Cows/JerseyCows" },                 
  { name: "Swiss Cows", path: "/PetAnimalsComp/Cows/SwissCows" },                 
  { name: "Dutch Cows", path: "/PetAnimalsComp/Cows/DutchCows" },                 
  { name: "Dairy Products", path: "/PetAnimalsComp/Cows/DairyProducts" },                 
],
},      
{ name: "Fish & Turtles", path: "/PetAnimalsComp/Fish&Turtles" },
{ name: "Rabbits", path: "/PetAnimalsComp/Rabbits" },



        { name: "Ducks",
path: "/PetAnimalsComp/Ducks",
subSubcategories: [          
  { name: "Bikini Ducks", path: "/PetAnimalsComp/Ducks/BikiniDucks" },  
  { name: "Sharshari Ducks", path: "/PetAnimalsComp/Ducks/SharshariDucks" },                 
  { name: "Geese", path: "/PetAnimalsComp/Ducks/Geese" },                 
  { name: "Fish", path: "/PetAnimalsComp/Ducks/Fish" },                 
  { name: "Bikini Ducks", path: "/PetAnimalsComp/Ducks/BikiniDucks" },                 

],
},
{ name: "Squirrels",
path: "/PetAnimalsComp/Squirrels",
subSubcategories: [          
  { name: "Turtles", path: "/PetAnimalsComp/Squirrels/Turtles" },   
  { name: "Sharshari Ducks", path: "/PetAnimalsComp/Squirrels/SharshariDucks" },                 
],
},

{ name: "Hamsters",
path: "/PetAnimalsComp/Hamsters",
subSubcategories: [          
  { name: "Geese", path: "/PetAnimalsComp/Hamsters/Geese" },                 
],

},
{ name: "Fur", path: "/PetAnimalsComp/Fur" },

      ],
    },
    {
      name: "Other",
      path: "/Education",
      subcategories: [
        { name: "Hunting & Trips", path: "/Education/Hunting&Trips" },
        { name: "Gardening & Agriculture", path: "/Education/Gardening&Agriculture" },
        { name: "Parties & Events", path: "/Education/Parties&Events" },
        { name: "Travel & Tourism", path: "/Education/Travel&Tourism" },
        { name: "Roommate", path: "/Education/Roommate" },
        { name: "Lost & Found", path: "/Education/Lost&Found" },
        { name: "Education & Training", path: "/Education/Education&Training" },
        { name: "Sports Training", path: "/Education/SportsTraining" },
        { name: "Stock & Forex Education", path: "/Education/Stock&ForexEducation" },
        { name: "Driving Lessons", path: "/Education/DrivingLessons" },
        { name: "Private Tutoring", path: "/Education/PrivateTutoring" },
        { name: "Training Courses", path: "/Education/TrainingCourses" },
        { name: "Antiques & Collectibles", path: "/Education/Antiques&Collectibles" },
        { name: "Projects & Investments", path: "/Education/Projects&Investments" },
        { name: "Books & Arts", path: "/Education/Books&Arts" },
        { name: "Programming & Design", path: "/Education/Programming&Design" },
        { name: "Food & Beverages", path: "/Education/Food&Beverages" },
      ],
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
            {openDropdown === category.name && category.subcategories.length > 0 && (
              <div className="mega-menu">
                <ul
                  className={`submenu-list ${
                    category.name === "Real Estate" ? "real-estate-scroll" : ""
                  }`}
                >
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory.name}
                      className="submenu-item"
                      onMouseEnter={() => setOpenSubDropdown(subcategory.name)}
                      onMouseLeave={() => setOpenSubDropdown(null)}
                    >
                      <NavLink
                        to={subcategory.path}
                        className={({ isActive }) =>
                          isActive ? "submenu-link active-link" : "submenu-link"
                        }
                      >
                        {subcategory.name}
                        {subcategory.subSubcategories && (
                          <span className="arrow"> ></span>
                        )}
                      </NavLink>
                      {subcategory.subSubcategories && openSubDropdown === subcategory.name && (
                        <div className="sub-submenu">
                          <ul className="submenu-list">
                            {subcategory.subSubcategories.map((subSubcategory) => (
                              <li key={subSubcategory.name} className="submenu-item">
                                <NavLink
                                  to={subSubcategory.path}
                                  className={({ isActive }) =>
                                    isActive ? "submenu-link active-link" : "submenu-link"
                                  }
                                >
                                  {subSubcategory.name}
                                </NavLink>
                              </li>
                            ))}
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