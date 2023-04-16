import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import { useCountdown } from '../../hooks/useCountdown';
import { Task } from '../../store/tasks/Tasks.reducers';
import { formatMillisToTimer } from '../../utils/timeUtils';

enum TIMER_MODES {
  POMODORO = 'POMODORO',
  BREAK = 'BREAK',
}

interface WrapperProps {
  mode: TIMER_MODES;
}

const Wrapper = styled.header`
  background-color: ${(props: WrapperProps) =>
    props.mode === TIMER_MODES.POMODORO ? COLORS.TOMATO : COLORS.GREEN};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 17px;
`;

const Clock = styled.p`
  font-size: 98px;
  font-weight: 600;
  letter-spacing: 0.1em;
`;

const TaskName = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  max-width: 550px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Button = styled.button`
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

  transition: all 0.2s;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover,
  &:active {
    background-color: #fff;
    color: ${COLORS.TOMATO};
    cursor: pointer;
    transform: scale(1.05, 1.1);
  }

  @media (max-width: 600px) {
    width: 100%;

    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

interface Props {
  taskTime: number;
  breakTime: number;
  activeTask: Task | null;
  onCompleteTaskClick?: () => void;
  onTaskCounterFinish?: () => void;
}

const Timer: React.FC<Props> = ({
  activeTask,
  taskTime,
  breakTime,
  onCompleteTaskClick,
  onTaskCounterFinish,
}) => {
  const {
    counter,
    isCountdownRunning,
    startCountdown,
    pauseCountdown,
    resetTime,
  } = useCountdown(taskTime);
  const [mode, setMode] = useState<TIMER_MODES>(TIMER_MODES.POMODORO);

  useEffect(() => {
    if (counter <= 0) {
      pauseCountdown();
      if (mode === TIMER_MODES.POMODORO) {
        onTaskCounterFinish && onTaskCounterFinish();
        setMode(TIMER_MODES.BREAK);
        resetTime(breakTime);
        startCountdown();
      } else {
        setMode(TIMER_MODES.POMODORO);
        resetTime(taskTime);
        startCountdown();
      }
    }
  }, [
    breakTime,
    counter,
    onTaskCounterFinish,
    mode,
    taskTime,
    pauseCountdown,
    resetTime,
    startCountdown,
  ]);

  const handleStartTimerClick = useCallback(() => {
    startCountdown();
  }, [startCountdown]);

  const handlePauseTimerClick = useCallback(() => {
    pauseCountdown();
  }, [pauseCountdown]);

  const handleStopTimerClick = useCallback(() => {
    resetTime(mode === TIMER_MODES.POMODORO ? taskTime : breakTime);
  }, [breakTime, mode, resetTime, taskTime]);

  const handleCompleteTaskClick = useCallback(() => {
    pauseCountdown();
    resetTime(taskTime);

    if (mode === TIMER_MODES.POMODORO) {
      onCompleteTaskClick && onCompleteTaskClick();
    } else {
      setMode(TIMER_MODES.POMODORO);
    }
  }, [mode, onCompleteTaskClick, pauseCountdown, resetTime, taskTime]);

  const taskName =
    mode === TIMER_MODES.BREAK ? 'Break' : activeTask?.description || '';

  return (
    <Wrapper mode={mode}>
      <Clock role="timer">{formatMillisToTimer(counter)}</Clock>
      <TaskName data-testid="task-description">{taskName}</TaskName>
      <Actions>
        {isCountdownRunning ? (
          <Button
            type="button"
            onClick={handlePauseTimerClick}
            disabled={!activeTask}
          >
            Pause
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleStartTimerClick}
            disabled={!activeTask}
          >
            Start
          </Button>
        )}
        {isCountdownRunning ? (
          <Button
            type="button"
            onClick={handleStopTimerClick}
            disabled={!activeTask}
          >
            Stop
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleCompleteTaskClick}
            disabled={!activeTask}
          >
            Complete
          </Button>
        )}
      </Actions>
    </Wrapper>
  );
};

export default Timer;
