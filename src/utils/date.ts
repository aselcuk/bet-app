export const formatMatchDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const timeStr = `${hh}:${min}`;

  if (now.toDateString() === date.toDateString()) {
    return `Today ${timeStr}`;
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (tomorrow.toDateString() === date.toDateString()) {
    return `Tomorrow ${timeStr}`;
  }

  const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetMid = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  const dayDiff = Math.round(
    (targetMid.getTime() - todayMid.getTime()) / msPerDay
  );

  const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  if (dayDiff >= 2 && dayDiff < 7) {
    return `${weekdayNames[date.getDay()]} ${timeStr}`;
  }

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear());

  return `${dd}.${mm}.${yy} - ${timeStr}`;
};
