import React, { useEffect, useState } from "react";
import {
  Body,
  GridContainer,
  Container,
  Header,
  SecondWrapper,
  Heading,
  FlexCard,
  HospitalSection,
  MappingSection,
  SpecialtyWrapper,
  SpecialtyCard,
  SpelName,
  SpelDescription,
} from "./styled";
import SessionCard from "../../../components/card/sessionCard";
import CheckUpCard from "../../../components/card/checkUpCard";
import BlogCard from "../../../components/card/blogCard";
import { cardDetails } from "./constants";
import MedicalCard from "../../../components/card/medicalCard";
import { useSelector } from "react-redux";
import {
  getAllSpecialties,
  getAppointmentsListPatientId,
  getDoctorsBySpecialty,
} from "../../../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  console.log("login", loginInfo);
  const [spectialty, setSpecialty] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [eventList, setEventList] = useState([]);

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsListPatientId(loginInfo?.userId);
      console.log(response, "ddddd irennn");
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

  console.log(doctors);
  return (
    <div>
      <Container>
        <Header>
          <p>Book your GP</p>
          <p>
            Trusted GP appointment booking services to support your healthcare
            journey.
          </p>
        </Header>
        <Body>
          <GridContainer>
            <FlexCard>
              <SessionCard />
              <SecondWrapper>
                <Heading>Upcoming Appointment</Heading>
                {eventList?.map((el, index) => (
                  <CheckUpCard
                    key={index}
                    reason={el?.reason}
                    address={el?.address}
                    date={el?.appointment_date.slice(0, 10)}
                    time={el?.start_time}
                  />
                ))}
              </SecondWrapper>
            </FlexCard>
            <SecondWrapper>
              <Heading>What's new</Heading>
              <BlogCard />
            </SecondWrapper>
          </GridContainer>
          <HospitalSection>
            {/* <Heading>Medical center's near you</Heading>
            <MappingSection>
              {cardDetails?.slice(0, 3).map((card, index) => (
                <MedicalCard
                  key={index}
                  hospitalName={card.hospitalName}
                  address={card.address}
                  carTime={card.carTime}
                  walkDistance={card.walkDistance}
                />
              ))}
            </MappingSection> */}
          </HospitalSection>
        </Body>
      </Container>
    </div>
  );
};
export default Home;
