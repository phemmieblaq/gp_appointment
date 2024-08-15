import React, { useEffect, useState } from "react";
import { appointment } from "./constant";
import CheckUpCard from "../../../components/card/checkUpCard";
import styled from "styled-components";
import {
  deleteAppointment,
  getAppointmentsListPatientId,
} from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UpcomingAppointment = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [eventList, setEventList] = useState([]);

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsListPatientId(loginInfo?.userId);

      if (response?.status === 200) {
        setEventList(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchAppointment();
  }, []);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await deleteAppointment(appointmentId);
      console.log(response);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        // window.location.reload();
        const responseList = await getAppointmentsListPatientId(
          loginInfo?.userId
        );
        if (responseList?.status === 200) {
          setEventList(responseList?.data?.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {eventList?.map((el, index) => (
        <CheckUpCard
          key={index}
          booking
          reason={el?.reason}
          address={el?.address}
          date={el?.appointment_date.slice(0, 10)}
          time={el?.start_time}
          handleDelete={() => handleDeleteAppointment(el?.appointment_id)}
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
