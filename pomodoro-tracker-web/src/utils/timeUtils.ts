export function getMillisFromMinutes(mins: number) {
  return mins * 60 * 1000;
}

export function formatMillisToTimer(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = (milliseconds % 60000) / 1000;
  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
}

export function formatMillisToHoursAndMins(milliseconds: number) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor(hours % 3600000 / 60000);
  return minutes === 60
    ? hours + 1 + "h 00m"
    : hours + "h " + minutes.toFixed(0) + (minutes < 10 ? "0m" : "m");
}
