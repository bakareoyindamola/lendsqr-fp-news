export const formatDate = (date: Date): { day: string; hours: string } => {
  const now = new Date(date);
  const days: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const dayName = days[now.getDay()]; // Get day name

  let hours: number = now.getHours();
  const minutes: number = now.getMinutes();

  const amPm: string = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return {
    day: dayName,
    hours: `${hours}:${formattedMinutes} ${amPm}`,
  };
};
