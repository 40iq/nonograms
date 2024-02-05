import { generateElement } from '../utils/generate-elem';

export class Modal {
  constructor(parent) {
    this.gamePage = parent;
    this.DOMcontroller = parent.parent;
    this.generateModal();
  }
  generateModal() {
    const modalWrapper = generateElement('div', ['game__modal-wrapper']);
    const modal = generateElement('div', ['game__modal']);

    modalWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('game__modal-wrapper')) {
        modal.classList.toggle('game__modal_hidden');
      }
    });
    const modalTitle = generateElement('h3', ['modal__title'], 'Great!');
    this.TitleNode = modalTitle;

    const modalDesc = generateElement('p', ['modal__description', 'modal__description_nonogram'], 'Solved nonogram:');
    const modalDescSpan = generateElement('span', ['description', 'description_nonogram']);
    modalDesc.append(modalDescSpan);
    this.nonogramDescriptionNode = modalDescSpan;

    const modalTime = generateElement('p', ['modal__description', 'modal__description_time'], 'Time:');
    const modalTimeSpan = generateElement('span', ['description', 'description_time']);
    modalTime.append(modalTimeSpan);
    this.timeDescriptionNode = modalTimeSpan;

    const buttonsContainer = generateElement('div', ['modal__buttons-container']);

    const buttonHideModal = generateElement('button', ['modal__button', 'modal__button_hide'], 'Hide');
    buttonHideModal.addEventListener('click', () => {
      modal.classList.toggle('game__modal_hidden');
    });

    const buttonMainMenu = generateElement('button', ['modal__button', 'modal__button_menu'], 'Back to Menu');

    buttonMainMenu.addEventListener('click', () => {
      modalWrapper.classList.remove('modal_active');
      modal.classList.remove('game__modal_hidden');
      this.DOMcontroller.state.currentGameState = undefined;
      const dataBase = JSON.parse(localStorage.getItem('40iqDataBase'));
      dataBase.currentGameSave = undefined;
      localStorage.setItem('40iqDataBase', JSON.stringify(dataBase));
      this.DOMcontroller.mainPage.checkAutoSave();
      this.DOMcontroller.showMainMenuPage();
      this.gamePage.timerNode.textContent = '00:00';
    });

    buttonsContainer.append(buttonHideModal, buttonMainMenu);

    modal.append(modalTitle, modalDesc, modalTime, buttonsContainer);

    modalWrapper.append(modal);
    this.node = modalWrapper;
    return this;
  }
}
