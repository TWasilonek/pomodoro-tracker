import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../store/AppContext';
import { Task, TASK_ACTIONS } from '../../../store/Tasks/Tasks.reducers';
import { formatDateToHoursAndMinutes } from '../../../utils/timeUtils';

interface Props {
  task: Task;
  pomodoroTimeInMilliseconds: number;
  numberOfPrecedingPomodors?: number;
}

const TaskElement: React.FC<Props> = ({
  task,
  pomodoroTimeInMilliseconds,
  numberOfPrecedingPomodors = 0,
}) => {
  const { dispatch } = useContext(AppContext);
  const [endTime, setEndTIme] = useState(new Date());

  useEffect(() => {
    const precedingTime =
      numberOfPrecedingPomodors * pomodoroTimeInMilliseconds;
    const endingTimeFromNow = new Date(
      Date.now() +
        precedingTime +
        task.pomodoroCount * pomodoroTimeInMilliseconds
    );
    setEndTIme(endingTimeFromNow);
  }, [
    task.pomodoroCount,
    pomodoroTimeInMilliseconds,
    numberOfPrecedingPomodors,
  ]);

  const handleAddPomodoroClick = useCallback(() => {
    dispatch({
      type: TASK_ACTIONS.ADD_POMODORO,
      payload: { id: task.id },
    });
  }, [dispatch, task.id]);

  return (
    <>
      <p>{task.category || ''}</p>
      <p>{task.description}</p>
      <div>
        <p>{formatDateToHoursAndMinutes(endTime)}</p>
        <button type="button" onClick={handleAddPomodoroClick}>
          {task.pomodoroCount}
        </button>
        <div>
          <button type="button">...</button>
          <div>
            <ul>
              <li>
                <button type="button">+ Add another pomodoro</button>
              </li>
              <li>
                <button type="button">- Delete one pomodoro</button>
              </li>
              <li>
                <button type="button">V Set as completed</button>
              </li>
              <li>
                <button type="button">Edit</button>
              </li>
              <li>
                <button type="button">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskElement;
