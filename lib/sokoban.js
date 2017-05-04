// Level element      Character  ASCII Code
// Wall                  #         0x23
// Player                @         0x40
// Player on goal square +         0x2b
// Box                   $         0x24
// Box on goal square    *         0x2a
// Goal square           .         0x2e
// Floor              (Space)      0x20

import Board from "./board.js";

class Sokoban {

  constructor() {
    const canvas =  document.getElementById("canvas");
          canvas.width = 640;
          canvas.height = 640;
  }

  play() {

  }


}

export default Sokoban;
