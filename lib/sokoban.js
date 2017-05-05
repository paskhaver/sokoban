import Board from "./board.js";
import LEVELS from "./levels.js";

class Sokoban {

  constructor(level = 1) {
    this.level = level;
    const textGrid = LEVELS[this.level];

    const canvas =  document.getElementById("canvas");
          canvas.width =  textGrid[0].length * 64;
          canvas.height = textGrid.length * 64;

    this.board = new Board(textGrid);
  }
}


window.onload = () => {
  let sokoban = new Sokoban();
  let board = sokoban.board

  document.addEventListener("keydown", () => {
    event.preventDefault();
      switch(event.keyCode) {
        case 37:
          board.movePlayer("left");
          break;

        case 38:
          board.movePlayer("up");
          break;

        case 39:
          board.movePlayer("right");
          break;

        case 40:
          board.movePlayer("down");
          break;
      }

      if (sokoban.board.gameOver()) {
        sokoban = new Sokoban(sokoban.level + 1);
        board = sokoban.board;
        window.board = board;
      }

  }
  );
};
