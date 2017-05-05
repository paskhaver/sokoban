import Tile from "./tiles/tile.js";
import Floor from "./tiles/floor.js";
import Wall from "./tiles/wall.js";
import Player from "./tiles/player.js";
import Box from "./tiles/box.js";
import Checkpoint from "./tiles/checkpoint.js";

class Board {

  constructor(textGrid) {

    this.stage = new createjs.Stage("canvas");
    this.textGrid = textGrid;

    this.objectGrid = this.compile();
    this.lastRow    = this.objectGrid.length - 1;
    this.lastCol    = this.objectGrid[0].length - 1;
    this.stepCount  = 0;

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

  handleLeftMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneLeftOfPlayer = this.getGridObject(row, column - 1);
    const twoLeftOfPlayer = this.getGridObject(row, column - 2);
    const player           = playerTile.player;
    let box;

    if (
      (oneLeftOfPlayer instanceof Wall) ||
      (oneLeftOfPlayer instanceof Checkpoint && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof Wall) ||
      (oneLeftOfPlayer instanceof Checkpoint && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof Checkpoint && twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof Checkpoint && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof Floor && twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof Floor && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof Checkpoint && twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof Floor && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof Wall) ||
      (oneLeftOfPlayer instanceof Floor && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof Floor && twoLeftOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneLeftOfPlayer instanceof Checkpoint && !oneLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof Floor && !oneLeftOfPlayer.box)
    ) {
      oneLeftOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.column -= 1;
      this.render();
      return;
    }

    if (
      (oneLeftOfPlayer instanceof Checkpoint && !twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof Floor && !twoLeftOfPlayer.box)
    ) {
        twoLeftOfPlayer.box = oneLeftOfPlayer.box;
        oneLeftOfPlayer.box = false;
        oneLeftOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.column -= 1;
        this.render();
        return;
    }

  }

  handleRightMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === this.lastCol) { return; }

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
      (oneNorthOfPlayer instanceof Checkpoint && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof Wall) ||
      (oneNorthOfPlayer instanceof Checkpoint && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof Checkpoint && twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof Checkpoint && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof Floor && twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof Floor && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof Checkpoint && twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof Floor && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof Wall) ||
      (oneNorthOfPlayer instanceof Floor && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof Floor && twoNorthOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneNorthOfPlayer instanceof Checkpoint && !oneNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof Floor && !oneNorthOfPlayer.box)
    ) {
      oneNorthOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.row -= 1;
      this.render();
      return;
    }

    if (
      (oneNorthOfPlayer instanceof Checkpoint && !twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof Floor && !twoNorthOfPlayer.box)
    ) {
        twoNorthOfPlayer.box = oneNorthOfPlayer.box;
        oneNorthOfPlayer.box = false;
        oneNorthOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.row -= 1;
        this.render();
        return;
    }

  }

  handleDownMovement() {
    const { playerObject, row, column } = this.getPlayerInfo();
    if (row === this.lastRow) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneSouthOfPlayer = this.getGridObject(row + 1, column);
    const twoSouthOfPlayer = this.getGridObject(row + 2, column);
    const player           = playerTile.player;
    let box;

    if (
      (oneSouthOfPlayer instanceof Wall) ||
      (oneSouthOfPlayer instanceof Checkpoint && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof Wall) ||
      (oneSouthOfPlayer instanceof Checkpoint && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof Checkpoint && twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof Checkpoint && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof Floor && twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof Floor && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof Checkpoint && twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof Floor && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof Wall) ||
      (oneSouthOfPlayer instanceof Floor && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof Floor && twoSouthOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneSouthOfPlayer instanceof Checkpoint && !oneSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof Floor && !oneSouthOfPlayer.box)
    ) {
      oneSouthOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.row += 1;
      this.render();
      this.stepCount += 1;
      return;
    }

    if (
      (oneSouthOfPlayer instanceof Checkpoint && !twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof Floor && !twoSouthOfPlayer.box)
    ) {
        twoSouthOfPlayer.box = oneSouthOfPlayer.box;
        oneSouthOfPlayer.box = false;
        oneSouthOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.row += 1;
        this.render();
        this.stepCount += 1;
        return;
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

export default Board;
