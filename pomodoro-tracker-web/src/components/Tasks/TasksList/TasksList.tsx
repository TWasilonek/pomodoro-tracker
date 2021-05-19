import { FunctionComponent, useCallback } from 'react';
import { getMillisFromMinutes } from '../../../utils/timeUtils';
import TaskElement from '../TaskElement/TaskElement';
import { Task } from '../../../store/Tasks.reducers';

interface Props {
  tasks: Task[];
}

const TasksList: FunctionComponent<Props> = ({ tasks }) => {
  const getNumberOfPreceedingPomodoros = useCallback(
    (task: Task) => {
      let count = 0;

      for (let i = 0; i < tasks.length; i++) {
        const current = tasks[i];
        if (current.id === task.id) {
          break;
        }
        count += current.pomodoroCount;
      }

      return count;
    },
    [tasks]
  );

  return (
    <ul>
      {tasks.map((task) => (
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
