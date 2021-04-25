import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'

export class TitleScreen {

    private app: PIXI.Application;
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private background: PIXI.Sprite;
    private sprite: PIXI.Sprite;

    constructor() {
        this.init();
    }

    private init() {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.app = this.pixiManager.getApp();
        this.background = new PIXI.Sprite(this.textureManager.getTexture("title.png"));
        this.background.scale.set(2, 2);
        this.app.stage.addChild(this.background);
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture("newGame.png"));
        this.sprite.scale.set(2, 2);
        this.sprite.x = 300;
        this.sprite.y = 222;
        this.sprite.interactive = true;
        this.mouseHandlers();
    }

    mouseHandlers() {
        (<any>this.sprite).on('mouseover', this.switchSprite);
        (<any>this.sprite).on('mouseout', this.revertSprite);
        (<any>this.sprite).on('click', this.hideTitleScreen);
    }

    showTitleScreen() {
        this.app.stage.addChild(this.sprite);
    }

    switchSprite = (event: MouseEvent) => {
        this.sprite.texture = this.textureManager.getTexture("newGameOver.png");
    }
    revertSprite = (event: MouseEvent) => {
        this.sprite.texture = this.textureManager.getTexture("newGame.png");
    }

    hideTitleScreen = (event: MouseEvent) => {
        this.app.stage.removeChild(this.sprite);
        this.app.stage.removeChild(this.background);
        document.dispatchEvent(new CustomEvent("titleHidden"));
    }


}