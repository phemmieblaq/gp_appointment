import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SpecialtyWrapper } from "../dashboard/styled";
import { getAllSpecialties } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import DetailsCard from "../../../components/ProductCard";

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

  return (
    <>
      <HeaderText>Select Specialty to proceed</HeaderText>
      <SpecialtyWrapper>
        {spectialty?.map((data, index) => (
          <DetailsCard
            title={data?.specialty_name}
            body={data?.description}
            to={`/dashboard/doctors/${data?.specialty_name}`}
          />
        ))}
      </SpecialtyWrapper>
    </>
  );
};

export default BookAppointment;

const HeaderText = styled.h1`
  margin-bottom: 14px;
`;

const Body = styled.div`
  padding-block: 40px;
  width: 100%;
`;
