import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {
  return <article className="appointment" 
  key={props.id}>
    <Header time={props.time}> </Header>
    {props.interview ? <Show interviewer={props.interviewer} student={props.student}></Show> : <Empty></Empty>}
    </article>
}