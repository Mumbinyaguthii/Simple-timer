const TimerRing = ({ timeLeft, duration }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = duration > 0 ? timeLeft / duration : 0;
  const dashOffset = circumference * (1 - progress);

  const totalTicks = 60;
  const ticks = Array.from({ length: totalTicks }, (_, i) => {
    const angle = (i / totalTicks) * 360;
    const radians = (angle * Math.PI) / 180;

    const isQuarterTick = i % 15 === 0;
    const outerRadius = radius - 8;
    const innerRadius = isQuarterTick ? radius - 22 : radius - 16;

    const x1 = 110 + outerRadius * Math.sin(radians);
    const y1 = 110 - outerRadius * Math.cos(radians);
    const x2 = 110 + innerRadius * Math.sin(radians);
    const y2 = 110 - innerRadius * Math.cos(radians);

    return { x1, y1, x2, y2, key: i, isQuarterTick };
  });

  return (
    <svg width="220" height="220" viewBox="0 0 220 220">
      {ticks.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke="#f97316"
          strokeWidth={tick.isQuarterTick ? "3" : "2"}
          opacity={tick.isQuarterTick ? "0.9" : "0.5"}
        />
      ))}

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
        style={{
          filter: "drop-shadow(0 0 8px #f97316)",
        }}
      />
    </svg>
  );
};

export default TimerRing;
