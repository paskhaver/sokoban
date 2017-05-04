// Level element      Character  ASCII Code
// Wall                  #         0x23
// Player                @         0x40
// Player on goal square +         0x2b
// Box                   $         0x24
// Box on goal square    *         0x2a
// Goal square           .         0x2e
// Floor              (Space)      0x20

import Tile from "./tiles/tile.js";
import Floor from "./tiles/floor.js";
import Wall from "./tiles/wall.js";
import Player from "./tiles/player.js";
import Box from "./tiles/box.js";
import Checkpoint from "./tiles/checkpoint.js";

class Board {

  constructor(level = 1) {

    this.stage = new createjs.Stage("canvas");
    this.tileSize = 64;
    this.textGrid = [
      ["#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "#", " ", ".", ".", "@", "#"],
      ["#", "#", "#", " ", "$", "$", " ", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", " ", " ", " ", " ", "#", "#", "#"],
      ["#", " ", "#", " ", " ", " ", "#", "#"],
      ["#", " ", " ", " ", "#", " ", "#", "#"],
      ["#", "#", "#", " ", " ", " ", "#", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#"],
    ];

    this.objectGrid = this.compile();
    this.playerCoordinates = this.objectGrid[1][6];

    this.lastRow = this.objectGrid.length - 1;
    this.lastCol = this.objectGrid[0].length - 1;

    this.render();

  }

  movePlayer(direction) {
    this.stage.removeAllChildren();
    const playerObject = this.playerCoordinates;
    const playerRow = playerObject.row;
    const playerColumn = playerObject.column;

    if (direction === "left") {
      if (playerColumn === 0) { return; }
      const objLeftOfPlayer = this.objectGrid[playerRow][playerColumn - 1];
      if (objLeftOfPlayer instanceof Wall) { return; }
            playerObject.column -= 1;
            objLeftOfPlayer.column += 1;

      this.objectGrid[playerRow][playerColumn - 1] = playerObject;
      this.objectGrid[playerRow][playerColumn] = objLeftOfPlayer;

    } else if (direction === "right") {
      if (playerColumn === this.lastCol) { return; }
      const objRightOfPlayer = this.objectGrid[playerRow][playerColumn + 1];
      if (objRightOfPlayer instanceof Wall) { return; }

            playerObject.column += 1;
            objRightOfPlayer.column -= 1;

      this.objectGrid[playerRow][playerColumn + 1] = playerObject;
      this.objectGrid[playerRow][playerColumn] = objRightOfPlayer;

    }  else if (direction === "up") {
      if (playerRow === 0) { return; }
      const objNorthOfPlayer = this.objectGrid[playerRow - 1][playerColumn];
        if (objNorthOfPlayer instanceof Wall) { return; }
            playerObject.row -= 1;
            objNorthOfPlayer.row += 1;

      this.objectGrid[playerRow - 1][playerColumn] = playerObject;
      this.objectGrid[playerRow][playerColumn] = objNorthOfPlayer;
    }
      else if (direction === "down") {
      if (playerRow === this.lastRow) { return; }
      const objSouthOfPlayer = this.objectGrid[playerRow + 1][playerColumn];
      if (objSouthOfPlayer instanceof Wall) { return; }
            playerObject.row += 1;
            objSouthOfPlayer.row -= 1;

      this.objectGrid[playerRow + 1][playerColumn] = playerObject;
      this.objectGrid[playerRow][playerColumn] = objSouthOfPlayer;
    }

    this.render();
  }

  compile() {
    return this.textGrid.map((array, rowIndex) => {
      return array.map((symbol, colIndex) => {
        switch(symbol) {
          case "#":
            return new Wall(rowIndex, colIndex);

          case " ":
            return new Floor(rowIndex, colIndex);

          case ".":
            return new Checkpoint(rowIndex, colIndex);

          case "$":
            return new Box(rowIndex, colIndex);

          case "@":
            return new Player(rowIndex, colIndex);
        }
      });
    });
  }

  render() {
    this.objectGrid.forEach(row => {
      row.forEach(className => {
        className.render(this.stage);
      });
    });
  }


}

const board = new Board();
window.board = board;

let canvas;
let lastDownTarget;

window.onload = () => {
  canvas = document.getElementById("canvas");

  document.addEventListener("mousedown", (event) => {
    lastDownTarget = event.target;
  });

  document.addEventListener("keydown", function(event) {
    if(lastDownTarget === canvas) {
      // alert("You've pressed a key!");
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
  });
};



export default Board;
