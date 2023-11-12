'use client'
import { useState, useEffect } from 'react';

type TimerProps = {
  seconds: number,
  onFinishTime: Function,
}

export default (props: TimerProps) => {
  const [seconds, setSeconds] = useState(props.seconds);

  useEffect(() => {
    if (seconds > 0) 
      setTimeout(() => setSeconds(seconds - 1), 1000);
    else
      props.onFinishTime();
  }, [seconds]);

  return (
    <h5>Restan: {seconds >= 0 ? seconds : "0"} segundos</h5>
  );
};