import { create } from "zustand";
import { User, ApiUserResponse } from "@/types";
import { parseUser } from "@/utils/parsers";
import { clientGet, clientPost } from "@/utils/request";

interface UserStore {
  user: User | null;
  jwt: string | null;
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;

  // Getters
  getUser: () => User | null;

  // Actions
  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  setJwt: (jwt: string) => void;
  logout: () => void;
  logIn: (username: string, password: string) => Promise<void>;
  initializeFromStorage: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  jwt: null,
  isLoading: false,
  error: null,
  lastFetched: null,

  getUser: () => get().user,

  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientGet<ApiUserResponse>("/user");
      const user = parseUser(response);

      set({
        user,
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

  initializeFromStorage: async () => {
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt) {
      set({ jwt: storedJwt });
      try {
        const response = await clientGet<ApiUserResponse>("/user");
        const user = parseUser(response);
        set({ user });
      } catch (error) {
        // If the JWT is invalid/expired, clear it
        localStorage.removeItem("jwt");
        set({ jwt: null, error: error as Error });
      }
    }
  },

  logIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await clientPost("/auth/login", {
        email,
        password,
      });

      const jwt = response.headers
        .get("Authorization")
        ?.replace(/^Bearer\s+/i, "");

      if (jwt) {
        localStorage.setItem("jwt", jwt);
      }

      if (!response.ok) {
        throw new Error("No JWT found in response headers");
      }

      let user: User | null = null;
      try {
        const result = await response.json();
        user = parseUser(result);
      } catch (error) {
        console.log("error", error);
      }

      set({
        user,
        jwt,
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

  setUser: (user: User) => set({ user }),

  setJwt: (jwt: string) => set({ jwt }),

  logout: () =>
    set({
      user: null,
      jwt: null,
      lastFetched: null,
    }),
}));
