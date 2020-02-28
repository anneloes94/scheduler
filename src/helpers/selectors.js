function getAppointmentsForDay(state, day) {
  const appointmentsDay = state.days.find(stateDay => stateDay.name === day)

  if (!appointmentsDay || appointmentsDay.length === 0) {
    return []
  } else {
    return (appointmentsDay.appointments.map(
      appointmentId => state.appointments[appointmentId.toString()]))
  }
}

function getInterviewersForDay(state, day) {
  let result;
  const currentDay = state.days.filter(stateDay => stateDay.name === day)[0];
  currentDay ? result = currentDay.interviewers.map(interviewerId => state.interviewers[interviewerId]) : result = [];
  return result;
}

function getInterview(state, interview) {
  if (interview === null) {
    return null
  } else {
    return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
    }
  }
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview }
