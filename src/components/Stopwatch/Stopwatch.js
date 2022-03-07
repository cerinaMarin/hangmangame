import React from 'react';
import { useStopwatch } from 'react-timer-hook';

export const Stopwatch = () => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '50px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default Stopwatch;