import React from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import { doctorSidebarItems, userSidebarItems } from "../../utils/config";
import { useSelector } from "react-redux";

const UserDashboardLayout = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);

  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: "100px" }}
        style={{ padding: "12px 24px" }}
      />

      <Body>
        <BodyLeft>
          <Sidebar
            items={
              loginInfo?.role === "doctor"
                ? doctorSidebarItems
                : userSidebarItems
            }
          />
        </BodyLeft>
        <BodyRight>
          <Outlet />
        </BodyRight>
      </Body>
    </Dashboard>
  );
};

export default UserDashboardLayout;

const Dashboard = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`;
const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const BodyLeft = styled.div``;

const BodyRight = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
