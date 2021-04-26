import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'
import { SoundManager } from "./services/sound-manager/sound-manager.service";
import { KeyManager } from "./services/keyboard-manager/key-manager.service";
import { TitleScreen } from "./title";
import { Player } from "./player";
import { EnemyManager } from "./enemy-manager";
import { FxManager } from "./fx-manager";
import { HealthBar } from "./health-bar";
import { Sprite } from "pixi.js";

export class Game {

    // Display Mode
    private DisplayModes = {
        Title: 0,
        Game: 1,
        Defeat: 2
    }
    private displayMode = this.DisplayModes.Title;

    // Pixi
    private app: PIXI.Application;

    // Services
    private textureManager: TextureManager;
    private pixiManager: PixiManager;
    private soundManager: SoundManager;
    private keyboardManager: KeyManager;


    // Objects
    private titleScreen: TitleScreen;
    private healthBar: HealthBar;
    private player: Player;
    private enemyManager: EnemyManager;
    private fxManager: FxManager;
    private depthCounter: PIXI.Text;
    private gameOverSprite: Sprite
    private returnToTitleButton: PIXI.Text;

    // Useful variables
    private secondsCounter: number = 0;
    private depth: number = 0;

    constructor() {
        this.textureManager = getServiceByClass(TextureManager);
        this.pixiManager = getServiceByClass(PixiManager);
        this.soundManager = getServiceByClass(SoundManager);
        this.keyboardManager = getServiceByClass(KeyManager);

        this.init();
    }

    /**
     * The initial function that runs for the Game object.
     * Called from the App loader class.
     */
    init() {
        this.app = this.pixiManager.getApp();

        // Show title screen 
        this.titleScreen = new TitleScreen();
        this.titleScreen.showTitleScreen();
        document.addEventListener('titleHidden', this.titleHidden.bind(this));

        // Play sound
        let sound = this.soundManager.getSound("Ludemdare_More_Bass_v2_Electric_Boogaloo.mp3");
        sound.loop(true);
        sound.play();

        //Create the game loop.
        this.app.ticker.add(delta => this.gameLoop(delta));
        this.app.stage.sortableChildren = true;
    }

    titleHidden() {

        this.depth = 0;

        // Show health bar 
        this.healthBar = new HealthBar();

        // Show player
        this.player = new Player();
        this.enemyManager = new EnemyManager();
        this.fxManager = new FxManager();
        if (this.depthCounter) {
            this.app.stage.removeChild(this.depthCounter);
            this.depthCounter.destroy();
        }
        this.depthCounter = new PIXI.Text('Depth: 0 meters', { fontSize: 34, fill: 0xffffff, align: 'center' });
        this.depthCounter.zIndex = 10;
        this.depthCounter.style.dropShadow = true;
        this.depthCounter.style.dropShadowDistance = 4;
        this.depthCounter.style.dropShadowColor = '0x222222';
        this.depthCounter.x = 5;
        this.depthCounter.y = 5;

        this.displayMode = this.DisplayModes.Game;
        this.app.stage.removeChild(this.depthCounter);
        this.app.stage.addChild(this.depthCounter);
    }

    gameOver() {
        this.displayMode = this.DisplayModes.Defeat;
        this.gameOverSprite = new Sprite(this.textureManager.getTexture('game-over.png'));
        this.gameOverSprite.zIndex = 0;
        this.app.stage.addChild(this.gameOverSprite);
        this.returnToTitleButton = new PIXI.Text('Return To Menu', { fontSize: 48, fill: 0xffffff, align: 'center' });
        this.returnToTitleButton.zIndex = 10;
        this.returnToTitleButton.style.dropShadow = true;
        this.returnToTitleButton.style.dropShadowDistance = 4;
        this.returnToTitleButton.style.dropShadowColor = '0x222222';
        this.returnToTitleButton.x = PixiManager.INITIAL_WIDTH / 2 - this.returnToTitleButton.width / 2;
        this.returnToTitleButton.y = PixiManager.INITIAL_HEIGHT - 80;
        this.returnToTitleButton.interactive = true;
        (<any>this.returnToTitleButton).on('click', this.returnToMenuScreen.bind(this));
        (<any>this.returnToTitleButton).on('mouseover', this.changeTint.bind(this));
        (<any>this.returnToTitleButton).on('mouseout', this.changeTintBack.bind(this));
        this.app.stage.addChild(this.returnToTitleButton);

        this.enemyManager.cleanUp();
        this.enemyManager = null;

    }
    changeTint = (event: MouseEvent) => {
        this.returnToTitleButton.tint = 0x000000
    }


