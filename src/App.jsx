import { useState, useEffect, useCallback } from 'react';
import useTasks from './hooks/useTasks';
import TaskItem from './components/TaskItem';
import getDailyQuote from './data/quotes';
import getDailyTheme from './data/themes';
import './App.css';

function getBeijingNow() {
  const now = new Date();
  return new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
}

function formatBeijingDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const w = weekdays[date.getDay()];
  return `${y}年${m}月${d}日 ${w}`;
}

function msUntilBeijingMidnight() {
  const bj = getBeijingNow();
  const tomorrow = new Date(bj);
  tomorrow.setDate(bj.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow - bj;
}

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted, clearAll } = useTasks();
  const [input, setInput] = useState('');
  const [tick, setTick] = useState(0);

  // Force re-render when day changes (Beijing midnight)
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    const delay = msUntilBeijingMidnight();
    const timer = setTimeout(refresh, delay + 1000); // +1s safety margin
    return () => clearTimeout(timer);
  }, [tick, refresh]);

  const beijingNow = getBeijingNow();
  const dateStr = formatBeijingDate(beijingNow);
  const quote = getDailyQuote();
  const theme = getDailyTheme();

  const handleAdd = () => {
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const handleClearAll = () => {
    if (window.confirm('确定要清空所有任务吗？')) {
      clearAll();
    }
  };

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <div className="app-wrapper" style={{ background: theme.bg }}>
      <div className="app">
        <header className="header">
          <p className="date">{dateStr}</p>
          <p className="theme-tag">{theme.name}</p>
        </header>

        <div className="quote-card" style={{ background: theme.cardBg, boxShadow: theme.shadow }}>
          <p className="quote-text" style={{ color: theme.quoteColor }}>{quote}</p>
        </div>

        <div className="input-bar">
          <input
            type="text"
            placeholder="今天想做什么？"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              background: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text,
            }}
          />
          <button
            onClick={handleAdd}
            style={{ background: theme.accent }}
            onMouseEnter={(e) => (e.target.style.background = theme.accentHover)}
            onMouseLeave={(e) => (e.target.style.background = theme.accent)}
          >
            添加
          </button>
        </div>

        {tasks.length === 0 && (
          <div className="empty-state">
            <p className="empty-icon">&#9776;</p>
            <p className="empty" style={{ color: theme.textSecondary }}>
              新的一天，从这里开始
            </p>
          </div>
        )}

        {pending.length > 0 && (
          <section>
            <h2 className="section-title" style={{ color: theme.textSecondary }}>
              待完成 · {pending.length}
            </h2>
            <ul className="task-list">
              {tasks
                .filter((t) => !t.done)
                .map((t) => (
                  <TaskItem
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    theme={theme}
                  />
                ))}
            </ul>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <h2 className="section-title" style={{ color: theme.textSecondary }}>
              已完成 · {completed.length}
            </h2>
            <ul className="task-list">
              {tasks
                .filter((t) => t.done)
                .map((t) => (
                  <TaskItem
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    theme={theme}
                  />
                ))}
            </ul>
          </section>
        )}

        {tasks.length > 0 && (
          <footer className="footer">
            <button
              onClick={clearCompleted}
              disabled={completed.length === 0}
              style={{
                borderColor: theme.inputBorder,
                color: theme.textSecondary,
              }}
            >
              清除已完成
            </button>
            <button
              className="danger"
              onClick={handleClearAll}
              style={{
                borderColor: theme.inputBorder,
                color: theme.accent,
              }}
            >
              清空全部
            </button>
          </footer>
        )}

        <footer className="credit">
          <p>Designed & Built by <span className="credit-name">CHENXUANZAI</span></p>
          <p className="credit-sub">Make every day count</p>
        </footer>
      </div>
    </div>
  );
}
