import { create } from "zustand";
import { Setting, ApiSettingsResponse } from "@/types";
import { clientGet } from "@/utils/request";
import { parseSettings } from "@/utils/parsers";

interface SettingStore {
  settings: Setting[];
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;

  getSettingByName: (name: string) => Setting | undefined;

  // Actions
  fetchSettings: () => Promise<void>;
}

export const useSettingStore = create<SettingStore>((set, get) => ({
  settings: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  getSettingByName: (name: string) =>
    get().settings.find((setting) => setting.name === name),

  fetchSettings: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiSettingsResponse>("/settings");
      const settings = parseSettings(response);

      set({
        settings,
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
