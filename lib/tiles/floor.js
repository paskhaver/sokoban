import Tile from "./tile.js";

class Floor extends Tile {
  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Ground/ground_04.png";
  }
}

export default Floor;
