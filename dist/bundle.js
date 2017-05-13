/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.imageSrc = "";
  }

  createBitmap(stage, imagePath, x, y) {
    const bitmap = new createjs.Bitmap(imagePath);
          bitmap.scaleX = 0.5;
          bitmap.scaleY = 0.5;
          bitmap.x = this.column * 64;
          bitmap.y = this.row * 64;

    stage.addChild(bitmap);
    stage.update();
  }

  render(stage) {
    let image = new Image();

    // One object on the grid will have a valid player property
    // Load the background image first, then the player on top
    if (this.player) {

      const backgroundImage = new Image();
            backgroundImage.src = this.imageSrc;

      backgroundImage.onload = (event) => {
        this.createBitmap(stage, event.target, this.column * 64, this.row * 64);

        image.src = this.player.imageSrc;
        image.onload = (playerEvent) => {
          this.createBitmap(stage, playerEvent.target, this.column * 64, this.row * 64);
        };
      };

    } else if (this.box) {

      image.src = this.box.imageSrc;
      image.onload = (event) => {
        this.createBitmap(stage, event.target, this.column * 64, this.row * 64);
      };

    } else {

      image.src = this.imageSrc;
      image.onload = (event) => {
        this.createBitmap(stage, event.target, this.column * 64, this.row * 64);
      };
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = Tile;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Floor extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = `./PNG/Ground/ground.png`;
    this.player = false;
    this.box = false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = Floor;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tiles_tile_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tiles_player_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tiles_box_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__ = __webpack_require__(5);







class Board {

  constructor(textGrid) {
    this.stage = new createjs.Stage("canvas");
    this.stepCount  = 0;
    this.boxPushes  = 0;
    this.objectGrid = this.compile(textGrid);
    this.render();
  }

  compile(textGrid) {
    return textGrid.map((array, rowIndex) => {
      return array.map((symbol, colIndex) => {
        let floor, box, player, checkpoint;
        switch(symbol) {
          case "#":
            return new __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */](rowIndex, colIndex);

          case " ":
            return new __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */](rowIndex, colIndex);

          case ".":
            return new __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */](rowIndex, colIndex);

          case "$":
            floor = new __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */](rowIndex, colIndex);
            floor.box = new __WEBPACK_IMPORTED_MODULE_4__tiles_box_js__["a" /* default */](rowIndex, colIndex);
            return floor;

          case "*":
            checkpoint = new __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */](rowIndex, colIndex);
            checkpoint.box = new __WEBPACK_IMPORTED_MODULE_4__tiles_box_js__["a" /* default */](rowIndex, colIndex);
            return checkpoint;

          case "@":
            floor = new __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */](rowIndex, colIndex);
            floor.player = new __WEBPACK_IMPORTED_MODULE_3__tiles_player_js__["a" /* default */](rowIndex, colIndex);
            this.playerObject = floor.player;
            return floor;

          case "+":
            checkpoint = new __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */](rowIndex, colIndex);
            checkpoint.player = new __WEBPACK_IMPORTED_MODULE_3__tiles_player_js__["a" /* default */](rowIndex, colIndex);
            this.playerObject = checkpoint.player;
            return checkpoint;
        }
      });
    });
  }

  render() {
    this.objectGrid.forEach(row => {
      row.forEach(tileClass => {
        tileClass.render(this.stage);
      });
    });
  }

  getPlayerInfo() {
    const playerObject = this.playerObject;
    const row    = playerObject.row;
    const column = playerObject.column;
    return { playerObject, row, column };
  }

  getGridObject(row, column) {
    if (row < 0 || column < 0) { return undefined; }
    return this.objectGrid[row][column];
  }

  outsideOfBox(direction, row, column) {
    if (direction === "left" || direction === "right") {
      if (column === 0 || column === 7) return false;
    } else if (direction === "up" || direction === "down") {
      if (row === 0 || row === 7) return false;
    }

    return true;
  }

  getAdjacentTiles(direction, row, column) {
    const playerTile = this.getGridObject(row, column);
    const player     = this.playerObject;
    let oneTileFromPlayer, twoTilesFromPlayer;
    switch(direction) {
      case "left":
        oneTileFromPlayer  = this.getGridObject(row, column - 1);
        twoTilesFromPlayer = this.getGridObject(row, column - 2);
        break;

      case "right":
        oneTileFromPlayer  = this.getGridObject(row, column + 1);
        twoTilesFromPlayer = this.getGridObject(row, column + 2);
        break;

      case "up":
        oneTileFromPlayer  = this.getGridObject(row - 1, column);
        twoTilesFromPlayer = this.getGridObject(row - 2, column);
        break;

      case "down":
        oneTileFromPlayer  = this.getGridObject(row + 1, column);
        twoTilesFromPlayer = this.getGridObject(row + 2, column);
        break;
    }

    return { playerTile, oneTileFromPlayer, twoTilesFromPlayer, player};
  }

  handlePlayerTileSwitch(direction, player) {
    if (direction === "left") {
      player.column -= 1;
    } else if (direction === "right") {
      player.column += 1;
    } else if (direction === "up") {
      player.row -= 1;
    } else if (direction === "down") {
      player.row += 1;
    }
  }

  obstacleInPlayerPath(oneTileFromPlayer, twoTilesFromPlayer) {
    if (
      (oneTileFromPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneTileFromPlayer.box && twoTilesFromPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneTileFromPlayer.box && twoTilesFromPlayer.box)
    ) {
      return true;
    }
  }

  handleMovement(direction) {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (!this.outsideOfBox(direction, row, column)) return;
    const { playerTile,
            oneTileFromPlayer, twoTilesFromPlayer,
            player } = this.getAdjacentTiles(direction, row, column);

    if (this.obstacleInPlayerPath(oneTileFromPlayer, twoTilesFromPlayer)) {
      return;
    }

    oneTileFromPlayer.player = playerTile.player;
    this.handlePlayerTileSwitch(direction, player);

    playerTile.player = false;
    this.stepCount++;

    if (oneTileFromPlayer.box) {
      twoTilesFromPlayer.box = oneTileFromPlayer.box;
      oneTileFromPlayer.box = false;
      this.boxPushes++;
    }

    this.render();

  }

  gameOver() {
    const flattened   = _.flatten(this.objectGrid);
    const checkpoints = flattened.filter(object => {
      return object instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */];
    });
    return checkpoints.every(checkpoint => {
      return checkpoint.box;
    });
  }

  movePlayer(direction) {
    this.stage.removeAllChildren();
    this.playerObject.switchImage(direction);
    this.handleMovement(direction);
    this.render();
  }

}

