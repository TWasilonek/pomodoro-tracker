import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/colors';
import {DEFAULT_BREAK_TIME, DEFAULT_TASK_TIME} from '../../constants/defaults';
import {Task} from '../../store/Tasks.reducers';
import {formatMillisToTimer, getMillisFromMinutes} from '../../utils/timeUtils';

enum TIMER_MODES {
  TASK = 'TASK',
  BREAK = 'BREAK',
}

interface WrapperProps {
  mode: TIMER_MODES;
}

const Wrapper = styled.View`
  background-color: ${(props: WrapperProps) =>
    props.mode === TIMER_MODES.TASK ? COLORS.TOMATO : COLORS.GREEN};
  padding: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
`;

const Clock = styled.Text`
  font-size: 98px;
  font-weight: 600;
  letter-spacing: 0.1;
`;

const TaskName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  max-width: 550px;
`;

const Button = styled.Button`
  width: 255px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
`;

interface Props {
  taskTime?: number;
  breakTime?: number;
  activeTask: Task | null;
  onCompleteTaskClick: () => void;
  onTaskCounterFinish: () => void;
}

const Timer: React.FC<Props> = ({
  activeTask,
  taskTime = getMillisFromMinutes(DEFAULT_TASK_TIME),
  breakTime = getMillisFromMinutes(DEFAULT_BREAK_TIME),
  onCompleteTaskClick,
  onTaskCounterFinish: handleTaskCounterFinish,
}) => {
  const [counter, setCounter] = useState(taskTime);
  const [counting, setCounting] = useState(false);
  const [mode, setMode] = useState<TIMER_MODES>(TIMER_MODES.TASK);

  useEffect(() => {
    if (!counting) {
      return;
    }

    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1000);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [counting]);

  useEffect(() => {
    if (counter <= 0) {
      setCounting(false);
      if (mode === TIMER_MODES.TASK) {
        handleTaskCounterFinish();
        setMode(TIMER_MODES.BREAK);
        setCounter(breakTime);
        setCounting(true);
      } else {
        setMode(TIMER_MODES.TASK);
        setCounter(taskTime);
      }
    }
  }, [breakTime, counter, handleTaskCounterFinish, mode, taskTime]);

  const handleStartTimerClick = useCallback(() => {
    setCounting(true);
  }, []);

  const handlePauseTimerClick = useCallback(() => {
    setCounting(false);
  }, []);

  const handleStopTimerClick = useCallback(() => {
    setCounting(false);
    setCounter(mode === TIMER_MODES.TASK ? taskTime : breakTime);
  }, [breakTime, mode, taskTime]);

  const handleCompleteTaskClick = useCallback(() => {
    setCounting(false);
    setCounter(taskTime);

    if (mode === TIMER_MODES.TASK) {
      onCompleteTaskClick();
    } else {
      setMode(TIMER_MODES.TASK);
    }
  }, [mode, onCompleteTaskClick, taskTime]);

  const taskName =
    mode === TIMER_MODES.BREAK ? 'Break' : activeTask?.description || '';

  return (
    <Wrapper mode={mode}>
      <Clock>{formatMillisToTimer(counter)}</Clock>
      <TaskName>{taskName}</TaskName>
      <Actions>
        {counting ? (
          <Button
            title=""
            onPress={handlePauseTimerClick}
            disabled={!activeTask}>
            Pause
          </Button>
        ) : (
          <Button
            title=""
            onPress={handleStartTimerClick}
            disabled={!activeTask}>
            Start
          </Button>
        )}
        {counting ? (
          <Button
            title=""
            onPress={handleStopTimerClick}
            disabled={!activeTask}>
            Stop
          </Button>
        ) : (
          <Button
            title=""
            onPress={handleCompleteTaskClick}
            disabled={!activeTask}>
            Complete
          </Button>
        )}
      </Actions>
    </Wrapper>
  );
};

export default Timer;
