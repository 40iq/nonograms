import { generateElement } from '../utils/generate-elem';

export class RecordsPage {
  constructor(parent) {
    this.DOMcontroller = parent;
    this.node;
    this.renderRecordsPage();
  }

  renderRecordsPage() {
    const recordsContainer = generateElement('div', ['records']);

    const recordsTitle = generateElement('h3', ['records__title'], 'Records');

    const recordsList = generateElement('div', ['records__list-container']);

    const returnButton = generateElement('button', ['records__button'], 'Back');
    returnButton.addEventListener('click', () => {
      this.DOMcontroller.showMainMenuPage();
    });

    recordsContainer.append(recordsTitle, recordsList, returnButton);
    this.recordsList = recordsList;
    this.node = recordsContainer;
    return this;
  }

  updateRecords() {
    this.recordsList.innerHTML = '';
    const dataBase = JSON.parse(localStorage.getItem('40iqDataBase')).gamesHistory;

    if (dataBase.length === 0) {
      this.recordsList.textContent = "Sorry, there's no solved nonograms yet :(";
      return;
    }

    dataBase.sort(
      (a, b) => new Date(`1970-01-01T${a.currentTimerValue}:00`) - new Date(`1970-01-01T${b.currentTimerValue}:00`),
    );

    let index = 1;

    const listItem = generateElement('div', ['records__item-container']);
    const listIndex = generateElement('span', ['records__item', 'records__item_index'], 'Index');
    const listNonogram = generateElement('span', ['records__item', 'records__item_nonogram'], 'Nonogram');
    const listDifficulty = generateElement('span', ['records__item', 'records__item_difficulty'], 'Difficulty');
    const listTime = generateElement('span', ['records__item', 'records__item_time'], 'time');
    listItem.append(listIndex, listNonogram, listDifficulty, listTime);
    this.recordsList.append(listItem);

    dataBase.forEach((gameHistory) => {
      const listItem = generateElement('div', ['records__item-container']);
      const listIndex = generateElement('span', ['records__item', 'records__item_index'], `${index}`);
      const listNonogram = generateElement(
        'span',
        ['records__item', 'records__item_nonogram'],
        `${gameHistory.selectedDesc}`,
      );
      const listDifficulty = generateElement(
        'span',
        ['records__item', 'records__item_difficulty'],
        `${gameHistory.selectedDiff}`,
      );
      const listTime = generateElement(
        'span',
        ['records__item', 'records__item_time'],
        `${gameHistory.currentTimerValue}`,
      );
      listItem.append(listIndex, listNonogram, listDifficulty, listTime);
      this.recordsList.append(listItem);
      index += 1;
    });
  }
}
