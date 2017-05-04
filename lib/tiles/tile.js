class Tile {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.imageSrc = "";
  }

  render(stage) {
    let image = new Image();
    if (this.player) {
      image.src = this.player.imageSrc;
      image.onload = (event) => {
        const playerBitmap = new createjs.Bitmap(event.target);
        playerBitmap.scaleX = 0.5;
        playerBitmap.scaleY = 0.5;
        playerBitmap.x = this.column * 64;
        playerBitmap.y = this.row * 64;
        stage.addChild(playerBitmap);
        stage.update();
      };
    } else {
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

}

export default Tile;
