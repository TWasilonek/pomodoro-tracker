import React from "react";
import { getMillisFromMinutes } from "../../utils/timeUtils";
import AddTaskForm from "../AddTaskForm";
import Heading from "../Heading";
import Task from "../Task/Task"

const TasksList = () => {
  return (
    <>
      <Heading 
        text="Tasks"
        numberOfPomodoros={5}
        pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
      />
      <AddTaskForm />

      <ul>
        <li>
          <Task />
        </li>
      </ul>

    </>
  );
};

export default TasksList;
