import Tile from "./tile.js";

class Player extends Tile {
  constructor() {

  }

  move(direction) {
    switch(direction) {
      case "N":
        return [0, 1];

      case "S":
        return [0, -1];

      case "E":
        return [1, 0];

      case "W":
        return [-1, 0];

      default:
        return;
    }
  }
}

export default Player;
