class Player {
  constructor(x, y) {
    super(x, y);
  }

  render() {
    const bitmap = new createjs.Bitmap(groundImage);
          bitmap.scaleX = 0.5;
          bitmap.scaleY = 0.5;


  }

  move(direction) {
    switch(direction) {
      case "N":
        return [0, 1];

      case "S":
        return [0, -1];

      case "E":
        return [1, 0];

      case "W":
        return [-1, 0];

      default:
        return;
    }
  }
}

export default Player;
