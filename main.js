/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/board.js
class Board {
  constructor() {
    this.board = null;
  }
  createBoard(number) {
    const board = document.createElement("div");
    board.classList.add("board");
    board.classList.add("hammer");
    for (let i = 0; i < Math.floor(number) ** 2; i += 1) {
      const field = document.createElement("div");
      field.classList.add("field");
      board.appendChild(field);
    }
    this.board = board;
  }
  getBoard(number) {
    this.createBoard(number);
    return this.board;
  }
}
;// CONCATENATED MODULE: ./src/js/goblin.js
class Goblin {
  constructor() {
    this.char = undefined;
  }
  createChar() {
    const char = document.createElement("div");
    char.classList.add("goblin");
    this.char = char;
  }
  getChar() {
    this.createChar();
    return this.char;
  }
}
;// CONCATENATED MODULE: ./src/js/gamePlay.js
class GamePlay {
  constructor(board, char) {
    this.board = board;
    this.boardSize = 4;
    this.char = char;
    this.activeChar = null;
    this.boardListeners = [];
  }
  init() {
    this.redrawBoard();
    this.board.addEventListener("click", this.onBoardClick.bind(this));
    this.start();
  }
  redrawBoard() {
    this.board = this.board.getBoard(this.boardSize);
    const body = document.querySelector("body");
    const container = document.createElement("div");
    container.classList.add("container");
    container.innerHTML = "<h1 class='title'>Goblin Battle!</h1>";
    this.counter = this.createGoblinCounter();
    container.appendChild(this.counter);
    container.appendChild(this.board);
    body.insertBefore(container, body.firstChild);
    this.cells = [...this.board.children];
  }
  createGoblinCounter() {
    this.goblinCounter = document.createElement("div");
    this.goblinCounter.classList.add("status");
    this.goblinCounter.innerHTML = 'Убито гоблинов:<span class="dead">0</span><br>Промахов: <span class="lost">0</span><br>';
    return this.goblinCounter;
  }
  onBoardClick(event) {
    event.preventDefault();
    this.dead = document.querySelector(".dead");
    this.lost = document.querySelector(".lost");
    this.boardListeners.forEach(callback => callback(event.target));
    if (event.target.classList.contains("goblin")) {
      ++this.dead.textContent;
      event.target.classList.remove("goblin");
    } else {
      ++this.lost.textContent;
    }
    if (this.dead.textContent >= 5) {
      this.resetScore();
      alert("You win!");
    }
    if (this.lost.textContent >= 5) {
      this.resetScore();
      alert("You lose...");
    }
    this.changeCursor();
  }
  generateposition() {
    const position = Math.floor(Math.random() * this.boardSize ** 2);
    if (position === this.position) {
      this.generateposition();
      return;
    }
    this.deletedChar();
    this.position = position;
    this.adventChar();
  }
  deletedChar() {
    if (this.activeChar === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
  }
  adventChar() {
    this.activeChar = this.char.getChar();
    this.cells[this.position].appendChild(this.activeChar);
  }
  resetScore() {
    this.lost.textContent = 0;
    this.dead.textContent = 0;
  }
  changeCursor() {
    this.board.classList.toggle("hammer");
    this.board.classList.toggle("hammer-boom");
  }
  start() {
    setInterval(() => {
      this.generateposition();
    }, 1000);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js



const board = new Board();
const app_char = new Goblin();
const gameplay = new GamePlay(board, app_char);
gameplay.init();
;// CONCATENATED MODULE: ./src/index.js


console.log("Let`s go!");
/******/ })()
;