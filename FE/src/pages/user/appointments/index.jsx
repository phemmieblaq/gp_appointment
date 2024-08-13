import React, { useEffect, useState } from "react";
import { appointment } from "./constant";
import CheckUpCard from "../../../components/card/checkUpCard";
import styled from "styled-components";
import { getAppointmentsListPatientId } from "../../../services/api";
import { useSelector } from "react-redux";

const UpcomingAppointment = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [eventList, setEventList] = useState([]);

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsListPatientId(loginInfo?.userId);
      console.log(response, "ddddd irennn");
      if (response?.status === 200) {
        // const list = response?.data?.data?.map((appointment) => ({
        //   title: appointment.reason,
        //   start: new Date(
        //     `${appointment.appointment_date.split("T")[0]}T${
        //       appointment.start_time
        //     }`
        //   ),
        //   end: new Date(
        //     `${appointment.appointment_date.split("T")[0]}T${
        //       appointment.end_time
        //     }`
        //   ),
        //   desc: appointment?.reason,
        // }));

        setEventList(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchAppointment();
  }, []);
  console.log("event list is", eventList);

  return (
    <Wrapper>
      {eventList?.map((el, index) => (
        <CheckUpCard
          key={index}
          reason={el?.reason}
          address={el?.address}
          date={el?.appointment_date.slice(0, 10)}
          time={el?.start_time}
        />
      ))}
    </Wrapper>
  );
};

export default UpcomingAppointment;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;
