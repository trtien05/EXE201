import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  Home as HomeIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  MapPin as HospitalIcon,
  Layers as BoxIcon,
} from "lucide-react";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuProps["items"] = [
    { key: "/admin", icon: <HomeIcon size={16} />, label: "Dashboard" },
    { key: "/admin/users", icon: <UsersIcon size={16} />, label: "Users" },
    {
      key: "/admin/bookings",
      icon: <CalendarIcon size={16} />,
      label: "Bookings",
    },
    {
      key: "/admin/hospitals",
      icon: <HospitalIcon size={16} />,
      label: "Hospitals",
    },
    { key: "/admin/services", icon: <BoxIcon size={16} />, label: "Services" },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
      onClick={onClick}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
};

export default AdminSidebar;
