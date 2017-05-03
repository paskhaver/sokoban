import Tile from "./tile.js";
import Player from "./player.js";

class Board {

  constructor() {
    this.grid = [];
    for (let i = 0; i < 10 ; i++) {
      this.grid[i] = [];

      for (let j = 0; j < 10; j++) {
        this.grid[i].push(new Tile(i, j));
      }
    }

    this.grid[4][4] = new Player(4, 4);

  }

}

window.board = new Board();

export default Board;
