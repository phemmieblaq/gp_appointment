import React from "react";
import {
  AlternateEmailDetails,
  EmailDetails,
  EmailWrapper,
  InputWrapper,
  PasswordDetails,
  PhotoDetails,
  PhotoImage,
  ProfileContainer,
  TextContainer,
  TextParagraph,
  TextTitle,
} from "./style";
import User from "../../assets/images/user.png";
import { InputWithLabel } from "../input";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  return (
    <ProfileContainer>
      <PhotoDetails>
        <TextContainer>
          <TextTitle>Your Photo</TextTitle>
          <TextParagraph>This will be displayed on your profile</TextParagraph>
        </TextContainer>

        <PhotoImage>
          <img src={User} alt="" />
        </PhotoImage>
      </PhotoDetails>

      <EmailDetails>
        <TextContainer>
          <TextTitle>Work email address</TextTitle>
          <TextParagraph>This cannot be changed by you</TextParagraph>
        </TextContainer>
        <EmailWrapper>
          <p>{loginInfo?.email}</p>
        </EmailWrapper>
      </EmailDetails>
      <EmailDetails>
        <TextContainer>
          <TextTitle>Role</TextTitle>
          <TextParagraph>This cannot be changed by you</TextParagraph>
        </TextContainer>
        <EmailWrapper>
          <p>{loginInfo?.role}</p>
        </EmailWrapper>
      </EmailDetails>
    </ProfileContainer>
  );
};

export default ProfileDetails;
