import { generateElement } from '../utils/generate-elem';

export class Settings {
  constructor(parent) {
    this.DOMcontroller = parent;
    this.node;
    this.renderSettingsPage();
  }

  renderSettingsPage() {
    const settingsPage = generateElement('div', ['settings-page']);

    const settingsTitle = generateElement('h3', ['settings-page__title'], 'Settings');

    const settingsContainer = generateElement('div', ['settings-container']);

    const music = generateElement('div', ['settings', 'settings_music']);

    const musicSwitchLabel = generateElement('label', ['settings__label', 'settings__label_music'], 'Background music');
    const musicSwitch = generateElement('input', ['switch', 'switch_music'], undefined, 'checkbox', 'music');
    const musicVolumeBar = generateElement('input', ['volume', 'volume_music'], undefined, 'range', 'music-volume');
    musicVolumeBar.min = '0';
    musicVolumeBar.max = '100';
    musicVolumeBar.value = '15';
    this.musicSwitch = musicSwitch;
    this.musicVolume = musicVolumeBar;

    musicVolumeBar.addEventListener('click', () => {
      this.DOMcontroller.parent.audio.bgMusic.volume = Number(musicVolumeBar.value) / 100;
    });

    musicSwitch.addEventListener('click', () => {
      if (musicSwitch.checked) {
        this.DOMcontroller.parent.audio.playBackgroundMusic();
        this.DOMcontroller.parent.audio.bgMusic.volume = Number(musicVolumeBar.value) / 100;
        return;
      }
      this.DOMcontroller.parent.audio.bgMusic.volume = 0;
    });

    musicSwitchLabel.append(musicSwitch);
    music.append(musicSwitchLabel, musicVolumeBar);

    const sound = generateElement('div', ['settings', 'settings_sound']);

    const soundSwitchLabel = generateElement('label', ['settings__label', 'settings__label_sound'], 'Sound effects');
    const soundSwitch = generateElement('input', ['switch', 'switch_sound'], undefined, 'checkbox', 'sound');
    soundSwitch.checked = true;
    const soundVolumeBar = generateElement('input', ['volume', 'volume_sound'], undefined, 'range', 'sound-volume');
    soundVolumeBar.min = '0';
    soundVolumeBar.max = '100';
    soundVolumeBar.value = '15';
    this.soundSwitch = soundSwitch;
    this.soundVolume = soundVolumeBar;

    musicVolumeBar.addEventListener('click', () => {
      this.DOMcontroller.parent.audio.winSound.volume = Number(soundVolumeBar.value) / 100;
      this.DOMcontroller.parent.audio.paintSound.volume = Number(soundVolumeBar.value) / 100;
      this.DOMcontroller.parent.audio.unpaintSound.volume = Number(soundVolumeBar.value) / 100;
      this.DOMcontroller.parent.audio.crossSound.volume = Number(soundVolumeBar.value) / 100;
    });

    soundSwitch.addEventListener('click', () => {
      if (soundSwitch.checked) {
        this.DOMcontroller.parent.audio.winSound.volume = Number(soundVolumeBar.value) / 100;
        this.DOMcontroller.parent.audio.paintSound.volume = Number(soundVolumeBar.value) / 100;
        this.DOMcontroller.parent.audio.unpaintSound.volume = Number(soundVolumeBar.value) / 100;
        this.DOMcontroller.parent.audio.crossSound.volume = Number(soundVolumeBar.value) / 100;
        return;
      }
      this.DOMcontroller.parent.audio.winSound.volume = 0;
      this.DOMcontroller.parent.audio.paintSound.volume = 0;
      this.DOMcontroller.parent.audio.unpaintSound.volume = 0;
      this.DOMcontroller.parent.audio.crossSound.volume = 0;
    });

    soundSwitchLabel.append(soundSwitch);
    sound.append(soundSwitchLabel, soundVolumeBar);

    const theme = generateElement('div', ['settings', 'settings_theme']);

    const themeSwitchLabel = generateElement('label', ['settings__label', 'settings__label_theme'], 'Night mode');
    const themeSwitch = generateElement('input', ['switch', 'switch_theme'], undefined, 'checkbox', 'theme');
    this.themeSwitch = themeSwitch;

    themeSwitch.addEventListener('click', () => {
      this.DOMcontroller.changeTheme();
    });

    themeSwitchLabel.append(themeSwitch);
    theme.append(themeSwitchLabel);

    const returnButton = generateElement('button', ['settings__button'], 'Back to Menu');
    returnButton.addEventListener('click', () => {
      this.DOMcontroller.showMainMenuPage();
    });

    settingsContainer.append(music, sound, theme);
    settingsPage.append(settingsTitle, settingsContainer, returnButton);
    this.node = settingsPage;
    return this;
  }
}
