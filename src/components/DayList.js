/* eslint-disable no-unused-expressions */
import React from "react";
import "components/Button.scss";
import DayListItem from "./DayListItem"

export default function DayList(props) {
  const days = props.days ? props.days.map((day) => <DayListItem name={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay} /> ) : [];
  return (
    <ul>
      {days}
    </ul>
  )
}