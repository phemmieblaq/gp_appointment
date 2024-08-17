import React from "react";
import {
  Logout,
  LogoutText,
  LogoutWrapper,
  MobileSidebarWrapper,
  SidebarLinks,
  Top,
} from "./styled";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClear } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import { logoutUser } from "../../services/api";

const MobileSidebar = ({ items, toggleDrawer }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutUser();
    navigate("/signin");
  };

  const handleNavigate = (path) => {
    toggleDrawer(false);
    navigate(path);
  };

  let homePath =
    pathname === "/staff-dashboard" || pathname === "/dashboard" ? true : false;

  return (
    <MobileSidebarWrapper>
      <Top>
        <MdClear
          size={25}
          color="#3c0fbd"
          style={{
            marginBottom: "18px",
            left: "10px",
            position: "relative",
          }}
          onClick={() => toggleDrawer(false)}
        />

        <SidebarLinks>
          {items?.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              expanded={true}
              homePath={homePath}
              onClick={handleNavigate}
            />
          ))}
        </SidebarLinks>
      </Top>

      <Logout>
        <LogoutWrapper onClick={handleLogout}>
          <HiOutlineLogout color="#ed4e3a" size={20} />
          <LogoutText onClick={handleLogout}>Logout</LogoutText>
        </LogoutWrapper>
      </Logout>
    </MobileSidebarWrapper>
  );
};

export default MobileSidebar;
