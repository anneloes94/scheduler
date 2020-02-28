/*
This hook exports 4 elements to /components/Application.js:
  1. state                --> the state of day, days, appointments and interviewers
  2. setDay               --> sets the day to the selected day
  3. bookInterview        --> edits an appointment by adding an interview object to it
  4. cancelInterview      --> sets an interview object in an appointment to null

The dispatch action types are described in and imported from /components/reducers/application
*/

import axios from "axios"
import { useEffect, useReducer } from "react";
import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/application";

export default function useApplicationData() {
  // 1. STATE
  const [state, dispatch] = useReducer({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  // 2. SETDAY
  const setDay = day => dispatch({ type: SET_DAY, day });

  // [...] RETRIEVES DATA FROM THE API DATABASE
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then((all) => {
        dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
      })
      .catch(error => console.error("An error occurred while retrieving data from the database"));
  }, [])

  // 3. BOOKINTERVIEW
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    // setState({
    //   ...state,
    //   appointments
    // });
    dispatch({ type: SET_INTERVIEW, id, interview });
    return axios.put(`api/appointments/${id}`, appointment)
  }

  // 4. CANCELINTERVIEW
  const cancelInterview = (id) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    // setState({
    //   ...state,
    //   appointments})
    dispatch({ type: SET_INTERVIEW, id, interview: null });
    return axios.delete(`api/appointments/${id}`)
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
