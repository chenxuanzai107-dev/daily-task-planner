const quotes = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Every moment is a fresh beginning. — T.S. Eliot",
  "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
  "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. — Confucius",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. — Ralph Waldo Emerson",
  "The best time to plant a tree was 20 years ago. The second best time is now. — Chinese Proverb",
  "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
  "You miss 100% of the shots you don't take. — Wayne Gretzky",
  "In the middle of every difficulty lies opportunity. — Albert Einstein",
  "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
  "Do what you can, with what you have, where you are. — Theodore Roosevelt",
  "Start where you are. Use what you have. Do what you can. — Arthur Ashe",
  "Everything you've ever wanted is on the other side of fear. — George Addair",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Difficulties in life are intended to make us better, not bitter. — Dan Reeves",
  "You are braver than you believe, stronger than you seem, and smarter than you think. — A.A. Milne",
  "Keep your face always toward the sunshine — and shadows will fall behind you. — Walt Whitman",
  "The only person you are destined to become is the person you decide to be. — Ralph Waldo Emerson",
  "Act as if what you do makes a difference. It does. — William James",
  "What we achieve inwardly will change outer reality. — Plutarch",
  "Perfection is not attainable, but if we chase perfection we can catch excellence. — Vince Lombardi",
  "Be yourself; everyone else is already taken. — Oscar Wilde",
  "Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference. — Robert Frost",
  "Life is what happens when you're busy making other plans. — John Lennon",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. — Nelson Mandela",
  "In three words I can sum up everything I've learned about life: it goes on. — Robert Frost",
  "The purpose of our lives is to be happy. — Dalai Lama",
  "Get busy living or get busy dying. — Stephen King",
  "Not all those who wander are lost. — J.R.R. Tolkien",
];

export default function getDailyQuote() {
  const now = new Date();
  const beijing = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  const dayOfYear = Math.floor(
    (beijing - new Date(beijing.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return quotes[(dayOfYear - 1) % quotes.length];
}
