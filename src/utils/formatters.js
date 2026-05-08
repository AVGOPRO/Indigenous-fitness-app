// Nalam — Number & Display Formatters
export const Formatters = {
  calories: (n) => `${Math.round(n)} kcal`,
  weight: (n) => `${parseFloat(n).toFixed(1)} kg`,
  bmi: (n) => parseFloat(n).toFixed(1),
  percent: (n) => `${Math.round(n)}%`,
  decimal: (n, places = 1) => parseFloat(n).toFixed(places),
  grams: (n) => `${Math.round(n)}g`,
  minutes: (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  },
  liters: (glasses) => `${(glasses * 0.25).toFixed(2)}L`,
  shortDate: (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  },
  capitalize: (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '',
  titleCase: (str) => str ? str.split(' ').map(w => Formatters.capitalize(w)).join(' ') : '',
};

export default Formatters;
