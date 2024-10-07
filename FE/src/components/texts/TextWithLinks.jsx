
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TextsWithLink = ({ text, textStyle, linkStyle, $mobileResponsive }) => {
  return (
    <TextContainer
      
    >
      {text.map((element) => {
        return (
          <p key={element.text} style={{ ...textStyle }}>
            {" "}
            {element.text}{" "}
            <Link
              to={element?.link?.to}
              style={{ ...linkStyle }}
              onClick={element?.action && element.action}
              target={element?.link?.target ? element?.link?.target : ""}
            >
              <span >
                {element.link.text}
              </span>
            </Link>
          </p>
        );
      })}
    </TextContainer>
  );
};

export default TextsWithLink;

const TextContainer = styled.div`
  display: inline;
  flex-flow: row wrap;
  font-size: 14px;

  p {
    display: inline;
    color: #4e5152;
    text-align: center;
  }
  span {
    color: var(--SecondaryBlue);
  }

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 1000px) {
    display: ${({ $mobileResponsive }) => $mobileResponsive && "none"};
  }
`;
