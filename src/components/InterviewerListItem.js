/* eslint-disable no-unused-expressions */
import React from "react";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewerClass = "interviewers__item";
  props.selected ? (interviewerClass += "--selected") : interviewerClass;

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={interviewerClass + "-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
