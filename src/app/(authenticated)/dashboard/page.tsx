"use client";

import CurrencyBreakdown from "@/components/active/currency-breakdown";
import ActivityPanel from "@/components/active/activity-panel";
import BalancesPanel from "@/components/active/balances-panel";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Kyc from "@/components/ui/kyc";
import ChartHistory from "@/components/active/chart-history";
import QuickTransactions from "@/components/ui/forms/quick-transactions";

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="grid auto-rows-min gap-6 md:grid-cols-3">
          <Kyc />
          <ActivityPanel />
          <CurrencyBreakdown />
        </div>

        <div className="w-full">
          <ChartHistory />
        </div>

        <div className="w-full grid grid-cols-3 gap-6">
          <QuickTransactions />
          <BalancesPanel className="col-span-2" />
        </div>
      </div>
    </>
  );
}
