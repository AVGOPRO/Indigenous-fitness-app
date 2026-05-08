// Nalam — Date Utilities
export const DateUtils = {
  today: () => new Date().toISOString().split('T')[0],

  todayDisplay: () => {
    const d = new Date();
    return d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  },

  formatDate: (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  },

  getDayName: (dateStr) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date(dateStr).getDay()];
  },

  getWeekRange: () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    const end = new Date(today);
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    };
  },

  getMonthRange: () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      start: start.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0],
    };
  },

  getQuarterRange: () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 90);
    return {
      start: start.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0],
    };
  },

  greeting: () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  },

  tamilGreeting: () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Kaalai Vanakkam 🌅';
    if (hour < 17) return 'Madhiya Vanakkam ☀️';
    if (hour < 21) return 'Maalai Vanakkam 🌇';
    return 'Iravu Vanakkam 🌙';
  },

  daysSince: (dateStr) => {
    const start = new Date(dateStr);
    const today = new Date();
    const diff = today - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },
};

export default DateUtils;
