import { useEffect, useRef } from "react";

const TimerControls = ({ isRunning, onToggle, onReset }) => {
  const startButtonRef = useRef(null);

  useEffect(() => {
    if (startButtonRef) {
      startButtonRef.current.focus();
    }
  }, []);

  return (
    <>
      <button
        ref={startButtonRef}
        onClick={onToggle}
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-3"
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={onReset}
        className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset
      </button>
    </>
  );
};

export default TimerControls;
