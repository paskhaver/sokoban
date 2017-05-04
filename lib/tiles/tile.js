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
    } else if (this.box) {
      image.src = this.box.imageSrc;
    } else {
      image.src = this.imageSrc;
    }

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

export default Tile;
