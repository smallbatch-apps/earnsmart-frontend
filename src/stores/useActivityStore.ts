import { create } from "zustand";
import { Activity, ApiActivityResponse } from "@/types";
import { clientGet } from "@/utils/request";
import { parseActivies } from "@/utils/parsers";

interface ActivityStore {
  activities: Activity[];
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;

  fetchActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityStore>((set, get) => ({
  activities: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchActivities: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiActivityResponse>("/activity");
      const activities = parseActivies(response);

      set({
        activities,
        isLoading: false,
        lastFetched: Date.now(),
      });
    } catch (error) {
      set({
        error: error as Error,
        isLoading: false,
      });
    }
  },
}));
