import { Scene } from "phaser";
import { ASSETS_IMAGES, ASSETS_IMAGES_ATLAS} from "../game/assets";
import { Bat } from "../game/Bat";
import { Background } from "../game/Background";
import { Obstacles } from "../game/Obstacles";

export class Preloader extends Scene
{
    constructor(){
        super("Preloader");
    }

    private bat_obj: Bat;
    private bg_obj: Background;
    private obstacle_obj: Obstacles;

    preload(): void
    {
        ASSETS_IMAGES.forEach((assets) => {
            this.load.image(assets.asset_key, assets.asset_path);
        })

        ASSETS_IMAGES_ATLAS.forEach((assets) => {
            this.load.spritesheet(assets.asset_key, assets.asset_path, { frameWidth: assets.width, frameHeight: assets.height });
        })

        

    }

    create(): void
    {
        this.bg_obj = new Background(this);
        this.bat_obj = new Bat(this);
        this.obstacle_obj = new Obstacles(this, this.bat_obj);
    }

    update(time: number, delta: number): void {

        this.bat_obj.fallAnim();
        this.bat_obj.moveBat(delta);
        this.bg_obj.parallax_movement(delta);
    }

}


