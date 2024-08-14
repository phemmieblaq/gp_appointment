import React from "react";
import styled from "styled-components";
import Button from "../mainButton";
import sessionImage from "../../assets/images/session.png";
import { useNavigate } from "react-router-dom";

const SessionCard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <ContentWrapper>
            <Title>Your health is your wealth</Title>
            <Content>
              If you're unsure about how you're feeling or just not quite
              yourself, it’s important to take action. Don’t ignore the signs;
              your health is too valuable. Book a session with your doctor today
              to get the help you need and ensure you stay in the best of
              health.
            </Content>
          </ContentWrapper>
          <ImageWrapper>
            <Image src={sessionImage} alt="background" />
          </ImageWrapper>
        </InnerWrapper>
        <ButtonWrapper>
          <Button
            title="Book a session "
            onClick={() => navigate("/dashboard/book-appointment")}
            type="submit"
            bg_color="#F4F1FE"
            color="#3C0FBD"
          />
        </ButtonWrapper>
      </Wrapper>
    </div>
  );
};

export default SessionCard;

const Wrapper = styled.div`
  background: #083863;

  border-radius: 12px;
  padding: 24px;
  max-width: 850px;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Title = styled.h3`
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  line-height: 29.05px;
  text-align: left;
  color: #ffffff;
`;

const Content = styled.h4`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  text-align: left;
  color: #cccbcd;
`;
const ButtonWrapper = styled.div`
  max-width: 178px;
  height: 47px;

  margin-top: 20px;
`;
const ImageWrapper = styled.div`
  max-width: 398px;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
`;
