/*
This hook exports 4 elements to /components/Application.js:
  1. state                --> the state of day, days, appointments and interviewers
  2. setDay               --> sets the day to the selected day
  3. bookInterview        --> edits an appointment by adding an interview object to it or changing the interview object
  4. cancelInterview      --> sets an interview object in an appointment to null

The dispatch action types are described in and imported from /components/reducers/application
*/

import axios from "axios"
import { useEffect, useReducer } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../components/reducers/application";

export default function useApplicationData() {
  // 1. STATE
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const currentDay = state.days.find(day => day.name === state.day)

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
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
      })
      .catch(error => console.log("An error occurred while retrieving data from the database", error));
  }, [])

  // 3. BOOKINTERVIEW
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => {
        if (!state.appointments[id].interview) {
          state.days[currentDay.id -1].spots--;
        }
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
  }

  // 4. CANCELINTERVIEW
  const cancelInterview = (id) => {
    return axios.delete(`api/appointments/${id}`)
    .then(() => {
      state.days[currentDay.id - 1].spots++;
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
