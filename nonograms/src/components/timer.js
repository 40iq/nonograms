import { stringifyTime } from '../utils/stringify-time';

export class Timer {
  constructor(parent, node, initValue = '00:00') {
    this.gamePageObject = parent;
    this.isStarted = false;
    this.currentValue = initValue;
    this.currentSeconds = Number(this.currentValue.split(':')[1]);
    this.currentMinutes = Number(this.currentValue.split(':')[0]);
    this.timerNode = node;
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.currentSeconds += 1;
      if (this.currentSeconds >= 60) {
        this.currentSeconds = 0;
        this.currentMinutes += 1;
      }
      this.currentValue = stringifyTime(this.currentMinutes, this.currentSeconds);
      this.timerNode.textContent = this.currentValue;
      this.gamePageObject.parent.state.currentGameState.currentTimerValue = this.currentValue;
    }, 1000);
    return this;
  }

  pauseTimer() {
    if (!this.isStarted) {
      return;
    }

    clearInterval(this.timerId);
    this.isPaused = true;
    return this;
  }

  resumeTimer() {
    if (!this.isStarted) {
      return;
    }

    this.startTimer();
    this.isPaused = false;
    return this;
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.currentValue = '00:00';
    this.currentMinutes = 0;
    this.currentSeconds = 0;
    this.isStarted = false;
    this.isPaused = false;
  }

  loadTimer() {
    this.currentValue = this.gamePageObject.parent.state.currentGameState.currentTimerValue
      ? this.gamePageObject.parent.state.currentGameState.currentTimerValue
      : '00:00';
    this.currentSeconds = Number(this.currentValue.split(':')[1]);
    this.currentMinutes = Number(this.currentValue.split(':')[0]);
    this.timerNode.textContent = this.currentValue;
  }
}
