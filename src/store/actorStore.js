import { create } from "zustand";
import { fetchActorDetails, fetchActorCredits, fetchPopularActors } from "../api/tmdb";

export const useActorStore = create((set) => ({
  actor: null,

  credits: [],

  fetchActorData: async (id) => {
    set({ actor: null, credits: [] });
    const details = await fetchActorDetails(id);
    const credits = await fetchActorCredits(id);
    set({ actor: details, credits });
  },

  fetchPopularActors: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPopularActors();
      set({ popularActors: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch popular actors:", err);
      set({ error: "Failed to load popular actors", loading: false });
    }
  },
}));