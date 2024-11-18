import { useTransactionStore } from "@/stores/useTransactionStore";

export const useTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const error = useTransactionStore((state) => state.error);
  const fetchTransactions = useTransactionStore(
    (state) => state.fetchTransactions
  );

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions,
  };
};
