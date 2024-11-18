import { create } from "zustand";
import { Price, ApiPricesResponse, PriceByCurrency } from "@/types";
import { clientGet } from "@/utils/request";
import { parsePrices } from "@/utils/parsers";

interface PriceStore {
  prices: Price[];
  priceByCurrency: PriceByCurrency;
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;

  // Actions
  fetchPrices: () => Promise<void>;
}

export const usePriceStore = create<PriceStore>((set, get) => ({
  prices: [],
  priceByCurrency: {} as PriceByCurrency,
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchPrices: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiPricesResponse>("/prices");
      const prices = parsePrices(response);

      let priceByCurrency;
      try {
        priceByCurrency = prices.reduce((acc, price) => {
          acc[price.currency] = { rate: price.rate, change: price.change24h };
          return acc;
        }, {} as PriceByCurrency);
      } catch (error) {
        console.log(error);
      }

      set({
        prices,
        priceByCurrency,
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
