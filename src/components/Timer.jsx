import { useState, useRef, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerRing from "./TimerRing";

const Timer = () => {
  const timerRef = useRef(null);

  const [hoursInput, setHoursInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(10);
  const [secondsInput, setSecondsInput] = useState(0);

  const duration = hoursInput * 3600 + minutesInput * 60 + secondsInput;

  //timeleft = whats currently counting down
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [presents, setPresents] = useState(() => {
    const saved = localStorage.getItem("presents");
    return saved ? JSON.parse(saved) : [];
  });

  const addPresent = (label) => {
    const newPresent = {
      id: Date.now(),
      label,
      duration,
    };
    setPresents((prev) => [...prev, newPresent]);
  };

  const [labelInput, setLabelInput] = useState("");

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(duration);
    }
  }, [duration]);

  //cleanup: stop the interval if the component ever unmounts mid-countdown
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    localStorage.setItem("presents", JSON.stringify(presents));
  }, [presents]);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else {
      setHasStarted(true);
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
    setHasStarted(false);
    setTimeLeft(duration);
    timerRef.current = null;
  };

  return (
    <>
      {hasStarted ? (
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            <TimerRing timeLeft={timeLeft} duration={duration} />
            <div className="absolute">
              <TimerDisplay time={timeLeft} />
            </div>
          </div>
          <TimerControls
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 min-h-screen">
          <div className="flex flex-wrap items-center justify-center gap-2 text-white">
            <label className="flex items-center gap-1">
              <input
                type="number"
                value={hoursInput}
                onChange={(e) => setHoursInput(Number(e.target.value))}
                className="w-20 bg-transparent text-5xl font-light text-center outline-none"
              />
              <span className="text-5xl font-light text-slate-500">:</span>
            </label>

            <label className="flex items-center gap-1">
              <input
                type="number"
                value={minutesInput}
                onChange={(e) => setMinutesInput(Number(e.target.value))}
                className="w-20 bg-transparent text-5xl font-light text-center outline-none"
              />
              <span className="text-5xl font-light text-slate-500">:</span>
            </label>

            <label className="flex items-center gap-1">
              <input
                type="number"
                value={secondsInput}
                onChange={(e) => setSecondsInput(Number(e.target.value))}
                className="w-20 bg-transparent text-5xl font-light text-center outline-none"
              />
              <span className="text-5xl font-light text-slate-500"></span>
            </label>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              placeholder="Timer name"
              className="bg-slate-800 text-white px-3 py-2 rounded outline-none"
            />

            <button
              onClick={() => {
                if (labelInput.trim() === "") return;
                addPresent(labelInput);
                setLabelInput("");
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>

          <div className="w-full mt-6 flex flex-col gap-2">
            {presents.map((present) => (
              <button
                key={present.id}
                onClick={() => {
                  setHoursInput(Math.floor(present.duration / 3600));
                  setMinutesInput(Math.floor((present.duration % 3600) / 60));
                  setSecondsInput(present.duration % 60);
                }}
                className="flex justify-between items-center bg-slate-700 hover:bg-slate-700 text-white px-4 py-3 rounded"
              >
                <span>{present.label}</span>
                <span className="text-slate-400">
                  {String(Math.floor(present.duration / 3600)).padStart(2, "0")}
                  :{" "}
                  {String(Math.floor((present.duration % 3600) / 60)).padStart(
                    2,
                    "0",
                  )}{" "}
                  : {String(present.duration % 60).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={toggleTimer}
            className="mt-50 w-16 h-16 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-10 h-10 ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Timer;
