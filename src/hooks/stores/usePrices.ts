import { usePriceStore } from "@/stores/usePriceStore";

export const usePrices = () => {
  const prices = usePriceStore((state) => state.prices);
  const isLoading = usePriceStore((state) => state.isLoading);
  const error = usePriceStore((state) => state.error);
  const fetchPrices = usePriceStore((state) => state.fetchPrices);
  const priceByCurrency = usePriceStore((state) => state.priceByCurrency);

  return {
    prices,
    isLoading,
    error,
    fetchPrices,
    priceByCurrency,
  };
};
