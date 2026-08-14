import { GameObjects, Scene } from "phaser";

export class Bat {

    private sprite: GameObjects.Sprite;
    private asset_key: string;

    constructor(asset_key: string){
        this.asset_key = asset_key;

    }

    public createBat(scene: Scene): void {
        
        this.sprite = scene.add.sprite(scene.scale.width /2 , scene.scale.height /2, this.asset_key).setOrigin(0.5);
        
        scene.anims.create({
            key: this.asset_key,
            frameRate: 12,
            repeat: -1,
            frames : scene.anims.generateFrameNumbers(this.asset_key)
        })

        scene.anims.play(this.asset_key, this.sprite);
    }

    public moveBat(delta: number): void {
        this.sprite.x += 0.01 * delta;
    }




}