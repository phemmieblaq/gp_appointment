import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/mainButton";
import "react-big-calendar/lib/css/react-big-calendar.css";
import toast from "react-hot-toast";
import ScheduleCalendar from "./test";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close.svg";
import GeneralModal from "../../../components/modal/GeneralModal";
import { GetTime } from "../../../utils/config";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { addTimeSlot } from "../../../services/api";
import "react-datepicker/dist/react-datepicker.css";

const Schedule = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [timeSlots, setTimeSlot] = useState([]);

  useEffect(() => {
    GetTime(setTimeSlot);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async () => {
    try {
      const requiredData = {
        doctor_id: loginInfo?.doctorId,
        available_date: format(selectedDate, "yyyy-MM-dd"),
        start_time: selectedStartTime,
        end_time: selectedEndTime,
      };
      const response = await addTimeSlot(requiredData);
      if (response?.status === 201) {
        console.log(response, "Added time slot");
        console.log(requiredData);
        toast.success(response?.data?.message);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <TopSection>
        <HeaderText>Schedule</HeaderText>
        <BtnWrapper>
          <Button
            title="Schedule"
            bg_color="#3C0FBD"
            onClick={() => {
              setOpenModal(true);
            }}
          />
        </BtnWrapper>
      </TopSection>
      <div style={{ height: 700, marginTop: "20px" }}>
        <ScheduleCalendar />
      </div>
      <TopSection></TopSection>

      {openModal && (
        <>
          <GeneralModal>
            <Top>
              <TopTitle>Create Schedule </TopTitle>
              <IconWrap>
                <CloseIcon onClick={handleCloseModal} />
              </IconWrap>
            </Top>
            <>
              <h3>Select a Date:</h3>
              <DatePickerWrapper>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </DatePickerWrapper>

              <TimeSection>
                <StartTime>
                  <h3>Select Start Time:</h3>
                  <TimeSlotWrapper>
                    {timeSlots.map((slot, index) => (
                      <TimeSlotCard
                        key={index}
                        selected={selectedStartTime === slot.time}
                        onClick={() => setSelectedStartTime(slot.time)}
                      >
                        {slot.time}
                      </TimeSlotCard>
                    ))}
                  </TimeSlotWrapper>
                </StartTime>
                <EndTime>
                  <h3>Select End Time:</h3>
                  <TimeSlotWrapper>
                    {timeSlots.map((slot, index) => (
                      <TimeSlotCard
                        key={index}
                        selected={selectedEndTime === slot.time}
                        onClick={() => setSelectedEndTime(slot.time)}
                      >
                        {slot.time}
                      </TimeSlotCard>
                    ))}
                  </TimeSlotWrapper>
                </EndTime>
              </TimeSection>
              <ButtonHolder>
                <Button title="Submit" onClick={handleSubmit} />
              </ButtonHolder>
            </>
          </GeneralModal>
        </>
      )}
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
const ButtonHolder = styled.div`
  width: 200px;
  margin-top: 20px;
`;

export const IconWrap = styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
  flex-direction: row;
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

const TopTitle = styled.p`
  font-weight: 700;
  font-size: 29px;
  line-height: 120%;
  color: #2d2235;
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
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

const DatePickerWrapper = styled.div`
  margin-bottom: 20px;
`;
const TimeSlotWrapper = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const TimeSlotCard = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin: 8px;
  background-color: ${({ selected }) => (selected ? "#3c0fbd" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#3c0fbd" : "#e0e0e0")};
  }
`;

const TimeSection = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;
const StartTime = styled.div`
  display: flex;
  flex-direction: column;
`;
const EndTime = styled.div`
  display: flex;
  flex-direction: column;
`;
