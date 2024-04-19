"use client";

import Link from "next/link";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import {
  DashboardIcon,
  GearIcon,
  MagicWandIcon,
  PersonIcon,
  VideoIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { SidebarItemInterface } from "./SidebarItemInterface";

const Sidebar = () => {
  const sidebarItems: SidebarItemInterface[] = [
    {
      title: "My Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "My Courses",
      path: "/dashboard/my-courses",
      icon: <VideoIcon />,
    },
    {
      title: "Brain booster",
      path: "/dashboard/brain-booster",
      icon: <MagicWandIcon />,
    },
    {
      title: "My Profile",
      path: "/dashboard/profile",
      icon: <PersonIcon />,
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: <GearIcon />,
    },
    {
      title: "Logout",
      path: "/",
      icon: <ExitIcon />,
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-1/5 gap-4 p-4 border-white">
      {/* <div className="flex items-center gap-4 p-4 bg-white border rounded-xl ">
				<Image
					src="/new/logoSolid.png"
					width={100}
					height={100}
					className="w-8"
					alt="logo"
				/>
				<h1 className="text-lg "> Gyanaguru 2.0 </h1>
			</div> */}
      {/* desktop view */}
      <div className="flex-col hidden gap-2 md:flex ">
        {sidebarItems.map((item, index) => {
          return <SidebarItem item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
