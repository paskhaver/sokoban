import Tile from "./tile";
import Floor from "./floor";

class Player extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Player/player_04.png";
  }
}

export default Player;
