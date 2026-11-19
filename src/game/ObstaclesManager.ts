import { Math, Physics, Scene } from "phaser";
import { Obstacles } from "./Obstacles";
import { Bat } from "./Bat";



export class ObstaclesManger {

    static readonly OBSTACLE_X_GAP: number = 200;

    private current_scene: Scene;
    private obstacles: Obstacles[];
    private canMove: boolean;

    constructor(scene: Scene){
        this.current_scene = scene
        this.canMove = true;
        this.obstacles = [];
        this.addObstacles(ObstaclesManger.OBSTACLE_X_GAP * 0);
        this.addObstacles(ObstaclesManger.OBSTACLE_X_GAP * 1);
        this.addObstacles(ObstaclesManger.OBSTACLE_X_GAP * 2);
        
 

    }
    
    private addObstacles(offset_x: number): void {
        
        let pilar = new Obstacles(this.current_scene, offset_x);
        
        this.obstacles.push(pilar);
    }
    public update(delta: number, bat: Bat): void
    {
        if (!this.canMove || this.obstacles.length <= 0) return;

        this.obstacles.forEach(pilar => { 
            
            pilar.move(delta);

            if (pilar.hasTouched(bat.getHitbox())) {
                this.canMove = false
                return;
            }
        });

        
            if (this.obstacles[0].isOutBounds()) {
                
                let pilarOutBounds = this.obstacles.shift();
                let lastPilar = this.obstacles.length - 1;

                if (pilarOutBounds != null){
                    
                    pilarOutBounds.setXPos(this.obstacles[lastPilar].getXPos() + ObstaclesManger.OBSTACLE_X_GAP);
                    pilarOutBounds.setRandY();

                    this.obstacles.push(pilarOutBounds);
                }

            }

    }
    
}