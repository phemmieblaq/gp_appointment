import React, { useEffect, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HiTrash } from "react-icons/hi2";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  deleteAppointment,
  getAppointmentsList,
  getUserHistory,
  updateUserHistory,
} from "../../../services/api";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../components/mainButton";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { BtnHolder, DoubleGridWrapper } from "../history/styles";
import { useForm } from "react-hook-form";
import { InputWithLabel } from "../../../components/input";
import { medicalHistorySchema } from "../history/schema";
import { HeadText } from "../../../components/texts";
momentLocalizer(moment);

const ScheduleCalendar = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [events, setEvents] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [desc, setDesc] = useState("");
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});
  const [eventList, setEventList] = useState([]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(medicalHistorySchema),
  });

  const handleClose = () => {
    setOpenEvent(false);
  };

  const handleEventSelected = (event) => {
    setClickedEvent(event);
    setStart(event.start);
    setEnd(event.end);
    setAppointmentId(event.appointment_id);
    setTitle(event.title);
    setDesc(event.desc);
    setOpenEvent(true);
    fetchUserHistory(event.patient_id);
  };

  const handleStartTime = (event, date) => {
    setStart(date);
  };

  const handleEndTime = (event, date) => {
    setEnd(date);
  };

  const setNewAppointment = () => {
    const appointment = { title, start, end, desc };
    setEvents([...events, appointment]);
    handleClose();
  };

  const updateEvent = () => {
    const updatedEvents = events.map((event) =>
      event === clickedEvent ? { ...event, title, desc, start, end } : event
    );
    setEvents(updatedEvents);
    handleClose();
  };

  const deleteEvent = () => {
    const updatedEvents = events.filter((event) => event.start !== start);
    setEvents(updatedEvents);
    handleClose();
  };

  const fetchUserHistory = async (patientId) => {
    try {
      const response = await getUserHistory(patientId);
      if (response.data) {
        setInitialValues(response?.data?.data);
        setValue("sugar_level", response?.data?.data?.sugar_level, {
          shouldValidate: true,
        });
        setValue("blood_pressure", response?.data?.data?.blood_pressure, {
          shouldValidate: true,
        });
        setValue("allergies", response?.data?.data?.allergies, {
          shouldValidate: true,
        });
        setValue("last_medication", response?.data?.data?.last_medication, {
          shouldValidate: true,
        });
        setValue("genotype", response?.data?.data?.genotype, {
          shouldValidate: true,
        });
        setValue("blood_group", response?.data?.data?.blood_group, {
          shouldValidate: true,
        });
        setValue(
          "vaccination_history",
          response?.data?.data?.vaccination_history,
          {
            shouldValidate: true,
          }
        );
        setValue("smoking_status", response?.data?.data?.smoking_status, {
          shouldValidate: true,
        });
        setValue(
          "alcohol_consumption",
          response?.data?.data?.alcohol_consumption,
          {
            shouldValidate: true,
          }
        );
        setValue(
          "current_medications",
          response?.data?.data?.current_medications,
          {
            shouldValidate: true,
          }
        );
        setValue(
          "immunization_status",
          response?.data?.data?.immunization_status,
          {
            shouldValidate: true,
          }
        );
      }
    } catch (error) {
      console.log("Error fetching user history:", error);
      setInitialValues(null);
      toast.error("Error fetching user history");
    }
  };

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsList(loginInfo?.doctorId);

      if (response?.status === 200) {
        const list = response?.data?.data?.map((appointment) => ({
          title: appointment.reason,
          appointment_id: appointment?.appointment_id,
          patient_id: appointment.patient_id,
          start: new Date(
            `${appointment.appointment_date.split("T")[0]}T${
              appointment.start_time
            }`
          ),
          end: new Date(
            `${appointment.appointment_date.split("T")[0]}T${
              appointment.end_time
            }`
          ),
          desc: appointment?.reason,
        }));

        setEventList(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchAppointment();
  }, []);

  const handleCancelAppointment = async () => {
    try {
      const deleteResponse = await deleteAppointment(appointmentId);

      if (deleteResponse?.status === 200) {
        toast.success(deleteResponse?.data?.message);
        // window.location.reload();
        const response = await getAppointmentsList(loginInfo?.doctorId);

        if (response?.status === 200) {
          const list = response?.data?.data?.map((appointment) => ({
            id: appointment?.appointment_id,
            title: appointment.reason,
            start: new Date(
              `${appointment.appointment_date.split("T")[0]}T${
                appointment.start_time
              }`
            ),
            end: new Date(
              `${appointment.appointment_date.split("T")[0]}T${
                appointment.end_time
              }`
            ),
            desc: appointment?.reason,
          }));

          setEventList(list);
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (data) => {
    try {
      const historyData = {
        sugar_level: data.sugar_level,
        blood_pressure: data.blood_pressure,
        allergies: data.allergies,
        last_medication: data.last_medication,
        genotype: data.genotype,
        blood_group: data.blood_group,
        vaccination_history: data.vaccination_history,
        smoking_status: data.smoking_status,
        alcohol_consumption: data.alcohol_consumption,
        current_medications: data.current_medications,
        immunization_status: data.immunization_status,
      };
      console.log(initialValues, "daddd");
      if (initialValues) {
        const response = await updateUserHistory(
          historyData,
          initialValues?.history_id,
          initialValues?.user_id
        );
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log("Error registering user:", error);
      toast.error("Error registering user");
    }
  };

  const eventActions = [
    <Button
      key="cancel-event"
      label="Cancel"
      primary={false}
      keyboardFocused={true}
      onClick={handleClose}
    />,
    <Button
      key="delete-event"
      label="Delete"
      secondary={true}
      keyboardFocused={true}
      onClick={deleteEvent}
    />,
    <Button
      key="confirm-edit"
      label="Confirm Edit"
      primary={true}
      keyboardFocused={true}
      onClick={updateEvent}
    />,
  ];

  //   const locales = ["en-us", "en-gb", "zh-cn", "de"];
  const localizer = momentLocalizer(moment);
  const allViews = Object.keys(Views).map((k) => Views[k]);
  //   const [locale, setLocale] = React.useState < LocaleKey > "en-us";

  //   if (moment.locale() !== locale) {
  //     moment.locale(locale);
  //   }

  return (
    <>
      {/* <div id="Calendar"> */}
      {/*  */}
      <Calendar
        events={eventList}
        step={60}
        localizer={localizer}
        views={allViews}
        selectable={true}
        timeslots={2}
        defaultDate={new Date()}
        popup={false}
        onShowMore={(eventList, date) =>
          this.setState({ showModal: true, eventList })
        }
        onSelectEvent={handleEventSelected}
        // onSelectSlot={handleSlotSelected}
      />

      {/*  Modal for Existing Event */}
      <Dialog
        title={`View/Edit Appointment of ${moment(start).format(
          "MMMM Do YYYY"
        )}`}
        actions={eventActions}
        modal={false}
        open={openEvent}
        onClose={handleClose}
        maxWidth="xl"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "15px 20px",
          }}
        >
          <HeadText
            title="Appointment"
            body=""
            align="flex-start"
            margintop="8px"
          />

          <p
            style={{
              fontWeight: 500,
              fontSize: "18px",
              color: "#3c0fbd",
            }}
          >
            Description: {title}
          </p>
        </div>

        <DeleteWrapper onClick={handleCancelAppointment}>
          <HiTrash size={24} />
          <Time>Cancel Appointment</Time>
        </DeleteWrapper>

        {initialValues && (
          <form
            style={{ width: "600px", padding: "30px 20px" }}
            onSubmit={handleSubmit(submitForm)}
          >
            <HeadText
              title="Medical Information"
              body="Patient medical inforrmation"
              align="flex-start"
              marginbottom={"16px"}
            />

            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your sugar level"
                label="Sugar Level"
                type="text"
                name="sugar_level"
                register={register}
                errorMessage={errors.sugar_level?.message}
              />
              <InputWithLabel
                placeholder="Enter your blood pressure"
                label="Blood Pressure"
                type="text"
                name="blood_pressure"
                register={register}
                errorMessage={errors.blood_pressure?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your allergies"
                label="Allergies"
                type="text"
                name="allergies"
                register={register}
                errorMessage={errors.allergies?.message}
              />
              <InputWithLabel
                placeholder="Enter your last medication"
                label="Last Medication"
                type="text"
                name="last_medication"
                register={register}
                errorMessage={errors.last_medication?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your genotype"
                label="Genotype"
                type="text"
                name="genotype"
                register={register}
                errorMessage={errors.genotype?.message}
              />
              <InputWithLabel
                placeholder="Enter your blood group"
                label="Blood Group"
                type="text"
                name="blood_group"
                register={register}
                errorMessage={errors.blood_group?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                label="Smoking Status"
                type="checkbox"
                name="smoking_status"
                register={register}
              />
              <InputWithLabel
                label="Alcohol Consumption"
                type="checkbox"
                name="alcohol_consumption"
                register={register}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your vaccination history"
                label="Vaccination History"
                type="text"
                name="vaccination_history"
                register={register}
                errorMessage={errors.vaccination_history?.message}
              />

              <InputWithLabel
                placeholder="Enter your current medications"
                label="Current Medications"
                type="text"
                name="current_medications"
                register={register}
                errorMessage={errors.current_medications?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your immunization status"
                label="Immunization Status"
                type="text"
                name="immunization_status"
                register={register}
                errorMessage={errors.immunization_status?.message}
              />
              <BtnHolder>
                <Button title="Update" type="submit" bg_color="#3C0FBD" />
              </BtnHolder>
            </DoubleGridWrapper>
          </form>
        )}
      </Dialog>
      {/* </div> */}
    </>
  );
};

export default ScheduleCalendar;

const ButtonHolder = styled.div`
  width: 200px;
  display: flex;
  margin-top: 20px;
  gap: 100px;
`;
const Time = styled.h4`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 14.52px;
  text-align: left;
`;
const DeleteWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
  padding-left: 15px;
  margin: 20px 0px;
  justify-content: flex-start;
  cursor: pointer;
  color: red;
`;
