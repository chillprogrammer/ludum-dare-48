import * as PIXI from "pixi.js"
import { getServiceByClass } from "./services/service-injector.module";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'

export class SplashScreen {
    private app: PIXI.Application;
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private sprite: PIXI.Sprite;

    constructor() {
        this.init();
    }

    private init() {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.app = this.pixiManager.getApp();
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture("splashscreen.png"));
        this.sprite.scale.set(1, 1);
        this.app.stage.addChild(this.sprite);
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
        this.sprite = null;
        this.textureManager.removeTextureFromMemory("splashscreen.png");
    }
}