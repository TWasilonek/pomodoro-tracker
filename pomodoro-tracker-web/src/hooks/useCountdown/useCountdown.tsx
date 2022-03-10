import { useEffect, useState } from 'react';

export function useCountdown(startTime: number) {
  const [counter, setCounter] = useState(startTime);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCountdownRunning) {
        setCounter((prevCounter) => prevCounter - 1000);
      }
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [isCountdownRunning]);

  function startCountdown() {
    setIsCountdownRunning(true);
  }

  function pauseCountdown() {
    setIsCountdownRunning(false);
  }

  function resetTime(newStartTime: number) {
    setIsCountdownRunning(false);
    setCounter(newStartTime);
  }

  return {
    counter,
    isCountdownRunning,
    startCountdown,
    pauseCountdown,
    resetTime,
  };
}
