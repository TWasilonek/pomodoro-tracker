import { useCallback, useEffect, useState } from "react";

interface Props {
  taskTime?: number;
  shortBreakTime?: number;
  longBreakTime?: number;
  taskName: string;
}

function getMillisFromMinutes(mins: number) {
  return mins * 60 * 1000;
}

function formatMillisToTimer(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = (milliseconds % 60000) / 1000;
  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
}

const DEFAULT_TASK_TIME = getMillisFromMinutes(25);
const DEFAULT_SHORT_BREAK_TIME = getMillisFromMinutes(5);
const DEFAULT_LONG_BREAK_TIME = getMillisFromMinutes(15);

const Timer: React.FC<Props> = ({
  taskName = "",
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

    return () => clearInterval(interval);
  });

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

  return <header className="App-header">
    <p>{formatMillisToTimer(counter)}</p>
    <p>{taskName}</p>
    <div>
      {counting ? (
        <button onClick={pauseTimer}>PAUSE</button>
      ) : (
        <button onClick={startTimer}>START</button>
      )}
      <button onClick={stopTimer}>STOP</button>
    </div>
    </header>;
};

export default Timer;
