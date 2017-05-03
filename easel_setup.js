function init() {

  const stage = new createjs.Stage("canvas");

  const groundImage = new Image();
        groundImage.src = "./PNG/Ground/ground_01.png";
        groundImage.onload = handleImageLoad;

}

function handleImageLoad(event)  {

  const sokobanBoxes = {};

  const stage = new createjs.Stage("canvas");
  const groundImage = event.target;

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const bitmap = new createjs.Bitmap(groundImage);
      bitmap.scaleX = 0.5;
      bitmap.scaleY = 0.5;

      const xCoordinate = x * 64;
      const yCoordinate = y * 64;
      bitmap.x = xCoordinate;
      bitmap.y = yCoordinate;

      sokobanBoxes[[x, y]] = bitmap;

      stage.addChild(bitmap);
      stage.update();
    }
  }

  window.sokobanBoxes = sokobanBoxes;

}
