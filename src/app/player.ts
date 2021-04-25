import * as PIXI from "pixi.js"
import { Sprite } from "pixi.js";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { getServiceByClass } from "./services/service-injector.module";
import { TextureManager } from "./services/texture-manager/texture-manager.service";

export class Player {

    private health: number = 100;
    private speed: number = 0.8;
    public velocity: PIXI.Point;
    private MAX_VELOCITY: number = 10;
    private SLOWDOWN_RATE: number = 0.5;


    private spritePath: string = 'player/pixil-frame-0.png'
    private sprite: PIXI.Sprite;
    private app: PIXI.Application;

    // Services
    private pixiManager: PixiManager;
    private textureManager: TextureManager;

    constructor() {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);

        this.init();
    }

    init() {
        this.app = this.pixiManager.getApp();
        this.velocity = new PIXI.Point(0, 0);
        this.sprite = new Sprite(this.textureManager.getTexture(this.spritePath));

        this.sprite.interactive = true;
        (<any>this.sprite).on('click', () => {
            console.log("Clicked on sprite");
        });

        this.app.stage.addChild(this.sprite);
    }

    moveUp() {
        this.velocity.y -= this.speed;
    }

    moveDown() {
        this.velocity.y += this.speed;
    }

    moveLeft() {
        this.velocity.x -= this.speed;
    }

    moveRight() {
        this.velocity.x += this.speed;
    }

    update(delta: number) {
        // If velocity is below a certain number, then player is stopped.
        if (Math.abs(this.velocity.x) < this.SLOWDOWN_RATE) {
            this.velocity.x = 0;
        }
        if (Math.abs(this.velocity.y) < this.SLOWDOWN_RATE) {
            this.velocity.y = 0;
        }

        // If velocity is above the MAX velocity, then player is slowed down to the MAX velocity.
        if (this.velocity.x > this.MAX_VELOCITY) {
            this.velocity.x = this.MAX_VELOCITY;
        } else if (this.velocity.x < -this.MAX_VELOCITY) {
            this.velocity.x = -this.MAX_VELOCITY;
        }
        if (this.velocity.y > this.MAX_VELOCITY) {
            this.velocity.y = this.MAX_VELOCITY;
        } else if (this.velocity.y < -this.MAX_VELOCITY) {
            this.velocity.y = -this.MAX_VELOCITY;
        }

        // If velocity is above or below 0, then the player is gradually slowed down to simulate friction.
        if (this.velocity.x > 0) {
            this.velocity.x -= this.SLOWDOWN_RATE;
        } else if (this.velocity.x < 0) {
            this.velocity.x += this.SLOWDOWN_RATE;
        }
        if (this.velocity.y > 0) {
            this.velocity.y -= this.SLOWDOWN_RATE;
        } else if (this.velocity.y < 0) {
            this.velocity.y += this.SLOWDOWN_RATE;
        }

        // Update the players position based on the current velocity.
        let xPos = this.sprite.position.x;
        let yPos = this.sprite.position.y;
        this.sprite.position.set(xPos + this.velocity.x * delta, yPos + this.velocity.y * delta);

        // Making sure the player doesnt leave the border.
        if (this.sprite.position.x > 960 - this.sprite.width ){
            this.sprite.position.x = 960 - this.sprite.width
        }
        if (this.sprite.position.x < 0 ){
            this.sprite.position.x = 0
        }
        if (this.sprite.position.y > 540 - this.sprite.height ){
            this.sprite.position.y = 540 - this.sprite.height
        }
        if (this.sprite.position.y < 0 ){
            this.sprite.position.y = 0
        }


        
    }

}