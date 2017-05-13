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
        let floor, box, player, checkpoint;
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

          case "*":
            checkpoint = new Checkpoint(rowIndex, colIndex);
            checkpoint.box = new Box(rowIndex, colIndex);
            return checkpoint;

          case "@":
            floor = new Floor(rowIndex, colIndex);
            floor.player = new Player(rowIndex, colIndex);
            this.playerObject = floor.player;
            return floor;

          case "+":
            checkpoint = new Checkpoint(rowIndex, colIndex);
            checkpoint.player = new Player(rowIndex, colIndex);
            this.playerObject = checkpoint.player;
            return checkpoint;
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

  outsideOfBox(direction, row, column) {
    if (direction === "left" || direction === "right") {
      if (column === 0 || column === 7) return false;
    } else if (direction === "up" || direction === "down") {
      if (row === 0 || row === 7) return false;
    }

    return true;
  }

  getAdjacentTiles(direction, row, column) {
    const playerTile = this.getGridObject(row, column);
    const player     = this.playerObject;
    let oneTileFromPlayer, twoTilesFromPlayer;
    switch(direction) {
      case "left":
        oneTileFromPlayer  = this.getGridObject(row, column - 1);
        twoTilesFromPlayer = this.getGridObject(row, column - 2);
        break;

      case "right":
        oneTileFromPlayer  = this.getGridObject(row, column + 1);
        twoTilesFromPlayer = this.getGridObject(row, column + 2);
        break;

      case "up":
        oneTileFromPlayer  = this.getGridObject(row - 1, column);
        twoTilesFromPlayer = this.getGridObject(row - 2, column);
        break;

      case "down":
        oneTileFromPlayer  = this.getGridObject(row + 1, column);
        twoTilesFromPlayer = this.getGridObject(row + 2, column);
        break;
    }

    return { playerTile, oneTileFromPlayer, twoTilesFromPlayer, player};
  }

  handlePlayerTileSwitch(direction, player) {
    if (direction === "left") {
      player.column -= 1;
    } else if (direction === "right") {
      player.column += 1;
    } else if (direction === "up") {
      player.row -= 1;
    } else if (direction === "down") {
      player.row += 1;
    }
  }

  obstacleInPlayerPath(oneTileFromPlayer, twoTilesFromPlayer) {
    if (
      (oneTileFromPlayer instanceof Wall) ||
      (oneTileFromPlayer.box && twoTilesFromPlayer instanceof Wall) ||
      (oneTileFromPlayer.box && twoTilesFromPlayer.box)
    ) {
      return true;
    }
  }

  handleMovement(direction) {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (!this.outsideOfBox(direction, row, column)) return;
    const { playerTile,
            oneTileFromPlayer, twoTilesFromPlayer,
            player } = this.getAdjacentTiles(direction, row, column);

    if (this.obstacleInPlayerPath(oneTileFromPlayer, twoTilesFromPlayer)) {
      return;
    }

    oneTileFromPlayer.player = playerTile.player;
    this.handlePlayerTileSwitch(direction, player);

    playerTile.player = false;
    this.stepCount++;

    if (oneTileFromPlayer.box) {
      twoTilesFromPlayer.box = oneTileFromPlayer.box;
      oneTileFromPlayer.box = false;
      this.boxPushes++;
    }

    this.render();

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
    this.playerObject.switchImage(direction);
    this.handleMovement(direction);
    this.render();
  }

}

export default Board;
