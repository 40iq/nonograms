import { generateElement } from '../utils/generate-elem';
import { generateLabel } from '../utils/generate-label';
import { numberOfLevels } from './constants';
import templates from '../templates.json';

export class NewGamePage {
  constructor(parentObject) {
    this.parent = parentObject;
    this.newGameState = this.parent.state.newGameSettings;
    this.node;
    this.templates = templates;
    this.levelInputs = [];
    this.difficultyInputs = [];
    this.renderNewGameLayout();
  }

  renderNewGameLayout() {
    const newGameContainer = generateElement('div', ['new-game']);

    const newGameTitle = generateElement('h3', ['new-game__title'], 'New Game');

    const newGameDifficulty = generateElement('div', ['new-game__difficulty']);

    const config = [
      { diff: 'easy', checked: true, desc: 'Easy - 5 x 5' },
      { diff: 'medium', checked: undefined, desc: 'Medium - 10 x 10' },
      { diff: 'hard', checked: undefined, desc: 'Hard - 15 x 15' },
      { diff: 'random', checked: undefined, desc: 'Random' },
    ];

    config.forEach((settings) => {
      const result = generateLabel(settings);
      newGameDifficulty.append(result[0]);
      this.difficultyInputs.push(result[1]);
    });

    const newGameLevels = generateElement('div', ['new-game__level']);

    newGameLevels.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('level__input')) {
        this.newGameState.selectedLevel = target.id;
      }
    });

    for (let i = 1; i <= numberOfLevels + 1; i += 1) {
      const isChecked = i === numberOfLevels + 1 ? true : undefined;
      const levelLabel = generateElement('label', ['level__label', `level__label_${i}`]);
      const levelInput = generateElement(
        'input',
        ['level__input'],
        undefined,
        'radio',
        `level_${i}`,
        'level',
        isChecked,
      );
      if (i === numberOfLevels + 1) {
        levelLabel.textContent = 'Random';
      } else {
        const text = this.templates.easy[i - 1].desc;
        levelLabel.textContent = text;
      }
      levelLabel.append(levelInput);
      newGameLevels.append(levelLabel);
      this.levelInputs.push(levelLabel);
    }

    const buttonsContainer = generateElement('div', ['new-game__buttons-container']);

    const returnButton = generateElement('button', ['new-game__button', 'new-game__button_return'], 'Back');
    returnButton.addEventListener('click', () => {
      this.parent.showMainMenuPage();
    });
    const PlayButton = generateElement('button', ['new-game__button', 'new-game__button_return'], 'Play!');

    PlayButton.addEventListener('click', () => {
      this.parent.parent.startNewGame();
    });

    buttonsContainer.append(returnButton, PlayButton);

    newGameContainer.append(newGameTitle, newGameDifficulty, newGameLevels, buttonsContainer);

    newGameDifficulty.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('difficulty__input')) {
        this.newGameState.selectedDiff = target.id;

        const levelsLabels = newGameLevels.childNodes;
        let levelTemplates = templates.easy;

        switch (target.id) {
          case 'medium':
            levelTemplates = templates.medium;
            break;
          case 'hard':
            levelTemplates = templates.hard;
            break;
          case 'random':
            this.newGameState.selectedLevel = 'random';
            break;
          default:
            break;
        }

        for (let i = 0; i < levelsLabels.length - 1; i += 1) {
          levelsLabels[i].childNodes[0].textContent = levelTemplates[i].desc;
        }
      }
    });

    this.node = newGameContainer;
    return this;
  }

  resetSettings() {
    this.levelInputs[this.levelInputs.length - 1].click();
    this.difficultyInputs[0].click();
  }
}
