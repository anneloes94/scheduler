import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import useVisualMode from "../../hooks/useVisualMode"
import Error from "./Error"
import Confirm from "./Confirm"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING"
const ERROR_SAVE = "ERROR_SAVE"
const DELETE = "DELETE"
const ERROR_DELETE = "ERROR_DELETE"
const CONFIRM = "CONFIRM"



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteApt() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
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
          onCancel={() => back()}  //works
          interviewers={props.interviewers}
          onSave={save}
        />
      }

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      }
      {mode === SAVING &&
        <Status message={"Saving"} />
      }
      {mode === ERROR_SAVE &&
        <Error 
          message={"An error occurred while saving your appointment"}
          onClose={() => back()} 
        />
      }
      {mode === DELETE &&
        <Status message={"Deleting"} />
      }
      {mode === CONFIRM &&
        <Confirm
          message={'Are you sure you want to delete this appointment?'}
          onConfirm={() => deleteApt()}
          onCancel={() => back()} // does not work
        />
      }
      {mode === ERROR_DELETE &&
        <Error 
          message={"An error occurred while deleting your appointment"} 
          onClose={() => back()} // does not work
          />
      }
    </article>
  )
}