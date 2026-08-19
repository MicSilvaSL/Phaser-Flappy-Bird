import { Math, Physics, Scene } from "phaser";
import { ASSETS_KEYS } from "./assets";
import { Bat } from "./Bat";


interface Pilar {
    sprite_up: Physics.Arcade.Sprite;
    sprite_down: Physics.Arcade.Sprite;
}

export class Obstacles {

    static readonly OBSTACLE_Y_GAP: number = 45;
    static readonly OBSTACLE_X_MIN_DISTANCE: number = 150;

    private obstacles_list: Pilar[] = [];
    private current_scene: Scene;

    constructor(scene: Scene, player: Bat){
        this.current_scene = scene
        
        for (let i = 0; i < 3; i++) {
            
            let pilar_up = scene.physics.add
            .staticSprite(scene.scale.width/2 + i * Obstacles.OBSTACLE_X_MIN_DISTANCE, Obstacles.OBSTACLE_Y_GAP, ASSETS_KEYS.OBSTACLE_UP)
            .setSize(30, 320 - 20)
            .setScale(-1,1)
            .setOffset(320/2 - 20, 0) 
            .setOrigin(0.5);
        
            let pilar_down = scene.physics.add
            .staticSprite(scene.scale.width/2 + i * Obstacles.OBSTACLE_X_MIN_DISTANCE, scene.scale.height - Obstacles.OBSTACLE_Y_GAP, ASSETS_KEYS.OBSTACLE_DOWN)
            .setSize(30, 300)
            .setScale(-1,1) 
            .setOffset(320/2 - 20, 20) 
            .setOrigin(0.5); 

            this.obstacles_list.push({sprite_up: pilar_up, sprite_down: pilar_down});
            
        }

        
    }
    
}