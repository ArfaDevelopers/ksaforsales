const data = [
  {
    name: "Motors",
    path: "/motors",
    subcategories: [
      {
        name: "Cars For Sale",
        path: "/motors?subcategory=cars-for-sale",
      },
      { name: "Car Rental", path: "/motors?subcategory=car-rental" },
      {
        name: "Plates Number",
        path: "/motors?subcategory=plates-number",
      },
      {
        name: "Spare Parts",
        path: "/motors?subcategory=spare-parts",
        nestedSubCategories: [
          {
            name: "Body Parts",
            path: "/motors?subcategory=spare-parts&nestedsubcategory=body-parts",
          },
          {
            name: "Mechanical Parts",
            path: "/motors?subcategory=spare-parts&nestedsubcategory=mechanical-parts",
          },
          {
            name: "Spare Parts",
            path: "/motors?subcategory=spare-parts&nestedsubcategory=spare-parts",
          },
          {
            name: "Batteries",
            path: "/motors?subcategory=spare-parts&nestedsubcategory=batteries",
          },
          {
            name: "Others",
            path: "/motors?subcategory=spare-parts&nestedsubcategory=others",
          },
        ],
      },
      { name: "Accessories", path: "/motors?subcategory=accessories" },
      {
        name: "Wheels & Rims",
        path: "/motors?subcategory=wheels-and-rims",
      },
      {
        name: "Trucks & Heavy Machinery",
        path: "/motors?subcategory=trucks-and-heavy-machinery",
        nestedSubCategories: [
          {
            name: "Trucks",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Trucks",
            // path: "/AutomotiveComp/TrucksHeavyMachinery/Trucks",
          },
          {
            name: "Dump Truck",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Dump Truck",
          },
          {
            name: "Wheel Loader",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Wheel Loader",
          },
          {
            name: "Recovery",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Recovery",
          },
          {
            name: "Agricultural Equipment",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Agricultural Equipment",
          },
          {
            name: "Crane",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Crane",
          },
          {
            name: "Bulldozer",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Bulldozer",
          },
          {
            name: "Crusher",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Crusher",
          },
          {
            name: "Excavator",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Excavator",
          },
          {
            name: "Heavy Equipment",
            path: "/AutomotiveComp?subCatgory=Trucks Heavy Machinery&nestedsubcategory=Heavy Equipment",
          },
        ],
      },
      { name: "Tshaleeh", path: "/motors?subcategory=tshaleeh" },
      {
        name: "Boats & Jet Ski",
        path: "/motors?subcategory=boats-and-jetski",
        nestedSubCategories: [
          {
            name: "Motorboats",
            path: "/motors?subcategory=boats-and-jetski&nestedsubcategory=motorboats",
          },
          {
            name: "Jet-ski",
            path: "/motors?subcategory=boats-and-jetski&nestedsubcategory=jetski",
          },
          {
            name: "Others",
            path: "/motors?subcategory=boats-and-jetski&nestedsubcategory=others",
          },
        ],
      },
      {
        name: "Classic Cars",
        path: "/motors?subcategory=classic-cars",
      },
      {
        name: "Salvage Cars",
        path: "/motors?subcategory=salvage-cars",
      },
      {
        name: "Mortgaged Cars",
        path: "/motors?subcategory=mortgaged-cars",
      },
      { name: "Recovery", path: "/motors?subcategory=recovery" },
      { name: "Food Truck", path: "/motors?subcategory=food-truck" },
      { name: "Caravans", path: "/motors?subcategory=caravans" },
      { name: "Reports", path: "/motors?subcategory=reports" },
      {
        name: "Car Cleaning",
        path: "/motors?subcategory=car-cleaning",
      },
    ],
    filters: [],
  },
  {
    name: "Electronics",
    path: "/electronics",
    subcategories: [
      {
        name: "Mobile Phones",
        path: "/electronics?subcategory=mobile-phones",
        nestedSubCategories: [
          {
            name: "Smart Watches",
            path: "/electronics?subcategory=mobile-phones&nestedsubcategory=smart-watches",
          },
          {
            name: "Headsets",
            path: "/electronics?subcategory=mobile-phones&nestedsubcategory=headsets",
          },
          {
            name: "Chargers & Cables",
            path: "/electronics?subcategory=mobile-phones&nestedsubcategory=chargers-and-cables",
          },
          {
            name: "Covers & Protectors",
            path: "/electronics?subcategory=mobile-phones&nestedsubcategory=covers-and-protectors",
          },
        ],
      },
      {
        name: "Tablet Devices",
        path: "/electronics?subcategory=tablet-devices",
        nestedSubCategories: [
          {
            name: "iPad",
            path: "/electronics?subcategory=tablet-devices&nestedsubcategory=ipad",
          },

          {
            name: "Galaxy Tab",
            path: "/electronics?subcategory=tablet-devices&nestedsubcategory=galaxy-tab",
          },
        ],
      },
      {
        name: "Computers & Laptops",
        path: "/electronics?subcategory=computers-and-laptops",
      },
      {
        name: "Video Games",
        path: "/electronics?subcategory=video-games",
        nestedSubCategories: [
          {
            name: "VR Glasses",
            path: "/electronics?subcategory=video-games&nestedsubcategory=vr-glasses",
          },
          {
            name: "PlayStation (PS) Devices",
            path: "/electronics?subcategory=video-games&nestedsubcategory=playstation-devices",
          },
          {
            name: "PlayStation (PS) Games",
            path: "/electronics?subcategory=video-games&nestedsubcategory=playstation-games",
          },
          {
            name: "Xbox Devices",
            path: "/electronics?subcategory=video-games&nestedsubcategory=xbox-devices",
          },
          {
            name: "Xbox Games",
            path: "/electronics?subcategory=video-games&nestedsubcategory=xbox-games",
          },
          {
            name: "Nintendo",
            path: "/electronics?subcategory=video-games&nestedsubcategory=nintendo",
          },
        ],
      },
      {
        name: "Television & Audio System",
        path: "/electronics?subcategory=television-and-audio-system",
      },
      {
        name: "Accounts & Subscriptions",
        path: "/electronics?subcategory=accounts-and-subscriptions",
        nestedSubCategories: [
          {
            name: "PUBG",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=pubg",
          },
          {
            name: "Fortnite",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=fortnite",
          },
          {
            name: "FIFA",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=fifa",
          },
          {
            name: "Clash of Clans",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=clash-of-clans",
          },
          {
            name: "Clash Royale",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=clash-royale",
          },
          {
            name: "Instagram Accounts",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=instagram-accounts",
          },
          {
            name: "Twitter Accounts",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=twitter-accounts",
          },
          {
            name: "TikTok Accounts",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=tiktok-accounts",
          },
          {
            name: "Snapchat Accounts",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=snapchat-accounts",
          },
          {
            name: "Facebook Accounts",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=facebook-accounts",
          },
          {
            name: "YouTube Accounts",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=youtube-accounts",
          },
          {
            name: "Other Accounts",
            path: "/electronics?subcategory=accounts-and-subscriptions&nestedsubcategory=other-accounts",
          },
        ],
      },
      {
        name: "Special Number",
        path: "/electronics?subcategory=special-number",
        nestedSubCategories: [
          {
            name: "STC",
            path: "/electronics?subcategory=special-number&nestedsubcategory=stc",
          },

          {
            name: "Mobily",
            path: "/electronics?subcategory=special-number&nestedsubcategory=mobily",
          },
          {
            name: "Zain",
            path: "/electronics?subcategory=special-number&nestedsubcategory=zain",
          },
        ],
      },
      {
        name: "Home & Kitchen Appliance",
        path: "/electronics?subcategory=home-and-kitchen-appliance",
        nestedSubCategories: [
          {
            name: "Stoves & Ovens",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=stoves-and-ovens",
          },
          {
            name: "Refrigerators & Coolers",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=refrigerators-and-coolers",
          },
          {
            name: "Mixers & Blenders",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=mixers-and-blenders",
          },
          {
            name: "Washing Machines",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=washing-machines",
          },
          {
            name: "Kettles",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=kettles",
          },
          {
            name: "Fryers",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=fryers",
          },
          {
            name: "Coffee Machines",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=coffee-machines",
          },
          {
            name: "Microwaves & Toasters",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=microwaves-and-toasters",
          },
          {
            name: "Vacuum Cleaners",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=vacuum-cleaners",
          },
          {
            name: "Clothing Irons",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=clothing-irons",
          },
          {
            name: "Air Conditioners",
            path: "/electronics?subcategory=home-and-kitchen-appliance&nestedsubcategory=air-conditioners",
          },
        ],
      },
      {
        name: "Motors & Generators",
        path: "/electronics?subcategory=motors-and-generators",
      },
      {
        name: "Cameras",
        path: "/electronics?subcategory=cameras",
        nestedSubCategories: [
          {
            name: "Lenses",
            path: "/electronics?subcategory=cameras&nestedsubcategory=lenses",
          },

          {
            name: "Drone",
            path: "/electronics?subcategory=cameras&nestedsubcategory=drone",
          },
          {
            name: "Camera Accessories",
            path: "/electronics?subcategory=cameras&nestedsubcategory=camera-accessories",
          },
        ],
      },
      {
        name: "Networking Devices",
        path: "/electronics?subcategory=networking-devices",
      },
      {
        name: "Screens & Projectors",
        path: "/electronics?subcategory=screens-and-projectors",
      },
      {
        name: "Printer & Scanner",
        path: "/electronics?subcategory=printer-and-scanner",
      },
      {
        name: "Computer Accessories",
        path: "/electronics?subcategory=computer-accessories",
      },
    ],
    filters: [],
  },
  {
    name: "Fashion Style",
    path: "/fashion-style",
    subcategories: [
      {
        name: "Watches",
        path: "/fashion-style?subcategory=watches",
        nestedSubCategories: [
          {
            name: "Men's Watches",
            path: "/fashion-style?subcategory=watches&nestedsubcategory=men-watches",
          },
          {
            name: "Women's Watches",
            path: "/fashion-style?subcategory=watches&nestedsubcategory=women-watches",
          },
          {
            name: "Other Watches",
            path: "/fashion-style?subcategory=watches&nestedsubcategory=other-watches",
          },
        ],
      },
      {
        name: "Perfumes & Incense",
        path: "/fashion-style?subcategory=perfumes-and-incense",
        nestedSubCategories: [
          {
            name: "Men's Perfumes",
            path: "/fashion-style?subcategory=perfumes-and-incense&nestedsubcategory=men-perfumes",
          },
          {
            name: "Women's Perfumes",
            path: "/fashion-style?subcategory=perfumes-and-incense&nestedsubcategory=women-perfumes",
          },
          {
            name: "Oud & Incense",
            path: "/fashion-style?subcategory=perfumes-and-incense&nestedsubcategory=oud-and-incense",
          },
          {
            name: "Other Perfumes",
            path: "/fashion-style?subcategory=perfumes-and-incense&nestedsubcategory=other-perfumes",
          },
        ],
      },
      {
        name: "Sports Equipment",
        path: "/fashion-style?subcategory=sports-equipment",
        nestedSubCategories: [
          {
            name: "Eyeglasses",
            path: "/fashion-style?subcategory=sports-equipment&nestedsubcategory=eyeglasses",
          },
          {
            name: "Men's Eyeglasses",
            path: "/fashion-style?subcategory=sports-equipment&nestedsubcategory=men-eyeglasses",
          },
          {
            name: "Women's Eyeglasses",
            path: "/fashion-style?subcategory=sports-equipment&nestedsubcategory=women-eyeglasses",
          },
          {
            name: "Other Eyeglasses",
            path: "/fashion-style?subcategory=sports-equipment&nestedsubcategory=other-eyeglasses",
          },
        ],
      },
      {
        name: "Men's Fashion",
        path: "/fashion-style?subcategory=men-fashion",
        nestedSubCategories: [
          {
            name: "Men's Shemaghs",
            path: "/fashion-style?subcategory=men-fashion&nestedsubcategory=men-shemaghs",
          },
          {
            name: "Men's Accessories",
            path: "/fashion-style?subcategory=men-fashion&nestedsubcategory=men-accessories",
          },
          {
            name: "Men's Clothing",
            path: "/fashion-style?subcategory=men-fashion&nestedsubcategory=men-clothing",
          },
          {
            name: "Men's Jackets",
            path: "/fashion-style?subcategory=men-fashion&nestedsubcategory=men-jackets",
          },
          {
            name: "Men's Bags",
            path: "/fashion-style?subcategory=men-fashion&nestedsubcategory=men-bags",
          },
          {
            name: "Men's Shirts & Trousers",
            path: "/fashion-style?subcategory=men-fashion&nestedsubcategory=men-shirts-and-trousers",
          },
          {
            name: "Men's Sportswear",
            path: "/fashion-style?subcategory=men-fashion&nestedsubcategory=men-sportswear",
          },
        ],
      },
      {
        name: "Women's Fashion",
        path: "/fashion-style?subcategory=women-fashion",
        nestedSubCategories: [
          {
            name: "Women's Accessories & Jewelry",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=women-accessories-and-jewelry",
          },
          {
            name: "Women's Blouses & T-Shirts",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=women-blouses-and-t-shirts",
          },
          {
            name: "Women's Skirts & Trousers",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=women-skirts-and-trousers",
          },
          {
            name: "Women's Jackets",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=women-jackets",
          },
          {
            name: "Kaftans",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=kaftans",
          },
          {
            name: "Women's Bags",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=women-bags",
          },
          {
            name: "Abayas",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=abayas",
          },
          {
            name: "Dresses",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=dresses",
          },
          {
            name: "Lingerie",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=lingerie",
          },
          {
            name: "Women's Sportswear",
            path: "/fashion-style?subcategory=women-fashion&nestedsubcategory=women-sportswear",
          },
        ],
      },
      {
        name: "Children's Clothing & Accessories",
        path: "/fashion-style?subcategory=children-clothing-and-accessories",
        nestedSubCategories: [
          {
            name: "Baby Care Products",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=baby-care-products",
          },
          {
            name: "Children's Accessories",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=children-accessories",
          },
          {
            name: "Toys for Kids",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=toys-for-kids",
          },
          {
            name: "Children's Cribs & Chairs",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=children-cribs-and-chairs",
          },
          {
            name: "Children's Bags",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=children-bags",
          },
          {
            name: "Strollers",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=strollers",
          },
          {
            name: "Car Seats for Kids",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=car-seats-for-kids",
          },
          {
            name: "Girls' Clothing",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=girls-clothing",
          },
          {
            name: "Boys' Clothing",
            path: "/fashion-style?subcategory=children-clothing-and-accessories&nestedsubcategory=boys-clothing",
          },
        ],
      },
      { name: "Gifts", path: "/fashion-style?subcategory=gifts" },
      { name: "Luggage", path: "/fashion-style?subcategory=luggage" },
      {
        name: "Health & Beauty",
        path: "/fashion-style?subcategory=health-and-beauty",
        nestedSubCategories: [
          {
            name: "Skincare",
            path: "/fashion-style?subcategory=health-and-beauty&nestedsubcategory=skincare",
          },

          {
            name: "Hair Care",
            path: "/fashion-style?subcategory=health-and-beauty&nestedsubcategory=hair-care",
          },
          {
            name: "Makeup",
            path: "/fashion-style?subcategory=health-and-beauty&nestedsubcategory=makeup",
          },
          {
            name: "Other Beauty Products",
            path: "/fashion-style?subcategory=health-and-beauty&nestedsubcategory=other-beauty-products",
          },
        ],
      },
    ],
    filters: [],
  },
  {
    name: "Home & Furniture",
    path: "/home-and-furniture",
    subcategories: [
      {
        name: "Outdoor Furniture",
        path: "/home-and-furniture?subcategory=outdoor-furniture",
      },
      {
        name: "Majlis & Sofas",
        path: "/home-and-furniture?subcategory=majlis-and-sofas",
      },
      {
        name: "Cabinets & Wardrobes",
        path: "/home-and-furniture?subcategory=cabinets-and-wardrobes",
      },
      {
        name: "Beds & Mattresses",
        path: "/home-and-furniture?subcategory=beds-and-mattresses",
      },
      {
        name: "Tables & Chairs",
        path: "/home-and-furniture?subcategory=tables-and-chairs",
      },
      { name: "Kitchens", path: "/home-and-furniture?subcategory=kitchens" },
      { name: "Bathrooms", path: "/home-and-furniture?subcategory=bathrooms" },
      { name: "Carpets", path: "/home-and-furniture?subcategory=carpets" },
      { name: "Curtains", path: "/home-and-furniture?subcategory=curtains" },
      {
        name: "Decoration & Accessories",
        path: "/home-and-furniture?subcategory=decoration-and-accessories",
      },
      { name: "Lighting", path: "/home-and-furniture?subcategory=lighting" },
      {
        name: "Household Items",
        path: "/home-and-furniture?subcategory=household-items",
      },
      {
        name: "Garden - Plants",
        path: "/home-and-furniture?subcategory=garden-plants",
      },
      {
        name: "Office Furniture",
        path: "/home-and-furniture?subcategory=office-furniture",
      },
      {
        name: "Doors - Windows - Aluminium",
        path: "/home-and-furniture?subcategory=doors-windows-aluminium",
      },
      {
        name: "Tiles & Flooring",
        path: "/home-and-furniture?subcategory=tiles-and-flooring",
      },
    ],
    filters: [],
  },
  {
    name: "Job Board",
    path: "/job-board",
    subcategories: [
      {
        name: "Administrative Jobs",
        path: "/job-board?subcategory=administrative-jobs",
        nestedSubCategories: [
          {
            name: "Marketing & Sales",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=marketing-and-sales",
          },
          {
            name: "Customer Service",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=customer-service",
          },
          {
            name: "Secretary",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=secretary",
          },
          {
            name: "Tourism & Hospitality",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=tourism-and-hospitality",
          },
          {
            name: "Accountant",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=accountant",
          },
          {
            name: "Delivery Representative",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=delivery-representative",
          },
          {
            name: "Public Relations & Media",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=public-relations-and-media",
          },
          {
            name: "Translator",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=translator",
          },
          {
            name: "Lawyer & Legal Jobs",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=lawyer-and-legal-jobs",
          },
          {
            name: "Other Administrative Jobs",
            path: "/job-board?subcategory=administrative-jobs&nestedsubcategory=other-adminstrative-jobs",
          },
        ],
      },
      {
        name: "Fashion & Beauty Jobs",
        path: "/job-board?subcategory=fashion-and-beauty-jobs",
        nestedSubCategories: [
          {
            name: "Tailor",
            path: "/job-board?subcategory=fashion-and-beauty-jobs&nestedsubcategory=tailor",
          },

          {
            name: "Female Hairdresser",
            path: "/job-board?subcategory=fashion-and-beauty-jobs&nestedsubcategory=female-hairdresser",
          },
          {
            name: "Fashion Designer",
            path: "/job-board?subcategory=fashion-and-beauty-jobs&nestedsubcategory=fashion-designer",
          },
          {
            name: "Model",
            path: "/job-board?subcategory=fashion-and-beauty-jobs&nestedsubcategory=model",
          },
          {
            name: "Makeup Artist",
            path: "/job-board?subcategory=fashion-and-beauty-jobs&nestedsubcategory=makeup-artist",
          },
          {
            name: "Hair Stylist",
            path: "/job-board?subcategory=fashion-and-beauty-jobs&nestedsubcategory=hair-stylist",
          },
          {
            name: "Other Beauty Jobs",
            path: "/job-board?subcategory=fashion-and-beauty-jobs&nestedsubcategory=other-beauty-jobs",
          },
        ],
      },
      {
        name: "Security & Safety Jobs",
        path: "/job-board?subcategory=security-and-safety-jobs",
        nestedSubCategories: [
          {
            name: "Security Guard",
            path: "/job-board?subcategory=security-and-safety-jobs&nestedsubcategory=security-guard",
          },
          {
            name: "Safety Technician",
            path: "/job-board?subcategory=security-and-safety-jobs&nestedsubcategory=safety-technician",
          },
        ],
      },
      { name: "Teaching Jobs", path: "/job-board?subcategory=teaching-jobs" },
      {
        name: "IT & Design Jobs",
        path: "/job-board?subcategory=it-and-design-jobs",
        nestedSubCategories: [
          {
            name: "Network & Telecommunications Specialist",
            path: "/job-board?subcategory=it-and-design-jobs&nestedsubcategory=network-and-telecommunications-specialist",
          },
          {
            name: "Content Writer",
            path: "/job-board?subcategory=it-and-design-jobs&nestedsubcategory=content-writer",
          },
          {
            name: "Programmer",
            path: "/job-board?subcategory=it-and-design-jobs&nestedsubcategory=programmer",
          },
          {
            name: "Media Designer",
            path: "/job-board?subcategory=it-and-design-jobs&nestedsubcategory=media-designer",
          },
          {
            name: "Other IT Jobs",
            path: "/job-board?subcategory=it-and-design-jobs&nestedsubcategory=other-it-jobs",
          },
        ],
      },
      {
        name: "Agriculture & Farming Jobs",
        path: "/job-board?subcategory=agriculture-and-farming-jobs",
        nestedSubCategories: [
          {
            name: "Farm Worker",
            path: "/job-board?subcategory=agriculture-and-farming-jobs&nestedsubcategory=farm-worker",
          },
          {
            name: "Other Agricultural Jobs",
            path: "/job-board?subcategory=agriculture-and-farming-jobs&nestedsubcategory=other-agricultural-jobs",
          },
        ],
      },
      {
        name: "Industrial Jobs",
        path: "/job-board?subcategory=industrial-jobs",
        nestedSubCategories: [
          {
            name: "Bodywork Technician",
            path: "/job-board?subcategory=industrial-jobs&nestedsubcategory=bodywork-technician",
          },
          {
            name: "Auto Electrician",
            path: "/job-board?subcategory=industrial-jobs&nestedsubcategory=auto-electrician",
          },
          {
            name: "Car Mechanic",
            path: "/job-board?subcategory=industrial-jobs&nestedsubcategory=car-mechanic",
          },
          {
            name: "Other Industrial Jobs",
            path: "/job-board?subcategory=industrial-jobs&nestedsubcategory=other-industrial-jobs",
          },
        ],
      },
      {
        name: "Medical & Nursing Jobs",
        path: "/job-board?subcategory=medical-and-nursing-jobs",
        nestedSubCategories: [
          {
            name: "Pharmacist",
            path: "/job-board?subcategory=medical-and-nursing-jobs&nestedsubcategory=pharmacist",
          },
          {
            name: "Doctor",
            path: "/job-board?subcategory=medical-and-nursing-jobs&nestedsubcategory=doctor",
          },
          {
            name: "Physical Therapy Technician",
            path: "/job-board?subcategory=medical-and-nursing-jobs&nestedsubcategory=physical-therapy-technician",
          },
          {
            name: "Massage Therapist",
            path: "/job-board?subcategory=medical-and-nursing-jobs&nestedsubcategory=massage-therapist",
          },
          {
            name: "Nurse",
            path: "/job-board?subcategory=medical-and-nursing-jobs&nestedsubcategory=nurse",
          },
          {
            name: "Other Medical Jobs",
            path: "/job-board?subcategory=medical-and-nursing-jobs&nestedsubcategory=other-medical-jobs",
          },
        ],
      },
      {
        name: "Architecture & Construction Jobs",
        path: "/job-board?subcategory=architecture-and-construction-jobs",
        nestedSubCategories: [
          {
            name: "Building Painter",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=building-painter",
          },
          {
            name: "AC Technician",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=ac-technician",
          },
          {
            name: "Decorator",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=decorator",
          },
          {
            name: "Building Electrician",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=building-electrician",
          },
          {
            name: "Tiler",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=tiler",
          },
          {
            name: "Building Supervisor",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=building-supervisor",
          },
          {
            name: "Building Contractor",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=building-contractor",
          },
          {
            name: "Plasterer",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=plasterer",
          },
          {
            name: "Carpenter",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=carpenter",
          },
          {
            name: "Plumber",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=plumber",
          },
          {
            name: "Other Construction Jobs",
            path: "/job-board?subcategory=architecture-and-construction-jobs&nestedsubcategory=other-construction-jobs",
          },
        ],
      },
      {
        name: "Housekeeping Jobs",
        path: "/job-board?subcategory=housekeeping-jobs",
        nestedSubCategories: [
          {
            name: "Private Driver",
            path: "/job-board?subcategory=housekeeping-jobs&nestedsubcategory=private-driver",
          },
          {
            name: "Household Worker",
            path: "/job-board?subcategory=housekeeping-jobs&nestedsubcategory=household-worker",
          },
          {
            name: "Domestic Worker",
            path: "/job-board?subcategory=housekeeping-jobs&nestedsubcategory=domestic-worker",
          },
          {
            name: "Other Labor Jobs",
            path: "/job-board?subcategory=housekeeping-jobs&nestedsubcategory=other-labor-jobs",
          },
        ],
      },
      {
        name: "Restaurant Jobs",
        path: "/job-board?subcategory=restaurant-jobs",
        nestedSubCategories: [
          {
            name: "Chef & Cook Instructor",
            path: "/job-board?subcategory=restaurant-jobs&nestedsubcategory=chef-and-cook-instructor",
          },
          {
            name: "Waiter & Host",
            path: "/job-board?subcategory=restaurant-jobs&nestedsubcategory=waiter-and-host",
          },
          {
            name: "Other Restaurant Jobs",
            path: "/job-board?subcategory=restaurant-jobs&nestedsubcategory=other-restaurant-jobs",
          },
        ],
      },
    ],
    filters: [],
  },
  {
    name: "Realestate",
    path: "/realestate",
    subcategories: [
      {
        name: "Apartments for Rent",
        path: "/realestate?subcategory=apartments-for-rent",
      },
      {
        name: "Apartments for Sale",
        path: "/realestate?subcategory=apartments-for-sale",
      },
      {
        name: "Building for Rent",
        path: "/realestate?subcategory=building-for-rent",
      },
      {
        name: "Building for Sale",
        path: "/realestate?subcategory=building-for-sale",
      },
      {
        name: "Camps for Rent",
        path: "/realestate?subcategory=camps-for-rent",
      },
      {
        name: "Chalets for Sale",
        path: "/realestate?subcategory=chalets-for-sale",
      },
      {
        name: "Commercial Lands for Sale",
        path: "/realestate?subcategory=commercial-lands-for-sale",
      },
      {
        name: "Compound for Rent",
        path: "/realestate?subcategory=compound-for-rent",
      },
      {
        name: "Compound for Sale",
        path: "/realestate?subcategory=compound-for-sale",
      },
      {
        name: "Farm for Rent",
        path: "/realestate?subcategory=farm-for-rent",
      },
      {
        name: "Farms for Sale",
        path: "/realestate?subcategory=farms-for-sale",
      },
      {
        name: "Floor for Sale",
        path: "/realestate?subcategory=floor-for-sale",
      },
      {
        name: "Floors for Rent",
        path: "/realestate?subcategory=floors-for-rent",
      },
      {
        name: "Hall for Rent",
        path: "/realestate?subcategory=hall-for-rent",
      },
      {
        name: "Houses for Rent",
        path: "/realestate?subcategory=houses-for-rent",
      },
      {
        name: "Houses for Sale",
        path: "/realestate?subcategory=houses-for-sale",
      },
      {
        name: "Lands for Sale",
        path: "/realestate?subcategory=lands-for-sale",
      },
      {
        name: "Offices for Rent",
        path: "/realestate?subcategory=offices-for-rent",
      },
      {
        name: "Rest Houses for Rent",
        path: "/realestate?subcategory=rest-houses-for-rent",
      },
      {
        name: "Rest Houses for Sale",
        path: "/realestate?subcategory=rest-houses-for-sale",
      },
      {
        name: "Rooms for Rent",
        path: "/realestate?subcategory=rooms-for-rent",
      },
      {
        name: "Shops for Rent",
        path: "/realestate?subcategory=shops-for-rent",
      },
      {
        name: "Shops for Transfer",
        path: "/realestate?subcategory=shops-for-transfer",
      },
      {
        name: "Villas for Rent",
        path: "/realestate?subcategory=villas-for-rent",
      },
      {
        name: "Villas for Sale",
        path: "/realestate?subcategory=villas-for-sale",
      },
      {
        name: "Warehouse for Sale",
        path: "/realestate?subcategory=warehouse-for-sale",
      },
      {
        name: "Warehouse for Rent",
        path: "/realestate?subcategory=warehouse-for-rent",
      },
    ],
    filters: [],
  },
  {
    name: "Services",
    path: "/services",
    subcategories: [
      {
        name: "Contracting Services",
        path: "/services?subcategory=contracting-services",
      },
      {
        name: "Government Paperwork Services",
        path: "/services?subcategory=government-paperwork-services",
      },
      {
        name: "Delivery Services",
        path: "/services?subcategory=delivery-services",
      },
      {
        name: "Furniture Moving Services",
        path: "/services?subcategory=furniture-moving-services",
      },
      {
        name: "Cleaning Services",
        path: "/services?subcategory=cleaning-services",
      },
      {
        name: "International Shopping Services",
        path: "/services?subcategory=international-shopping-services",
      },
      {
        name: "Legal Services",
        path: "/services?subcategory=legal-services",
      },
      {
        name: "Accounting & Financial Services",
        path: "/services?subcategory=accounting-and-financial-services",
      },
      {
        name: "Other Services",
        path: "/services?subcategory=other-services",
      },
    ],
    filters: [],
  },
  {
    name: "Sport & Game",
    path: "/sport-and-game",
    subcategories: [
      {
        name: "Gaming Consoles",
        path: "/sport-and-game?subcategory=gaming-consoles",
      },
      { name: "Video Games", path: "/sport-and-game?subcategory=video-games" },
      { name: "Controllers", path: "/sport-and-game?subcategory=controllers" },
      {
        name: "Gaming Accessories",
        path: "/sport-and-game?subcategory=gaming-accessories",
      },
      { name: "Gift Cards", path: "/sport-and-game?subcategory=gift-cards" },
      { name: "Accounts", path: "/sport-and-game?subcategory=accounts" },
      { name: "Toys", path: "/sport-and-game?subcategory=toys" },
    ],
    filters: [],
  },
  {
    name: "Pet & Animals",
    path: "/pet-and-animals",
    subcategories: [
      {
        name: "Sheep",
        path: "/pet-and-animals?subcategory=sheep",
        nestedSubCategories: [
          {
            name: "Barbary Sheep",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=barbary-sheep",
          },
          {
            name: "Hure Sheep",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=hure-sheep",
          },
          {
            name: "Romanian Sheep",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=romanian-sheep",
          },
          {
            name: "Sawakni Sheep",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=sawakni-sheep",
          },
          {
            name: "Najdi Sheep",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=najdi-sheep",
          },
          {
            name: "Naemi Sheep",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=naemi-sheep",
          },
          {
            name: "Rafidi Sheep",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=rafidi-sheep",
          },
          {
            name: "Sheep Supplies",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=sheep-supplies",
          },
          {
            name: "Sheep Products",
            path: "/pet-and-animals?subcategory=sheep&nestedsubcategory=sheep-products",
          },
        ],
      },
      {
        name: "Goats",
        path: "/pet-and-animals?subcategory=goats",
        nestedSubCategories: [
          {
            name: "Local Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=local-goats",
          },

          {
            name: "Bishi Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=bishi-goats",
          },
          {
            name: "Southern Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=southern-goats",
          },
          {
            name: "Hejaz Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=hejaz-goats",
          },
          {
            name: "Shami Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=shami-goats",
          },
          {
            name: "Ardi Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=ardi-goats",
          },
          {
            name: "Dutch Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=dutch-goats",
          },
          {
            name: "Dwarf Goats",
            path: "/pet-and-animals?subcategory=goats&nestedsubcategory=dwarf-goats",
          },
        ],
      },
      {
        name: "Parrot",
        path: "/pet-and-animals?subcategory=parrot",
        nestedSubCategories: [
          {
            name: "Amazoni Parrot",
            path: "/pet-and-animals?subcategory=parrot&nestedsubcategory=amazoni-parrot",
          },
          {
            name: "Congo African Grey Parrot",
            path: "/pet-and-animals?subcategory=parrot&nestedsubcategory=congo-african-grey-parrot",
          },
          {
            name: "Cockatoo Parrot",
            path: "/pet-and-animals?subcategory=parrot&nestedsubcategory=cockatoo-parrot",
          },
          {
            name: "Macaw Parrot",
            path: "/pet-and-animals?subcategory=parrot&nestedsubcategory=macaw-parrot",
          },
          {
            name: "Pet Birds",
            path: "/pet-and-animals?subcategory=parrot&nestedsubcategory=pet-birds",
          },
          {
            name: "Bird Supplies",
            path: "/pet-and-animals?subcategory=parrot&nestedsubcategory=bird-supplies",
          },
        ],
      },
      {
        name: "Dove/Pigeon",
        path: "/pet-and-animals?subcategory=dove-and-pigeon",
        nestedSubCategories: [
          {
            name: "Pakistani Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=pakistani-pigeon",
          },
          {
            name: "Turkish Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=turkish-pigeon",
          },
          {
            name: "Homers (Pigeons)",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=homers",
          },
          {
            name: "Sudanese Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=sudanese-pigeon",
          },
          {
            name: "Shami Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=shami-pigeon",
          },
          {
            name: "Sanaani Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=sanaani-pigeon",
          },
          {
            name: "French Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=french-pigeon",
          },
          {
            name: "Egyptian Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=egyptian-pigeon",
          },
          {
            name: "Indian Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=indian-pigeon",
          },
          {
            name: "Dutch Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=dutch-pigeon",
          },
          {
            name: "Qatifi Pigeon",
            path: "/pet-and-animals?subcategory=dove-and-pigeon&nestedsubcategory=qatifi-pigeon",
          },
        ],
      },
      {
        name: "Cats",
        path: "/pet-and-animals?subcategory=cats",
        nestedSubCategories: [
          {
            name: "Scottish Cats",
            path: "/pet-and-animals?subcategory=cats&nestedsubcategory=scottish-cats",
          },
          {
            name: "Persian Cats",
            path: "/pet-and-animals?subcategory=cats&nestedsubcategory=persian-cats",
          },
          {
            name: "Cats for Adoption",
            path: "/pet-and-animals?subcategory=cats&nestedsubcategory=cats-for-adoption",
          },
          {
            name: "Himalayan Cats",
            path: "/pet-and-animals?subcategory=cats&nestedsubcategory=himalayan-cats",
          },
          {
            name: "Cat Supplies",
            path: "/pet-and-animals?subcategory=cats&nestedsubcategory=cat-supplies",
          },
        ],
      },
      {
        name: "Chickens",
        path: "/pet-and-animals?subcategory=chickens",
        nestedSubCategories: [
          {
            name: "Brahma Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=brahma-chickens",
          },
          {
            name: "Local Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=local-chickens",
          },
          {
            name: "Turkish Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=turkish-chickens",
          },
          {
            name: "Turkey Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=turkey-chickens",
          },
          {
            name: "Persian Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=persian-chickens",
          },
          {
            name: "French Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=french-chickens",
          },
          {
            name: "Fayoumi Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=fayoumi-chickens",
          },
          {
            name: "Pakistani Chickens",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=pakistani-chickens",
          },
          {
            name: "Poultry Supplies",
            path: "/pet-and-animals?subcategory=chickens&nestedsubcategory=poultry-supplies",
          },
        ],
      },
      {
        name: "Camels",
        path: "/pet-and-animals?subcategory=camels",
        nestedSubCategories: [
          {
            name: "Bakar Camels",
            path: "/pet-and-animals?subcategory=camels&nestedsubcategory=bakar-camels",
          },
          {
            name: "Stud Camels",
            path: "/pet-and-animals?subcategory=camels&nestedsubcategory=stud-camels",
          },
          {
            name: "Camel Stallions",
            path: "/pet-and-animals?subcategory=camels&nestedsubcategory=camel-stallions",
          },
          {
            name: "Female Camels",
            path: "/pet-and-animals?subcategory=camels&nestedsubcategory=female-camels",
          },
          {
            name: "Camel Supplies",
            path: "/pet-and-animals?subcategory=camels&nestedsubcategory=camel-supplies",
          },
        ],
      },
      {
        name: "Horses",
        path: "/pet-and-animals?subcategory=horses",
        nestedSubCategories: [
          {
            name: "Popular Horses",
            path: "/pet-and-animals?subcategory=horses&nestedsubcategory=popular-horses",
          },
          {
            name: "Mixed Horses",
            path: "/pet-and-animals?subcategory=horses&nestedsubcategory=mixed-horses",
          },
          {
            name: "Wahho Horses",
            path: "/pet-and-animals?subcategory=horses&nestedsubcategory=wahho-horses",
          },
          {
            name: "English Horses",
            path: "/pet-and-animals?subcategory=horses&nestedsubcategory=english-horses",
          },
          {
            name: "Horse Supplies",
            path: "/pet-and-animals?subcategory=horses&nestedsubcategory=horse-supplies",
          },
        ],
      },
      {
        name: "Dogs",
        path: "/pet-and-animals?subcategory=dogs",
        nestedSubCategories: [
          {
            name: "Pitbull Dogs",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=pitbull-dogs",
          },

          {
            name: "Pomeranian Dogs",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=pomeranian-dogs",
          },
          {
            name: "Golden Retriever Dogs",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=golden-retriever-dogs",
          },
          {
            name: "German Shepherd Dogs",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=german-shepherd-dogs",
          },
          {
            name: "Shih Tzu Dog",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=shih-tzu-dog",
          },
          {
            name: "Chihuahua Dog",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=chihuahua-dog",
          },
          {
            name: "Maltese Dog",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=maltese-dog",
          },
          {
            name: "Husky Dog",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=husky-dog",
          },
          {
            name: "Dog Supplies",
            path: "/pet-and-animals?subcategory=dogs&nestedsubcategory=dog-supplies",
          },
        ],
      },
      {
        name: "Cows",
        path: "/pet-and-animals?subcategory=cows",
        nestedSubCategories: [
          {
            name: "German Cows",
            path: "/pet-and-animals?subcategory=cows&nestedsubcategory=german-cows",
          },
          {
            name: "Local Cows",
            path: "/pet-and-animals?subcategory=cows&nestedsubcategory=local-cows",
          },
          {
            name: "Jersey Cows",
            path: "/pet-and-animals?subcategory=cows&nestedsubcategory=jersey-cows",
          },
          {
            name: "Swiss Cows",
            path: "/pet-and-animals?subcategory=cows&nestedsubcategory=swiss-cows",
          },
          {
            name: "Dutch Cows",
            path: "/pet-and-animals?subcategory=cows&nestedsubcategory=dutch-cows",
          },
          {
            name: "Dairy Products",
            path: "/pet-and-animals?subcategory=cows&nestedsubcategory=dairy-products",
          },
        ],
      },
      {
        name: "Fish & Turtles",
        path: "/pet-and-animals?subcategory=fish-and-turtles",
      },
      { name: "Rabbits", path: "/pet-and-animals?subcategory=rabbits" },

      {
        name: "Ducks",
        path: "/pet-and-animals?subcategory=ducks",
        nestedSubCategories: [
          {
            name: "Bikini Ducks",
            path: "/pet-and-animals?subcategory=ducks&nestedsubcategory=bikini-ducks",
          },

          {
            name: "Sharshari Ducks",
            path: "/pet-and-animals?subcategory=ducks&nestedsubcategory=sharshari-ducks",
          },
          {
            name: "Geese",
            path: "/pet-and-animals?subcategory=ducks&nestedsubcategory=geese",
          },
          {
            name: "Fish",
            path: "/pet-and-animals?subcategory=ducks&nestedsubcategory=fish",
          },
          {
            name: "Bikini Ducks",
            path: "/pet-and-animals?subcategory=ducks&nestedsubcategory=bikini-ducks",
          },
        ],
      },
      {
        name: "Squirrels",
        path: "/pet-and-animals?subcategory=squirrels",
        nestedSubCategories: [
          {
            name: "Turtles",
            path: "/pet-and-animals?subcategory=squirrels&nestedsubcategory=turtles",
          },

          {
            name: "Sharshari Ducks",
            path: "/pet-and-animals?subcategory=squirrels&nestedsubcategory=sharshari-ducks",
          },
        ],
      },
      {
        name: "Hamsters",
        path: "/pet-and-animals?subcategory=hamsters",
        nestedSubCategories: [
          {
            name: "Geese",
            path: "/pet-and-animals?subcategory=hamsters&nestedsubcategory=geese",
          },
        ],
      },
      { name: "Fur", path: "/pet-and-animals?subcategory=fur" },
    ],
    filters: [],
  },
  {
    name: "Others",
    path: "/others",
    subcategories: [
      {
        name: "Hunting & Trips",
        path: "/others?subcategory=hunting-and-trips",
      },
      {
        name: "Gardening & Agriculture",
        path: "/others?subcategory=gardening-and-agriculture",
      },
      {
        name: "Parties & Events",
        path: "/others?subcategory=parties-and-events",
      },
      {
        name: "Travel & Tourism",
        path: "/others?subcategory=travel-and-tourism",
      },
      { name: "Roommate", path: "/others?subcategory=roommate" },
      { name: "Lost & Found", path: "/others?subcategory=lost-and-found" },
      {
        name: "Education & Training",
        path: "/others?subcategory=education-and-training",
      },
      {
        name: "Sports Training",
        path: "/others?subcategory=sports-training",
      },
      {
        name: "Stock & Forex Education",
        path: "/others?subcategory=stock-and-forex-education",
      },
      {
        name: "Driving Lessons",
        path: "/others?subcategory=driving-lessons",
      },
      {
        name: "Private Tutoring",
        path: "/others?subcategory=private-tutoring",
      },
      {
        name: "Training Courses",
        path: "/others?subcategory=training-courses",
      },
      {
        name: "Antiques & Collectibles",
        path: "/others?subcategory=antiques-and-collectibles",
      },
      {
        name: "Projects & Investments",
        path: "/others?subcategory=projects-and-Investments",
      },
      { name: "Books & Arts", path: "/others?subcategory=books-and-arts" },
      {
        name: "Programming & Design",
        path: "/others?subcategory=programming-and-design",
      },
      {
        name: "Food & Beverages",
        path: "/others?subcategory=food-and-beverages",
      },
    ],
    filters: [],
  },
  {
    lebel: "Commercial",
    path: "/commercial",
  },
];
