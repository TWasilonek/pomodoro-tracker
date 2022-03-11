import { useEffect, useState } from 'react';
import useTasksActions from '../../services/firebase/hooks/useTasksActions';
import { useAppContext } from '../../store/AppContext';
import { Task } from '../../store/Tasks.reducers';

export function useTasks() {
  const { state } = useAppContext();
  const { getTasks } = useTasksActions();
  const [todoPomodorosCount, setTodoPomodorosCount] = useState(0);
  const [completedPomodorosCount, setCompletedPomodorosCount] = useState(0);
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (state.auth.loggedIn) {
      getTasks();
    }
  }, [state.auth.loggedIn, getTasks]);

  useEffect(() => {
    let todoCount = 0;
    let completedCount = 0;

    state.tasks.forEach((task: Task) => {
      completedCount += task.completedCount;
      todoCount += task.pomodoroCount;
    });

    setTodoPomodorosCount(todoCount);
    setCompletedPomodorosCount(completedCount);

    const done = state.tasks.filter((task) => task.completedCount > 0);
    const todo = state.tasks.filter((task) => task.pomodoroCount > 0);

    setDoneTasks(done);
    setTodoTasks(todo);
  }, [state.tasks]);

  return {
    todoPomodorosCount,
    completedPomodorosCount,
    todoTasks,
    doneTasks,
  };
}
