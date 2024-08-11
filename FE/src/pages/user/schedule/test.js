import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { calendarEvents } from "./events";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
momentLocalizer(moment);

const ScheduleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [desc, setDesc] = useState("");
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});

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
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div id="Calendar">
        {/* react-big-calendar library utilized to render calendar */}
        <Calendar
          events={events}
          step={60}
          localizer={localizer}
          views={["month", "week", "day", "agenda"]}
          selectable={true}
          timeslots={2}
          defaultDate={new Date(2016, 3, 1)}
          popup={false}
          onSelectEvent={handleEventSelected}
          onSelectSlot={handleSlotSelected}
        />

        {/* Material-ui Modal for booking new appointment */}
        <Dialog
          title={`Book an appointment on ${moment(start).format(
            "MMMM Do YYYY"
          )}`}
          actions={appointmentActions}
          modal={false}
          open={openSlot}
          onRequestClose={handleClose}
        >
          <TextField
            floatingLabelText="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            floatingLabelText="Description"
            onChange={(e) => setDesc(e.target.value)}
          />

          <TimePicker
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
          />
        </Dialog>

        {/* Material-ui Modal for Existing Event */}
        <Dialog
          title={`View/Edit Appointment of ${moment(start).format(
            "MMMM Do YYYY"
          )}`}
          actions={eventActions}
          modal={false}
          open={openEvent}
          onRequestClose={handleClose}
        >
          <TextField
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
          />

          <TimePicker
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
          />
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default ScheduleCalendar;
