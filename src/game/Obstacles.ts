import { Physics, Scene, Geom, GameObjects, Math} from "phaser";
import { ASSETS_KEYS } from "./assets";

export class Obstacles {
    
    static readonly HITBOX_WIDTH: number = 17;
    static readonly HITBOX_HEIGHT: number = 300;
    static readonly HITBOX_BASE_WIDTH: number = 65;
    static readonly HITBOX_BASE_HEIGHT: number = 130;
    static readonly GAP: number = 45;


    private hitbox_up: Geom.Rectangle;
    private hitbox_base_up: Geom.Rectangle;
    private hitbox_down: Geom.Rectangle;
    private hitbox_base_down: Geom.Rectangle;
    
    private sprite_up: GameObjects.Sprite;
    private sprite_down: GameObjects.Sprite;

    private graphic: GameObjects.Graphics;
    private debug_hitbox: boolean;

    private inicial_position_y_up: number;
    private inicial_position_y_down: number;

    

    constructor(scene: Scene)
    {
        let offset_x = 8;
        let offset_y = 10;
        let centerScreenX = scene.scale.width/2;
        let centerScreenY = scene.scale.height/2;

        this.inicial_position_y_up = 0 + Obstacles.GAP;
        this.inicial_position_y_down = scene.scale.height - Obstacles.GAP;
        
        this.sprite_up = scene.add.sprite(
            centerScreenX, 
            this.inicial_position_y_up, 
            ASSETS_KEYS.OBSTACLE_UP);

        this.hitbox_up = new Geom.Rectangle(
            this.sprite_up.x - offset_x/4, 
            this.sprite_up.getCenter().y - Obstacles.HITBOX_HEIGHT/2 - offset_y, 
            Obstacles.HITBOX_WIDTH, 
            Obstacles.HITBOX_HEIGHT);

        this.hitbox_base_up = new Geom.Rectangle(
            this.sprite_up.x - Obstacles.HITBOX_BASE_WIDTH/2 - offset_x,
            this.sprite_up.getCenter().y - Obstacles.HITBOX_HEIGHT/2 - offset_y,
            Obstacles.HITBOX_BASE_WIDTH,
            Obstacles.HITBOX_BASE_HEIGHT
        )
        
        
        this.sprite_down = scene.add.sprite(
            centerScreenX, 
            this.inicial_position_y_down, 
            ASSETS_KEYS.OBSTACLE_DOWN);

        /*
        this.hitbox_down = new Geom.Rectangle(
            this.sprite_down.x - offset_x/4, 
            this.sprite_down.getCenter().y - Obstacles.HITBOX_HEIGHT/2 + offset_y, 
            Obstacles.HITBOX_WIDTH, 
            Obstacles.HITBOX_HEIGHT);

        this.hitbox_base_down = new Geom.Rectangle(
            this.sprite_down.x - Obstacles.HITBOX_BASE_WIDTH/2 - offset_x,
            this.sprite_down.getCenter().y + Obstacles.HITBOX_BASE_HEIGHT/4 - offset_y/2,
            Obstacles.HITBOX_BASE_WIDTH,
            Obstacles.HITBOX_BASE_HEIGHT
        )
        */

        let rect = scene.add.rectangle(
            centerScreenX,
            centerScreenY, 
            Obstacles.HITBOX_WIDTH,  
            Obstacles.HITBOX_HEIGHT,
            0xff0000, 0.3);

        let rect2 = scene.add.rectangle(
            centerScreenX,
            0, 
            Obstacles.HITBOX_WIDTH,  
            Obstacles.HITBOX_HEIGHT,
            0x59cf59, 0.3
        )

        if (Geom.Rectangle.Intersection(rect.geom, rect2.geom).width != 0){
            console.log("eh");
        }
        
        this.graphic = scene.add.graphics({lineStyle: {width: 2 , color: 0x920b20}});

        this.graphic.strokeRectShape(this.hitbox_up);  
        this.graphic.strokeRectShape(this.hitbox_base_up);

        //this.graphic.strokeRectShape(this.hitbox_down);  
        // this.graphic.strokeRectShape(this.hitbox_base_down);
        
        this.graphic.setDepth(2);        

        /*
        scene.time.addEvent({
            delay: 1000,
            callback: this.randHieght,
            callbackScope: this,
            loop: true
        })
        */

    }

      
    public randHieght(): void {
        let rand = Math.RND.realInRange(-50, 50);

    

        this.sprite_up.setPosition(this.sprite_up.x, this.sprite_up.y + rand);
        this.sprite_down.setPosition(this.sprite_down.x, this.sprite_down.y + rand);

        this.hitbox_up.setPosition(this.hitbox_up.x, this.hitbox_up.y + rand);
        this.hitbox_base_up.setPosition(this.hitbox_base_up.x, this.hitbox_base_up.y + rand);
        
        this.hitbox_down.setPosition(this.hitbox_down.x, this.hitbox_down.y + rand);
        this.hitbox_base_down.setPosition(this.hitbox_base_down.x, this.hitbox_base_down.y + rand);
        this.graphic.clear();
        
        this.graphic.strokeRectShape(this.hitbox_up);  
        this.graphic.strokeRectShape(this.hitbox_base_up);

        this.graphic.strokeRectShape(this.hitbox_down);  
        this.graphic.strokeRectShape(this.hitbox_base_down);
        
        this.graphic.setDepth(2);   
    }
    
}