/*
Our InterviewerList takes in three props:

    interviewers:array - an array of objects containing the information of each interviewer
    interviewer:number - the id of an interviewer
    setInterviewer:function - a function that accepts an interviewer id
*/

import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={(event) => props.onChange(interviewer.id)} 
    />
  })
  
  return (
    <section className="interviewers">
      {console.log(interviewers)}
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}