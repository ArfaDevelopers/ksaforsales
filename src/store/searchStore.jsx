import { create } from "zustand";
import axios from "axios";

const useSearchStore = create((set, get) => ({
  searchText: "",
  results: [],
  selectedItem: null,
  skipNextSearch: false,
  showSuggestions: true,

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

    set({ searchText: text, showSuggestions: true });

    if (text.trim() !== "") {
      try {
        const response = await axios.get(`/search?q=${text}`);
        // Only set results if showSuggestions is still true and searchText hasn't changed
        const currentState = get();
        if (currentState.showSuggestions && currentState.searchText === text) {
          set({ results: response.data.results });
        }
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
