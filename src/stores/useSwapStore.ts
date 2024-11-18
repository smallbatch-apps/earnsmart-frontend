import { create } from "zustand";
import { Swap, ApiSwapsResponse } from "@/types";
import { clientGet } from "@/utils/request";
import { parseSwaps } from "@/utils/parsers";

interface SwapStore {
  swaps: Swap[];
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;

  // Actions
  fetchSwaps: () => Promise<void>;
}

export const useSwapStore = create<SwapStore>((set, get) => ({
  swaps: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchSwaps: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiSwapsResponse>("/swap");
      const swaps = parseSwaps(response);

      set({
        swaps,
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
