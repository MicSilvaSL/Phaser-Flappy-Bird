
//Object freeze faz com que os objetos sejam imutaveis 
export const ASSETS_KEYS = Object.freeze({
    BACKGROUND: "Background",
    FOREGROUND: "Foreground",
    BAT_IDLE: "Bat_idle",
    BAT_DEATH: "Bat_death",
    GROUND: "ground",
    OBSTACLE_UP: "Obstacle_up",
    OBSTACLE_DOWN: "Obstacle_down",
    UI_BOX: "UI_box",
    UI_RECTANGLE:"UI_Rectangle",
});

export const ASSETS_IMAGES = [
    {
        asset_key: ASSETS_KEYS.BACKGROUND,
        asset_path: "assets/sprites/game objects/Background.png"
    },
    {
        asset_key: ASSETS_KEYS.FOREGROUND,
        asset_path: "assets/sprites/game objects/Foreground.png"
    },
    {
        asset_key: ASSETS_KEYS.OBSTACLE_UP,
        asset_path: "assets/sprites/game objects/Obstacle_Up.png"
    },
    {
        asset_key: ASSETS_KEYS.OBSTACLE_DOWN,
        asset_path: "assets/sprites/game objects/Obstacle_Down.png"
    },
    {
        asset_key: ASSETS_KEYS.GROUND,
        asset_path: "assets/sprites/game objects/Terrain.png"
    },
    {
        asset_key: ASSETS_KEYS.UI_BOX,
        asset_path: "assets/sprites/UI elements/Box.png"
    },
    {
        asset_key: ASSETS_KEYS.UI_RECTANGLE,
        asset_path: "assets/sprites/UI elements/Rectangle.png"
    }
]

export const ASSETS_IMAGES_ATLAS = [
    {
        asset_key: ASSETS_KEYS.BAT_IDLE,
        asset_path: "assets/animations/Fly.png",
        width: 64,
        height: 64,
        frames: 4
    },
    {
        asset_key: ASSETS_KEYS.BAT_DEATH,
        asset_path: "assets/animations/Death.png",
        width: 64,
        height: 64,
        frames: 7
    }
]