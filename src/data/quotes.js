const quotes = [
  {
    en: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    zh: "成就伟业的唯一途径是热爱你所做的事。",
  },
  {
    en: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    zh: "相信你可以，你就已经成功了一半。",
  },
  {
    en: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
    zh: "每一刻都是崭新的开始。",
  },
  {
    en: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    zh: "设定新目标或做新梦，永远不嫌晚。",
  },
  {
    en: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    zh: "未来属于那些相信梦想之美的人。",
  },
  {
    en: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    zh: "走得慢不要紧，只要你不停止。",
  },
  {
    en: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    zh: "身后之事与眼前之事，都不及我们内心的力量重要。",
  },
  {
    en: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    zh: "种一棵树最好的时间是二十年前，其次就是现在。",
  },
  {
    en: "Happiness is not something ready-made. It comes from your own actions.",
    author: "Dalai Lama",
    zh: "幸福不是现成的东西，它来自你自身的行动。",
  },
  {
    en: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    zh: "你不去尝试，就百分之百会错过。",
  },
  {
    en: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    zh: "每个困难的中心都蕴藏着机遇。",
  },
  {
    en: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    zh: "实现明天理想的唯一障碍是今天的疑虑。",
  },
  {
    en: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    zh: "在你所在的地方，用你拥有的东西，做你能做的事。",
  },
  {
    en: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    zh: "从你所在之处开始，用你拥有的一切，尽你所能。",
  },
  {
    en: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    zh: "你所渴望的一切，都在恐惧的另一边。",
  },
  {
    en: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    zh: "前进的秘诀就是开始行动。",
  },
  {
    en: "Difficulties in life are intended to make us better, not bitter.",
    author: "Dan Reeves",
    zh: "生活中的困难是为了让我们变得更好，而非更痛苦。",
  },
  {
    en: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
    zh: "你比你相信的更勇敢，比你看起来更坚强，比你认为的更聪明。",
  },
  {
    en: "Keep your face always toward the sunshine — and shadows will fall behind you.",
    author: "Walt Whitman",
    zh: "永远面向阳光，阴影就会被甩在身后。",
  },
  {
    en: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    zh: "你注定成为的那个人，就是你决定成为的那个人。",
  },
  {
    en: "Act as if what you do makes a difference. It does.",
    author: "William James",
    zh: "要相信你所做的有意义，因为它确实有意义。",
  },
  {
    en: "What we achieve inwardly will change outer reality.",
    author: "Plutarch",
    zh: "我们内心的成就，会改变外在的现实。",
  },
  {
    en: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
    author: "Vince Lombardi",
    zh: "完美无法企及，但追求完美的过程中我们会收获卓越。",
  },
  {
    en: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    zh: "做你自己，其他角色都有人了。",
  },
  {
    en: "Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference.",
    author: "Robert Frost",
    zh: "林中有两条路，我选了人迹罕至的那条，一切由此不同。",
  },
  {
    en: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    zh: "生活就是当你忙于制定其他计划时，悄悄发生的事情。",
  },
  {
    en: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    zh: "人生最大的荣耀不在于从不跌倒，而在于每次跌倒后都能站起来。",
  },
  {
    en: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    zh: "用三个字概括我对生活的全部感悟：会过去。",
  },
  {
    en: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    zh: "我们生命的意义是追求幸福。",
  },
  {
    en: "Get busy living or get busy dying.",
    author: "Stephen King",
    zh: "要么忙着活，要么忙着死。",
  },
  {
    en: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
    zh: "并非所有漂泊的人都迷失了方向。",
  },
];

export default function getDailyQuote() {
  const now = new Date();
  const beijing = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
  const dayOfYear = Math.floor(
    (beijing - new Date(beijing.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return quotes[(dayOfYear - 1) % quotes.length];
}
