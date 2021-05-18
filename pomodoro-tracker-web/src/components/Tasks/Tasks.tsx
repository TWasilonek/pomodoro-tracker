import { useCallback, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../../store/AppContext';
import { getMillisFromMinutes } from '../../utils/timeUtils';
import AddTaskForm from './AddTaskForm';
import Heading from '../Heading';
import TasksList from './TasksList';
import { Task, TASK_ACTIONS } from '../../store/Tasks/Tasks.reducers';

const Tasks = () => {
  const { state, dispatch } = useContext(AppContext);

  const [pomodorosCount, setPomodorosCount] = useState(0);
  useEffect(() => {
    const count = state.tasks.reduce(
      (total, task) => total + task.pomodoroCount,
      0
    );
    setPomodorosCount(count);
  }, [state.tasks]);

  const handleAddTask = useCallback(
    ({ category, description }) => {
      const newTask: Task = {
        id: uuidv4(),
        category,
        description,
        pomodoroCount: 1,
      };

      dispatch({
        type: TASK_ACTIONS.ADD_TASK,
        payload: newTask,
      });
    },
    [dispatch]
  );

  return (
    <>
      <Heading
        text="Tasks"
        numberOfPomodoros={pomodorosCount}
        pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
      />
      <AddTaskForm onSubmit={handleAddTask} />
      <TasksList tasks={state.tasks} />
    </>
  );
};

export default Tasks;
