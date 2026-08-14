import { Scene } from "phaser";
import { ASSETS_IMAGES, ASSETS_IMAGES_ATLAS, ASSETS_KEYS } from "../game/assets";
import { Bat } from "../game/Bat";

export class Preloader extends Scene
{
    
    constructor(){
        super("Preloader");
    }

    private bat_obj: Bat;

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
        this.add.image(0, 0, ASSETS_KEYS.BACKGROUND).setOrigin(0);
        this.add.image(0,0, ASSETS_KEYS.FOREGROUND).setOrigin(0);

        this.bat_obj = new Bat(ASSETS_KEYS.BAT_IDLE);
        this.bat_obj.createBat(this);
    }

    update(time: number, delta: number): void {
        this.bat_obj.moveBat(delta);
    }

}


