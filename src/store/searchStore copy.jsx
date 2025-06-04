import { create } from "zustand";
import axios from "axios";

const useSearchStore = create((set) => ({
  searchText: "",
  results: [],
  setSearchText: async (text) => {
    set({ searchText: text });

    if (text.trim() !== "") {
      try {
        const response = await axios.get(
          `http://168.231.80.24:9002/search?q=${text}`
        );
        set({ results: response.data.results }); // instead of full response.data
        console.log("user1111____94", response.data.results);
      } catch (error) {
        console.error("Search failed", error);
        set({ results: [] });
      }
    } else {
      set({ results: [] });
    }
  },
}));

export default useSearchStore;
