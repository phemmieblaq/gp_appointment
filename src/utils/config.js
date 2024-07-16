import { HomeIcon } from "../assets/icon/HomeIcon";
import { ResourcesIcon } from "../assets/icon/ResourcesIcon";
import { SettingsIcon } from "../assets/icon/SettingsIcon";

export const userSidebarItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      title: "Bookings",
      icon: ResourcesIcon,
      path: "/dashboard/appointments",
    },
    {
      id: 3,
      title: "Explore",
      icon: SettingsIcon,
      path: "/dashboard/explore",
    },
    {
      id: 4,
      title: "Settings",
      icon: SettingsIcon,
      path: "/dashboard/settings",
    },

]