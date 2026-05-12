export default function TaskItem({ task, onToggle, onDelete, theme }) {
  return (
    <li
      className={`task-item ${task.done ? 'done' : ''}`}
      style={{
        background: theme.cardBg,
        boxShadow: theme.shadow,
      }}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        style={{ accentColor: theme.checkboxAccent }}
      />
      <span className="task-text" style={{ color: task.done ? '#bbb' : theme.text }}>
        {task.text}
      </span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
}
