import Gnome from "./Gnome.js";

export default class Game {
  constructor(rows, cols, gnomeImage) {
    this.rows = rows;
    this.cols = cols;
    this.gnomeImage = gnomeImage;
    this.board = null;
    this.gnome = null;
    this.intervalId = null;
    this.moveInterval = 1000;

    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.currentPosition = null;
    this.gnomeClicked = false;
    this.isGameActive = false;
  }

  updateUI() {
    document.getElementById("score").textContent = this.score;
    document.getElementById("misses").textContent = this.misses;
  }

  init() {
    this.createBoard();
    this.gnome = new Gnome(this.gnomeImage, this.rows, this.cols);
    this.gnome.onClick = () => {
      if (!this.isGameActive) return;

      this.score++;
      this.gnomeClicked = true;
      this.updateUI();
    };

    this.startGame();
  }

  createBoard() {
    this.board = document.getElementById("gameBoard");
    this.board.innerHTML = "";

    for (let i = 0; i < this.rows * this.cols; i += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      this.board.appendChild(cell);
    }
  }

  startGame() {
    this.resetGame();
    this.isGameActive = true;
    this.placeGnomeRandomly();
    this.startMoving();
  }

  resetGame() {
    this.score = 0;
    this.misses = 0;
    this.gnomeClicked = false;
    this.updateUI();
    if (this.gnome && this.gnome.element.parentNode) {
      this.gnome.element.parentNode.removeChild(this.gnome.element);
    }
  }

  placeGnomeRandomly() {
    const cells = document.querySelectorAll(".cell");
    const randomIndex = Math.floor(Math.random() * cells.length);
    this.currentPosition = randomIndex;
    cells[randomIndex].appendChild(this.gnome.element);
  }

  moveGnome() {
    if (!this.isGameActive) return;

    if (!this.gnomeClicked && this.currentPosition !== null) {
      this.misses++;
      this.updateUI();

      if (this.misses >= this.maxMisses) {
        this.endGame();
        setTimeout(() => this.startGame(), 2000);
        return;
      }
    }

    this.gnomeClicked = false;

    const cells = document.querySelectorAll(".cell");
    let newPosition;

    do {
      newPosition = Math.floor(Math.random() * cells.length);
    } while (newPosition === this.currentPosition);

    cells[newPosition].appendChild(this.gnome.element);
    this.currentPosition = newPosition;
  }

  startMoving() {
    this.stopMoving();
    this.intervalId = setInterval(() => {
      this.moveGnome();
    }, this.moveInterval);
  }

  endGame() {
    this.isGameActive = false;
    this.stopMoving();
    this.showGameOverMessage();
  }

  stopMoving() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  showGameOverMessage() {
    const message = document.createElement("div");
    message.className = "game-over-message";
    message.textContent = "Игра окончена! Начинаем заново...";
    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 2000);
  }
}
