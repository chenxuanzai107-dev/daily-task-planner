import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'daily-tasks';

const HISTORY_KEY = 'daily-history';

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Record yesterday's stats to history before clearing/migrating
function saveYesterdayHistory(tasks) {
  try {
    const now = new Date();
    const bj = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
    const yesterday = new Date(bj);
    yesterday.setDate(bj.getDate() - 1);
    const key = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || {};
    if (!history[key] || history[key].total !== tasks.length || history[key].done !== tasks.filter(t => t.done).length) {
      history[key] = {
        total: tasks.length,
        done: tasks.filter(t => t.done).length,
        opened: true,
      };
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  } catch {}
}

export default function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  // Save yesterday's stats on mount
  useEffect(() => {
    const loaded = loadTasks();
    saveYesterdayHistory(loaded);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((text, priority = 'medium') => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: trimmed, done: false, priority }]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.done));
  }, []);

  const updatePriority = useCallback((id, priority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority } : t))
    );
  }, []);

  const clearAll = useCallback(() => {
    setTasks([]);
  }, []);

  // Sort: priority first (high > medium > low), then undone first
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return PRIORITY_ORDER[a.priority || 'medium'] - PRIORITY_ORDER[b.priority || 'medium'];
  });

  return { tasks: sortedTasks, addTask, toggleTask, deleteTask, updatePriority, clearCompleted, clearAll, allTasks: tasks };
}
