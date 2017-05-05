// Level element      Character  ASCII Code
// Wall                  #         0x23
// Player                @         0x40
// Player on goal square +         0x2b
// Box                   $         0x24
// Box on goal square    *         0x2a
// Goal square           .         0x2e
// Floor              (Space)      0x20

import Board from "./board.js";
import LEVELS from "./levels.js";

class Sokoban {

  constructor() {

    this.level = 3;
    const textGrid = LEVELS[this.level];

    const canvas =  document.getElementById("canvas");
          canvas.width =  textGrid[0].length * 64;
          canvas.height = textGrid.length * 64;;

    this.board = new Board(textGrid);
  }

}

const sokoban = new Sokoban();
const board = sokoban.board;
window.board = board;


export default Sokoban;

let canvas;
let lastDownTarget;

window.onload = () => {
  canvas = document.getElementById("canvas");

  document.addEventListener("mousedown", (event) => {
    lastDownTarget = event.target;
  });

  document.addEventListener("keydown", function(event) {
    event.preventDefault();
    if(lastDownTarget === canvas) {
      switch(event.keyCode) {
        // left
        case 37:
          board.movePlayer("left");
          break;

        //up
        case 38:
          board.movePlayer("up");
          break;

        //right
        case 39:
          board.movePlayer("right");
          break;

        //down
        case 40:
          board.movePlayer("down");
        break;
      }
    }

    board.stepCount += 1;

  });
};
