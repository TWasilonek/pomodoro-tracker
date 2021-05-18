import { getMillisFromMinutes } from "../../utils/timeUtils";
import AddTaskForm from "../AddTaskForm";
import Heading from "../Heading";
import TasksList from "./TasksList";

const Tasks = () => {
  return (
    <>
      <Heading 
        text="Tasks"
        numberOfPomodoros={5}
        pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
      />
      <AddTaskForm />
      <TasksList />
    </>
  );
};

export default Tasks;
