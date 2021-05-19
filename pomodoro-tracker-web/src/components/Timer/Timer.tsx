import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import {
  formatMillisToTimer,
  getMillisFromMinutes,
} from '../../utils/timeUtils';

const DEFAULT_TASK_TIME = getMillisFromMinutes(25);
const DEFAULT_SHORT_BREAK_TIME = getMillisFromMinutes(5);
const DEFAULT_LONG_BREAK_TIME = getMillisFromMinutes(15);

const Wrapper = styled.header`
  background-color: ${COLORS.TOMATO};
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
`;

interface Props {
  taskTime?: number;
  shortBreakTime?: number;
  longBreakTime?: number;
  taskDescription: string;
}

const Timer: React.FC<Props> = ({
  taskDescription: taskName = '',
  taskTime = DEFAULT_TASK_TIME,
  shortBreakTime = DEFAULT_SHORT_BREAK_TIME,
  longBreakTime = DEFAULT_LONG_BREAK_TIME,
}) => {
  const [counter, setCounter] = useState(taskTime);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (!counting) return;

    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1000);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [counting]);

  const startTimer = useCallback(() => {
    setCounting(true);
  }, []);

  const stopTimer = useCallback(() => {
    setCounting(false);
    setCounter(taskTime);
  }, [taskTime]);

  const pauseTimer = useCallback(() => {
    setCounting(false);
  }, []);

  return (
    <Wrapper className="timer">
      <Clock>{formatMillisToTimer(counter)}</Clock>
      <TaskName>{taskName}</TaskName>
      <Actions>
        {counting ? (
          <Button type="button" onClick={pauseTimer}>
            PAUSE
          </Button>
        ) : (
          <Button type="button" onClick={startTimer}>
            START
          </Button>
        )}
        <Button type="button" onClick={stopTimer}>
          STOP
        </Button>
      </Actions>
    </Wrapper>
  );
};

export default Timer;
