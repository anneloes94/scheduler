import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

function formatSpots(spots) {
  if (spots === 0) {
    return "no spots";
  } else if (spots === 1) {
    return "1 spot";
  } else {
    return spots + " spots";
  }
}

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={event => props.setDay(props.name)} data-testid="day" >
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
