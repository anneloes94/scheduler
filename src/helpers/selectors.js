function getAppointmentsForDay(state, day) {
  const appointmentsDay = ( state.days.find(stateDay => stateDay.name === day)) 

  if (!appointmentsDay || appointmentsDay.length === 0) {
    return []
  } else {
    return (appointmentsDay.appointments.map(
      appointmentId => state.appointments[appointmentId.toString()]))
  }
}

function getInterviewersForDay(state, day) {
  console.log("I am going to getAppointmentsForDay now")
  const appointments = getAppointmentsForDay(state, day)

  let interviews = (appointments.map(appointment => appointment.interview)).filter(Boolean)

  return interviews.map(interview => state.interviewers[interview.interviewer])
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
