const TimerDisplay = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm">
      <span className="text-3xl">⏳</span>
      <span className="font-mono text-4xl font-semibold tracking-wide text-slate-800">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default TimerDisplay;
