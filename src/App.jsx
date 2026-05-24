import { useState, useEffect, useCallback, useMemo } from 'react';
import useTasks from './hooks/useTasks';
import TaskItem from './components/TaskItem';
import ProgressRing from './components/ProgressRing';
import getDailyQuote from './data/quotes';
import getDailyTheme from './data/themes';
import getPenPalMessage from './data/penpal';
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

const PRIORITY_LABELS = { high: '高优先', medium: '中优先', low: '低优先' };

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, updatePriority, clearCompleted, clearAll, allTasks } = useTasks();
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tick, setTick] = useState(0);
  const [pageViews, setPageViews] = useState(null);

  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/daily-task-planner-ccz/visits')
      .then((r) => r.json())
      .then((data) => setPageViews(data.value))
      .catch(() => {});
  }, []);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    const delay = msUntilBeijingMidnight();
    const timer = setTimeout(refresh, delay + 1000);
    return () => clearTimeout(timer);
  }, [tick, refresh]);

  const beijingNow = getBeijingNow();
  const dateStr = formatBeijingDate(beijingNow);
  const quote = getDailyQuote();
  const theme = getDailyTheme();
  const penPalMsg = useMemo(() => getPenPalMessage(allTasks), [tick, allTasks]);

  const handleAdd = () => {
    if (input.trim()) {
      addTask(input, priority);
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

  const handlePriorityChange = (id, newPriority) => {
    updatePriority(id, newPriority);
  };

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);
  const totalDone = tasks.filter((t) => t.done).length;
  const totalAll = tasks.length;

  return (
    <div className="app-wrapper" style={{ background: theme.bg }}>
      <div className="app">
        <header className="header">
          <p className="date">{dateStr}</p>
          <div className="header-row">
            <p className="theme-tag">{theme.name}</p>
            {totalAll > 0 && (
              <ProgressRing
                done={totalDone}
                total={totalAll}
                accent={theme.accent}
                textSecondary={theme.textSecondary}
              />
            )}
          </div>
        </header>

        <div
          className="quote-card"
          style={{ borderColor: theme.border }}
        >
          <p className="quote-text" style={{ color: theme.accent }}>{quote.en}</p>
          <p className="quote-author" style={{ color: theme.textSecondary }}>— {quote.author}</p>
          <p className="quote-zh">{quote.zh}</p>
        </div>

        {penPalMsg && (
          <div className="penpal-card" style={{ borderColor: theme.accent }}>
            <p className="penpal-icon">&#9993;</p>
            <p className="penpal-text">
              {penPalMsg.split('\n\n').map((part, i) => (
                <span key={i}>{part}<br /><br /></span>
              ))}
            </p>
          </div>
        )}

        <div className="input-bar">
          <input
            type="text"
            placeholder="今天想做什么？"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              borderBottomColor: theme.border,
              color: theme.text,
            }}
          />
          <div className="priority-selector">
            {['high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                type="button"
                className={`priority-opt priority-${p} ${priority === p ? 'active' : ''}`}
                onClick={() => setPriority(p)}
                title={PRIORITY_LABELS[p]}
              >
                {PRIORITY_LABELS[p][0]}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            style={{ background: theme.accent }}
          >
            添加
          </button>
        </div>

        {tasks.length === 0 && (
          <div className="empty-state">
            <p className="empty-icon">&#9776;</p>
            <p className="empty" style={{ color: theme.textMuted }}>
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
              {pending.map((t) => (
                <TaskItem
                  key={t.id}
                  task={t}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onPriorityChange={handlePriorityChange}
                  theme={theme}
                />
              ))}
            </ul>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <h2 className="section-title" style={{ color: theme.textMuted }}>
              已完成 · {completed.length}
            </h2>
            <ul className="task-list">
              {completed.map((t) => (
                <TaskItem
                  key={t.id}
                  task={t}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onPriorityChange={handlePriorityChange}
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
              style={{ color: theme.textSecondary }}
            >
              清除已完成
            </button>
            <button
              className="danger"
              onClick={handleClearAll}
              style={{ color: theme.textSecondary }}
            >
              清空全部
            </button>
          </footer>
        )}

        <footer className="credit">
          <p>Designed & Built by <span className="credit-name">CHENXUANZAI</span></p>
          <p className="credit-sub">Make every day count</p>
          {pageViews !== null && (
            <p className="credit-views">
              &#128065; <span className="views-count">{pageViews.toLocaleString()}</span> visits
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}
