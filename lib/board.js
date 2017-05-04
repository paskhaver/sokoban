// Level element      Character  ASCII Code
// Wall                  #         0x23
// Player                @         0x40
// Player on goal square +         0x2b
// Box                   $         0x24
// Box on goal square    *         0x2a
// Goal square           .         0x2e
// Floor              (Space)      0x20

class Tile {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.imageSrc = "";
  }

  render(stage) {
    const image = new Image();
          image.src = this.imageSrc;
          image.onload = (event) => {
            const bitmap = new createjs.Bitmap(event.target);
            bitmap.scaleX = 0.5;
            bitmap.scaleY = 0.5;
            bitmap.x = this.column * 64;
            bitmap.y = this.row * 64;

            stage.addChild(bitmap);
            stage.update();
          };
  }
}

class Floor extends Tile {
  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Ground/ground_04.png";
  }
}

class Wall extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Environment/environment_04.png";
  }

}

class Player extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Player/player_04.png";
  }


  move(direction) {

  }

}

class Box extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_05.png";
  }

}

class Checkpoint extends Tile {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_30.png";
  }

}

class Board {

  constructor(level = 1) {

    this.stage = new createjs.Stage("canvas");
    this.tileSize = 64;
    this.textGrid = [
      ["#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "#", " ", ".", ".", "@", "#"],
      ["#", "#", "#", " ", "$", "$", " ", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", "#", "#", "#", " ", "#", "#", "#"],
      ["#", " ", " ", " ", " ", "#", "#", "#"],
      ["#", " ", "#", " ", " ", " ", "#", "#"],
      ["#", " ", " ", " ", "#", " ", "#", "#"],
      ["#", "#", "#", " ", " ", " ", "#", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#"],
    ];

    this.objectGrid = this.compile();
    this.render();
    this.playerCoordinates = this.objectGrid[1][6];
  }

  movePlayer(direction) {
    const playerObject = this.playerCoordinates;
    const playerRow = playerObject.row;
    const playerColumn = playerObject.column;
    debugger
    if (direction === "left") {
      const objLeftOfPlayer = this.objectGrid[playerRow - 1][playerColumn];
      this.objectGrid[playerRow - 1][playerColumn] = playerObject;
      this.objectGrid[playerRow][playerColumn] = objLeftOfPlayer;
    }

    this.render();
  }

  compile() {
    return this.textGrid.map((array, rowIndex) => {
      return array.map((symbol, colIndex) => {
        switch(symbol) {
          case "#":
            return new Wall(rowIndex, colIndex);

          case " ":
            return new Floor(rowIndex, colIndex);

          case ".":
            return new Checkpoint(rowIndex, colIndex);

          case "$":
            return new Box(rowIndex, colIndex);

          case "@":
            return new Player(rowIndex, colIndex);
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

const board = new Board();
window.board = board;

let canvas;
let lastDownTarget;
window.onload = () => {
  canvas = document.getElementById("canvas");

  document.addEventListener("mousedown", (event) => {
    lastDownTarget = event.target;
  });

  document.addEventListener("keydown", function(event) {
    if(lastDownTarget === canvas) {
      alert("You've pressed a key!");
      switch(event.keyCode) {
        // left
        case 37:
          board.movePlayer("left");
          break;

        //up
        case 38:
          board.movePlayer("up");
          break;

        //right
        case 39:
          board.movePlayer("right");
          break;

        //down
        case 40:
          board.movePlayer("down");
        break;
      }
    }
  })
}



export default Board;
