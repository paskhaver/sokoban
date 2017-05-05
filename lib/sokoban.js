import Board from "./board.js";
import LEVELS from "./levels.js";

class Sokoban {

  constructor() {
    this.level = 0;
    const textGrid = LEVELS[this.level];

    const canvas =  document.getElementById("canvas");
          canvas.width =  textGrid[0].length * 64;
          canvas.height = textGrid.length * 64;;

    this.board = new Board(textGrid);
  }

  reset() {
  }

}

const sokoban = new Sokoban();
const board = sokoban.board;
window.board = board;


window.onload = () => {
  document.addEventListener("keydown", function(event) {
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
  });
};
