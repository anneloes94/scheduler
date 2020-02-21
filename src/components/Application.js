/* eslint-disable no-unused-expressions */
import React, {useState, useEffect} from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "./Appointment/index"
import axios from "axios"


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Bob Bobberson",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Tim Timmerson",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "John Johnnerson",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];


export default function Application(props) {
  const [days, setDays] = useState([])
  const [day, setDay] = useState("Monday")
  
  const appointmentsList = appointments ?
    appointments.map(appointment => <Appointment key={appointment.id} {...appointment} />) : [];

  useEffect(() => {
    axios
    .get(`/api/days`)
    .then(response => setDays(response))
    .catch(error => console.log(error.response.status))
  }, [])

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
            days={days}
            day={day}
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
