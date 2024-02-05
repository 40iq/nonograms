import { App } from './src/components/app';
import './style.scss';
const dataBase = JSON.parse(localStorage.getItem('40iqDataBase'));
if (!dataBase) {
  localStorage.setItem('40iqDataBase', JSON.stringify({ currentGameSave: undefined, gamesHistory: [] }));
}
const app = new App();
app.startNewGame();
