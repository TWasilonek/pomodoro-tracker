import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/AppContext';
import { getMillisFromMinutes } from '../../utils/timeUtils';
import AddTaskForm from '../AddTaskForm';
import Heading from '../Heading';
import TasksList from './TasksList';

const Tasks = () => {
  const { state } = useContext(AppContext);

  const [pomodorosCount, setPomodorosCount] = useState(0);
  useEffect(() => {
    const count = state.tasks.reduce(
      (total, task) => total + task.pomodoroCount,
      0
    );
    setPomodorosCount(count);
  }, [state.tasks]);

  return (
    <>
      <Heading
        text="Tasks"
        numberOfPomodoros={pomodorosCount}
        pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
      />
      <AddTaskForm />
      <TasksList tasks={state.tasks} />
    </>
  );
};

export default Tasks;