/* harmony default export */ __webpack_exports__["a"] = Board;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Level element      Character  ASCII Code
// Wall                  #         0x23
// Player                @         0x40
// Player on goal square +         0x2b
// Box                   $         0x24
// Box on goal square    *         0x2a
// Goal square           .         0x2e
// Floor              (Space)      0x20

const LEVELS = [
  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", " ", " ", ".", " ", "#"],
  ["#", "#", " ", "*", " ", "#", " ", "#"],
  ["#", "#", " ", ".", "$", " ", " ", "#"],
  ["#", "#", " ", " ", "#", "$", "#", "#"],
  ["#", "#", "#", " ", "@", " ", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", " ", ".", "@", " ", "#"],
  ["#", "#", " ", "#", ".", "#", " ", "#"],
  ["#", "#", " ", " ", " ", "$", " ", "#"],
  ["#", "#", ".", "$", "$", " ", "#", "#"],
  ["#", "#", " ", " ", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", " ", "@", "#", "#"],
  ["#", " ", " ", "*", "$", " ", "#", "#"],
  ["#", " ", " ", " ", " ", " ", "#", "#"],
  ["#", "#", " ", ".", "#", "#", "#", "#"],
  ["#", "#", "$", " ", "#", "#", "#", "#"],
  ["#", "#", " ", ".", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", ".", "#", "#", "#", ".", "#"],
  ["#", "#", " ", "#", " ", " ", ".", "#"],
  ["#", "#", " ", "$", "$", " ", "@", "#"],
  ["#", "#", " ", " ", "$", " ", " ", "#"],
  ["#", "#", " ", " ", "#", " ", " ", "#"],
  ["#", "#", " ", " ", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", " ", "@", "#", "#"],
  ["#", "#", "#", "#", " ", " ", " ", "#"],
  ["#", ".", " ", "#", "$", "$", " ", "#"],
  ["#", " ", " ", " ", " ", " ", "#", "#"],
  ["#", ".", " ", " ", "$", "#", "#", "#"],
  ["#", "#", ".", " ", " ", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", ".", ".", "#", "#", "#", "#"],
  ["#", " ", "$", " ", " ", " ", " ", "#"],
  ["#", " ", " ", "#", "$", "#", " ", "#"],
  ["#", " ", "@", " ", ".", "$", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", " ", " ", ".", "#", "#"],
  ["#", " ", "$", " ", "#", " ", "#", "#"],
  ["#", " ", "*", "$", " ", " ", "#", "#"],
  ["#", " ", ".", "#", "@", " ", "#", "#"],
  ["#", " ", " ", " ", " ", "#", "#", "#"],
  ["#", " ", " ", " ", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", ".", " ", " ", "@", ".", "#", "#"],
  ["#", " ", " ", "$", "#", " ", "#", "#"],
  ["#", " ", "#", " ", "$", ".", " ", "#"],
  ["#", " ", " ", " ", "$", "#", " ", "#"],
  ["#", "#", "#", "#", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", ".", " ", ".", "#", "#", "#", "#"],
  ["#", ".", "#", "$", "$", " ", "#", "#"],
  ["#", " ", " ", " ", "@", " ", "#", "#"],
  ["#", " ", "$", "#", " ", " ", "#", "#"],
  ["#", "#", " ", " ", " ", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", ".", " ", " ", "#", "#", "#", "#"],
  ["#", " ", "#", " ", " ", " ", "#", "#"],
  ["#", " ", ".", " ", "#", " ", "#", "#"],
  ["#", " ", "$", "*", "$", " ", "#", "#"],
  ["#", "#", "@", " ", "#", "#", "#", "#"],
  ["#", "#", " ", " ", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", ".", " ", " ", " ", ".", " ", "#"],
  ["#", " ", "#", " ", "#", " ", " ", "#"],
  ["#", "@", "$", " ", " ", "$", ".", "#"],
  ["#", "#", "#", "#", "#", " ", "$", "#"],
  ["#", "#", "#", "#", "#", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", "#", "#", "#", "#", "#"],
  ["#", " ", " ", "#", "#", "#", "#", "#"],
  ["#", " ", ".", "*", " ", " ", " ", "#"],
  ["#", "#", "$", " ", " ", " ", " ", "#"],
  ["#", "#", " ", "#", "$", "#", "#", "#"],
  ["#", "#", ".", " ", "@", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", "@", " ", "#", "#", "#"],
  ["#", "#", " ", ".", " ", " ", " ", "#"],
  ["#", ".", " ", "$", ".", "$", " ", "#"],
  ["#", "#", "$", "#", " ", "#", "#", "#"],
  ["#", "#", " ", " ", " ", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", " ", " ", "#", "#", "#"],
  ["#", " ", "$", "#", " ", "#", "#", "#"],
  ["#", " ", ".", " ", "@", "#", "#", "#"],
  ["#", " ", "*", " ", " ", " ", "#", "#"],
  ["#", "#", " ", "#", "$", " ", "#", "#"],
  ["#", "#", ".", " ", " ", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", " ", "#", "#", "#", "#"],
  ["#", ".", ".", "$", " ", " ", ".", "#"],
  ["#", " ", "#", "$", " ", "$", " ", "#"],
  ["#", "@", " ", " ", "#", " ", " ", "#"],
  ["#", "#", "#", "#", "#", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", " ", ".", "@", "#", "#"],
  ["#", "#", " ", " ", " ", "$", ".", "#"],
  ["#", "#", "#", "#", "*", "#", " ", "#"],
  ["#", "#", " ", " ", " ", " ", " ", "#"],
  ["#", " ", " ", "$", " ", " ", "#", "#"],
  ["#", " ", " ", " ", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "@", " ", "#", "#", "#", "#"],
  ["#", "#", " ", " ", "#", "#", "#", "#"],
  ["#", "#", ".", " ", "#", "#", "#", "#"],
  ["#", " ", "$", "$", ".", " ", ".", "#"],
  ["#", " ", " ", "$", " ", "#", "#", "#"],
  ["#", "#", "#", " ", " ", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", ".", " ", " ", "#", "#", "#"],
  ["#", "#", " ", "#", " ", "#", "#", "#"],
  ["#", "#", " ", "*", "$", " ", " ", "#"],
  ["#", "#", " ", " ", "$", ".", " ", "#"],
  ["#", "#", " ", " ", "@", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", " ", " ", " ", "#", "#"],
  ["#", "#", "#", " ", "#", ".", "#", "#"],
  ["#", "#", "#", " ", " ", ".", "#", "#"],
  ["#", "@", " ", "$", "$", " ", "#", "#"],
  ["#", " ", " ", ".", "$", " ", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", "@", "#", "#", "#"],
  ["#", " ", "$", "#", " ", "#", "#", "#"],
  ["#", " ", "*", " ", "$", " ", " ", "#"],
  ["#", " ", " ", " ", "#", "#", " ", "#"],
  ["#", "#", ".", " ", " ", ".", " ", "#"],
  ["#", "#", "#", " ", " ", " ", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", " ", " ", "@", "#", "#"],
  ["#", "#", " ", " ", "#", " ", " ", "#"],
  ["#", "#", ".", " ", " ", "$", " ", "#"],
  ["#", "#", " ", "$", "$", "#", ".", "#"],
  ["#", "#", "#", "#", " ", " ", ".", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", ".", " ", "#", "#", "#"],
  ["#", " ", ".", " ", " ", "#", "#", "#"],
  ["#", " ", " ", " ", "$", "$", " ", "#"],
  ["#", "#", " ", ".", " ", "$", "@", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "@", ".", " ", " ", "#", "#"],
  ["#", " ", "$", "$", "*", " ", "#", "#"],
  ["#", " ", " ", "#", " ", " ", "#", "#"],
  ["#", " ", " ", "#", " ", " ", ".", "#"],
  ["#", "#", "#", "#", " ", "#", " ", "#"],
  ["#", "#", "#", "#", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "$", ".", "#"],
  ["#", "#", "#", " ", " ", ".", " ", "#"],
  ["#", "#", "#", " ", " ", "#", ".", "#"],
  ["#", " ", "$", " ", " ", "$", " ", "#"],
  ["#", " ", " ", " ", "#", "@", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", " ", " ", "#", "#", "#"],
  ["#", "#", "#", " ", " ", "#", "#", "#"],
  ["#", "#", "#", " ", ".", ".", " ", "#"],
  ["#", " ", " ", "$", "#", " ", " ", "#"],
  ["#", " ", " ", ".", "$", "$", " ", "#"],
  ["#", "#", "#", "#", " ", "@", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", "#", "#", "#", "#"],
  ["#", " ", "#", " ", "*", "@", "#", "#"],
  ["#", " ", " ", "*", " ", " ", " ", "#"],
  ["#", "#", "#", "$", " ", " ", " ", "#"],
  ["#", "#", "#", " ", " ", " ", ".", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", " ", ".", " ", " ", "#"],
  ["#", " ", "$", "@", "#", ".", " ", "#"],
  ["#", " ", " ", "$", "#", " ", "#", "#"],
  ["#", " ", " ", "*", " ", " ", "#", "#"],
  ["#", "#", " ", " ", "#", " ", "#", "#"],
  ["#", "#", "#", " ", " ", " ", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", " ", "#", "#", "#", "#"],
  ["#", " ", " ", " ", " ", " ", "#", "#"],
  ["#", " ", " ", "#", "$", "$", "@", "#"],
  ["#", " ", " ", ".", " ", "*", ".", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "@", " ", " ", " ", " ", "#"],
  ["#", ".", " ", "#", " ", " ", " ", "#"],
  ["#", " ", "$", "$", "$", ".", "#", "#"],
  ["#", " ", ".", "#", " ", " ", "#", "#"],
  ["#", " ", " ", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]],

  [["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", ".", "#", "#", "#", "#"],
  ["#", " ", "$", ".", ".", " ", "#", "#"],
  ["#", " ", " ", "#", "#", "$", "#", "#"],
  ["#", "#", " ", " ", "#", " ", " ", "#"],
  ["#", "#", "$", " ", " ", " ", "@", "#"],
  ["#", "#", " ", " ", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"]]
];

console.log(LEVELS.length);

/* harmony default export */ __webpack_exports__["a"] = LEVELS;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Box extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_05.png";
    this.onCheckPoint = false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = Box;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Checkpoint extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_30.png";
    this.player = false;
    this.box = false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = Checkpoint;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__floor__ = __webpack_require__(1);



class Player extends __WEBPACK_IMPORTED_MODULE_0__tile__["a" /* default */] {

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

/* harmony default export */ __webpack_exports__["a"] = Player;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Wall extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Environment/environment_04.png";
  }

}

/* harmony default export */ __webpack_exports__["a"] = Wall;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__levels_js__ = __webpack_require__(3);



class Sokoban {

  constructor(level = 0) {
    this.level = level;
    const textGrid = __WEBPACK_IMPORTED_MODULE_1__levels_js__["a" /* default */][this.level];

    const canvas =  document.getElementById("canvas");
          canvas.width =  512;
          canvas.height = 512;

    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */](textGrid);
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map