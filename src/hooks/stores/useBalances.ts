import { useBalanceStore } from "@/stores/useBalanceStore";

export const useBalances = () => {
  const balances = useBalanceStore((state) => state.balances);
  const fundBalances = useBalanceStore((state) => state.fundBalances);
  const isLoading = useBalanceStore((state) => state.isLoading);
  const error = useBalanceStore((state) => state.error);
  const fetchBalances = useBalanceStore((state) => state.fetchBalances);
  const fetchFundBalances = useBalanceStore((state) => state.fetchFundBalances);

  return {
    balances,
    fundBalances,
    isLoading,
    error,
    fetchBalances,
    fetchFundBalances,
  };
};
