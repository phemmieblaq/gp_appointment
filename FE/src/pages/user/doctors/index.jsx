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
import ProductCard from "../../../components/ProductCard";
import DetailsCard from "../../../components/ProductCard";

const Doctors = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);

  const [doctorList, setDoctors] = useState([]);

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

  return (
    <div>
      <Container>
        <Header>
          <p>Doctors</p>
          <p>Select Doctor</p>
        </Header>

        <SpecialtyWrapper>
          {doctorList?.map((doctor, index) => (
            <DetailsCard
              title={doctor?.doctor_name}
              body={doctor?.email}
              to={`/dashboard/doctor-details/${name}/${doctor?.email}`}
              email={name}
            />
          ))}
        </SpecialtyWrapper>
      </Container>
    </div>
  );
};
export default Doctors;
