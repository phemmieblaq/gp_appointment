import React, { useEffect, useState } from "react";
import CheckUpCard from "../../../components/card/checkUpCard";
import styled from "styled-components";
import {
  deleteAppointment,
  getAppointmentsListPatientId,
} from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import NotFound from "../../../components/NotFound";
import { parseISO } from "date-fns";

const UpcomingAppointment = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [eventList, setEventList] = useState([]);

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsListPatientId(loginInfo?.userId);

      if (response?.status === 200) {
        const today = new Date();
        const upcomingEvents = response?.data?.data.filter((event) => {
          const appointmentDate = parseISO(event.appointment_date);
          return appointmentDate.getTime() >= today.getTime();
        });

        setEventList(upcomingEvents);
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
        handleFetchAppointment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {eventList.length > 0 ? (
        <>
          {" "}
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
        </>
      ) : (
        <NotFound message={"No Appointment Record Found."} />
      )}
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
