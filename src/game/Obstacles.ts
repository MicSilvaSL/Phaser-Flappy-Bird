import { Scene, Geom, GameObjects, Math} from "phaser";
import { ASSETS_KEYS } from "./assets";

export class Obstacles {
    
    static readonly HITBOX_WIDTH: number = 17;
    static readonly HITBOX_HEIGHT: number = 305;
    static readonly HITBOX_BASE_WIDTH: number = 70;
    static readonly HITBOX_BASE_HEIGHT: number = 130;
    static readonly GAP: number = 45;
    static readonly SPEED: number = -0.034;

    static readonly OFFSET_X = 15;
    static readonly OFFSET_X_BASE = 30;


    private hitbox_up: Geom.Rectangle;
    private hitbox_base_up: Geom.Rectangle;
    private hitbox_down: Geom.Rectangle;
    private hitbox_base_down: Geom.Rectangle;
    
    private sprite_up: GameObjects.Sprite;
    private sprite_down: GameObjects.Sprite;

    private debug_hitbox: boolean;
    private graphic: GameObjects.Graphics;

    private inicial_position_y_up: number;
    private inicial_position_y_down: number;
    private inicial_position_x: number;
    
    private inicial_position_offset_x: number;

    constructor(scene: Scene, inicialXOffset: number)
    {

        this.inicial_position_x = scene.scale.width + 40;
        this.inicial_position_y_up = 0 + Obstacles.GAP;
        this.inicial_position_y_down = scene.scale.height - Obstacles.GAP;

        this.graphic = scene.add.graphics();
        
        this.sprite_up = scene.add.sprite(
            this.inicial_position_x + inicialXOffset, 
            this.inicial_position_y_up, 
            ASSETS_KEYS.OBSTACLE
        );
        
        
        this.hitbox_up = new Geom.Rectangle(
            this.sprite_up.getCenter().x + Obstacles.OFFSET_X + inicialXOffset, 
            this.sprite_up.getTopCenter().y, 
            Obstacles.HITBOX_WIDTH, 
            Obstacles.HITBOX_HEIGHT,
        );

        this.hitbox_base_up = new Geom.Rectangle(
            this.sprite_up.getBottomLeft().x + Obstacles.OFFSET_X_BASE + inicialXOffset,
            this.sprite_up.getTopCenter().y,
            Obstacles.HITBOX_BASE_WIDTH,
            Obstacles.HITBOX_BASE_HEIGHT
        );
        
        
        this.sprite_down = scene.add.sprite(
            this.inicial_position_x + inicialXOffset, 
            this.inicial_position_y_down, 
            ASSETS_KEYS.OBSTACLE
        )
        .setFlipY(true);

        
        this.hitbox_down = new Geom.Rectangle(
            this.sprite_down.getCenter().x + Obstacles.OFFSET_X + inicialXOffset, 
            this.sprite_down.getTopLeft().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_HEIGHT), 
            Obstacles.HITBOX_WIDTH, 
            Obstacles.HITBOX_HEIGHT
        );

