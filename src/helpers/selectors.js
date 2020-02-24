export default function getAppointmentsForDay(state, day) {
  const appointmentsDay = state.days.filter(stateDay => stateDay.name === day)

  if (!appointmentsDay || appointmentsDay.length === 0) {
    return []
  } else {
    return (appointmentsDay[0].appointments.map(
      appointmentId => state.appointments[appointmentId.toString()]))
  }
}
