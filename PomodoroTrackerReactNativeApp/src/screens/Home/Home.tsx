import React, {useCallback, useContext, useEffect, useState} from 'react';
import styled from 'styled-components/native';

import {AppContext} from '../../store/AppContext';
import {Task, TASK_ACTIONS} from '../../store/Tasks.reducers';
import Timer from '../../components/Timer';
import Tasks from '../../components/Tasks';

const Wrapper = styled.View`
  justify-content: center;
  flex: 1;
`;

// const TimerWrapper = styled.View`
//   flex: 3;
// `;

// const TasksWrapper = styled.View`
//   flex: 2;
// `;

const Home = () => {
  const {state, dispatch} = useContext(AppContext);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (state.tasks.length > 0) {
      const nextTask = state.tasks.find(task => task.pomodoroCount > 0);
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
      payload: {id: activeTask.id},
    });
  }, [activeTask, dispatch]);

  const handleTaskCounterFinish = useCallback(() => {
    if (!activeTask) {
      return;
    }

    dispatch({
      type: TASK_ACTIONS.COMPLETE_POMODORO,
      payload: {id: activeTask.id},
    });
  }, [activeTask, dispatch]);

  return (
    <Wrapper>
      {/* <TimerWrapper> */}
      <Timer
        activeTask={activeTask}
        onCompleteTaskClick={handleCompleteTaskClick}
        onTaskCounterFinish={handleTaskCounterFinish}
      />
      {/* </TimerWrapper> */}
      {/* <TasksWrapper> */}
      <Tasks />
      {/* </TasksWrapper> */}
    </Wrapper>
  );
};

export default Home;
