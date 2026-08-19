import { Scene } from "phaser"
import { ASSETS_KEYS } from "./assets";

export class Background {

    static readonly PARALAX_SPEED_BG: number = 0.012;
    static readonly PARALAX_SPEED_FG: number = 0.01;

    private current_scene: Scene;
    private bg_image: Phaser.GameObjects.TileSprite;
    private fg_image: Phaser.GameObjects.TileSprite;

    constructor(scene: Scene){
        this.current_scene = scene;

        this.bg_image = this.current_scene.add
            .tileSprite(0, 0,scene.scale.width, scene.scale.height, ASSETS_KEYS.BACKGROUND)
            .setOrigin(0);
  
        this.fg_image = this.current_scene.add
            .tileSprite(0, 0,scene.scale.width, scene.scale.height, ASSETS_KEYS.FOREGROUND)
            .setOrigin(0);
    }

    public parallax_movement(delta: number):void {
        
        this.bg_image.tilePositionX += Background.PARALAX_SPEED_BG * delta;
        this.fg_image.tilePositionX += Background.PARALAX_SPEED_FG * delta;

    }

}