import * as Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";


const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 288,
  height: 512,
  pixelArt: true,
  roundPixels: true,
  scale: {
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT
  },
  backgroundColor: '#1492c4',

  scene: [Preloader]
};

new Phaser.Game(gameConfig);