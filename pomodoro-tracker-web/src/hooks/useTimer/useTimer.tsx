import { useEffect, useState } from 'react';

export default function useTimer(startTime: number) {
  const [counter, setCounter] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  // const [mode, setMode] = useState<TIMER_MODES>(TIMER_MODES.POMODORO);

  useEffect(() => {
    // if (!isRunning) return;

    const interval = setInterval(() => {
      if (isRunning) {
        setCounter((prevCounter) => prevCounter - 1000);
      }
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [isRunning]);

  // useEffect(() => {
  //   if (counter <= 0) {
  //     setIsRunning(false);
  //     if (mode === TIMER_MODES.POMODORO) {
  //       onTaskCounterFinish && onTaskCounterFinish();
  //       // setMode(TIMER_MODES.BREAK);
  //       setCounter(breakTime);
  //       setIsRunning(true);
  //     } else {
  //       setMode(TIMER_MODES.POMODORO);
  //       setCounter(taskTime);
  //     }
  //   }
  // }, [breakTime, counter, onTaskCounterFinish, mode, taskTime]);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  return {
    counter,
    isRunning,
    startTimer,
    pauseTimer,
  };
}
