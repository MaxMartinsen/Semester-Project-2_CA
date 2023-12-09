export function formatTimeLeft(timeString) {
  const now = new Date();
  const endTime = new Date(timeString);
  const timeDiff = endTime - now;

  if (timeDiff < 0) {
    return 'Ended';
  }

  const minutes = Math.floor(timeDiff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}min`;
  } else {
    return `${minutes}min`;
  }
}
