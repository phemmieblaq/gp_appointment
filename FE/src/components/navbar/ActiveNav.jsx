import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const ActiveNav = ({ index, text, path, defaultActive, status }) => {
  const ActiveStyles = {
    color: "#292D32",
    backgroundColor: "#F4F1FE",
    // borderBottom: "4px solid #3c0fbd",
    borderRadius: 0,
  };
  const location = useLocation();
  const isActive = location.pathname === path || (index === 0 && defaultActive);

  return (
    <Container>
      <NavLink to={path} style={isActive ? ActiveStyles : {}}>
        <p>{text}</p>
      </NavLink>
    </Container>
  );
};

export default ActiveNav;

export const Container = styled.div`
  display: flex;
  a > p {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;

    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }

  span {
    position: relative;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    background-color: #3c0fbd19;
    border-radius: 10px;
    color: #3c0fbd;
    font-size: 14px;
    font-weight: 500;
    height: max-content;
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
    > span {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      background-color: red;
    }
  }
  a {
    display: flex;
    gap: 16px;
    align-items: center;
    color: #959697;
    text-decoration: none;
    margin: 0;
    border: none;
    padding: 16px;
  }
`;
//const StyledLink = styled(NavLink)``;
