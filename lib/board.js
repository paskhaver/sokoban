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
    // this.tileSize = 64;
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
    this.lastRow    = this.objectGrid.length - 1;
    this.lastCol    = this.objectGrid[0].length - 1;

    this.render();

  }

  getPlayerInfo() {
    const playerObject = this.playerObject;
    const row    = playerObject.row;
    const column = playerObject.column;
    return { playerObject, row, column };
  }

  getGridObject(row, column) {
    if (row < 0 || column < 0) { return undefined; }
    return this.objectGrid[row][column];
  }

  setGridObject(row, column, object) {
    this.objectGrid[row][column] = object;
  }

  assignPlayerToTile(row, column) {

  }

  handleLeftMovement() {
    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile      = this.getGridObject(row, column);
    const oneLeftOfPlayer = this.getGridObject(row, column - 1);
    const twoLeftOfPlayer = this.getGridObject(row, column - 2);

    if (oneLeftOfPlayer instanceof Wall) {
      return;

    } else if (oneLeftOfPlayer instanceof Floor) {
      

    } else if (oneLeftOfPlayer instanceof Checkpoint) {
      this.setGridObject(row - 1, column, playerObject);

    } else if (oneLeftOfPlayer instanceof Box) {

    }

    //
    // const objLeftOfPlayer = this.objectGrid[row][playerColumn - 1];
    // if (objLeftOfPlayer instanceof Wall) {
    //   return;
    //
    // } else if (objLeftOfPlayer instanceof Checkpoint) {
    //   // debugger
    //   playerObject.column -= 1;
    //   this.objectGrid[playerRow][playerColumn - 1] = playerObject;
    //   this.objectGrid[playerRow][playerColumn] = playerObject.currentBackground;
    //   playerObject.currentBackground = objLeftOfPlayer;
    //
    // } else if (objLeftOfPlayer instanceof Box) {
    //   const objLeftOfBox = this.objectGrid[playerRow][playerColumn - 2];
    //   if (objLeftOfBox instanceof Floor) {
    //     this.objectGrid[playerRow][playerColumn - 2] = objLeftOfBox;
    //     this.objectGrid[playerRow][playerColumn - 1] = playerObject;
    //     this.objectGrid[playerRow][playerColumn] = playerObject.currentBackground;
    //     playerObject.currentBackground = objLeftOfPlayer;
    //   }
    //
    // } else if (objLeftOfPlayer instanceof Floor) {
    //   playerObject.column -= 1;
    //   objLeftOfPlayer.column += 1;
    //   this.objectGrid[playerRow][playerColumn - 1] = playerObject;
    //   this.objectGrid[playerRow][playerColumn] = playerObject.currentBackground;
    // }

  }

  handleRightMovement() {
    const { playerObject, playerRow, playerColumn } = this.getPlayerInfo();
    if (playerColumn === this.lastCol) { return; }

    const objRightOfPlayer = this.objectGrid[playerRow][playerColumn + 1];
    if (objRightOfPlayer instanceof Wall) { return; }

          playerObject.column += 1;
          objRightOfPlayer.column -= 1;

    this.objectGrid[playerRow][playerColumn + 1] = playerObject;
    this.objectGrid[playerRow][playerColumn] = objRightOfPlayer;
  }

  handleUpMovement() {
    const { playerObject, playerRow, playerColumn } = this.getPlayerInfo();
    if (playerRow === 0) { return; }

    const objNorthOfPlayer = this.objectGrid[playerRow - 1][playerColumn];
      if (objNorthOfPlayer instanceof Wall) { return; }
          playerObject.row -= 1;
          objNorthOfPlayer.row += 1;

    this.objectGrid[playerRow - 1][playerColumn] = playerObject;
    this.objectGrid[playerRow][playerColumn] = objNorthOfPlayer;
  }

  handleDownMovement() {
    const { playerObject, playerRow, playerColumn } = this.getPlayerInfo();
    if (playerRow === this.lastRow) { return; }

    const objSouthOfPlayer = this.objectGrid[playerRow + 1][playerColumn];
    if (objSouthOfPlayer instanceof Wall) { return; }
          playerObject.row += 1;
          objSouthOfPlayer.row -= 1;

    this.objectGrid[playerRow + 1][playerColumn] = playerObject;
    this.objectGrid[playerRow][playerColumn] = objSouthOfPlayer;
  }

  movePlayer(direction) {
    this.stage.removeAllChildren();

    switch(direction) {
      case "left":
        this.handleLeftMovement();
        break;

      case "right":
        this.handleRightMovement();
        break;

      case "up":
        this.handleUpMovement();
        break;

      case "down":
        this.handleDownMovement();
        break;

      default:
        break;
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
            const floor = new Floor(rowIndex, colIndex);
            const player = new Player(rowIndex, colIndex);
            floor.player = player;
            this.playerObject = player;
            return floor;
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
