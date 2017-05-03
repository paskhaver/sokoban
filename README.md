# Sokoban

## Background

Sokoban is a puzzle game created by Hiroyuki Imabayashi
in 1981.

The game consists of a grid of squares populated with:

- boxes that the player can move
- designated checkpoints, whose count is equal to the number of boxes
- walls / obstacles that the player cannot traverse

The goal is to move all of the boxes to their
designated checkpoints in such a way that they do not get
stuck or prohibit another box from being moved.

## MVP

Users will be able to
- Move a player around a board and use him to push boxes in valid directions
- Restart a round if they create an unsolvable board
- Complete a round by placing all boxes on their designated checkpoints

In addition, the project will include:

- A description box with the rules of the game
- A production README


## Technologies, Libraries, API

JavaScript Classes
- board.js - The

## Wireframes

![Sokoban Wireframe](/screenshots/Sokoban.png)

## Implementation Timeline

**Day 1** - Setup HTML / CSS components along with the event
listeners to target the single "canvas" HTML element and
configure its height / width. Begin work on building
the game in raw JavaScript.

**Day 2** - Finish building the Sokoban game in raw JavaScript.
At this point, the product will likely be playable strictly
through the console.

**Day 3** - Tie together the frontend visuals and the
JavaScript logic. The Player's push of a box should
cause the canvas to dynamically adjust.

## Bonus Features

- Multiple levels
- Multiple characters
- Track of player's total moves
