function getAppointmentsForDay(state, day) {
  const appointmentsDay = (() => state.days.find(stateDay => stateDay.name === day))

  if (state.days && state.days.length > 0) {
    return (state.days[0].appointments.map(
      appointmentId => state.appointments[appointmentId.toString()]))
  }

  

  if (!appointmentsDay || appointmentsDay.length === 0) {
    console.log("I will return empty")
    return []
  } else {
    console.log("I may be the solution?")
    return (appointmentsDay[0].appointments.map(
      appointmentId => state.appointments[appointmentId.toString()]))
  }
}

function getInterviewersForDay(state, day) {
  const appointments = getAppointmentsForDay(state, day)

  let interviews = (appointments.map(appointment => appointment.interview)).filter(Boolean)

  return interviews.map(interview => state.interviewers[interview.interviewer])
}

function getInterview() {
  return 
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview}
