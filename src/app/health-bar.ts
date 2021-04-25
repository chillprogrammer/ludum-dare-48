import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'

export class HealthBar {

    private app: PIXI.Application;
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private sprite: PIXI.Sprite;
    private text: PIXI.Text;
    public tic: number;

    constructor() {
        this.init();
    }

    private init() {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.app = this.pixiManager.getApp();
        this.text = new PIXI.Text("Oxygen Tank", { fontSize: 34, fill: 0xffffff, align: 'center' });
        this.text.style.dropShadow = true;
        this.text.style.dropShadowDistance = 4;
        this.text.style.dropShadowColor = '0x222222';
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture("bar.png"));
        this.sprite.tint = 0x00FF00;
        this.text.x = 650;
        this.text.y = 5;
        this.sprite.x = 650;
        this.sprite.y = 47;
        this.sprite.scale.set(0.3, 0.3);
        this.app.stage.addChild(this.text);
        this.app.stage.addChild(this.sprite);
        this.sprite.width = 300;
    }

    setHealth(health: number) {
        this.sprite.width = health * 3;
        if (health > 50) {
            this.sprite.tint = 0x00FF00;
        } else if (health > 25) {
            this.sprite.tint = 0xEED202;
        }
        else if (health > 0) {
            this.sprite.tint = 0xFF0000;
        }
        if (health <= 0) {
            this.sprite.width = 300;
            this.sprite.tint = 0x000000;
        }
    }


}