import React from "react";
import {
  Container,
  Content,
  ContentBody,
  ContentTitle,
  ContentWrapper,
  IconWrapper,
  Top,
} from "./styled";
import { CornerPetal } from "../../assets/svg/CornerPetal";

const DetailsCard = ({
  title,
  body,
  Icon,
  to,
  headerColor,
  onClick,
  email,
}) => {
  return (
    <Container to={to || ""} onClick={onClick}>
      <Top color={headerColor}>
        <CornerPetal />
      </Top>
      <ContentWrapper>
        {Icon && (
          <IconWrapper>
            <Icon color="#fff" />
          </IconWrapper>
        )}
        <Content>
          <ContentTitle>{title}</ContentTitle>
          <ContentBody>{body}</ContentBody>
          <ContentBody>{email}</ContentBody>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default DetailsCard;
