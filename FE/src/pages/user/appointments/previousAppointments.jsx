import React, { useEffect, useState } from "react";
import CheckUpCard from "../../../components/card/checkUpCard";
import styled from "styled-components";
import { getAppointmentsListPatientId } from "../../../services/api";
import { useSelector } from "react-redux";
import NotFound from "../../../components/NotFound";
import { parseISO } from "date-fns";

const PreviousAppointments = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [eventList, setEventList] = useState([]);

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsListPatientId(loginInfo?.userId);

      if (response?.status === 200) {
        const today = new Date();
        const upcomingEvents = response?.data?.data.filter((event) => {
          const appointmentDate = parseISO(event.appointment_date);
          return appointmentDate.getTime() <= today.getTime();
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

  return (
    <Wrapper>
      {eventList.length > 0 ? (
        <>
          {" "}
          {eventList?.map((el, index) => (
            <CheckUpCard
              key={index}
              reason={el?.reason}
              address={el?.address}
              date={el?.appointment_date.slice(0, 10)}
              time={el?.start_time}
            />
          ))}
        </>
      ) : (
        <NotFound message={"No Appointment Record Found."} />
      )}
    </Wrapper>
  );
};

export default PreviousAppointments;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;
