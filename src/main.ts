import * as Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";


const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 270,
  height: 480,
  pixelArt: true,
  roundPixels: true,
  physics : {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 400},
      debug: true
    }
  },
  scale: {
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT
  },
  backgroundColor: '#1492c4',

  scene: [Preloader]
};

new Phaser.Game(gameConfig);