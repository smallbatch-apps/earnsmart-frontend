"use client";

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

import QuickTransactions from "@/components/ui/forms/quick-transactions";

import { useTransactions } from "@/hooks/stores/useTransactions";
import ListTransactions from "@/components/active/list-transactions";

export default function Page() {
  const { transactions } = useTransactions();
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Transactions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <h1 className="font-semibold text-3xl text-blue-300">Transactions</h1>
        <div className="grid auto-rows-min gap-6 md:grid-cols-3">
          <QuickTransactions />
          <ListTransactions
            className="col-span-2"
            transactions={transactions}
          />
        </div>
      </div>
    </>
  );
}
