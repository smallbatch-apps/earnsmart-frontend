import { create } from "zustand";
import { Transaction, ApiTransactionsResponse, TransactionType } from "@/types";
import { clientGet } from "@/utils/request";
import { parseTransactions } from "@/utils/parsers";

interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;

  // Actions
  fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchTransactions: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiTransactionsResponse>("/transaction");

      const transactions = parseTransactions(response);

      set({
        transactions,
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
