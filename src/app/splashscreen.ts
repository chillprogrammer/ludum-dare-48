import * as PIXI from "pixi.js"
import { getServiceByClass } from "./services/service-injector.module";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'
import { SoundManager } from "./services/sound-manager/sound-manager.service";

export class SplashScreen {
    private app: PIXI.Application;
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private soundManager: SoundManager;
    private sprite: PIXI.Sprite;

    constructor() {
        this.init();
    }

    private init() {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.soundManager = getServiceByClass(SoundManager);
        this.app = this.pixiManager.getApp();
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture("splashscreen.png"));
        this.sprite.scale.set(1, 1);
        this.app.stage.addChild(this.sprite);

        this.initializeResources();
    }

    display(DISPLAY_TIME: number): Promise<any> {
        return new Promise((resolve) => {

            // Splash screen is hidden, resolve the promise.
            setTimeout(() => {
                this.cleanUp();
                resolve(1);
            }, DISPLAY_TIME)
        })
    }

    cleanUp() {
        this.app.stage.removeChild(this.sprite);
        this.sprite.destroy();
        this.sprite = null;
        this.textureManager.removeTextureFromMemory("splashscreen.png");
    }


    /**
     * This function loads any resources into memory.
     */
    initializeResources() {
        this.loadTextures();
        this.loadSounds();
    }

    /**
     * This function loads any textures into memory.
     */
    loadTextures() {

        let enemyTypes: any = {
            Enemy1: 'enemy1.png',
            Enemy2: 'enemy2.png',
            Enemy3: 'enemy3.png',
            Enemy4: 'enemy4.png',
            Enemy5: 'enemy5.png',
        }
        for (let key in enemyTypes) {
            this.textureManager.getTexture(enemyTypes[key])
        }
        this.textureManager.loadTextureIntoMemory('game-over.png');
        this.textureManager.loadTextureIntoMemory('bar.png');
        this.textureManager.loadTextureIntoMemory('player/pixil-frame-0.png');
        this.textureManager.loadTextureIntoMemory("newGame.png");
        this.textureManager.loadTextureIntoMemory("newGameOver.png");
        this.textureManager.loadTextureIntoMemory("title.png");
    }

    /**
    * This function loads any sounds into memory.
    */
    loadSounds() {
        this.soundManager.loadSoundIntoMemory("Ludemdare_More_Bass_v2_Electric_Boogaloo.mp3");
        this.soundManager.loadSoundIntoMemory('air.wav');
        this.soundManager.loadSoundIntoMemory('air2.wav');
        this.soundManager.loadSoundIntoMemory('air3.wav');
    }

}