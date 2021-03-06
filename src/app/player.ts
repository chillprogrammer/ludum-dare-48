import * as PIXI from "pixi.js"
import { Sprite } from "pixi.js";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { getServiceByClass } from "./services/service-injector.module";
import { SoundManager } from "./services/sound-manager/sound-manager.service";
import { TextureManager } from "./services/texture-manager/texture-manager.service";

export class Player {

    public health: number = 100;
    private speed: number = 0.8;
    public velocity: PIXI.Point;
    private MAX_VELOCITY: number = 10;
    private SLOWDOWN_RATE: number = 0.5;
    private verticalSpeed: number = 0;
    private jumping: boolean = false;


    private spritePath: string = 'player/pixil-frame-0.png'
    public sprite: PIXI.Sprite;
    private app: PIXI.Application;

    // Services
    private pixiManager: PixiManager;
    private textureManager: TextureManager;
    private soundManager: SoundManager;

    // Useful variables
    private collisionCooldown: number = 0;
    private maxCollisionCooldown: number = 10;

    constructor() {
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.soundManager = getServiceByClass(SoundManager);

        this.init();
    }

    init() {
        this.app = this.pixiManager.getApp();
        this.velocity = new PIXI.Point(0, 0);
        this.sprite = new Sprite(this.textureManager.getTexture(this.spritePath));
        this.sprite.position.x = (PixiManager.INITIAL_WIDTH / 2) - this.sprite.width;
        this.sprite.position.y = (PixiManager.INITIAL_HEIGHT / 3) - this.sprite.height;
        this.sprite.interactive = true;

        this.app.stage.addChild(this.sprite);
    }

    cleanUp() {
        this.app.stage.removeChild(this.sprite);
        this.sprite.destroy();
    }

    moveUp() {
        this.velocity.y -= this.speed;
    }

    jumpUp(delta: number) {
        const player_floor = (PixiManager.INITIAL_HEIGHT / 3) - this.sprite.height;
        if (this.sprite.y >= player_floor) {
            this.sprite.y = player_floor;
            this.verticalSpeed = 0;
            this.jumping = false;
        }

        if (this.jumping) {
            this.verticalSpeed += delta * 1 / 3;
        }

        if (!this.jumping) {
            this.jumping = true;
            this.verticalSpeed = -5;
        }

        this.sprite.y += this.verticalSpeed * delta;
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

    takeDamage(damageAmount: number) {
        if (this.collisionCooldown === this.maxCollisionCooldown) {
            this.collisionCooldown -= 0.01;
            this.health -= damageAmount;

            let soundNum = Math.ceil(Math.random() * 4);
            if (soundNum === 1) {
                let sound = this.soundManager.getSound('air.wav');
                sound.play();
            } else if (soundNum === 2) {
                let sound = this.soundManager.getSound('air2.wav');
                sound.play();
            } else {
                let sound = this.soundManager.getSound('air3.wav');
                sound.play();
            }
        }
    }

    update(delta: number) {
        if (this.collisionCooldown > 0 && this.collisionCooldown < this.maxCollisionCooldown) {
            this.collisionCooldown -= 0.2 * delta;
        } else if (this.collisionCooldown <= 0) {
            this.collisionCooldown = this.maxCollisionCooldown;
        }

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
        if (this.sprite.position.x > PixiManager.INITIAL_WIDTH - this.sprite.width) {
            this.sprite.position.x = PixiManager.INITIAL_WIDTH - this.sprite.width
        }
        if (this.sprite.position.x < 0) {
            this.sprite.position.x = 0
        }
        if (this.sprite.position.y > PixiManager.INITIAL_HEIGHT - this.sprite.height) {
            this.sprite.position.y = PixiManager.INITIAL_HEIGHT - this.sprite.height
        }
        if (this.sprite.position.y < 0) {
            this.sprite.position.y = 0
        }

    }

}