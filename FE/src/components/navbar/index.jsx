import React from "react";
import {
  Image,
  
  UserIcon,
  NavWrapper,
  RightIcons,
 
  UserContainer,

} from "./styled";

import logo from "../../assets/svg/logo.svg"

import user from "../../assets/images/user.png";
//import Search from "./Search";
import { Link } from "react-router-dom";



const Navbar = ({  displayMobile, imgStyles, style, hideSearch }) => {
  
  return (
    <>
     
        <NavWrapper
          border="1px solid #EDF1F7"
          key="Navbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          $displayMobile={displayMobile}
          style={{ ...style }}
        >
          <Link to="/" style={imgStyle}>
            <Image src={logo} alt="logo" style={{ ...imgStyles }} />
          </Link>
          
          <RightIcons>
           

            <UserContainer >
              <UserIcon src={user} alt="logo" />
            </UserContainer>

            
          </RightIcons>
        </NavWrapper>

    </>
  );
};

export default Navbar;


let imgStyle = { width: "13%", textDecoration: "none" };
