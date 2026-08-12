import { useState, useRef, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

const Timer = () => {
  const timerRef = useRef(null);

  //duration = the target time in seconds
  const [duration, setDuration] = useState(600);

  //timeleft = whats currently counting down
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(duration);
    timerRef.current = null;
  };

  //cleanup: stop the interval if the component ever unmounts mid-countdown
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <TimerDisplay time={timeLeft} />
      <TimerControls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
      />
    </div>
  );
};

export default Timer;
