function init() {

  const stage = new createjs.Stage("canvas");

  const groundImage = new Image();
        groundImage.src = "./PNG/Ground/ground_01.png";
        groundImage.onload = handleImageLoad;

}

function handleImageLoad(event)  {
  // debugger
  const stage = new createjs.Stage("canvas");
  const groundImage = event.target;

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let bitmap = new createjs.Bitmap(groundImage);
          bitmap.scaleX = 0.5;
          bitmap.scaleY = 0.5;
      bitmap.x = x * 64;
      bitmap.y = y * 64;
      stage.addChild(bitmap);
      stage.update();
    }
  }
}
