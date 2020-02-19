/* eslint-disable no-unused-expressions */
import React from "react";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewerClass = "interviewers__item";
  props.selected ? interviewerClass += "--selected" : interviewerClass
  

  return (
    
    <li onClick={() => props.setInterviewer(props.name)} className={interviewerClass}>
      <img
        className={interviewerClass + "-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>

  );
}