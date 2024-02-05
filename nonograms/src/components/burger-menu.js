import { generateElement } from '../utils/generate-elem';

export class BurgerMenu {
  constructor(parent) {
    this.DOMcontroller = parent;
    this.node;
    this.generateMenuBurger();
  }

  generateMenuBurger() {
    const burgerWrapper = generateElement('div', ['game__burger-wrapper']);
    burgerWrapper.addEventListener('click', (event) => {
      if (event.target.classList.contains('game__burger') || event.target.classList.contains('burger__button')) {
        return;
      }
      burgerWrapper.classList.remove('burger_active');
    });
    const burgerMenu = generateElement('div', ['game__burger']);
    const saveButton = generateElement('button', ['burger__button', 'burger__button_save'], 'Save');
    saveButton.addEventListener('click', () => {
      this.DOMcontroller.parent.autoSave();
      this.DOMcontroller.mainPage.checkAutoSave();
    });
    const resetButton = generateElement('button', ['burger__button', 'burger__button_reset'], 'Reset');
    const solutionButton = generateElement('button', ['burger__button', 'burger__button_solution'], 'Solution');
    const mainMenuButton = generateElement('button', ['burger__button', 'burger__button_main-menu'], 'Main menu');
    mainMenuButton.addEventListener('click', () => {
      burgerWrapper.classList.remove('burger_active');
      this.DOMcontroller.showMainMenuPage();
      this.DOMcontroller.gamePage.timer.stopTimer();
    });

    resetButton.addEventListener('click', () => {
      this.DOMcontroller.resetGameProgress();
      burgerWrapper.classList.remove('burger_active');
    });

    solutionButton.addEventListener('click', () => {
      this.DOMcontroller.showSolution();
      burgerWrapper.classList.remove('burger_active');
    });

    burgerMenu.append(saveButton, resetButton, solutionButton, mainMenuButton);

    burgerWrapper.append(burgerMenu);
    this.node = burgerWrapper;
    return this;
  }
}
