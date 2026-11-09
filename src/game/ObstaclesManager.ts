import { Math, Physics, Scene } from "phaser";
import { Obstacles } from "./Obstacles";



export class ObstaclesManger {

    static readonly OBSTACLE_Y_GAP: number = 45;
    static readonly OBSTACLE_X_MIN_DISTANCE: number = 150;

    private current_scene: Scene;
    private obstacles: Obstacles;

    constructor(scene: Scene){
        this.current_scene = scene
        this.obstacles = new Obstacles(scene);
    }
    
    public moveObstacles(delta: number): void
    {
        

    }
    
}