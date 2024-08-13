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
  getDoctorsBySpecialty,
} from "../../../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  console.log("login", loginInfo);
  const [spectialty, setSpecialty] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleFetchSpecialty = async () => {
    try {
      const response = await getAllSpecialties();
      console.log(response);
      setSpecialty(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchSpecialty();
  }, []);

  const handleClick = async (name) => {
    navigate(`/dashboard/doctors/${name}`);
  };
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
                <CheckUpCard />
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
            <SpecialtyWrapper>
              {spectialty?.map((data, index) => (
                <SpecialtyCard
                  onClick={() => handleClick(data?.specialty_name)}
                >
                  <SpelName>{data?.specialty_name}</SpelName>
                  <SpelDescription>{data?.description}</SpelDescription>
                </SpecialtyCard>
              ))}
            </SpecialtyWrapper>
          </HospitalSection>
        </Body>
      </Container>
    </div>
  );
};
export default Home;
