import Tile from "./tile.js";

class Floor extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = `./PNG/Ground/ground.png`;
    this.player = false;
    this.box = false;
  }
}

export default Floor;
