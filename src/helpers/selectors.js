function getAppointmentsForDay(state, day) {
  const appointmentsDay = state.days.filter(stateDay => stateDay.name === day)

  if (!appointmentsDay || appointmentsDay.length === 0) {
    return []
  } else {
    return (appointmentsDay[0].appointments.map(
      appointmentId => state.appointments[appointmentId.toString()]))
  }
}

function getInterviewersForDay(state, day) {
  const appointments = getAppointmentsForDay(state, day)

  let interviews = (appointments.map(appointment => appointment.interview)).filter(Boolean)

  return interviews.map(interview => state.interviewers[interview.interviewer])
}

export { getAppointmentsForDay, getInterviewersForDay}