    changeTintBack = (event: MouseEvent) => {
        this.returnToTitleButton.tint = 0xffffff
    }

    returnToMenuScreen() {
        this.healthBar.cleanUp();
        this.healthBar = null;

        this.player.cleanUp();
        this.player = null;

        this.fxManager.cleanUp();
        this.fxManager = null;

        this.app.stage.removeChild(this.gameOverSprite);
        this.app.stage.removeChild(this.returnToTitleButton);

        this.displayMode = this.DisplayModes.Title;
        this.titleScreen.showTitleScreen();
    }

    /**
     * The main game loop - with delta time parameter.
     * @param delta the delta time between each frame
     */
    gameLoop(delta: number) {

        if (this.displayMode === this.DisplayModes.Title) {
            if (this.titleScreen) {
                this.titleScreen.update(delta);
            }
        }
        if (this.displayMode === this.DisplayModes.Game) {

            // Depth Counter
            this.secondsCounter += (1 / 60) * delta;
            if (this.secondsCounter >= 0.33) {
                this.depth++;
                this.depthCounter.text = `Depth: ${this.depth} meters`;
                if (this.depth % 1 === 0) {
                    this.fxManager.spawnBubble();
                }
                if (this.depth % 10 === 0) {
                    this.enemyManager.spawnEnemy();
                }
                this.secondsCounter = 0;
            }

            // Key List
            let keyList = this.keyboardManager.getKeyList();

            // WASD
            if (keyList.includes(KeyManager.KEYS.W)) {
                if (this.player) {
                    this.player.moveUp();
                }
            }
            if (keyList.includes(KeyManager.KEYS.A)) {
                if (this.player) {
                    this.player.moveLeft();
                }
            }
            if (keyList.includes(KeyManager.KEYS.S)) {
                if (this.player) {
                    this.player.moveDown();
                }
            }
            if (keyList.includes(KeyManager.KEYS.D)) {
                if (this.player) {
                    this.player.moveRight();
                }
            }

            // Arrow Keys
            if (keyList.includes(KeyManager.KEYS.ARROW_UP)) {
                //console.log("ARROW_UP Pressed")
            }
            if (keyList.includes(KeyManager.KEYS.ARROW_DOWN)) {
                //console.log("ARROW_DOWN Pressed")
            }
            if (keyList.includes(KeyManager.KEYS.ARROW_LEFT)) {
                //console.log("ARROW_LEFT Pressed")
            }
            if (keyList.includes(KeyManager.KEYS.ARROW_RIGHT)) {
                //console.log("ARROW_RIGHT Pressed")
            }

            // Space Bar
            if (keyList.includes(KeyManager.KEYS.SPACE)) {
                //console.log("Space Bar Pressed")
                //this.healthBar.loseLife();
            }

            // Collision Detection
            let enemyList = this.enemyManager.getEnemyList();
            for (let i = 0; i < enemyList.length; ++i) {
                let enemy = enemyList[i];
                var ab = enemy.sprite.getBounds();
                var bb = this.player.sprite.getBounds();
                let collision: boolean = ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
                if (collision) {
                    this.player.takeDamage(enemy.damage);
                    if (this.player.health <= 0) {
                        this.player.health = 0;
                        this.gameOver();
                    }
                    break;
                }
            }

            // Updating the health bar to players health
            this.healthBar.setHealth(this.player.health);

            if (this.enemyManager) {
                this.enemyManager.update(delta);
            }

            // Update functions
            if (this.player) {
                this.player.update(delta);
            }

            if (this.fxManager) {
                this.fxManager.update(delta);
            }

        }
        else if (this.displayMode === this.DisplayModes.Defeat) {

            if (this.enemyManager) {
                this.enemyManager.update(delta);
            }

            if (this.fxManager) {
                this.fxManager.update(delta);
            }
        }

    }
}