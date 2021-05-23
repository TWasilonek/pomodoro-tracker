import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

import {AppContext} from '../../store/AppContext';
import {Task, TASK_ACTIONS} from '../../store/Tasks.reducers';
import Tasks from '../../components/Tasks';
import Timer from '../../components/Timer';
import {COLORS} from '../../constants/colors';

const Wrapper = styled.View`
  justify-content: center;
`;

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
      <Timer
        activeTask={activeTask}
        onCompleteTaskClick={handleCompleteTaskClick}
        onTaskCounterFinish={handleTaskCounterFinish}
      />
      {/* <Tasks /> */}
    </Wrapper>
  );
};

export default Home;
