import React, { useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useState } from "react";
//import { useGetAllNotificationsQuery } from "services/chatService";
//import { useSelector } from "react-redux";

const SidebarItem = ({ item, expanded, homePath, onClick }) => {
  const [iconHovered, setIconHovered] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

 // const { refreshNotifications } = useSelector((store) => store.UserDataReducer);

  //const notifications = useGetAllNotificationsQuery();
  const location = useLocation();
  const locationPath = location?.pathname;

  // Check if the path matches exactly
  const isActive = locationPath === item.path;



  
  return (
    <SidebarItemContainer>
      <Item>
        <div
          style={isActive ? ActiveStyle : {}}
          onClick={() => setCollapsed(!collapsed)}
        >
          <NavLink
            to={item.path}
            onMouseEnter={() => setIconHovered(item.id)}
            onMouseLeave={() => setIconHovered(0)}
            style={({ isActive }) => (isActive ? { color: "#00a2d4" } : {})}
            onClick={onClick}
          >
            <item.icon
              filled={item.path}
              hover={iconHovered === item.id}
            />
            {expanded && item.title}
          </NavLink>
          {expanded && item.dropDownList && (
            <ArrowDown onClick={() => setCollapsed(!collapsed)} collapsed={collapsed}>
              <IoIosArrowUp />
            </ArrowDown>
          )}
        </div>
      </Item>
      {expanded && item.dropDownList && (
        <ListContainer collapsed={collapsed} items={item.dropDownList.length}>
          <List>
            {item?.dropDownList?.map((each, index) => (
              <ListItem key={index}>
                <NavLink
                  to={each.path}
                  onMouseEnter={() => setIconHovered(item.id + each.id)}
                  onMouseLeave={() => setIconHovered(0)}
                  style={({ isActive }) => (isActive ? { color: "#00a2d4" } : {})}
                  onClick={onClick}
                >
                  <span>
                    <each.icon
                      filled={locationPath?.includes(each.path) }
                      hover={iconHovered === item.id + each.id}
                    />
                  </span>
                  <span>{each.title}</span>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </ListContainer>
      )}
    </SidebarItemContainer>
  );
};

export default SidebarItem;

const SidebarItemContainer = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > div {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: 0.3s all ease;
    height: max-content;
    color: ${({ theme }) => theme.grey1};

    padding: clamp(8px, 1vw, 12px) clamp(12px, 1.4vw, 16px);
    border-radius: 8px;

    white-space: nowrap;
    border: none;

    > a {
      display: flex;
      flex: 1;
      align-items: center;
      gap: 8px;
      color: ${({ theme }) => theme.grey1};
      text-decoration: none;
      transition: 0.3s all ease;

      :hover {
        color: #00a2d4;
      }
    }
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-left: 30px;

  height: ${({ collapsed, items }) => (collapsed ? 0 : `calc(${items * 30}px)`)};
  overflow: hidden;
  transition: 0.3s height ease;
`;

const List = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  :nth-of-type(odd) {
    margin-block: 8px;
  }

  > a:nth-of-type(1) {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    align-items: center;
    white-space: nowrap;
    text-decoration: none;
    line-height: 21px;
    color: ${({ theme }) => theme.grey1};
    transition: 0.3s all ease;

    :hover {
      color: #00a2d4;
    }

    span:nth-of-type(1) {
      display: flex;
      justify-content: center;
      width: 21px;
    }
  }
`;

const Badge = styled(Link)`
  color: white;
  background-color: #ed4e3a;
  border-radius: 4px;
  padding: 1px 6px;
  text-decoration: none;
  height: max-content;
`;

const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: ${({ collapsed }) => (collapsed ? "rotate(180deg)" : "")};
  transition: 0.3s transform ease;
  padding: 0 5px;
`;
const ActiveStyle = {
  background: "#00a2d419",
  color: "#00a2d4",
};
