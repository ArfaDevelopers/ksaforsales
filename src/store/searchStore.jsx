import { create } from "zustand";
import axios from "axios";

const useSearchStore = create((set, get) => ({
  searchText: "",
  results: [],
  selectedItem: null,
  skipNextSearch: false,

  setSearchText: async (text) => {
    const { selectedItem, skipNextSearch } = get();

    if (skipNextSearch) {
      set({ searchText: text, results: [], skipNextSearch: false });
      return;
    }

    // If text matches selected item title, don't trigger search
    if (text === selectedItem?.title) {
      set({ searchText: text, results: [] });
      return;
    }

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

    const routeParam = categoryRouteMap[item.category];
    if (routeParam) {
      window.location.hash = `#/${routeParam}`;
    }

    // Prevent search on next text update
    set({
      selectedItem: item,
      skipNextSearch: true,
    });
  },
}));

export default useSearchStore;
