import { useCallback, useEffect, useState } from 'react';
import {
  formatMillisToTimer,
  getMillisFromMinutes,
} from '../../utils/timeUtils';

const DEFAULT_TASK_TIME = getMillisFromMinutes(25);
const DEFAULT_SHORT_BREAK_TIME = getMillisFromMinutes(5);
const DEFAULT_LONG_BREAK_TIME = getMillisFromMinutes(15);

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
    <header className="timer">
      <p>{formatMillisToTimer(counter)}</p>
      <p>{taskName}</p>
      <div>
        {counting ? (
          <button type="button" onClick={pauseTimer}>
            PAUSE
          </button>
        ) : (
          <button type="button" onClick={startTimer}>
            START
          </button>
        )}
        <button type="button" onClick={stopTimer}>
          STOP
        </button>
      </div>
    </header>
  );
};

export default Timer;
