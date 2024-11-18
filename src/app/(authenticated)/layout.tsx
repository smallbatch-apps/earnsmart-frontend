"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/hooks/stores/useUser";
import { useBalances } from "@/hooks/stores/useBalances";
import { useActivities } from "@/hooks/stores/useActivities";
import { useTransactions } from "@/hooks/stores/useTransactions";
import { usePrices } from "@/hooks/stores/usePrices";
import { useSettings } from "@/hooks/stores/useSettings";
import { useSwaps } from "@/hooks/stores/useSwaps";
// import { LoadingSpinner } from "@/components/ui/loading-spinner"; // Assuming you have this

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { jwt, initializeFromStorage } = useUser();

  const { fetchBalances, fetchFundBalances } = useBalances();
  const { fetchActivities } = useActivities();
  const { fetchTransactions } = useTransactions();
  const { fetchPrices } = usePrices();
  const { fetchSettings } = useSettings();
  const { fetchSwaps } = useSwaps();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    initializeFromStorage();
  }, []);

  useEffect(() => {
    if (jwt) {
      // Only fetch data if we have a JWT
      async function initializeData() {
        try {
          await Promise.all([
            fetchBalances(),
            fetchFundBalances(),
            fetchActivities(),
            fetchTransactions(),
            fetchPrices(),
            fetchSettings(),
            fetchSwaps(),
          ]);
        } catch (error) {
          console.error("Failed to initialize data:", error);
        } finally {
          setIsInitializing(false);
        }
      }

      initializeData();
    }
  }, [jwt]);

  // if (!user) return redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {isInitializing ? <div className="p-6">Loading...</div> : children}
      </SidebarInset>
    </SidebarProvider>
  );
}
