const PRIORITY_LABELS = { high: '高', medium: '中', low: '低' };

export default function TaskItem({ task, onToggle, onDelete, theme, onPriorityChange }) {
  const cyclePriority = () => {
    if (task.done) return;
    const order = ['high', 'medium', 'low'];
    const idx = order.indexOf(task.priority || 'medium');
    const next = order[(idx + 1) % 3];
    onPriorityChange(task.id, next);
  };

  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <span
        className="task-accent-bar"
        style={{ background: task.done ? theme.textMuted : theme.accent }}
      />
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        style={{ accentColor: theme.accent }}
      />
      <span
        className={`priority-dot priority-${task.priority || 'medium'}`}
        onClick={cyclePriority}
        title={`优先级：${PRIORITY_LABELS[task.priority || 'medium']}（点击切换）`}
      />
      <span className="task-text">{task.text}</span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
}
