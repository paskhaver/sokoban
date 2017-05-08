import Board from "./board.js";
import LEVELS from "./levels.js";

class Sokoban {

  constructor(level = 0) {
    this.level = level;
    const textGrid = LEVELS[this.level];

    const canvas =  document.getElementById("canvas");
          canvas.width =  textGrid[0].length * 64;
          canvas.height = textGrid.length * 64;

    this.board = new Board(textGrid);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  let sokoban = new Sokoban();
  let board = sokoban.board;

  $("#dialog").dialog({
    autoOpen: false,
    draggable: true,
    modal: true,
    width: 8 * 64,
    height: 8 * 64,
    buttons: [
      {
        text: "Play Again",
        click: () => {
          $(this).dialog("close");
          sokoban = new Sokoban(sokoban.level);
          board = sokoban.board;
        }
      }
    ]
  });

  $("#reset-level").click(event => {
    sokoban = new Sokoban(sokoban.level);
    board = sokoban.board;
    $("#steps-taken").text(board.stepCount);
    $("#box-pushes").text(board.boxPushes);

    $("#dialog").dialog("open");
  });

  $("#reset-game").click(event => {
    sokoban = new Sokoban();
    board = sokoban.board;
    $("#steps-taken").text(board.stepCount);
    $("#box-pushes").text(board.boxPushes);
    $("#level").text(sokoban.level + 1);
  });

  document.addEventListener("keydown", () => {
    event.preventDefault();
      switch(event.keyCode) {
        case 37:
          board.movePlayer("left");
          break;

        case 38:
          board.movePlayer("up");
          break;

        case 39:
          board.movePlayer("right");
          break;

        case 40:
          board.movePlayer("down");
          break;
      }

      $("#steps-taken").text(board.stepCount);
      $("#box-pushes").text(board.boxPushes);

      if (sokoban.board.gameOver()) {
        sokoban = new Sokoban(sokoban.level + 1);
        board = sokoban.board;
        window.board = board;
        $("#steps-taken").text(board.stepCount);
        $("#box-pushes").text(board.boxPushes);
        $("#level").text(sokoban.level + 1);
      }
  }
  );
});
