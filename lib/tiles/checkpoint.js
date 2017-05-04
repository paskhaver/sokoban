import Tile from "./tile.js";

class Checkpoint extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_30.png";
    this.player = false;
    this.box = false;
  }

}

export default Checkpoint;
