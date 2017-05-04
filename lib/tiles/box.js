import Tile from "./tile.js";

class Box extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_05.png";
    this.onCheckPoint = false;
  }

}

export default Box;
