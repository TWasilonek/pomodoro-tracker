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
  const [todoPomodorosCount, setTodoPomodorosCount] = useState(0);
  const [completedPomodorosCount, setCompletedPomodorosCount] = useState(0);
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    let todoCount = 0;
    let completedCount = 0;

    state.tasks.forEach((task: Task) => {
      if (task.completed) {
        completedCount += task.pomodoroCount;
      } else {
        todoCount += task.pomodoroCount;
      }
    });

    setTodoPomodorosCount(todoCount);
    setCompletedPomodorosCount(completedCount);
  }, [state.tasks]);

  useEffect(() => {
    const completed = state.tasks.filter((task) => task.completed);
    const todo = state.tasks.filter((task) => !task.completed);

    setCompletedTasks(completed);
    setTodoTasks(todo);
  }, [state.tasks]);

  const handleAddTask = useCallback(
    ({ category, description }) => {
      const newTask: Task = {
        id: uuidv4(),
        category,
        description,
        pomodoroCount: 1,
        completed: false,
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
        numberOfPomodoros={todoPomodorosCount}
        pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
      />
      <AddTaskForm onSubmit={handleAddTask} />
      {todoTasks.length > 0 && <TasksList tasks={todoTasks} />}
      <Heading
        text="Done"
        numberOfPomodoros={completedPomodorosCount}
        pomodoroTimeInMilliseconds={getMillisFromMinutes(25)}
      />
      {completedTasks.length > 0 && <TasksList tasks={completedTasks} />}
    </>
  );
};

export default Tasks;
