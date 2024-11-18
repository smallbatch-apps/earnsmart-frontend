import { useUserStore } from "@/stores/useUserStore";

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const jwt = useUserStore((state) => state.jwt);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const setUser = useUserStore((state) => state.setUser);
  const setJwt = useUserStore((state) => state.setJwt);
  const logout = useUserStore((state) => state.logout);
  const logIn = useUserStore((state) => state.logIn);
  const initializeFromStorage = useUserStore(
    (state) => state.initializeFromStorage
  );

  return {
    user,
    jwt,
    isLoading,
    error,
    fetchUser,
    setUser,
    setJwt,
    logout,
    logIn,
    initializeFromStorage,
  };
};
