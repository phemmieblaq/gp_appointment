import React, { useEffect, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { calendarEvents } from "./events";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TimePicker from "rc-time-picker";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import TimePicker from "@mui/lab/TimePicker";
import DialogTitle from "@mui/material/DialogTitle";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { deleteAppointment, getAppointmentsList } from "../../../services/api";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../components/mainButton";
import toast from "react-hot-toast";
momentLocalizer(moment);

const ScheduleCalendar = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [desc, setDesc] = useState("");
  const [valuer, setValue] = React.useState(null);
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});
  const [value, onChange] = useState("10:00");
  const [eventList, setEventList] = useState([]);

  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
  };

  const handleSlotSelected = (slotInfo) => {
    console.log("Real slotInfo", slotInfo);
    setTitle("");
    setDesc("");
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setOpenSlot(true);
  };

  const handleEventSelected = (event) => {
    console.log("event", event);
    setClickedEvent(event);
    setStart(event.start);
    setEnd(event.end);
    setAppointmentId(event.appointment_id);
    setTitle(event.title);
    setDesc(event.desc);
    setOpenEvent(true);
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

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsList(loginInfo?.doctorId);
      console.log(response, "ddddd irennn");
      if (response?.status === 200) {
        const list = response?.data?.data?.map((appointment) => ({
          title: appointment.reason,
          appointment_id: appointment?.appointment_id,
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
        console.log(list);
        setEventList(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(appointmentId);

  useEffect(() => {
    handleFetchAppointment();
  }, []);

  const handleCancelAppointment = async () => {
    try {
      const deleteResponse = await deleteAppointment(appointmentId);
      console.log(deleteResponse);
      if (deleteResponse?.status === 200) {
        toast.success(deleteResponse?.data?.message);
        // window.location.reload();
        const response = await getAppointmentsList(loginInfo?.doctorId);
        console.log(response, "ddddd irennn");
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
          console.log(list);
          setEventList(list);
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
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

  const appointmentActions = [
    <Button
      key="cancel-appointment"
      label="Cancel"
      secondary={true}
      onClick={handleClose}
    />,
    <Button
      key="submit-appointment"
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onClick={setNewAppointment}
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
        onSelectSlot={handleSlotSelected}
      />

      {/* Material-ui Modal for booking new appointment */}
      <Dialog
        title={`Book an appointment on ${moment(start).format("MMMM Do YYYY")}`}
        actions={appointmentActions}
        modal={false}
        open={openSlot}
        onClose={handleClose}
      >
        <DialogTitle>{"Create schedule"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Provide your availability time for your patients to book
            appointment.
          </DialogContentText>
        </DialogContent>
        <TextField
          floatingLabelText="Title"
          variant="filled"
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          variant="filled"
          label="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        Start:
        <TimePicker onChange={onChange} disableClock={true} value={value} />
        End:
        <TimePicker onChange={onChange} disableClock={true} value={value} />
        {/* <TimePicker
            format="ampm"
            floatingLabelText="Start Time"
            minutesStep={5}
            value={start}
            onChange={handleStartTime}
          />
          <TimePicker
            format="ampm"
            floatingLabelText="End Time"
            minutesStep={5}
            value={end}
            onChange={handleEndTime}
          /> */}
      </Dialog>

      {/*  Modal for Existing Event */}
      <Dialog
        title={`View/Edit Appointment of ${moment(start).format(
          "MMMM Do YYYY"
        )}`}
        actions={eventActions}
        modal={false}
        open={openEvent}
        onClose={handleClose}
      >
        <DialogTitle>{"Appointment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Appointment Details for the Event
          </DialogContentText>
        </DialogContent>

        {/* <TextField
          defaultValue={title}
          floatingLabelText="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          multiLine={true}
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
        /> */}

        <TextField
          floatingLabelText="Title"
          variant="filled"
          defaultValue={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          multiLine={true}
          defaultValue={desc}
          variant="filled"
          label="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <ButtonHolder>
          <Button
            title="Cancel"
            bg_color={"purple"}
            onClick={() => handleCancelAppointment()}
          />
          <Button title="Submit" />
        </ButtonHolder>

        {/* <TimePicker
            format="ampm"
            floatingLabelText="Start Time"
            minutesStep={5}
            value={start}
            onChange={handleStartTime}
          />
          <TimePicker
            format="ampm"
            floatingLabelText="End Time"
            minutesStep={5}
            value={end}
            onChange={handleEndTime}
          /> */}
      </Dialog>
      {/* </div> */}
    </>
  );
};

export default ScheduleCalendar;

const ButtonHolder = styled.div`
  width: 500px;
  display: flex;
  margin-top: 20px;
  gap: 100px;
`;
