import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/AppContext';
import { Task, TASK_ACTIONS } from '../../store/Tasks.reducers';
import Tasks from '../Tasks';
import Timer from '../Timer';

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
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

    dispatch({
      type: TASK_ACTIONS.COMPLETE_POMODORO,
      payload: { id: activeTask.id },
    });
  }, [activeTask, dispatch]);

  return (
    <div className="App">
      <Timer
        activeTask={activeTask}
        onCompleteTaskClick={handleCompleteTaskClick}
      />
      <Tasks />
    </div>
  );
};

export default Home;
