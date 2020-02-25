import React, {useState} from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      transition(SHOW) // async once with db
  }

  
  return (
  <article className="appointment" key={props.id}>
    <Header time={props.time}> </Header>

    {mode === EMPTY &&
      <Empty onAdd={() => transition(CREATE)} />}

    {mode === CREATE &&
      <Form
        name={""}
        interviewer={""}
        onCancel={() => back()}
        interviewers={props.interviewers}
        onSave={save}
      />
    }
    {mode === EDIT &&
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer}
        onCancel={() => back()}
        interviewers={props.interviewers}
        onSave={save}
      />
    }
    {mode === SHOW && 
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onEdit={() => transition(EDIT)}
        // onDelete={() => transition(CONFIRM)}
      />
    }
  </article>
  )
}