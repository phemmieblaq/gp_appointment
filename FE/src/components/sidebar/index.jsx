import React, { useState } from "react";
import {
  ListWrapper,
  Logout,
  LogoutText,
  LogoutWrapper,
  SidebarLinks,
  SidebarWrapper,
  Top,
} from "./styled";
import { HiMenu } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { logoutUser } from "../../services/api";
import toast from "react-hot-toast";

const Sidebar = ({ items }) => {
  const [expanded, setExpaned] = useState(() => window.innerWidth > 1050);

  const location = useLocation();
  const navigate = useNavigate();

  let homePath =
    location.pathname === "/staff-dashboard" ||
    location.pathname === "/dashboard"
      ? true
      : false;

  const sidebarVariants = {
    true: {
      width: "236px",
    },
    false: {
      width: "0px",
    },
  };

  const handleLogoutUser = async () => {
    try {
      const response = await logoutUser();
      console.log(response);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        navigate("/signin");
      }
    } catch (error) {}
  };
  return (
    <SidebarWrapper
      width="200px"
      key="sidebar"
      variants={sidebarVariants}
      animate={expanded ? `${expanded}` : ""}
    >
      <Top>
        <ListWrapper onClick={() => setExpaned(!expanded)}>
          <HiMenu color="##3C0FBD" size={24} />
        </ListWrapper>
        <SidebarLinks>
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              expanded={expanded}
              homePath={homePath}
            />
          ))}
        </SidebarLinks>
      </Top>

      <Logout>
        <LogoutWrapper onClick={handleLogoutUser}>
          <HiOutlineLogout color="#ed4e3a" size={20} />
          {expanded ? <LogoutText>Logout</LogoutText> : null}
        </LogoutWrapper>
      </Logout>
    </SidebarWrapper>
  );
};

export default Sidebar;
