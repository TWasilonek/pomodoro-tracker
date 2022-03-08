import { useCallback, useEffect, useState } from 'react';
import { updateTask } from '../../services/firebase/collections/tasksCollection';
import { useAppContext } from '../../store/AppContext';
import { Task, TASK_ACTIONS } from '../../store/Tasks.reducers';
import Tasks from '../../components/Tasks';
import Timer from '../../components/Timer';
import { getMillisFromMinutes } from '../../utils/timeUtils';
import {
  DEFAULT_BREAK_TIME,
  DEFAULT_TASK_TIME,
} from '../../constants/defaults';

const Home = () => {
  const { state, dispatch } = useAppContext();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (state.tasks.length > 0) {
      const nextTask = state.tasks.find((task) => task.pomodoroCount > 0);
      if (nextTask) {
        setActiveTask(nextTask);
      } else {
        setActiveTask(null);
      }
    }
  }, [activeTask, state.tasks]);

  const handleCompleteTaskClick = useCallback(() => {
    if (!activeTask) {
      return;
    }

    if (state.auth.loggedIn) {
      updateTask({
        ...activeTask,
        completedCount: activeTask.completedCount + 1,
        pomodoroCount: activeTask.pomodoroCount - 1,
      });
    } else {
      dispatch({
        type: TASK_ACTIONS.COMPLETE_POMODORO,
        payload: { id: activeTask.id },
      });
    }
  }, [activeTask, dispatch, state.auth.loggedIn]);

  const handleTaskCounterFinish = useCallback(() => {
    if (!activeTask) {
      return;
    }

    if (state.auth.loggedIn) {
      updateTask({
        ...activeTask,
        completedCount: activeTask.completedCount + 1,
        pomodoroCount: activeTask.pomodoroCount - 1,
      });
    } else {
      dispatch({
        type: TASK_ACTIONS.COMPLETE_POMODORO,
        payload: { id: activeTask.id },
      });
    }
  }, [activeTask, dispatch, state.auth.loggedIn]);

  return (
    <>
      <Timer
        taskTime={getMillisFromMinutes(DEFAULT_TASK_TIME)}
        breakTime={getMillisFromMinutes(DEFAULT_BREAK_TIME)}
        activeTask={activeTask}
        onCompleteTaskClick={handleCompleteTaskClick}
        onTaskCounterFinish={handleTaskCounterFinish}
      />
      <Tasks />
    </>
  );
};

export default Home;
