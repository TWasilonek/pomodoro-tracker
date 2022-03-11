import { useCallback } from 'react';

import AddTaskForm from './AddTaskForm';
import Heading from '../Heading';
import TasksList from './TasksList';
import { Task, TASK_MODES } from '../../store/Tasks.reducers';
import { DEFAULT_TASK_TIME } from '../../constants/defaults';
import useTasksActions from '../../services/firebase/hooks/useTasksActions';
import { useTasks } from '../../hooks/useTasks';

const Tasks = () => {
  const { createTask } = useTasksActions();
  const { todoPomodorosCount, completedPomodorosCount, todoTasks, doneTasks } =
    useTasks();

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
