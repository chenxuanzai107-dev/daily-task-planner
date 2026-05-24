export default function ProgressRing({ done, total, accent, textSecondary }) {
  const ratio = total > 0 ? done / total : 0;

  if (total === 0) return null;

  return (
    <div className="progress-mini">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${ratio * 100}%`,
            background: ratio === 1 ? accent : `linear-gradient(90deg, ${accent}, ${accent}88)`,
          }}
        />
      </div>
      <span className="progress-label" style={{ color: ratio === 1 ? accent : textSecondary }}>
        {done}/{total}
      </span>
    </div>
  );
}
