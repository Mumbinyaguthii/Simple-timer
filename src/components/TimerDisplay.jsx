const TimerDisplay = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <h2 className="text-4xl font-semibold mt-4">
      ⏳Timer: {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </h2>
  );
};

export default TimerDisplay;
