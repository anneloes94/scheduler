/* eslint-disable no-unused-expressions */
import React from "react";
import "components/Button.scss";
import DayListItem from "./DayListItem"

export default function DayList(props) {
  const listedDays = props.days.map(day => {
    return (<DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day} //props.value
      setDay={() => props.setDay(day.name)} />)
  })
  return (
    <ul>
      {listedDays}
    </ul>
  )
}