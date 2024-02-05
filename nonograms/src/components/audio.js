import { generateElement } from '../utils/generate-elem';
import bgUrl from '../assets/audio/bg-music.mp3';
import winUrl from '../assets/audio/bg-win.mp3';
import crossUrl from '../assets/audio/cross.mp3';
import paintUrl from '../assets/audio/paint.mp3';
import unpaintUrl from '../assets/audio/unpaint.mp3';

export class AudioEffects {
  constructor(parent) {
    this.DOMcontroller = parent;
    this.initAudio();
  }

  initAudio() {
    const audioContainer = generateElement('div', ['audio-container']);

    const backgroundSound = generateElement('audio', ['audio', 'audio_background']);
    backgroundSound.src = bgUrl;
    backgroundSound.preload = 'metadata';
    backgroundSound.loop = true;
    backgroundSound.muted = true;
    this.bgMusic = backgroundSound;

    const winSound = generateElement('audio', ['audio', 'audio_win']);
    winSound.src = winUrl;
    winSound.preload = 'metadata';
    this.winSound = winSound;

    const paintSound = generateElement('audio', ['audio', 'audio_paint']);
    paintSound.src = paintUrl;
    paintSound.preload = 'metadata';
    this.paintSound = paintSound;

    const unpaintSound = generateElement('audio', ['audio', 'audio_unpaint']);
    unpaintSound.src = unpaintUrl;
    unpaintSound.preload = 'metadata';
    this.unpaintSound = unpaintSound;

    const crossSound = generateElement('audio', ['audio', 'audio_cross']);
    crossSound.src = crossUrl;
    crossSound.preload = 'metadata';
    this.crossSound = crossSound;

    audioContainer.append(backgroundSound, winSound, paintSound, unpaintSound, crossSound);
    document.querySelector('body').append(audioContainer);
    return this;
  }

  playBackgroundMusic() {
    this.bgMusic.muted = false;
    this.bgMusic.play();
  }

  playWinSound() {
    if (this.paintSound.volume === 0) {
      return;
    }
    this.winSound.currentTime = 0;
    this.winSound.play();
  }

  playPaintSound() {
    if (this.paintSound.volume === 0) {
      return;
    }
    this.paintSound.pause();
    this.paintSound.currentTime = 0.1;
    this.paintSound.play();
  }

  playUnpaintSound() {
    if (this.paintSound.volume === 0) {
      return;
    }
    this.unpaintSound.pause();
    this.unpaintSound.currentTime = 0;
    this.unpaintSound.play();
  }

  playCrossSound() {
    if (this.paintSound.volume === 0) {
      return;
    }
    this.crossSound.pause();
    this.crossSound.currentTime = 0.1;
    this.crossSound.play();
  }
}
