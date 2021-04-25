import * as PIXI from "pixi.js"
import { getServiceByClass } from "./services/service-injector.module";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'

export class Enemy {

    private health: number = 100;
    private speed: number = 5;

    private app: PIXI.Application;
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private sprite: PIXI.Sprite;

    static EnemyTypes = {
        Enemy1: 'enemy1.gif',
        Enemy2: 'b',
        Enemy3: 'c'
    }

    constructor(enemyType: string) {
        this.init(enemyType);
    }

    private init(enemyType: string) {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.app = this.pixiManager.getApp();
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture(enemyType));
        this.sprite.scale.set(1, 1);
        this.app.stage.addChild(this.sprite);
    }

    attack() {

    }

    die() {

    }

    explode() {

    }


}