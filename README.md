# Sokoban

![Sokoban Gameplay](./screenshots/gameplay.gif)

## Live Link

[Sokoban](https://paskhaver.github.io/sokoban/)

## Background

Sokoban is a puzzle game created by Hiroyuki Imabayashi
in 1981.

The game consists of a grid of squares populated with:

- a single player, who starts in a position that allows for free movement
- multiple boxes that the player can push across the grid
- designated checkpoints, whose count is equal to the number of boxes
- walls / obstacles that neither the player nor the boxes can traverse

The goal is for the player to move all of the boxes to their
designated checkpoints without trapping the boxes in between
the walls or in a corner.


## Features
- Dynamic movement of player across game grid created with Easel.js
- ES6 game logic to render next level upon victory
- Dropdown to instantly switch to another level
- Reset level, skip level, and reset game buttons to improve user experience
- 30 levels of varying difficulty

## Code Samples

- Helper methods react to 4 directions (left, right, up, down) of player movement
```javascript
getAdjacentTiles(direction, row, column) {
  const playerTile = this.getGridObject(row, column);
  const player     = this.playerObject;
  let oneTileFromPlayer, twoTilesFromPlayer;
  switch(direction) {
    case "right":
      oneTileFromPlayer  = this.getGridObject(row, column + 1);
      twoTilesFromPlayer = this.getGridObject(row, column + 2);
      break;

    case "up":
      oneTileFromPlayer  = this.getGridObject(row - 1, column);
      twoTilesFromPlayer = this.getGridObject(row - 2, column);
      break;
    //...
  }
```
- jQuery methods update the steps taken and boxes pushed from internal game logic

- Reset level, skip level, and reset game functionalities are captured in single helper method

```javascript
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
```
