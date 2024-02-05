export function stringifyTime(min, sec) {
  let minutes = min;
  let seconds = sec;
  if (min < 10) {
    minutes = '0' + min;
  }
  if (sec < 10) {
    seconds = '0' + sec;
  }

  return `${minutes}:${seconds}`;
}
