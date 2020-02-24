/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "./Appointment/index"
import { getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors"
import axios from "axios";
import useVisualMode from "../hooks/useVisualMode"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  Promise.all([
    Promise.resolve(axios.get("http://localhost:8001/api/days")),
    Promise.resolve(axios.get("/api/appointments")),
    Promise.resolve(axios.get("/api/interviewers"))
  ]).then((all) => {
    setState(prev => ({ days: all[0], appointments: all[1], interviewers: all[2] }));
  });

  const appointments = getAppointmentsForDay(state, day);
  const interviewers = getInterviewersForDay(state, state.day)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList

            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
      </section>
    </main>
  );
}
