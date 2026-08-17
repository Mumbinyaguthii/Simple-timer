const TimerDisplay = ({ time }) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <h2 className="text-4xl font-light">
      <span className="text-white">{String(hours).padStart(2, "0")}:</span>
      <span className="text-orange-500">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </h2>
  );
};

export default TimerDisplay;
