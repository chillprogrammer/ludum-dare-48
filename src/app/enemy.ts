import * as PIXI from "pixi.js"
import { getServiceByClass } from "./services/service-injector.module";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'

export class Enemy {

    public shouldDestroy: boolean = false;

    private health: number = 100;
    private speed: number = 5;
    private MAX_VELOCITY: number = 10;
    private SLOWDOWN_RATE: number = 0.5;

    private app: PIXI.Application;
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private sprite: PIXI.Sprite;
    public velocity: PIXI.Point;
    public randVelocityVal: number;

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

        // Randomize velocity 
        this.randVelocityVal = (Math.ceil((Math.random() * 4)) + 2) * (Math.round(Math.random()) ? 1 : -1);
        this.velocity = new PIXI.Point(this.randVelocityVal, 0);

        this.app = this.pixiManager.getApp();
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture(enemyType));
        this.sprite.scale.set(1, 1);

        // Make sure negative velocity sprite starts from right
        if (this.randVelocityVal < 0) {
            this.sprite.x = PixiManager.INITIAL_WIDTH + this.sprite.width;
        }
        this.app.stage.addChild(this.sprite);
        //console.log("velocity " + this.randVelocityVal);
    }

    attack() {
        this.velocity.x += this.speed;
    }

    remove() {
        this.app.stage.removeChild(this.sprite);
    }

    explode() {

    }

    update(delta: number) {

        if (this.sprite.position.x < -this.sprite.width) {
            this.shouldDestroy = true;
        }
        if (this.sprite.position.x > PixiManager.INITIAL_WIDTH + this.sprite.width * 2) {
            this.shouldDestroy = true;
        }
        if (this.sprite.position.y < -this.sprite.height) {
            this.shouldDestroy = true;
        }
        if (this.sprite.position.y > PixiManager.INITIAL_HEIGHT - this.sprite.width) {
            this.shouldDestroy = true;
        }


        // Update the players position based on the current velocity.
        let xPos = this.sprite.position.x;
        let yPos = this.sprite.position.y;
        this.sprite.position.set(xPos + this.velocity.x * delta, yPos + this.velocity.y * delta);
    }

}