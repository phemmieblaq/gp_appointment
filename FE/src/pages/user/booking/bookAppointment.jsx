import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SpecialtyCard,
  SpecialtyWrapper,
  SpelDescription,
  SpelName,
} from "../dashboard/styled";
import { getAllSpecialties } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [spectialty, setSpecialty] = useState([]);

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

  return (
    <>
      <HeaderText>Select Specialty to proceed</HeaderText>
      <SpecialtyWrapper>
        {spectialty?.map((data, index) => (
          <SpecialtyCard onClick={() => handleClick(data?.specialty_name)}>
            <SpelName>{data?.specialty_name}</SpelName>
            <SpelDescription>{data?.description}</SpelDescription>
          </SpecialtyCard>
        ))}
      </SpecialtyWrapper>
    </>
  );
};

export default BookAppointment;

const HeaderText = styled.h1``;

const Body = styled.div`
  padding-block: 40px;
  width: 100%;
`;
