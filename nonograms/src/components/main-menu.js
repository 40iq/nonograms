import { generateElement } from '../utils/generate-elem';

export class MainMenu {
  constructor(parentObject) {
    this.parent = parentObject;
    this.node;
    this.continueButton;
    this.renderMainMenuLayout();
  }

  renderMainMenuLayout() {
    const menuContainer = generateElement('div', ['menu']);

    const continueButton = generateElement('button', ['menu__button', 'menu__button_continue'], 'Continue');
    this.continueButton = continueButton;
    continueButton.addEventListener('click', () => {
      if (!continueButton.classList.contains('menu__button_disabled')) {
        this.parent.parent.continueGame();
      }
    });

    const newGameButton = generateElement('button', ['menu__button', 'menu__button_new-game'], 'New Game');

    newGameButton.addEventListener('click', () => {
      this.parent.showNewGamePage();
    });

    const randomButton = generateElement('button', ['menu__button', 'menu__button_random'], 'Random');

    randomButton.addEventListener('click', () => {
      this.parent.state.newGameSettings.selectedDiff = 'random';
      this.parent.state.newGameSettings.selectedLevel = 'level_11';
      this.parent.parent.startNewGame('new');
    });

    const settingsButton = generateElement('button', ['menu__button', 'menu__button_settings'], 'Settings');

    settingsButton.addEventListener('click', () => {
      this.parent.showSettingsPage();
    });

    const recordsButton = generateElement('button', ['menu__button', 'menu__button_records'], 'Records');

    recordsButton.addEventListener('click', () => {
      this.parent.showRecordsPage();
    });

    menuContainer.append(continueButton, newGameButton, randomButton, settingsButton, recordsButton);
    this.node = menuContainer;
    return this;
  }

  checkAutoSave() {
    if (!JSON.parse(localStorage.getItem('40iqDataBase')).currentGameSave) {
      this.continueButton.classList.add('menu__button_disabled');
      return;
    }
    this.continueButton.classList.remove('menu__button_disabled');
  }
}
