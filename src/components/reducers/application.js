/*
This reducer describes the 3 action types from the hook useApplicationData.js
*/

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer (state, action) {
  switch (action.type) {

    // Sets the state to a selected day
    case SET_DAY:
    return { ...state, day: action.day }

    // Sets the state to newly collected data (retrieved from the api call) 
    case SET_APPLICATION_DATA:
    return {
      ...state,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers
    }

    // Sets the state of an appointment's interview to a new/edited version or to null when deleted
    case SET_INTERVIEW: {
      const { id, interview } = action;
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[action.id],
            interview: action.interview ? { ...interview } : null
          }
        }
      }
    }

    default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
      );
    }
  }

  export {
    SET_APPLICATION_DATA,
    SET_DAY,
    SET_INTERVIEW
  }