import Tile from "./tile";
import Floor from "./floor";

class Player extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Player/player_04.png";
  }

  switchImage(direction) {
    switch(direction) {
      case "up":
        this.imageSrc = "./PNG/Player/player_01.png";
        break;

      case "down":
        this.imageSrc = "./PNG/Player/player_04.png";
        break;

      case "left":
        this.imageSrc = "./PNG/Player/player_13.png";
        break;

      case "right":
        this.imageSrc = "./PNG/Player/player_16.png";
        break;

      default:
        this.imageSrc = "./PNG/Player/player_04.png";
        break;
    }
  }

}

export default Player;
