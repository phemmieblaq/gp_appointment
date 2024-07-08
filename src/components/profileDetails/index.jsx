
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
import User  from "../../assets/images/user.png";
import { InputWithLabel } from "../input";

const ProfileDetails = () => {
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
          <p>akinyemibamidele2@gmail.com</p>
        </EmailWrapper>
      </EmailDetails>
      <AlternateEmailDetails>
        <TextContainer>
          <TextTitle>Alternative email address</TextTitle>
          <TextParagraph>
            This will be used to contact you as an alternate means
          </TextParagraph>
        </TextContainer>
        <InputWrapper>
          <InputWithLabel placeholder={"akinyemibamidele2@gmail.com"} />
        </InputWrapper>
      </AlternateEmailDetails>

      <PasswordDetails>
        <TextContainer>
          <TextTitle>Password</TextTitle>
        </TextContainer>
        <InputWrapper>
          <InputWithLabel password placeholder={"123456"} />
        </InputWrapper>
      </PasswordDetails>
    </ProfileContainer>
  );
};

export default ProfileDetails;
