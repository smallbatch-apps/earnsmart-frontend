import { useSwapStore } from "@/stores/useSwapStore";

export const useSwaps = () => {
  const swaps = useSwapStore((state) => state.swaps);
  const isLoading = useSwapStore((state) => state.isLoading);
  const error = useSwapStore((state) => state.error);
  const fetchSwaps = useSwapStore((state) => state.fetchSwaps);

  return {
    swaps,
    isLoading,
    error,
    fetchSwaps,
  };
};
