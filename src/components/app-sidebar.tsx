import * as React from "react";
import Image from "next/image";

import Logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Quicklinks",
      url: "/dashboard",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Transactions",
      url: "/transactions",
      items: [
        {
          title: "Withdraw",
          url: "/transactions",
        },
        {
          title: "Deposit",
          url: "/transactions",
        },
        {
          title: "Swap",
          url: "/swaps",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "User Profile",
          url: "#",
        },
        {
          title: "Security Settings",
          url: "#",
        },
        {
          title: "App Settings",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <div className="flex flex-col my-10 items-center justify-center gap-2 font-bold text-xl">
        <Image src={Logo} alt="logo" width={100} height={100} />
        EARNSMART
      </div>

      {/* <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader> */}
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map(
                  (item: {
                    title: string;
                    url: string;
                    isActive?: boolean;
                  }) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
