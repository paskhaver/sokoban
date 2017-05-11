import Tile from "./tiles/tile.js";
import Floor from "./tiles/floor.js";
import Wall from "./tiles/wall.js";
import Player from "./tiles/player.js";
import Box from "./tiles/box.js";
import Checkpoint from "./tiles/checkpoint.js";

class Board {

  constructor(textGrid) {

    this.stage = new createjs.Stage("canvas");

    this.stepCount  = 0;
    this.boxPushes  = 0;

    this.objectGrid = this.compile(textGrid);
    this.render();
  }

  compile(textGrid) {
    return textGrid.map((array, rowIndex) => {
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
            floor.box = new Box(rowIndex, colIndex);
            return floor;

          case "@":
            floor = new Floor(rowIndex, colIndex);
            floor.player = new Player(rowIndex, colIndex);
            this.playerObject = floor.player;
            return floor;
        }
      });
    });
  }

  render() {
    this.objectGrid.forEach(row => {
      row.forEach(tileClass => {
        tileClass.render(this.stage);
      });
    });
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

  handleLeftMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile      = this.getGridObject(row, column);
    const oneLeftOfPlayer = this.getGridObject(row, column - 1);
    const twoLeftOfPlayer = this.getGridObject(row, column - 2);
    const player           = playerTile.player;
    let box;

    if (
      (oneLeftOfPlayer instanceof Wall) ||
      (oneLeftOfPlayer.box && twoLeftOfPlayer instanceof Wall) ||
      (oneLeftOfPlayer.box && twoLeftOfPlayer.box)
    ) {
      return;
    }

    oneLeftOfPlayer.player = playerTile.player;
    player.column -= 1;
    playerTile.player = false;
    this.stepCount++;

    if (oneLeftOfPlayer.box) {
      // If tile one spot from player DOES HAVE a box
      // and tile two spots from player DOES NOT HAVE a box
      twoLeftOfPlayer.box = oneLeftOfPlayer.box;
      oneLeftOfPlayer.box = false;
      this.boxPushes++;
    }

    this.render();
  }

  handleRightMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 7) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneRightOfPlayer = this.getGridObject(row, column + 1);
    const twoRightOfPlayer = this.getGridObject(row, column + 2);
    const player           = playerTile.player;
    let box;

    if (
      (oneRightOfPlayer instanceof Wall) ||
      (oneRightOfPlayer.box && twoRightOfPlayer instanceof Wall) ||
      (oneRightOfPlayer.box && twoRightOfPlayer.box)
    ) {
      return;
    }

    oneRightOfPlayer.player = playerTile.player;
    playerTile.player = false;
    player.column += 1;
    this.stepCount++;

    if (oneRightOfPlayer.box) {
      // If tile one spot from player DOES HAVE a box
      // and tile two spots from player DOES NOT HAVE a box
      twoRightOfPlayer.box = oneRightOfPlayer.box;
      oneRightOfPlayer.box = false;
      this.boxPushes++;
    }

  }



  handleUpMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (row === 0) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneNorthOfPlayer = this.getGridObject(row - 1, column);
    const twoNorthOfPlayer = this.getGridObject(row - 2, column);
    const player           = playerTile.player;
    let box;

    if (
      (oneNorthOfPlayer instanceof Wall) ||
      (oneNorthOfPlayer.box && twoNorthOfPlayer instanceof Wall) ||
      (oneNorthOfPlayer.box && twoNorthOfPlayer.box)
    ) {
      return;
    }

    oneNorthOfPlayer.player = playerTile.player;
    playerTile.player = false;
    player.row -= 1;
    this.stepCount++;

    if (oneNorthOfPlayer.box) {
      // If tile one spot from player DOES HAVE a box
      // and tile two spots from player DOES NOT HAVE a box
      twoNorthOfPlayer.box = oneNorthOfPlayer.box;
      oneNorthOfPlayer.box = false;
      this.boxPushes++;
    }

  }

  handleDownMovement() {
    const { playerObject, row, column } = this.getPlayerInfo();
    if (row === 7) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneSouthOfPlayer = this.getGridObject(row + 1, column);
    const twoSouthOfPlayer = this.getGridObject(row + 2, column);
    const player           = playerTile.player;
    let box;

    if (
      (oneSouthOfPlayer instanceof Wall) ||
      (oneSouthOfPlayer.box && twoSouthOfPlayer instanceof Wall) ||
      (oneSouthOfPlayer.box && twoSouthOfPlayer.box)
    ) {
      return;
    }

    oneSouthOfPlayer.player = playerTile.player;
    playerTile.player = false;
    player.row += 1;
    this.stepCount++;

    if (oneSouthOfPlayer.box) {
      // If tile one spot from player DOES HAVE a box
      // and tile two spots from player DOES NOT HAVE a box
      twoSouthOfPlayer.box = oneSouthOfPlayer.box;
      oneSouthOfPlayer.box = false;
      this.boxPushes++;
    }
  }

  gameOver() {
    const flattened   = _.flatten(this.objectGrid);
    const checkpoints = flattened.filter(object => {
      return object instanceof Checkpoint;
    });
    return checkpoints.every(checkpoint => {
      return checkpoint.box;
    });
  }

  movePlayer(direction) {
    this.stage.removeAllChildren();

    switch(direction) {
      case "left":
        this.playerObject.switchImage("left");
        this.handleLeftMovement();
        break;

      case "right":
      this.playerObject.switchImage("right");
        this.handleRightMovement();
        break;

      case "up":
        this.playerObject.switchImage("up");
        this.handleUpMovement();
        break;

      case "down":
        this.playerObject.switchImage("down");
        this.handleDownMovement();
        break;

      default:
        break;
    }

    this.render();
  }



}

export default Board;
