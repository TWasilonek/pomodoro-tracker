import { useCallback, useContext } from "react";
import { AppContext } from "../../../store/AppContext";
import { getMillisFromMinutes } from "../../../utils/timeUtils";
import TaskElement from "../TaskElement/TaskElement"
import { Task } from '../../../store/Tasks/Tasks.reducers';

const TasksList = () => {
  const { state } = useContext(AppContext);

  const getNumberOfPreceedingPomodoros = useCallback((task: Task) => {
    let count = 0;

    for (let i = 0; i < state.tasks.length; i++) {
      const current = state.tasks[i];
      if (current.id === task.id) {
        break;
      }
      count = count + current.pomodoroCount;
    }

    return count;
  }, [state.tasks]);

  return (
    <ul>
      {state.tasks.map(task => (
        <li key={task.id}>
          <TaskElement
            task={task}
            numberOfPrecedingPomodors={getNumberOfPreceedingPomodoros(task)}
            pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
          />
        </li>
         
      ))}
    </ul>
  );
};

export default TasksList;
