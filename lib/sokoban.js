import Board from "./board.js";
import LEVELS from "./levels.js";

class Sokoban {

  constructor(level = 0) {
    this.level = level;
    const textGrid = LEVELS[this.level];

    const canvas =  document.getElementById("canvas");
          canvas.width =  512;
          canvas.height = 512;

    this.board = new Board(textGrid);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  let sokoban = new Sokoban();
  let board = sokoban.board;

  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 520,
    height: 600,
    dialogClass: "no-close"
  });

  function createNewGame(level) {
    $("#dialog").dialog("close");
    $("#canvas").show();
    sokoban = new Sokoban(level);
    board = sokoban.board;
    $("#steps-taken").text(board.stepCount);
    $("#box-pushes").text(board.boxPushes);
    $("#level").text(sokoban.level + 1);
    $("#select-level").val(sokoban.level + 1);
  }

  $("#reset-level").click(event => {
    createNewGame(sokoban.level);
  });

  $("#skip-level").click(event => {
    if (sokoban.level < 30) {
      createNewGame(sokoban.level + 1);
    }
  });

  $(".reset-game").click(event => {
    createNewGame(0);
  });

  $("#select-level").change(event => {
    const level = $("#select-level").val();
    createNewGame(parseInt(level - 1));
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

        if(sokoban.level === 29) {
          $("#canvas").hide();
          $("#dialog").dialog("open");
          return;
        }

        createNewGame(sokoban.level + 1);
      }
  }
  );
});
