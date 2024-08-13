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
  SpecialtyWrapper,
  SpecialtyCard,
  SpelName,
  SpelDescription,
} from "./styled";
import SessionCard from "../../../components/card/sessionCard";
import CheckUpCard from "../../../components/card/checkUpCard";
import BlogCard from "../../../components/card/blogCard";
import { useSelector } from "react-redux";
import { getDoctorsBySpecialty } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  console.log("login", loginInfo);
  const [spectialty, setSpecialty] = useState([]);
  const [doctorList, setDoctors] = useState([]);
  const navigate = useNavigate();
  const { name } = useParams();

  console.log("ddd", name);
  const handleFetch = async () => {
    try {
      const response = await getDoctorsBySpecialty(name);
      console.log(response, "hhhhh");
      setDoctors(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleClick = async (email) => {
    navigate(`/dashboard/doctor-details/${name}/${email}`);
  };
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
            <SpecialtyWrapper>
              {doctorList?.map((doctor, index) => (
                <SpecialtyCard onClick={() => handleClick(doctor?.email)}>
                  <SpelName>{name}</SpelName>
                  <SpelDescription>{doctor?.doctor_name}</SpelDescription>
                  <SpelDescription>{doctor?.email}</SpelDescription>
                </SpecialtyCard>
              ))}
            </SpecialtyWrapper>
          </HospitalSection>
        </Body>
      </Container>
    </div>
  );
};
export default Doctors;
