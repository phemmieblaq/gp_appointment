import React from "react";
import styled from "styled-components";
import blueCalendar from "../../assets/svg/blueCalendar.svg";
import clock from "../../assets/svg/clock.svg";
import map from "../../assets/images/map.jpeg";

const CheckUpCard = ({
  reason = "General check up",
  address = "16 Adijat crop street, Hearthrow London, United Kingdom",
  date = "05/12/2024",
  time = "12:00 PM",
}) => {
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Heading>{reason}</Heading>
          <Address>{address}</Address>
          <DateWrapper>
            <TimeWrapper>
              <img src={blueCalendar} alt="calendar" />
              <Time>{date}</Time>
            </TimeWrapper>

            <TimeWrapper>
              <img src={clock} alt="clock" />
              <Time>{time}</Time>
            </TimeWrapper>
          </DateWrapper>
        </InnerWrapper>
        <MapWrapper>
          <img src={map} alt="" />
          {/* <MapContainer/> */}
        </MapWrapper>
      </Wrapper>
    </div>
  );
};

export default CheckUpCard;

const Wrapper = styled.div`
  max-width: 850px;
  padding: 24px;
  gap: 0px;
  border-radius: 8px;
  border: 1px solid #e7e6e9;
  background: #fcfcfd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InnerWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Heading = styled.h3`
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.78px;
  text-align: left;
  color: #292d32;
  margin-bottom: 8px;
`;

const Address = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  text-align: left;
  margin-bottom: 16px;
`;
const DateWrapper = styled.div`
  display: flex;
  max-width: 215px;
  align-items: center;
  justify-content: space-between;
`;
const TimeWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const Time = styled.h4`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.52px;
  text-align: left;
`;
const MapWrapper = styled.div``;
