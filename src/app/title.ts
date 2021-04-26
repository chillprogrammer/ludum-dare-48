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
    private titleText: PIXI.Text;
    private titleAngle: number = 0;
    private rotateFlag: number = 1;

    constructor() {
        this.init();
    }

    private init() {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.app = this.pixiManager.getApp();
        this.background = new PIXI.Sprite(this.textureManager.getTexture("title.png"));
        this.background.scale.set(2, 2);
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture("newGame.png"));
        this.sprite.scale.set(2, 2);
        this.sprite.x = 300;
        this.sprite.y = 222;
        this.sprite.interactive = true;
        this.mouseHandlers();

        this.titleText = new PIXI.Text('DiverDeep', { fontSize: 73, fill: 0x88FF88, align: 'center' });
        this.titleText.zIndex = 10;
        this.titleText.style.dropShadow = true;
        this.titleText.style.dropShadowDistance = 4;
        this.titleText.style.dropShadowColor = '0x222222';
        this.titleText.x = PixiManager.INITIAL_WIDTH/2;
        this.titleText.y = 48;
        this.titleText.anchor.x = 0.5
    }

    mouseHandlers() {
        (<any>this.sprite).on('mouseover', this.switchSprite);
        (<any>this.sprite).on('mouseout', this.revertSprite);
        (<any>this.sprite).on('click', this.hideTitleScreen);
    }

    showTitleScreen() {
        this.app.stage.addChild(this.background);
        this.app.stage.addChild(this.sprite);
        this.app.stage.addChild(this.titleText)
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
        this.app.stage.removeChild(this.titleText)
        document.dispatchEvent(new CustomEvent("titleHidden"));
    }

    update(delta: number) {
        const maxRight: number = 5;
        const maxLeft: number = -5;
        const rotateSpeed = 0.2;
        if(this.rotateFlag === 1) {
            this.titleAngle += rotateSpeed*delta;
            this.titleText.angle = this.titleAngle;
        }
        else if(this.rotateFlag === 0) {
            this.titleAngle -= rotateSpeed*delta;
            this.titleText.angle = this.titleAngle;
        }

        if(this.titleAngle > maxRight) {
            this.rotateFlag = 0;
            this.titleAngle = maxRight;
        }
        else if(this.titleAngle < maxLeft) {
            this.rotateFlag = 1;
            this.titleAngle = maxLeft;
        }
    }

}