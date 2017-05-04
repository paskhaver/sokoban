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

  handleLeftMovement() {
    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile      = this.getGridObject(row, column);
    const player          = playerTile.player;
    const oneLeftOfPlayer = this.getGridObject(row, column - 1);
    const twoLeftOfPlayer = this.getGridObject(row, column - 2);
    let box;

    if (oneLeftOfPlayer instanceof Wall) {
      return;

    } else if (oneLeftOfPlayer instanceof Floor || oneLeftOfPlayer instanceof Checkpoint) {
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

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneRightOfPlayer = this.getGridObject(row, column + 1);
    const twoRightOfPlayer = this.getGridObject(row, column + 2);
    const player           = playerTile.player;
    let box;

    if (
      (oneRightOfPlayer instanceof Wall) ||
      (oneRightOfPlayer instanceof Checkpoint && oneRightOfPlayer.box && twoRightOfPlayer instanceof Wall) ||
      (oneRightOfPlayer instanceof Checkpoint && oneRightOfPlayer.box && twoRightOfPlayer instanceof Checkpoint && twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof Checkpoint && oneRightOfPlayer.box && twoRightOfPlayer instanceof Floor && twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof Floor && oneRightOfPlayer.box && twoRightOfPlayer instanceof Checkpoint && twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof Floor && oneRightOfPlayer.box && twoRightOfPlayer instanceof Wall) ||
      (oneRightOfPlayer instanceof Floor && oneRightOfPlayer.box && twoRightOfPlayer instanceof Floor && twoRightOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneRightOfPlayer instanceof Checkpoint && !oneRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof Floor && !oneRightOfPlayer.box)
    ) {
      oneRightOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.column += 1;
      this.render();
      return;
    }

    if (
      (oneRightOfPlayer instanceof Checkpoint && !twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof Floor && !twoRightOfPlayer.box)
    ) {
        twoRightOfPlayer.box = oneRightOfPlayer.box;
        oneRightOfPlayer.box = false;
        oneRightOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.column += 1;
        this.render();
        return;
      }



    // this.render();
  }



  handleUpMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile      = this.getGridObject(row, column);
    const player          = playerTile.player;
    const oneUpOfPlayer = this.getGridObject(row - 1, column);
    const twoUpOfPlayer = this.getGridObject(row - 2, column);
    let box;

    if (oneUpOfPlayer instanceof Wall) {
      return;

    } else if (oneUpOfPlayer instanceof Floor || oneUpOfPlayer instanceof Checkpoint) {
      if (oneUpOfPlayer.box) {

        if (twoUpOfPlayer instanceof Floor || twoUpOfPlayer instanceof Checkpoint) {
          box = oneUpOfPlayer.box;
          oneUpOfPlayer.box = false;
          twoUpOfPlayer.box = box;
        } else if (twoUpOfPlayer instanceof Wall) {
          return;
        }
      }
    }

    playerTile.player = false;
    oneUpOfPlayer.player = player;
    player.row -= 1;

    this.render();

  }

  handleDownMovement() {
    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile      = this.getGridObject(row, column);
    const player          = playerTile.player;
    const oneDownOfPlayer = this.getGridObject(row + 1, column);
    const twoDownOfPlayer = this.getGridObject(row + 2, column);
    let box;

    if (oneDownOfPlayer instanceof Wall) {
      return;

    } else if (oneDownOfPlayer instanceof Floor || oneDownOfPlayer instanceof Checkpoint) {
      if (oneDownOfPlayer.box) {

        if (twoDownOfPlayer instanceof Floor || twoDownOfPlayer instanceof Checkpoint) {
          box = oneDownOfPlayer.box;
          oneDownOfPlayer.box = false;
          twoDownOfPlayer.box = box;
        } else if (twoDownOfPlayer instanceof Wall) {
          return;
        }
      }
    }

    playerTile.player = false;
    oneDownOfPlayer.player = player;
    player.row += 1;

    this.render();
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
