import React from "react";
import styled from "styled-components";
import bookImage from "../../../assets/images/bookImage.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Header } from "../dashboard/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InputWithLabel } from "../../../components/input";
import DropDownInput from "../../../components/input/dropDownInput";
import { useState } from "react";
import Textarea from "../../../components/input/TextArea";
import Button from "../../../components/mainButton";
import { userBookingSchema } from "./schema";
import {
  getAllSpecialties,
  getDoctorsBySpecialty,
} from "../../../services/api";
import { useEffect } from "react";
const BookingForm = () => {
  const [date, setDate] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // Fetch all specialties on component mount
    const fetchSpecialties = async () => {
      try {
        const data = await getAllSpecialties();
        setSpecialties(data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    };

    fetchSpecialties();
  }, []);

  useEffect(() => {
    // Fetch doctors when a specialty is selected
    if (selectedSpecialty) {
      const fetchDoctors = async () => {
        try {
          const data = await getDoctorsBySpecialty(selectedSpecialty);
          setDoctors(data?.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };

      fetchDoctors();
    }
  }, [selectedSpecialty]);

  const specialityNames = specialties?.data?.data.map(
    (specialty) => specialty.specialty_name
  );
  //console.log(specialityNames)
  const doctorOptions = doctors?.map((doc) => ({
    id: doc.doctor_id,
    name: doc.doctor_name,
  }));

  const handleDate = (e) => {
    const value = e.target.value;
    setDate(value);
    setValue("date", date, { shouldValidate: true });
  };
  const handleTime = (value) => {
    setValue("time", value, { shouldValidate: true });
  };
  const handleDepartment = (value) => {
    setValue("department", value, { shouldValidate: true });
    setSelectedSpecialty(value);
  };

  const handleDoctor = (selected) => {
    setSelectedDoctor(selected);

    console.log("Selected doctor:", selected);
  };

  const {
    handleSubmit,
    register,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(userBookingSchema),
  });

  const appointmentSlots = [
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 1:00",
    "1:00 - 1:30",
    "1:30 - 2:00",
    "2:00 - 2:30",
    "2:30 - 3:00",
    "3:00 - 3:30",
    "3:30 - 4:00",
    "4:00 - 4:30",
    "4:30 - 5:00",
  ];

  const submitForm = (data) => {
    //console.log(data);
  };

  return (
    <Wrapper>
      <LeftWrapper>
        <PrevWrapper>
          <IoIosArrowRoundBack color="#3C0FBD" />
          <Previous>Previous</Previous>
        </PrevWrapper>
        <Header>
          <p>Book a session</p>
          <p>Please provide the required information to book an appointment.</p>

          <Form onSubmit={handleSubmit(submitForm)}>
            <Textarea
              minHeight="150px"
              register={register}
              label="Why are you booking an appointment?"
              type="text"
              name="reasons"
              errorMessage={errors?.reasons?.message}
            />

            <DropDownInput
              label="Department "
              Options={specialityNames}
              initialValue="select"
              errorMessage={errors.department?.message}
              name="department"
              handleChange={handleDepartment}
            />

            {selectedSpecialty && (
              <DropDownInput
                label="Doctors"
                Options={doctorOptions}
                initialValue="select"
                errorMessage={errors.department?.message}
                name="doctor"
                handleChange={handleDoctor}
                useObjectOptions={true} // Pass true to indicate Options contains objects
              />
            )}

            <Textarea
              register={register}
              minHeight="180px"
              label="How do you feel? Give a description of your symptoms"
              type="text"
              name="descriptions"
              errorMessage={errors.descriptions?.message}
            />

            <InputWithLabel
              label="Date"
              type="date"
              name="date"
              onChange={handleDate}
              errorMessage={errors.date?.message}
            />

            <DropDownInput
              label="Time "
              Options={appointmentSlots}
              initialValue="select"
              errorMessage={errors.time?.message}
              name="time"
              handleChange={handleTime}
            />

            <Button
              title="Book"
              //onClick={{}}
              type="submit"
              bg_color="#3C0FBD"
            />
          </Form>
        </Header>
      </LeftWrapper>

      <RightWrapper>
        <Image src={bookImage} alt="booking" />
      </RightWrapper>
    </Wrapper>
  );
};

export default BookingForm;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
`;
const LeftWrapper = styled.div`
  width: 100%;
  padding: 63px 119px 75px 40px;
`;
const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  postion: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
`;
const PrevWrapper = styled.div`
  display: flex;

  gap: 8px;
  cursor: pointer;
  margin-bottom: 80px;
`;
const Previous = styled.p`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.52px;
  text-align: left;
  color: #3c0fbd;
`;

const Form = styled.form``;
