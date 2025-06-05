import { create } from "zustand";
import axios from "axios";

const useSearchStore = create((set) => ({
  searchText: "",
  results: [],
  selectedItem: null,

  setSearchText: async (text) => {
    set({ searchText: text });

    if (text.trim() !== "") {
      try {
        const response = await axios.get(
          `http://168.231.80.24:9002/search?q=${text}`
        );
        set({ results: response.data.results });
        console.log("user1111____94", response.data.results);
      } catch (error) {
        console.error("Search failed", error);
        set({ results: [] });
      }
    } else {
      set({ results: [] });
    }
  },
  setSelectedItem: (item) => {
    console.log("✅ Selected item set in store:", item);

    // Map categories to route hash parameters
    const categoryRouteMap = {
      Automotive: "AutomotiveComp",
      Electronics: "ElectronicComp",
      "Sports&Game": "SportGamesComp",
      "Home&Furnituer": "HealthCareComp",
      "Job Board": "JobBoard",
      "Real Estate": "RealEstateComp",
      Services: "TravelComp",
      "Pet & Animals": "PetAnimalsComp",
      Other: "Education",
    };

    // Get route based on category
    const routeParam = categoryRouteMap[item.category];

    if (routeParam) {
      // Update the hash in the URL
      window.location.hash = `#/${routeParam}`;
    } else {
      console.warn("⚠️ No route defined for category:", item.category);
    }

    // Save item to store
    set({ selectedItem: item });
  },

  // setSelectedItem: (item) => {
  //   console.log("✅ Selected item set in store:", item); // <-- log here
  //   set({ selectedItem: item });
  // },
}));

export default useSearchStore;
