import { create } from "zustand";
import {
  Balance,
  ApiBalanceResponse,
  Asset,
  ApiFundBalanceResponse,
} from "@/types";
import { clientGet } from "@/utils/request";
import { parseBalances, parseFundBalances } from "@/utils/parsers";

interface BalanceStore {
  balances: Partial<Record<Asset, Balance>>;
  fundBalances: Partial<Record<Asset, Balance>>;
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;

  // Actions
  fetchBalances: () => Promise<void>;
  fetchFundBalances: () => Promise<void>;
}

export const useBalanceStore = create<BalanceStore>((set, get) => ({
  balances: {},
  fundBalances: {},
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchBalances: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiBalanceResponse>("/accounts");
      const balances = parseBalances(response);

      set({
        balances,
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
  fetchFundBalances: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiFundBalanceResponse>(
        "/fund-accounts"
      );
      const fundBalances = parseFundBalances(response);

      set({
        fundBalances,
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
