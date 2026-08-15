const TimerRing = ({ timeLeft, duration }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = duration > 0 ? timeLeft / duration : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <svg width="220" height="220" viewBox="0 0 220 220">
      {/*background track (faint, full circle) */}
      <circle
        cx="110"
        cy="110"
        r={radius}
        fill="none"
        stroke="#334155"
        strokeWidth="6"
      />
      {/*progress arc*/}
      <circle
        cx="110"
        cy="110"
        r={radius}
        fill="none"
        stroke="#f97316"
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform="rotate(-90 110 110)"
      />
    </svg>
  );
};

export default TimerRing;
