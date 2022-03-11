import { useEffect, useState } from 'react';

export function useCountdown(startTime: number) {
  const [counter, setCounter] = useState(startTime);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  useEffect(() => {
    function countDown() {
      if (isCountdownRunning) {
        setCounter((prevCounter) => prevCounter - 1000);
      }
    }
    const intervalId = setInterval(countDown, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId);
    };
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
