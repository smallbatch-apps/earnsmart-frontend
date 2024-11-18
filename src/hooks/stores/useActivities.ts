import { useActivityStore } from "@/stores/useActivityStore";

export const useActivities = () => {
  const activities = useActivityStore((state) => state.activities);
  const isLoading = useActivityStore((state) => state.isLoading);
  const error = useActivityStore((state) => state.error);
  const fetchActivities = useActivityStore((state) => state.fetchActivities);

  return {
    activities,
    isLoading,
    error,
    fetchActivities,
  };
};
