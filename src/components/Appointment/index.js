import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  return (
  <article className="appointment" key={props.id}>
    <Header time={props.time}> </Header>

    {mode === EMPTY &&
      <Empty onAdd={() => transition(CREATE)} />}

    {mode === CREATE &&
      <Form
        name={}
        interviewer={}
        onCancel={() => back()}
        interviewers={props.interviewers}
        onSave={save}
        isSave={true}
      />
    }
    {props.interview ? <Show interviewer={props.interviewer} student={props.student}></Show> : <Empty></Empty>}
  </article>
  )
}