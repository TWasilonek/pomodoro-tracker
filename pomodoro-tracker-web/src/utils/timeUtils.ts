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
