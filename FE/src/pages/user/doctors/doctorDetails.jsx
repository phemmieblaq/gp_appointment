import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Body,
  DoctorDetailsSection,
  DoctorInfo,
  DoctorDescription,
  InfoItem,
  ButtonHolder,
  AppointmentSection,
  TimeSlotCard,
  DatePickerWrapper,
  TimeSlotWrapper,
} from "./styled";
import { useSelector } from "react-redux";
import { getDoctorsBySpecialty } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/mainButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Textarea from "../../../components/input/TextArea";
import format from "date-fns/format";
import { GetTime } from "../../../utils/config";

const DoctorsDetails = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [doctorDetails, setDoctor] = useState({});
  const [timeSlots, setTimeSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { name, email } = useParams();

  const handleFetch = async () => {
    try {
      const response = await getDoctorsBySpecialty(name);
      const finddoc = response?.data?.find((doc) => doc?.email === email);
      setDoctor(finddoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
    GetTime(setTimeSlot);
  }, []);

  const handleBook = () => {
    if (!selectedTime) {
      alert("Please select a time slot!");
      return;
    }
    const requiredData = {
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      reason: note,
      doctor_id: doctorDetails?.doctor_id,
    };
    console.log(requiredData);
    // Handle booking logic here
  };
  console.log(doctorDetails);

  return (
    <Container>
      <Header>
        <h1>Book Your Appointment</h1>
        <p>Choose a suitable date and time with {doctorDetails?.doctor_name}</p>
      </Header>

      <Body>
        <DoctorDetailsSection>
          <DoctorInfo>
            <InfoItem>
              <strong>Name:</strong> {doctorDetails?.doctor_name}
            </InfoItem>
            <InfoItem>
              <strong>Email:</strong> {doctorDetails?.email}
            </InfoItem>
            <InfoItem>
              <strong>Specialty:</strong> {name}
            </InfoItem>
            <DoctorDescription>
              <strong>
                Description: component is added to display the doctor's
                description in a smaller font size, below the other details,
                giving a clear and comprehensive overview of the doctor.
              </strong>{" "}
              {doctorDetails?.description}
            </DoctorDescription>
          </DoctorInfo>
        </DoctorDetailsSection>

        <AppointmentSection>
          <h3>Select a Date:</h3>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </DatePickerWrapper>

          <h3>Select a Time Slot:</h3>
          <TimeSlotWrapper>
            {timeSlots.map((slot, index) => (
              <TimeSlotCard
                key={index}
                selected={selectedTime === slot.time}
                onClick={() => setSelectedTime(slot.time)}
              >
                {slot.time}
              </TimeSlotCard>
            ))}
          </TimeSlotWrapper>
          <Textarea
            placeholder="Description"
            onChange={(e) => setNote(e.target.value)}
          />
          <ButtonHolder>
            <Button
              title="Book Appointment"
              onClick={handleBook}
              disabled={!(selectedDate && selectedTime)}
            />
          </ButtonHolder>
        </AppointmentSection>
      </Body>
    </Container>
  );
};

export default DoctorsDetails;
