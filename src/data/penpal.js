const STORAGE_KEY = 'daily-history';

function getBeijingDate() {
  const now = new Date();
  const bj = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  return `${bj.getFullYear()}-${String(bj.getMonth() + 1).padStart(2, '0')}-${String(bj.getDate()).padStart(2, '0')}`;
}

function getBeijingHour() {
  const now = new Date();
  const bj = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  return bj.getHours();
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// Called at end of day: save day's stats before midnight reset
export function recordDayStats(tasks) {
  const today = getBeijingDate();
  const history = loadHistory();
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  history[today] = { total, done, opened: true };
  saveHistory(history);
}

// Mark that user opened the site today
export function markOpened() {
  const today = getBeijingDate();
  const history = loadHistory();
  if (!history[today]) {
    history[today] = { total: 0, done: 0, opened: true };
  } else {
    history[today].opened = true;
  }
  saveHistory(history);
}

function getYesterdayStats() {
  const bj = new Date();
  const yesterday = new Date(bj);
  yesterday.setDate(bj.getDate() - 1);
  const y = yesterday.getFullYear();
  const m = String(yesterday.getMonth() + 1).padStart(2, '0');
  const d = String(yesterday.getDate()).padStart(2, '0');
  const key = `${y}-${m}-${d}`;
  const history = loadHistory();
  return history[key] || null;
}

function getStreak() {
  const history = loadHistory();
  let streak = 0;
  const bj = new Date();
  for (let i = 1; i <= 365; i++) {
    const d = new Date(bj);
    d.setDate(bj.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (history[key] && history[key].opened) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getWeekStats() {
  const history = loadHistory();
  let total = 0;
  let done = 0;
  const bj = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(bj);
    d.setDate(bj.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (history[key]) {
      total += history[key].total || 0;
      done += history[key].done || 0;
    }
  }
  return { total, done };
}

const morningMsgs = [
  "早安。今天的第一缕阳光，让我想起了你认真生活的样子。",
  "早啊。今天的语录好像很适合你，看看？",
  "新的一天开始了。不急，慢慢来。",
  "早安呀。昨天睡得好吗？今天也请好好照顾自己。",
  "早上好。今天的你，又比昨天更勇敢了一点。",
];

const afternoonMsgs = [
  "下午好。忙了大半天，别忘了喘口气。",
  "午后时光，最适合完成一两件小事。",
  "下午了，你今天的进度怎么样？不管怎样，你都很棒。",
  "来，喝口水，歇一歇。",
  "下午好。阳光正好，心情也应该不错吧。",
];

const eveningMsgs = [
  "晚上好。今天的任务都完成了吗？没完成也没关系。",
  "一天快结束了，谢谢你今天的努力。",
  "夜深了，是时候放下手机，给自己一点安静的时间。",
  "晚上好。回顾一下今天，有什么值得开心的事吗？",
  "天黑了。不管今天过得怎样，明天都是新的一页。",
];

const allDoneMsgs = [
  "昨天你完成了全部任务！每一个勾都是你对自己的承诺，你真的做到了。今天也要相信自己。",
  "全部完成！昨天你是自己的英雄，今天继续发光吧。",
  "昨天满堂红。看到你这么认真，我也忍不住为你开心。今天继续保持？",
];

const partialDoneMsgs = [
  "昨天完成了 {done}/{total}，已经很好啦。没做完的，说明你懂得取舍，这也是智慧。",
  "昨天你尽力了。{done} 件事完成，已经很了不起。今天轻装上阵。",
  "人生不是冲刺，是长跑。昨天完成 {done}/{total}，这个节奏刚刚好。",
];

const noneDoneMsgs = [
  "昨天好像很累？没关系。有些日子就是用来休息的，休息也是重要的事。",
  "昨天的事一笔勾销。今天重新开始，我在呢。",
  "你昨天没完成任务，但你昨天来了。这本身就很好。",
];

const didntComeMsgs = [
  "昨天没见到你，有点想你呢。今天见到你，真好。",
  "你回来了。昨天的事不重要，重要的是你现在在这里。",
  "嘿，想你了。昨天我也在等你哦。今天我们一起加油。",
];

const streakMsgs = {
  1: "你已经连续来了 {streak} 天。第一次来的时候，没想到会坚持这么久吧？",
  3: "连续 {streak} 天了！你正在养成一个美好的习惯。",
  5: "{streak} 天不间断。我悄悄数着呢。你比自己想象的更有毅力。",
  7: "整整一周天天来！你是我见过最专一的人之一 ✨",
  14: "两周了！{streak} 天的陪伴，我已经习惯每天见到你了。",
  30: "一个月！{streak} 天的坚持。这不是巧合，是你真的在乎自己。",
};

const newUserMsgs = [
  "嗨！第一次见面。我是你的小小笔友，会每天在这里等你。先试试添加一个任务吧？",
  "欢迎你来。这里是一个安静的小角落，放你的任务，听你的心情。从这里开始吧。",
  "初次见面！我每天都会写一段话给你，希望你喜欢这里。",
];

const sundaySummaryMsgs = [
  "周日了。这一周你一共完成了 {done} 件事，写了 {total} 个计划。给自己鼓个掌吧。",
  "周末快乐！这周你完成了 {done}/{total} 件事。下周继续，我陪你。",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function findBestStreakMsg(streak) {
  const thresholds = Object.keys(streakMsgs).map(Number).sort((a, b) => b - a);
  for (const t of thresholds) {
    if (streak >= t) {
      return streakMsgs[t].replace(/\{streak\}/g, streak);
    }
  }
  return null;
}

export default function getPenPalMessage(tasks) {
  markOpened();

  const hour = getBeijingHour();
  const yesterday = getYesterdayStats();
  const streak = getStreak();
  const week = getWeekStats();

  const parts = [];

  // 1. Time-based greeting
  if (hour < 12) parts.push(pick(morningMsgs));
  else if (hour < 18) parts.push(pick(afternoonMsgs));
  else parts.push(pick(eveningMsgs));

  // 2. Streak message (only if notable)
  const streakMsg = findBestStreakMsg(streak);
  if (streakMsg && streak >= 3) {
    parts.push(streakMsg);
  }

  // 3. Yesterday reflection
  if (yesterday && yesterday.total > 0) {
    if (yesterday.done === yesterday.total && yesterday.total > 0) {
      parts.push(pick(allDoneMsgs));
    } else if (yesterday.done > 0) {
      parts.push(pick(partialDoneMsgs).replace(/\{done\}/g, yesterday.done).replace(/\{total\}/g, yesterday.total));
    } else {
      parts.push(pick(noneDoneMsgs));
    }
  } else if (!yesterday || yesterday.total === 0) {
    parts.push(pick(didntComeMsgs));
  }

  // 4. Sunday summary
  const bj = new Date();
  if (bj.getDay() === 0 && week.total > 0) {
    parts.push(pick(sundaySummaryMsgs).replace(/\{done\}/g, week.done).replace(/\{total\}/g, week.total));
  }

  // 5. New user special
  if (streak === 0 && !yesterday) {
    return pick(newUserMsgs);
  }

  // Take 2-3 parts (too long is bad, too short misses the warmth)
  const selected = [parts[0]];
  if (parts.length > 1) selected.push(parts[1]);
  if (parts.length > 2 && Math.random() > 0.5) selected.push(parts[2]);

  return selected.join('\n\n');
}
