import { Physics, Scene, Input, Types } from "phaser";
import { ASSETS_KEYS } from "./assets";

export class Bat {

    static readonly JUMP_FORCE: number = -2590;
    private can_use_input: boolean;
    
    private current_scene: Scene;
    private body: Physics.Arcade.Body;
    public sprite_physics: Physics.Arcade.Sprite;
    private cursors : Types.Input.Keyboard.CursorKeys;

    
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


        if (this.sprite_physics.body != null)
            this.body = this.sprite_physics.body as Physics.Arcade.Body;

        if (scene.input.keyboard != null){
            this.cursors = scene.input.keyboard.createCursorKeys();
        }  

        this.sprite_physics.debugShowVelocity = false; 
        
    }

    public moveBat(delta: number): void {

        if (!this.can_use_input) return;

        const key_code = Input.Keyboard.JustDown(this.cursors.space);

        if (key_code){
            this.sprite_physics.play(ASSETS_KEYS.BAT_IDLE);
            this.sprite_physics.setVelocityY(Bat.JUMP_FORCE * (1/delta)); 
        }
            
            
    }
    


    public fallAnim(){
        
        if (this.sprite_physics.anims.currentFrame == null) return;


        if (this.body.velocity.y >= 0 && this.sprite_physics.anims.currentFrame.index != 1) {
            this.sprite_physics.setFrame(0);
            this.sprite_physics.stop();
        }
    }

}