import { useSettingStore } from "@/stores/useSettingStore";

export const useSettings = () => {
  const settings = useSettingStore((state) => state.settings);
  const isLoading = useSettingStore((state) => state.isLoading);
  const error = useSettingStore((state) => state.error);
  const fetchSettings = useSettingStore((state) => state.fetchSettings);
  const getSettingByName = useSettingStore((state) => state.getSettingByName);

  return {
    settings,
    isLoading,
    error,
    fetchSettings,
    getSettingByName,
  };
};
