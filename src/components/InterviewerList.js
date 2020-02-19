/*
Our InterviewerList takes in three props:

    interviewers:array - an array of objects containing the information of each interviewer
    interviewer:number - the id of an interviewer
    setInterviewer:function - a function that accepts an interviewer id
*/

import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers ? props.interviewers.map((interviewer) => <InterviewerListItem name={interviewer.name} avatar={interviewer.avatar} setInterviewer={(event) => props.setInterviewer(interviewer.id)} /> ) : [];
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )

}