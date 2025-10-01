export const data = [
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
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Trucks",
          },
          {
            name: "Dump Truck",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Dump Truck",
          },
          {
            name: "Wheel Loader",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Wheel Loader",
          },
          {
            name: "Recovery",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Recovery",
          },
          {
            name: "Agricultural Equipment",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Agricultural Equipment",
          },
          {
            name: "Crane",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Crane",
          },
          {
            name: "Bulldozer",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Bulldozer",
          },
          {
            name: "Crusher",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Crusher",
          },
          {
            name: "Excavator",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Excavator",
          },
          {
            name: "Heavy Equipment",
            path: "/AutomotiveComp?subcategory=trucks-and-heavy-machinery&nestedsubcategory=Heavy Equipment",
          },
        ],
      },
      { name: "Tshaleeh", path: "/motors?subcategory=tshaleeh" },
      {
        name: "Boats & JetSki",
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
    filters: {
      brand: {
        name: "Brand",
        select: "single",
        type: "checkbox",
        select: "single",
        options: [
          {
            name: "Toyota",
            select: "multiple",
            select: "multiple",
            models: [
              "Land Cruiser",
              "Camry",
              "Avalon",
              "Hilux",
              "Corolla",
              "FJ Cruiser",
              "Land Cruiser 70 Series",
              "Land Cruiser 70 Series Pick up",
              "Yaris",
              "Land Cruiser Prado",
              "Fortuner",
              "Aurion",
              "Cressida",
              "Sequoia",
              "Bus",
              "Innova",
              "RAV4",
              "XA",
              "Eco",
              "Tundra",
              "Previa",
              "Supra",
              "Toyota 86",
              "Avanza",
              "Highlander",
              "Prius",
              "Rush",
              "Granvia",
              "C-HR",
              "Corolla Cross",
              "Raize",
              "Crown",
              "Urban Cruiser",
            ],
          },
          {
            name: "Ford",
            select: "multiple",
            models: [
              "Crown Victoria",
              "Grand Marquis",
              "Explorer",
              "Taurus",
              "Expedition",
              "Mustang",
              "Edge",
              "f150",
              "Fusion",
              "Windstar",
              "Flex",
              "Fox",
              "Mondeo",
              "f250",
              "f350",
              "Ranger",
              "X Corgan",
              "Pick up",
              "Escape",
              "Splash",
              "Panther",
              "Thunderbird",
              "F450",
              "F550",
              "Escort",
              "Ecosport",
              "vans ford",
              "Figo",
              "Bronco",
              "Territory",
              "Everest",
            ],
          },
          {
            name: "Chevrolet",
            select: "multiple",
            models: [
              "Caprice",
              "Tahoe",
              "Suburban",
              "Lumina",
              "Salvador",
              "Camaro",
              "Blazer",
              "Epica",
              "Malibu",
              "Aveo",
              "Cruze",
              "Optra",
              "Trail Blazer",
              "Avalanche",
              "Corvette",
              "فان",
              "Impala",
              "Traverse",
              "Uplander",
              "Express Van",
              "فنشر",
              "Captiva",
              "Astro Van",
              "Sonic",
              "Spark",
              "Caravan",
              "Cavalier",
              "Colorado",
              "جي فان",
              "Equinox",
              "Bolt",
              "Groove",
              "Trax",
            ],
          },
          {
            name: "Nissan",
            select: "multiple",
            models: [
              "Patrol",
              "DDSEN",
              "Tama",
              "Maxima",
              "Pathfinder",
              "Sunny",
              "Armada",
              "Xterra",
              "Class Z",
              "Nissan Shass",
              "Navara",
              "Murano",
              "Tiida",
              "Orphan",
              "Skyline",
              "Sentra",
              "X Trail",
              "Gloria",
              "Primera",
              "Terrano",
              "Qashqai",
              "Juke",
              "Kicks",
              "370Z",
              "GTR",
              "Civilian",
              "Patrol Safari",
              "Cedric",
              "Patrol NISMO",
            ],
          },
          {
            name: "Hyundai",
            select: "multiple",
            models: [
              "Sonata",
              "Elantra",
              "Accent",
              "Azera",
              "Hyundai H1",
              "Sentavi",
              "Tucson",
              "Veloster",
              "Trajet",
              "i40",
              "Centennial",
              "Coupe",
              "i10",
              "Veracruz",
              "Terracan",
              "Matrix",
              "Galloper",
              "Kona",
              "Creta",
              "Palisade",
              "Grand Santa Fe",
              "i30",
              "Venue",
              "Staria",
              "Stargazer",
            ],
          },
          {
            name: "Genesis",
            select: "multiple",
            models: ["G70", "G80", "G90", "GV80", "GV70"],
          },
          {
            name: "Lexus",
            select: "multiple",
            models: [
              "LS",
              "LX",
              "ES",
              "GS",
              "IS",
              "RX",
              "GX",
              "SC",
              "NX",
              "LC",
              "RC",
              "RCF",
              "UX",
              "GSF",
            ],
          },
          {
            name: "GMC",
            select: "multiple",
            models: [
              "Yukon",
              "Superban",
              "Sierra",
              "Pick up",
              "Envoy",
              "Acadia",
              "Van",
              "Savana",
              "Safari",
              "Terrain",
              "Jimmy",
            ],
          },
          {
            name: "Mercedes",
            select: "multiple",
            models: [
              "S",
              "E",
              "SE",
              "SEL",
              "AMG",
              "Mercedes-Benz G",
              "C",
              "SL",
              "CLS",
              "ML",
              "CL",
              "CLK",
              "SEC",
              "SLK",
              "A-Class",
              "GLS",
              "GLE",
              "GLC",
              "GLA",
              "CLA",
              "V-Class",
              "B",
              "GL",
              "GLK",
              "GT",
              "GTS",
              "R",
              "SLC",
              "Van Sprinter",
              "Maybach",
              "GLB",
              "EQA",
              "EQB",
              "EQE",
              "EQS",
            ],
          },
          {
            name: "Honda",
            select: "multiple",
            models: [
              "Accord",
              "Civic",
              "Odyssey",
              "CRV",
              "Baylott",
              "City",
              "Legends",
              "Brielle",
              "Integra",
              "HRV",
              "ZRV",
            ],
          },
          {
            name: "BMW",
            select: "multiple",
            models: [
              "Series VII",
              "Fifth Series",
              "Series X",
              "Series III",
              "Series VI",
              "Series 1st",
              "Series M",
              "Mini Cooper",
              "Series Z",
              "Series i",
              "Series 8",
              "Series 2",
              "Series 4",
            ],
          },
          {
            name: "Motorcycles",
            select: "multiple",
            models: [
              "Suzuki",
              "Yamaha Motorcycles",
              "Chinese Motorcycle",
              "Honda Motorcycles",
              "Harley Motorcycles",
              "Ram's Motorcycles",
              "Kuzaki Motorcycles",
              "Jet Ski",
              "BMW Motorcycle",
              "KTM Motorcycles",
              "indian Motorcycle",
              "Buggy Car",
              "Polaris Bike",
              "can am",
              "Karting",
              "Haojue Motorcycle",
            ],
          },
          {
            name: "Kia",
            select: "multiple",
            models: [
              "Optima",
              "Cerato",
              "Rio",
              "Carnival",
              "Sportage",
              "Cadenza",
              "Opirus",
              "Sorento",
              "Cairns",
              "Picanto",
              "Mohave",
              "Corres",
              "Soul",
              "Sephia",
              "K900",
              "Pegas",
              "Telluride",
              "Stinger",
              "Seltos",
              "Niro",
              "K5",
              "Sonet",
              "NS",
            ],
          },
          {
            name: "Dodge",
            select: "multiple",
            models: [
              "Charger",
              "Gallinger",
              "Durango",
              "Caravan",
              "Archer",
              "Nitro",
              "Caliber",
              "Fiber",
              "Dodge Pickup",
              "Voyager",
              "Interpid",
              "Neon",
            ],
          },
          {
            name: "Chrysler",
            select: "multiple",
            models: [
              "M300",
              "C300",
              "Grand Voyager",
              "Concorde",
              "Crossfire",
              "C200",
              "PT Cruiser",
              "Imperial",
              "Plymouth",
              "Pacifica",
            ],
          },
          {
            name: "Jeep",
            select: "multiple",
            models: [
              "Cherokee",
              "Grand Cherokee",
              "Wrangler",
              "Liberty",
              "Renegade",
              "Compass",
              "Geladiator",
            ],
          },
          {
            name: "Mitsubishi",
            select: "multiple",
            models: [
              "Pajero",
              "Lancer",
              "L200",
              "Nativa",
              "Galant",
              "Colt",
              "Magna",
              "Sigma",
              "ASX",
              "Attrage",
              "Eclipse Cross",
              "Outlander",
              "Space Star",
              "Montero",
              "Xpander",
              "Grandis",
            ],
          },
          {
            name: "Mazda",
            select: "multiple",
            models: [
              "Mazda 6",
              "CX9",
              "Mazda 3",
              "323",
              "626",
              "CX7",
              "BT50",
              "MPV",
              "CX5",
              "CX2",
              "RX8",
              "MX-5",
              "CX3",
              "Mazda 2",
              "Mazda 5",
              "CX30",
              "CX60",
              "CX90",
            ],
          },
          {
            name: "Porsche",
            select: "multiple",
            models: [
              "Cayenne",
              "Panamera",
              "911",
              "Carrera",
              "Cayman",
              "Boxster",
              "Turbo",
              "GT",
              "Macan",
              "718",
            ],
          },
          {
            name: "Audi",
            select: "multiple",
            models: [
              "A8",
              "A6",
              "Q7",
              "Q5",
              "A4",
              "A5",
              "A7",
              "S8",
              "TT",
              "A3",
              "Q3",
              "Q8",
              "R8",
              "RS",
              "S3",
            ],
          },
          {
            name: "Suzuki",
            select: "multiple",
            models: [
              "Vitara",
              "Samurai",
              "Swift",
              "Jimny",
              "Liana",
              "SX4",
              "Ertiga",
              "Baleno",
              "Grand Vitara",
              "Ciaz",
              "Celerio",
              "APV Pickup",
              "APV van",
              "Dzire",
              "Kizashi",
              "Fronx",
            ],
          },
          {
            name: "Infinity",
            select: "multiple",
            models: [
              "FX",
              "QX",
              "G",
              "Q",
              "M",
              "Q30",
              "Q50",
              "Q60",
              "Q70",
              "QX50",
              "QX60",
              "QX70",
              "QX80",
              "QX56",
            ],
          },
          { name: "Hummer", select: "multiple", models: ["H3", "H2", "H1"] },
          {
            name: "Lincoln",
            select: "multiple",
            models: [
              "Town Car",
              "Navigator",
              "MKS",
              "S",
              "Continental",
              "Nautilus",
              "Aviator",
              "Corsair",
            ],
          },
          {
            name: "Volkswagen",
            select: "multiple",
            models: [
              "Passat",
              "Touareg",
              "Golf",
              "Beetle",
              "Polo",
              "Jetta",
              "Scirocco",
              "Tiguan",
              "Teramont",
              "T-roc",
              "Arteon",
            ],
          },
          {
            name: "Daihatsu",
            select: "multiple",
            models: ["Sirion", "Taurus", "Materia"],
          },
          {
            name: "Geely",
            select: "multiple",
            models: [
              "EC7",
              "EC8",
              "LC Panda",
              "Emgrand 7",
              "Emgrand GS",
              "Emgrand X7",
              "Binray",
              "Coolray",
              "Azkarra",
              "Tugella",
              "Okavango",
              "Monjaro",
              "Preface",
              "Geometry c",
              "Starray",
            ],
          },
          {
            name: "Mercury",
            select: "multiple",
            models: ["Mountaineer", "Marauder"],
          },
          {
            name: "Volvo",
            select: "multiple",
            models: [
              "S 80",
              "850",
              "XC90",
              "S 60R",
              "S 40",
              "960",
              "S 70",
              "V 70XC",
              "C 70",
              "S60",
              "S90",
              "XC40",
              "XC60",
            ],
          },
          {
            name: "Peugeot",
            select: "multiple",
            models: [
              "307",
              "407",
              "206",
              "508",
              "406",
              "Partner",
              "607",
              "404",
              "3008",
              "301",
              "5008",
              "Boxer",
              "Expert",
              "2008",
              "208",
              "408",
              "504",
              "Traveller",
              "Rifter",
              "Landtrek",
            ],
          },
          {
            name: "Bentley",
            select: "multiple",
            models: [
              "Continental Flying Spur",
              "Continental GT",
              "Arnage",
              "Azure",
              "Continental GTC",
              "Brooklands Coupe",
              "Bentayga",
              "Mulsanne",
            ],
          },
          {
            name: "Jaguar",
            select: "multiple",
            models: [
              "XJ",
              "X type",
              "S type",
              "Suv Virgen",
              "Daimler",
              "E pace",
              "F pace",
              "F type",
              "I pace",
              "XE",
              "XF",
            ],
          },
          {
            name: "Subaru",
            select: "multiple",
            models: [
              "Legacy",
              "Impreza",
              "Forrester",
              "Outback",
              "WRX",
              "WRX STI",
              "XV",
            ],
          },
          {
            name: "MG",
            select: "multiple",
            models: [
              "5",
              "6",
              "HS",
              "MG RX8",
              "RX5",
              "ZS",
              "T60",
              "MG GT",
              "HS PHEV",
              "MG 1",
              "MG 3",
              "WHALE",
            ],
          },
          { name: "ZXAUTO", select: "multiple", models: [] },
          {
            name: "Changan",
            select: "multiple",
            models: [
              "Eado",
              "CS35",
              "CS75",
              "CS95",
              "Changan V7",
              "CS85",
              "Alsvin",
              "Hunter",
              "CS35 Plus",
              "CS75 Plus",
              "UNI-T",
              "UNI-K",
              "UNI-V",
            ],
          },
          {
            name: "Renault",
            select: "multiple",
            models: [
              "Megane",
              "Fluence",
              "Safrane",
              "Laguna",
              "Clio",
              "Talisman",
              "Duster",
              "Dokker Van",
              "Symbol",
              "Capture",
              "Koleos",
              "Master",
              "Megane GT",
              "Megane RS",
            ],
          },
          {
            name: "Buick",
            select: "multiple",
            models: [
              "Encore",
              "Encore GX",
              "Enclave",
              "Envision",
              "LaCrosse",
              "Regal",
              "Verano",
              "Lucerne",
              "Cascada",
              "Century",
              "Rainier",
              "Park Avenue",
              "Rendezvous",
            ],
          },
          {
            name: "Rolls-Royce",
            select: "multiple",
            models: ["Phantom", "Quest", "Dawn", "Wraith", "Cullinan"],
          },
          {
            name: "Lamborghini",
            select: "multiple",
            models: ["Aventador", "Urus", "Huracan", "Gallardo"],
          },
          { name: "Opel", select: "multiple", models: ["Astra", "Rekord"] },
          {
            name: "Skoda",
            select: "multiple",
            models: ["Octavia", "Rapid", "Superb", "Fabia", "Karoq", "Kodiaq"],
          },
          {
            name: "Ferrari",
            select: "multiple",
            models: [
              "488 PISTA",
              "812",
              "Break up",
              "GTC4",
              "MONZA",
              "Roma",
              "SF90",
            ],
          },
          {
            name: "Citroen",
            select: "multiple",
            models: [
              "C3",
              "C4",
              "C6",
              "Xara",
              "C2",
              "C1",
              "Regency",
              "Berlingo",
            ],
          },
          {
            name: "Chery",
            select: "multiple",
            models: [
              "QQ",
              "Chery A5",
              "EASTAR",
              "Quinn",
              "Chery A3",
              "Chery A1",
              "Arezzo 3",
              "Arezzo 6",
              "Tiggo 2",
              "Tiggo 7",
              "Tiggo 8",
              "Tiggo 4",
              "Arrizo 5",
              "Arrizo 8",
            ],
          },
          { name: "Seat", select: "multiple", models: [] },
          {
            name: "Daewoo",
            select: "multiple",
            models: ["Leganza", "Lanos", "Mats", "Nubira"],
          },
          { name: "SABB", select: "multiple", models: [] },
          {
            name: "SsangYong",
            select: "multiple",
            models: ["Actyon", "Musso", "Korando", "XLV", "Tivoli", "Rexton"],
          },
          {
            name: "Aston Martin",
            select: "multiple",
            models: ["DB11", "DBS", "Rapide S", "Vantage"],
          },
          {
            name: "Proton",
            select: "multiple",
            models: ["GEN•2", "Persona", "Waja"],
          },
          {
            name: "Haval",
            select: "multiple",
            models: [
              "Haval H2",
              "Haval H6",
              "Haval H9",
              "Jolion",
              "Dargo",
              "H6 GT",
            ],
          },
          {
            name: "GAC",
            select: "multiple",
            models: [
              "GA3",
              "GA4",
              "GA8",
              "GS3",
              "GS4",
              "GS8",
              "GN6",
              "GN8",
              "GS5",
              "GA6",
              "EMPOW",
              "EMZOOM",
              "EMKOO",
            ],
          },
          {
            name: "Great Wall",
            select: "multiple",
            models: ["Wingle 5", "Wingle 6", "Wingle 7", "POER"],
          },
          {
            name: "FAW",
            select: "multiple",
            models: [
              "T80",
              "V80",
              "Oley",
              "Besturn B50",
              "Besturn B70",
              "Besturn X80",
              "T77",
              "X40",
              "T33",
              "T99",
            ],
          },
          {
            name: "BYD",
            select: "multiple",
            models: ["F3", "F5", "F7", "S6", "S7"],
          },
          {
            name: "Alfa Romeo",
            select: "multiple",
            models: ["GIULIA", "GIULIETTA", "STELVIO"],
          },
          { name: "TATA", select: "multiple", models: ["XENON"] },
          { name: "JMC", select: "multiple", models: [] },
          {
            name: "JETOUR",
            select: "multiple",
            models: ["X70", "X70S", "X90", "Dashing"],
          },
          { name: "CMC", select: "multiple", models: ["Foton", "Tunland"] },
          { name: "VICTORY AUTO", select: "multiple", models: ["Lifan"] },
          {
            name: "MAXUS",
            select: "multiple",
            models: [
              "D90",
              "Maxus V80",
              "Maxus T60",
              "V90",
              "T70",
              "G50",
              "G10",
              "D90 Pro",
              "D60",
              "60 Tornado",
              "Maxus G90",
              "Maxus T90",
            ],
          },
          { name: "McLaren", select: "multiple", models: [] },
          { name: "JAC", select: "multiple", models: [] },
          {
            name: "Baic",
            select: "multiple",
            models: [
              "D50",
              "X35",
              "X7",
              "BJ80",
              "BJ40SE",
              "BJ40S",
              "BJ40 Plus",
              "BJ40F",
              "BJ40 C",
            ],
          },
          {
            name: "Dongfeng",
            select: "multiple",
            models: [
              "A30",
              "A60 MAX",
              "AX7",
              "AX7 MACH",
              "C31",
              "C32",
              "C35",
              "E32",
              "T5 Evo",
            ],
          },
          {
            name: "EXEED",
            select: "multiple",
            models: ["txl", "VX", "Exeed LX"],
          },
          { name: "Tesla", select: "multiple", models: [] },
          { name: "Soueaste", select: "multiple", models: [] },
          { name: "Mahindra", select: "multiple", models: [] },
          { name: "Zotye", select: "multiple", models: [] },
          { name: "Hongqi", select: "multiple", models: [] },
          { name: "SMART", select: "multiple", models: [] },
          {
            name: "Tank",
            select: "multiple",
            models: ["Tank 300", "Tank 500"],
          },
          {
            name: "Lynk & Co",
            select: "multiple",
            models: ["1", "3", "03 plus", "5", "9"],
          },
          { name: "Lucid", select: "multiple", models: ["Air", "Gravity"] },
          { name: "INEOS", select: "multiple", models: ["Grenadier"] },
        ],
      },
      price: {
        name: "Price",
        type: "twoInput",
      },
      year: {
        name: "Year",
        type: "twoInput",
      },
      mileage: {
        name: "Mileage",
        type: "twoInput",
        label: "Mileage (in km)",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",
        options: ["Rent", "Sell", "Wanted"],
      },
      transmission: {
        name: "Transmission",
        type: "checkbox",
        select: "multiple",
        options: ["Manual", "Automatic"],
      },
      exteriorColor: {
        name: "Exterior Color",
        select: "multiple",
        type: "checkbox",
        options: ["White", "Black", "Grey", "Red", "Yellow"],
      },
      additionalFeatures: {
        name: "Additional Features",
        select: "multiple",
        type: "checkbox",
        options: [
          "Full option",
          "Insured",
          "Self Parking",
          "Alarm System",
          "Dealership",
          "Quick Selling",
          "Navigation",
          "Temperature Controlled Seats",
          "Inspected",
          "Parking Sensors",
          "Bluetooth",
          "Sunroof/Moonroof",
          "Leather Seats",
          "Backup Camera",
          "Heated Seats",
          "Keyless Entry",
          "Remote Start",
          "Adaptive Cruise Control",
          "Lane Departure Warning",
          "Blind Spot Monitoring",
          "Premium Sound System",
          "All-Wheel Drive",
          "Touchscreen Display",
          "Apple CarPlay/Android Auto",
          "LED Headlights",
          "Tow Package",
          "Power Liftgate",
          "Head-Up Display",
          "Rain-Sensing Wipers",
          "Automatic Emergency Braking",
          "Ambient Lighting",
        ],
      },
      condition: {
        name: "Condition",
        select: "multiple",
        type: "checkbox",
        options: ["New", "Used"],
      },
      interiorColor: {
        name: "Interior Color",
        select: "multiple",
        type: "checkbox",
        options: ["White", "Black", "Grey", "Red", "Yellow"],
      },
      regionalSpec: {
        name: "Regional Spec",
        select: "multiple",
        type: "checkbox",
        options: ["GCC", "European", "Japanese", "American"],
      },
      fuelType: {
        name: "Fuel Type",
        select: "multiple",
        type: "checkbox",
        options: ["petrol", "diesel", "electric", "hybrid", "lpg", "cng"],
      },
      insurance: {
        name: "Insurance",
        select: "multiple",
        type: "checkbox",
        options: ["No Insurance", "Third Party", "Comprehensive"],
      },
      bodyType: {
        name: "Body Type",
        select: "multiple",
        type: "checkbox",
        options: [
          "Coupe",
          "Sedan (Saloon)",
          "SUV",
          "Hatchback",
          "Convertible",
          "Wagon (Estate)",
          "Pickup Truck",
          "Crossover",
          "Minivan (MPV)",
          "Roadster",
          "Fastback",
          "Liftback",
          "Van",
          "Microcar",
        ],
      },
      noOfDoors: {
        name: "Number of Doors",
        select: "multiple",
        type: "checkbox",
        options: ["5", "4", "3", "2"],
      },
    },
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
    filters: {
      brand: {
        name: "Brand",
        select: "single",
        type: "checkbox",

        options: [
          "Apple",
          "iPhone",
          "iPod",
          "Apple Watch",
          "Samsung",
          "Galaxy S",
          "Galaxy Note",
          "Huawei",
          "Sony",
          "Xperia",
          "BlackBerry",
          "Nokia",
          "HTC",
          "Microsoft",
          "LG",
          "Hitachi",
          "Panasonic",
          "MacBook",
          "Surface",
          "Sony Laptop",
          "Toshiba",
          "Dell",
          "Asus",
          "Acer",

          "Canon",
          "Fujifilm",
          "Olympus",
          "Samsung",
          "Nikon",
          "Sony",
        ],
      },
      price: {
        name: "Price",
        type: "twoInput",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",
        options: ["Rent", "Sell", "Wanted"],
      },
      condition: {
        name: "Condition",
        select: "multiple",
        type: "checkbox",
        options: ["New", "Used"],
      },
    },
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
    filters: {
      price: {
        name: "Price",

        type: "twoInput",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",

        options: ["Rent", "Sell", "Wanted"],
      },
      condition: {
        name: "Condition",
        select: "multiple",

        type: "checkbox",

        options: ["New", "Used"],
      },
    },
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
    filters: {
      price: {
        name: "Price",

        type: "twoInput",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",

        options: ["Sell", "Wanted"],
      },
      condition: {
        name: "Condition",
        select: "multiple",

        type: "checkbox",

        options: ["New", "Used"],
      },
    },
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
    filters: {},
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
    filters: {
      price: {
        name: "Price",
        type: "twoInput",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",
        options: ["Rent", "Sell", "Wanted"],
      },
      condition: {
        name: "Condition",
        select: "multiple",
        type: "checkbox",
        options: ["New", "Used"],
      },
      frequency: {
        name: "Frequency",
        select: "multiple",
        type: "checkbox",
        options: ["Dailly", "Weekly", "Montly", "Yearly"],
      },
      residenceType: {
        name: "Residence Type",
        select: "multiple",
        type: "checkbox",
        options: ["Single", "Families"],
      },
      noOfRooms: {
        name: "Number of Rooms",
        select: "multiple",
        type: "checkbox",
        options: ["1", "2", "3", "4", "5", "5+"],
      },
      noOfBathrooms: {
        name: "Number of Bathrooms",
        select: "multiple",
        type: "checkbox",
        options: ["1", "2", "3", "4", "5", "5+"],
      },
      area: {
        name: "Area",
        select: "multiple",
        type: "checkbox",
        options: [
          "Under 50 sq.m",
          "50 - 100 sq.m",
          "100 - 150 sq.m",
          "150 - 200 sq.m",
          "200+ sq.m",
        ],
      },
      furnished: {
        name: "Furnished",
        select: "multiple",
        type: "checkbox",
        options: ["Furnished", "Unfurnished", "Partially Furnished"],
      },
      facade: {
        name: "Facade",
        select: "multiple",
        type: "checkbox",
        options: [
          "East Facing",
          "West Facing",
          "North Facing",
          "South Facing",
          "North-East Facing",
          "North-West Facing",
          "South-East Facing",
          "South-West Facing",
        ],
      },
      licenseNumber: {
        name: "License Number",
        label: "Enter License Number",
        type: "oneInput",
      },
      streetWidth: {
        name: "Street Width",
        label: "Street Width",
        type: "select",
        options: ["Less than 5m", "5–10m", "10–15m", "15–20m", "20m+"],
      },
      floor: {
        name: "Floor",
        select: "multiple",
        type: "checkbox",
        options: [
          "Basement",
          "Ground Floor",
          "1st Floor",
          "2nd Floor",
          "3rd Floor",
          "4th Floor",
          "5th Floor",
          "6th Floor",
          "7th Floor",
          "8th Floor",
          "9th Floor",
          "10th Floor",
          "10+ Floors",
        ],
      },
      amenities: {
        name: "Amenities",
        select: "multiple",
        type: "checkbox",
        options: [
          "Parking space",
          "Gym",
          "Swimming pool",
          "Pet-friendly",
          "Balcony or terrace",
          "Separate Entrances",
          "In a Villa",
          "With Roof",
          "AC",
          "Car Parking",
        ],
      },
      propertyAge: {
        name: "Property Age",
        select: "multiple",
        type: "checkbox",
        options: [
          "New (0-1 year)",
          "1-5 years",
          "6-10 years",
          "11-15 years",
          "16-20 years",
          "21-30 years",
          "31+ years",
          "Under Construction",
        ],
      },
    },
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
    filters: {
      price: {
        name: "Price",

        type: "twoInput",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",

        options: ["Rent", "Sell", "Wanted"],
      },
    },
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
    filters: {
      price: {
        name: "Price",

        type: "twoInput",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",

        options: ["Rent", "Sell", "Wanted"],
      },
      condition: {
        name: "Condition",
        select: "multiple",

        type: "checkbox",

        options: ["New", "Used"],
      },
    },
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
    filters: {
      price: {
        name: "Price",
        type: "twoInput",
      },
      addType: {
        name: "Ad Type",
        select: "multiple",
        type: "checkbox",
        options: ["Rent", "Sell", "Wanted"],
      },
      age: {
        name: "Age",
        select: "multiple",

        type: "checkbox",
        options: ["Puppy (0–1 year)", "Young (1–3 years)", "Adult (3–6 years)"],
      },
    },
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
    filters: {
      price: {
        name: "Price",

        type: "twoInput",
      },
    },
  },
  {
    name: "Commercial",
    path: "/commercial",
  },
];
