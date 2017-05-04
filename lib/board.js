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
      ["#", "#", " ", "$", ".", ".", "@", "#"],
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
    const player          = playerTile.player;
    const oneLeftOfPlayer = this.getGridObject(row, column - 1);
    const twoLeftOfPlayer = this.getGridObject(row, column - 2);
    // debugger;
    let box;

    if (oneLeftOfPlayer instanceof Wall) {
      return;

    } else if (oneLeftOfPlayer instanceof Floor) {
      if (oneLeftOfPlayer.box) {

        if (twoLeftOfPlayer instanceof Floor || twoLeftOfPlayer instanceof Checkpoint) {
          box = oneLeftOfPlayer.box;
          oneLeftOfPlayer.box = false;
          twoLeftOfPlayer.box = box;
        } else if (twoLeftOfPlayer instanceof Wall) {
          return;
        }
      }
    }

    playerTile.player = false;
    oneLeftOfPlayer.player = player;
    player.column -= 1;

    this.render();

  }

  handleRightMovement() {

  }

  handleUpMovement() {

  }

  handleDownMovement() {
    
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
        let floor, box, player;
        switch(symbol) {
          case "#":
            return new Wall(rowIndex, colIndex);

          case " ":
            return new Floor(rowIndex, colIndex);

          case ".":
            return new Checkpoint(rowIndex, colIndex);

          case "$":
            floor = new Floor(rowIndex, colIndex);
            box   = new Box(rowIndex, colIndex);
            floor.box = box;
            return floor;

          case "@":
            floor = new Floor(rowIndex, colIndex);
            player = new Player(rowIndex, colIndex);
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
