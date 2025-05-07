import "./styles/main.css";
import goblinImage from "./images/goblin.png";
import Game from "./game/Game.js";

const initGame = () => {
  const game = new Game(4, 4, goblinImage);
  game.init();
};

document.addEventListener("DOMContentLoaded", initGame);
