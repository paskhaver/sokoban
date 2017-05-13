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
- Dynamic movement of player across game grid
- Game logic to render next level upon victory
- Level select field to instantly switch to another game
- Reset level, skip level, and reset game buttons
- 100+ levels

## Code Samples

- Helper methods react to any of 4 directions (north, south, east, west) of player movement
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
