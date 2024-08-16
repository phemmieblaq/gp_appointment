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
  TimeSlotWrapper,
} from "./styled";
import { useSelector } from "react-redux";
import {
  bookAppointment,
  getDoctorsBySpecialty,
  getScheduleByDoctor,
} from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/mainButton";
import Textarea from "../../../components/input/TextArea";
import format from "date-fns/format";
import toast from "react-hot-toast";

const DoctorsDetails = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [doctorDetails, setDoctor] = useState({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [doctorScheduleList, setDoctorScheduleList] = useState([]);
  const [note, setNote] = useState("");
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

  const handleFetchSchedule = async () => {
    try {
      const response = await getScheduleByDoctor(loginInfo?.doctorId);
      setDoctorScheduleList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
    handleFetchSchedule();
  }, []);

  const handleBook = async () => {
    try {
      if (!selectedTimeSlot) {
        alert("Please select a time slot!");
        return;
      }
      const requiredData = {
        scheduleId: selectedTimeSlot.schedule_id,
        reason: note,
        patient_id: loginInfo?.userId,
      };
      console.log(requiredData);
      const response = await bookAppointment(requiredData);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
      }
      console.log(response, "result");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Book Your Appointment</h1>
        <p>Choose a suitable time with {doctorDetails?.doctor_name}</p>
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
              <strong>Description:</strong> {doctorDetails?.description}
            </DoctorDescription>
          </DoctorInfo>
        </DoctorDetailsSection>

        <AppointmentSection>
          <h3>Select a Time Slot:</h3>
          <TimeSlotWrapper>
            {doctorScheduleList?.map((slot) => (
              <TimeSlotCard
                key={slot.schedule_id}
                selected={selectedTimeSlot?.schedule_id === slot.schedule_id}
                onClick={() => setSelectedTimeSlot(slot)}
              >
                <span>
                  {format(new Date(slot.available_date), "dd/MM/yyyy")} |{" "}
                  {slot.start_time} - {slot.end_time}
                </span>
                <br />
                <p style={{ color: slot.is_booked ? "red" : "green" }}>
                  {slot.is_booked ? "Booked" : "Available"}
                </p>
              </TimeSlotCard>
            ))}
          </TimeSlotWrapper>

          <Textarea
            placeholder="Reason for Appointment"
            onChange={(e) => setNote(e.target.value)}
          />
          <ButtonHolder>
            <Button
              title="Book Appointment"
              onClick={handleBook}
              disabled={!selectedTimeSlot}
            />
          </ButtonHolder>
        </AppointmentSection>
      </Body>
    </Container>
  );
};

export default DoctorsDetails;
