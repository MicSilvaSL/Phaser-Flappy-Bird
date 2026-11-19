import { Physics, Scene, Input, Types, Geom, GameObjects } from "phaser";
import { ASSETS_KEYS } from "./assets";

export class Bat {

    static readonly JUMP_FORCE: number = -2590;

    private can_use_input: boolean;
    private current_scene: Scene;
    private body: Physics.Arcade.Body;
    private cursors : Types.Input.Keyboard.CursorKeys;
    private hitbox: Geom.Rectangle;
    private graphic: GameObjects.Graphics;

    public sprite_physics: Physics.Arcade.Sprite;

    
    public get use_input() : boolean {
        return this.can_use_input;
    }
    public set use_input(can_use: boolean) {
        this.can_use_input = can_use;
    }

    constructor(scene: Scene){
        this.can_use_input = true;
        this.current_scene = scene;
        this.createBat();
    }

    private createBat(): void {

        const scene = this.current_scene;
        
        
        scene.anims.create({
            key: ASSETS_KEYS.BAT_IDLE,
            frameRate: 15,
            repeat: -1,
            frames : scene.anims.generateFrameNumbers(ASSETS_KEYS.BAT_IDLE)
        })

        this.sprite_physics = scene.physics.add
            .sprite(scene.scale.width/2 , scene.scale.height/2, ASSETS_KEYS.BAT_IDLE, 0)
            .setSize(16,16)
            .setOffset(28,24)
            .setCollideWorldBounds(true)


        this.hitbox = new Geom.Rectangle(this.sprite_physics.getCenter().x, this.sprite_physics.getCenter().y ,16, 16);
        this.graphic = scene.add.graphics();
        this.graphic.setDepth(2);
        
        if (this.sprite_physics.body != null)
            this.body = this.sprite_physics.body as Physics.Arcade.Body;

        if (scene.input.keyboard != null){
            this.cursors = scene.input.keyboard.createCursorKeys();
        }  

        this.sprite_physics.debugShowVelocity = false; 
        
    }

    public moveBat(delta: number): void {
        this.graphic.clear();
        this.graphic.lineStyle(1, 0x00ff00);

        this.hitbox.setPosition(this.sprite_physics.getCenter().x - 4, this.sprite_physics.getCenter().y-   4);

        this.graphic.strokeRectShape(this.hitbox);    

        if (!this.can_use_input) return;

        const key_code = Input.Keyboard.JustDown(this.cursors.space);

        if (key_code){
            this.sprite_physics.play(ASSETS_KEYS.BAT_IDLE);
            this.sprite_physics.setVelocityY(Bat.JUMP_FORCE * (1/delta)); 
        }
            
            
    }

    public getHitbox(): Geom.Rectangle
    {
        return this.hitbox;
    }
    


    public fallAnim(){
        
        if (this.sprite_physics.anims.currentFrame == null) return;


        if (this.body.velocity.y >= 0 && this.sprite_physics.anims.currentFrame.index != 1) {
            this.sprite_physics.setFrame(0);
            this.sprite_physics.stop();
        }
    }

}