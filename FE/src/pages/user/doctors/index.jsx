import React, { useEffect, useState } from "react";
import { Container, Header, SpecialtyWrapper } from "./styled";
import { getDoctorsBySpecialty } from "../../../services/api";
import { useParams } from "react-router-dom";
import DetailsCard from "../../../components/ProductCard";

const Doctors = () => {
  const [doctorList, setDoctors] = useState([]);

  const { name } = useParams();

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
            <div key={index}>
              <DetailsCard
                title={doctor?.doctor_name}
                body={doctor?.email}
                to={`/dashboard/doctor-details/${name}/${doctor?.email}`}
                email={name}
              />
            </div>
          ))}
        </SpecialtyWrapper>
      </Container>
    </div>
  );
};
export default Doctors;
