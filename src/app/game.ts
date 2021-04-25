import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'
import { SoundManager } from "./services/sound-manager/sound-manager.service";
import { KeyManager } from "./services/keyboard-manager/key-manager.service";
import { TitleScreen } from "./title";
import { Player } from "./player";
import { EnemyManager } from "./enemy-manager";


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
    private titleScreen: TitleScreen;

    // Objects
    private player: Player;
    private enemyManager: EnemyManager;

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

        this.initializeResources();

        // Show title screen 
        this.titleScreen = new TitleScreen();
        this.titleScreen.showTitleScreen();
        document.addEventListener('titleHidden', this.titleHidden.bind(this));

        let sound = this.soundManager.getSound("Ludemdare_More_Bass_v2_Electric_Boogaloo.mp3");
        sound.loop(true);
        sound.play();

        this.enemyManager = new EnemyManager();

        //Create the game loop.
        this.app.ticker.add(delta => this.gameLoop(delta));
    }

    titleHidden() {
        console.log("title hidden");
        this.player = new Player();
        this.displayMode = this.DisplayModes.Game;
    }

    /**
     * This function loads any resources into memory.
     */
    initializeResources() {
        this.loadTextures();
        this.loadSounds();
    }

    /**
     * This function loads any textures into memory.
     */
    loadTextures() {
        this.textureManager.loadTextureIntoMemory("default.jpg");
        this.textureManager.removeTextureFromMemory("default.jpg");
    }

    /**
    * This function loads any sounds into memory.
    */
    loadSounds() {
        this.soundManager.loadSoundIntoMemory("Ludemdare_More_Bass_v2_Electric_Boogaloo.mp3");
    }

    /**
     * The main game loop - with delta time parameter.
     * @param delta the delta time between each frame
     */
    gameLoop(delta: number) {
        if (this.displayMode === this.DisplayModes.Title) {
            //console.log('Title Screen');
        }
        else if (this.displayMode === this.DisplayModes.Game) {
            let keyList = this.keyboardManager.getKeyList();

            // WASD
            if (keyList.includes(KeyManager.KEYS.W)) {
                //console.log("W Pressed")
                if (this.player) {
                    this.player.moveUp();
                }
            }
            if (keyList.includes(KeyManager.KEYS.A)) {
                //console.log("A Pressed")
                if (this.player) {
                    this.player.moveLeft();
                }
            }
            if (keyList.includes(KeyManager.KEYS.S)) {
                //console.log("S Pressed")
                if (this.player) {
                    this.player.moveDown();
                }
            }
            if (keyList.includes(KeyManager.KEYS.D)) {
                //console.log("D Pressed")
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
            }

            if (this.enemyManager) {
                this.enemyManager.update(delta);
            }

            // Update functions
            if (this.player) {
                this.player.update(delta);
            }
        }
        else if (this.displayMode === this.DisplayModes.Defeat) {
            //console.log('Game Over');
        }
    }
}