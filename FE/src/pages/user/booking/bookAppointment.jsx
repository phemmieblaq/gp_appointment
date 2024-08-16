import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SpecialtyWrapper } from "../dashboard/styled";
import { getAllSpecialties } from "../../../services/api";
import DetailsCard from "../../../components/ProductCard";

const BookAppointment = () => {
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
          <div key={index}>
            <DetailsCard
              title={data?.specialty_name}
              body={data?.description}
              to={`/dashboard/doctors/${data?.specialty_name}`}
            />
          </div>
        ))}
      </SpecialtyWrapper>
    </>
  );
};

export default BookAppointment;

const HeaderText = styled.h1`
  margin: 14px 0px;
`;

const Body = styled.div`
  padding-block: 40px;
  width: 100%;
`;
