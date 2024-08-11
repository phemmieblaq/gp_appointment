import React from "react";
import styled from "styled-components";
import bookImage from "../../../assets/images/bookImage.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Header } from "../dashboard/styled";
import Button from "../../../components/mainButton";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "./test";
import ScheduleCalendar from "./test";

const localizer = momentLocalizer(moment);
// moment.locale("en-GB");
// momentLocalizer(moment);
const allViews = Object.keys(Views).map((k) => Views[k]);

const Schedule = () => {
  return (
    <Wrapper>
      <TopSection>
        <HeaderText>Schedule</HeaderText>
        <BtnWrapper>
          <Button title="Schedule" bg_color="#3C0FBD" />
        </BtnWrapper>
      </TopSection>
      <div style={{ height: 700, marginTop: "20px" }}>
        {/* <Calendar
          events={events}
          step={60}
          localizer={localizer}
          views={allViews}
          selectable={true}
          timeslots={2}
          defaultDate={new Date(2016, 3, 1)}
          popup={false}
          onShowMore={(events, date) =>
            this.setState({ showModal: true, events })
          }
        /> */}
        <ScheduleCalendar />
      </div>
      <TopSection></TopSection>
    </Wrapper>
  );
};

export default Schedule;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const BtnWrapper = styled.div`
  width: 150px;
  display: flex;
  justify-content: flex-end;
`;
const TopSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderText = styled.h2``;
const LeftWrapper = styled.div`
  width: 100%;
  padding: 63px 119px 75px 40px;
`;
const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  postion: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
`;
const PrevWrapper = styled.div`
  display: flex;

  gap: 8px;
  cursor: pointer;
  margin-bottom: 80px;
`;
const Previous = styled.p`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.52px;
  text-align: left;
  color: #3c0fbd;
`;

const Form = styled.form``;
