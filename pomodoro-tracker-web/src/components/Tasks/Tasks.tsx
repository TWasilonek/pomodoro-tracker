import { useCallback, useEffect, useState } from 'react';

import { useAppContext } from '../../store/AppContext';
import AddTaskForm from './AddTaskForm';
import Heading from '../Heading';
import TasksList from './TasksList';
import { Task, TASK_MODES } from '../../store/Tasks.reducers';
import { DEFAULT_TASK_TIME } from '../../constants/defaults';
import useTasksActions from '../../services/firebase/hooks/useTasksActions';

const Tasks = () => {
  const { state } = useAppContext();
  const { createTask, getTasks } = useTasksActions();
  const [todoPomodorosCount, setTodoPomodorosCount] = useState(0);
  const [completedPomodorosCount, setCompletedPomodorosCount] = useState(0);
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (state.auth.loggedIn && state.tasks.length < 1) {
      getTasks();
    }
  }, [state.auth.loggedIn, getTasks, state.tasks]);

  useEffect(() => {
    let todoCount = 0;
    let completedCount = 0;

    state.tasks.forEach((task: Task) => {
      completedCount += task.completedCount;
      todoCount += task.pomodoroCount;
    });

    setTodoPomodorosCount(todoCount);
    setCompletedPomodorosCount(completedCount);
  }, [state.tasks]);

  useEffect(() => {
    const done = state.tasks.filter((task) => task.completedCount > 0);
    const todo = state.tasks.filter((task) => task.pomodoroCount > 0);

    setDoneTasks(done);
    setTodoTasks(todo);
  }, [state.tasks]);

  const handleAddTask = useCallback(
    ({ category, description }) => {
      const newTask: Task = {
        id: '',
        category,
        description,
        pomodoroCount: 1,
        completedCount: 0,
      };

      createTask(newTask);
    },
    [createTask]
  );

  return (
    <>
      <Heading
        text="Pomodoros"
        numberOfPomodoros={todoPomodorosCount}
        pomodoroTime={DEFAULT_TASK_TIME}
      />
      <AddTaskForm
        onSubmit={handleAddTask}
        data={{ category: '', description: '' }}
      />
      {todoTasks.length > 0 && (
        <TasksList tasks={todoTasks} mode={TASK_MODES.TODO} />
      )}
      <Heading
        text="Done"
        numberOfPomodoros={completedPomodorosCount}
        pomodoroTime={DEFAULT_TASK_TIME}
      />
      {doneTasks.length > 0 && (
        <TasksList tasks={doneTasks} mode={TASK_MODES.COMPLETED} />
      )}
    </>
  );
};

export default Tasks;
