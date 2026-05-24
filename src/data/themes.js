const themes = [
  {
    name: 'Rose',
    bg: '#faf8f7',
    accent: '#c47a6b',
    accentLight: 'rgba(196,122,107,0.08)',
    text: '#1a1a1a',
    textSecondary: '#999',
    textMuted: '#d0d0d0',
    border: '#eee',
  },
  {
    name: 'Sage',
    bg: '#f7f8f5',
    accent: '#7a9a7e',
    accentLight: 'rgba(122,154,126,0.08)',
    text: '#1a1a1a',
    textSecondary: '#999',
    textMuted: '#d0d0d0',
    border: '#eee',
  },
  {
    name: 'Lavender',
    bg: '#f7f6fa',
    accent: '#8b7faa',
    accentLight: 'rgba(139,127,170,0.08)',
    text: '#1a1a1a',
    textSecondary: '#999',
    textMuted: '#d0d0d0',
    border: '#eee',
  },
  {
    name: 'Sky',
    bg: '#f6f8fa',
    accent: '#6b8faa',
    accentLight: 'rgba(107,143,170,0.08)',
    text: '#1a1a1a',
    textSecondary: '#999',
    textMuted: '#d0d0d0',
    border: '#eee',
  },
  {
    name: 'Terracotta',
    bg: '#faf7f5',
    accent: '#c49070',
    accentLight: 'rgba(196,144,112,0.08)',
    text: '#1a1a1a',
    textSecondary: '#999',
    textMuted: '#d0d0d0',
    border: '#eee',
  },
  {
    name: 'Olive',
    bg: '#f8f8f5',
    accent: '#a09058',
    accentLight: 'rgba(160,144,88,0.08)',
    text: '#1a1a1a',
    textSecondary: '#999',
    textMuted: '#d0d0d0',
    border: '#eee',
  },
  {
    name: 'Slate',
    bg: '#f7f7f8',
    accent: '#6b7d8e',
    accentLight: 'rgba(107,125,142,0.08)',
    text: '#1a1a1a',
    textSecondary: '#999',
    textMuted: '#d0d0d0',
    border: '#eee',
  },
];

export default function getDailyTheme() {
  const now = new Date();
  const bj = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  return themes[bj.getDay()];
}
