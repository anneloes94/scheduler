/*
This is where the main Application gets painted. It consists of:
  - a Daylist component, where all the selectable days are displayed
  - a section of Appointment components, where a user can create/edit/delete appointments
  The backend is described in and imported from selectors and hooks in /src.
*/

import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "./Appointment/index"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors"
import useApplicationData from "../hooks/useApplicationData.js"

export default function Application(props) {


  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day).map((event) => {
    const interview = getInterview(state, event.interview)

    return (
      <Appointment
        key={event.id}
        id={event.id}
        time={event.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
            bookInterview={bookInterview}
            day={state.day}
            days={state.days}
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
        {appointments}
      </section>
    </main>
  );
}
