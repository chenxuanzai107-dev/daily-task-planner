import { useState, useEffect } from 'react';

export default function ProgressRing({ done, total, accent }) {
  const [animDone, setAnimDone] = useState(false);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const ratio = total > 0 ? done / total : 0;
  const offset = circumference * (1 - ratio);
  const isFull = total > 0 && done === total;

  useEffect(() => {
    if (isFull) {
      const t = setTimeout(() => setAnimDone(true), 800);
      return () => clearTimeout(t);
    } else {
      setAnimDone(false);
    }
  }, [isFull]);

  if (total === 0) return null;

  return (
    <div className={`progress-ring-wrapper ${isFull ? 'celebrate' : ''}`}>
      <svg className="progress-ring" width="88" height="88" viewBox="0 0 88 88">
        <circle
          className="progress-ring-bg"
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="5"
        />
        <circle
          className="progress-ring-fill"
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text
          x="44"
          y="44"
          textAnchor="middle"
          dy="0.35em"
          fill={accent}
          fontSize="18"
          fontWeight="600"
        >
          {Math.round(ratio * 100)}%
        </text>
      </svg>
      {isFull && animDone && (
        <div className="sparkle-container">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="sparkle"
              style={{
                '--angle': `${i * 45}deg`,
                '--delay': `${i * 0.1}s`,
                '--color': accent,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
