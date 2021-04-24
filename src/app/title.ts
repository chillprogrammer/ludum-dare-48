import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'

export class TitleScreen {

    private app: PIXI.Application;
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private sprite: PIXI.Sprite;

    constructor() {
        this.init();
    }

    private init(){
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.app = this.pixiManager.getApp();
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture("title.png"));
        this.sprite.scale.set(1,1);
    }

    
    showTitleScreen(){
        this.app.stage.addChild(this.sprite);
    }

    hideTitleScreen(){
        this.app.stage.removeChild(this.sprite);
    }
}