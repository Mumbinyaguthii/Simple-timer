import { useState, useRef, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

const Timer = () => {
  const timerRef = useRef(null);

  const [hoursInput, setHoursInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(10);
  const [secondsInput, setSecondsInput] = useState(0);

  const duration = hoursInput * 3600 + minutesInput * 60 + secondsInput;

  //duration = the target time in seconds
  // const [duration, setDuration] = useState(600);

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
    <div className="flex flex-col items-center gap-4">
      <TimerDisplay time={timeLeft} />

      <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-700">
        <label className="flex items-center gap-1">
          <input
            type="number"
            value={hoursInput}
            onChange={(e) => setHoursInput(Number(e.target.value))}
            className="w-16 rounded border border-slate-300 px-2 py-1 text-center"
          />
          <span>h</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="number"
            value={minutesInput}
            onChange={(e) => setMinutesInput(Number(e.target.value))}
            className="w-16 rounded border border-slate-300 px-2 py-1 text-center"
          />
          <span>m</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="number"
            value={secondsInput}
            onChange={(e) => setSecondsInput(Number(e.target.value))}
            className="w-16 rounded border border-slate-300 px-2 py-1 text-center"
          />
          <span>s</span>
        </label>
      </div>

      <TimerControls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
      />
    </div>
  );
};

export default Timer;