        this.hitbox_base_down = new Geom.Rectangle(
            this.sprite_down.getCenter().x - Obstacles.OFFSET_X_BASE + inicialXOffset,
            this.sprite_down.getTopCenter().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_BASE_HEIGHT),
            Obstacles.HITBOX_BASE_WIDTH,
            Obstacles.HITBOX_BASE_HEIGHT
        );

        this.graphic.lineStyle(1, 0xff0000);
        this.graphic.setDepth(2);

        this.setRandY();

    }

    public setRandY(): void {
        let rand = Math.Between(110, -110);
        this.sprite_down.setY(this.inicial_position_y_down + rand);
        this.sprite_up.setY(this.inicial_position_y_up + rand);
        
        this.hitbox_up.setPosition(
            this.sprite_up.getCenter().x + Obstacles.OFFSET_X, 
            this.sprite_up.getTopLeft().y
        );
        this.hitbox_base_up.setPosition(
            this.sprite_up.getBottomLeft().x + Obstacles.OFFSET_X_BASE,
            this.sprite_up.getTopCenter().y
        );

        this.hitbox_down.setPosition(
            this.sprite_down.getCenter().x + Obstacles.OFFSET_X, 
            this.sprite_down.getTopLeft().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_HEIGHT)
        );
        this.hitbox_base_down.setPosition(
            this.sprite_down.getCenter().x - Obstacles.OFFSET_X_BASE,
            this.sprite_down.getTopCenter().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_BASE_HEIGHT)
        )

    }

      
    public move(delta: number): void {
        
        this.graphic.clear();
        this.graphic.lineStyle(1, 0xff0000);
        this.graphic.strokeRectShape(this.hitbox_up);
        this.graphic.strokeRectShape(this.hitbox_base_up);
        this.graphic.strokeRectShape(this.hitbox_down);
        this.graphic.strokeRectShape(this.hitbox_base_down);
        
        
        this.sprite_up.setPosition(this.sprite_up.x + Obstacles.SPEED * delta, this.sprite_up.y);
        this.sprite_down.setPosition(this.sprite_down.x + Obstacles.SPEED * delta, this.sprite_down.y);

        this.hitbox_down.setPosition(this.hitbox_down.x + Obstacles.SPEED * delta, this.hitbox_down.y);
        this.hitbox_up.setPosition(this.hitbox_up.x + Obstacles.SPEED * delta, this.hitbox_up.y);

        this.hitbox_base_down.setPosition(this.hitbox_base_down.x + Obstacles.SPEED * delta, this.hitbox_base_down.y);
        this.hitbox_base_up.setPosition(this.hitbox_base_up.x + Obstacles.SPEED * delta, this.hitbox_base_up.y);
        

    }

    public hasTouched(hitbox: Geom.Rectangle): boolean{
        
        if (!Geom.Rectangle.Intersection(this.hitbox_up, hitbox).isEmpty())
            return true;
        else if (!Geom.Rectangle.Intersection(this.hitbox_down, hitbox).isEmpty())
            return true;
        else if (!Geom.Rectangle.Intersection(this.hitbox_base_up, hitbox).isEmpty())
            return true;
        else if (!Geom.Rectangle.Intersection(this.hitbox_base_down, hitbox).isEmpty())
            return true;
        else
            return false;
    }

    public isOutBounds(): boolean {

        if (this.sprite_up.x + this.sprite_down.getBounds().width/2 - 1 < 0 )
            return true;

        return false;
    }

    public resetXPosition(): void {
        
        this.sprite_up.setX(this.inicial_position_x);
        this.sprite_down.setX(this.inicial_position_x);

        this.hitbox_up.setPosition(
            this.sprite_up.getCenter().x + Obstacles.OFFSET_X, 
            this.sprite_up.getTopLeft().y
        );
        
        this.hitbox_base_up.setPosition(
            this.sprite_up.getBottomLeft().x + Obstacles.OFFSET_X_BASE, 
            this.sprite_up.getTopCenter().y
        );

        this.hitbox_down.setPosition(
            this.sprite_down.getCenter().x + Obstacles.OFFSET_X, 
            this.sprite_down.getTopLeft().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_HEIGHT)
        );
        
        this.hitbox_base_down.setPosition(
            this.sprite_down.getCenter().x  + Obstacles.OFFSET_X_BASE, 
            this.sprite_down.getTopCenter().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_BASE_HEIGHT)
        );
    }

    public setXPos(x: number):void {
        this.sprite_up.setX(x);
        this.sprite_down.setX(x);

        this.hitbox_up.setPosition(
            this.sprite_up.getCenter().x + Obstacles.OFFSET_X, 
            this.sprite_up.getTopLeft().y
        );
        
        this.hitbox_base_up.setPosition(
            this.sprite_up.getBottomLeft().x + Obstacles.OFFSET_X_BASE, 
            this.sprite_up.getTopCenter().y
        );

        this.hitbox_down.setPosition(
            this.sprite_down.getCenter().x + Obstacles.OFFSET_X, 
            this.sprite_down.getTopLeft().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_HEIGHT)
        );
        
        this.hitbox_base_down.setPosition(
            this.sprite_down.getCenter().x  + Obstacles.OFFSET_X_BASE, 
            this.sprite_down.getTopCenter().y + (this.sprite_down.getBounds().height - Obstacles.HITBOX_BASE_HEIGHT)
        );
    }

    public getXPos(): number{
        return this.sprite_down.x;
    }
    
}