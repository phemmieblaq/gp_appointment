import React from "react";
import styled from "styled-components";
import Button from "../../../components/mainButton";
import ActiveNav from "../../../components/navbar/ActiveNav";
import { Outlet, useNavigate } from "react-router-dom";

const AppointmentLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Heading>
          <Title>Bookings</Title>

          <ButtonWrapper>
            <Button
              bg_color="#3C0FBD"
              title="Book a session"
              onClick={() => navigate("/dashboard/book-appointment")}
            />
          </ButtonWrapper>
        </Heading>
        <LinkWrapper>
          <ActiveNav
            text="Upcoming appointment"
            path="/dashboard/appointments"
          />
          <ActiveNav
            text="Previous appointment"
            path="/dashboard/appointments/previous"
          />
        </LinkWrapper>
        <Outlet />
      </Container>
    </>
  );
};

export default AppointmentLayout;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  //border:1px solid red;
  width: 100%;

  padding: 24px 80px;
  flex-flow: column;

  @media screen and (max-width: 700px) {
    margin: 24px;
    padding: 0;
  }
`;
const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h4`
  font-family: Inter;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.63px;
  text-align: left;
  color: #000000;
`;
const ButtonWrapper = styled.div`
  max-width: 178px;
  height: 47px;
`;
const LinkWrapper = styled.div`
  max-width: 656px;
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
`;
