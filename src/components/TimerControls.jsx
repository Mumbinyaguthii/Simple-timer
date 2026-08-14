import { useEffect, useRef } from "react";

const TimerControls = ({ isRunning, onToggle, onReset }) => {
  const startButtonRef = useRef(null);

  useEffect(() => {
    if (startButtonRef.current) {
      startButtonRef.current.focus();
    }
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 mt-10">
      <button
        ref={startButtonRef}
        onClick={onToggle}
        className="w-16 h-16 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center"
      >
        {isRunning ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-7 h-7"
          >
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8 ml-1"
          >
            <path d="M8 5h4v14h-4z" />
          </svg>
        )}
      </button>

      <button
        onClick={onReset}
        className="w-14 h-14 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6"
        >
          <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.42 6.29 6.29-6.3 6.3 1.42 1.42 6.29-6.3 6.29 6.3 1.42-1.42-6.3-6.3 6.3-6.29z" />
        </svg>
      </button>
    </div>
  );
};

export default TimerControls;
