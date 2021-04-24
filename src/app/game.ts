import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'
import { KeyManager } from "./services/keyboard-manager/key-manager.service";

export class Game {

    private app: PIXI.Application;
    private textureManager: TextureManager;
    private pixiManager: PixiManager;
    private keyboardManager: KeyManager;

    constructor() {
        this.textureManager = getServiceByClass(TextureManager);
        this.pixiManager = getServiceByClass(PixiManager);
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

        //Create the game loop.
        this.app.ticker.add(delta => this.gameLoop(delta));
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
    }

    /**
    * This function loads any sounds into memory.
    */
    loadSounds() {

    }

    /**
     * The main game loop - with delta time parameter.
     * @param delta the delta time between each frame
     */
    gameLoop(delta: number) {
        let keyList = this.keyboardManager.getKeyList();

        // WASD
        if (keyList.includes(KeyManager.KEYS.W)) {
            console.log("W Pressed")
        }
        if (keyList.includes(KeyManager.KEYS.A)) {
            console.log("A Pressed")
        }
        if (keyList.includes(KeyManager.KEYS.S)) {
            console.log("S Pressed")
        }
        if (keyList.includes(KeyManager.KEYS.D)) {
            console.log("D Pressed")
        }

        // Arrow Keys
        if (keyList.includes(KeyManager.KEYS.ARROW_UP)) {
            console.log("ARROW_UP Pressed")
        }
        if (keyList.includes(KeyManager.KEYS.ARROW_DOWN)) {
            console.log("ARROW_DOWN Pressed")
        }
        if (keyList.includes(KeyManager.KEYS.ARROW_LEFT)) {
            console.log("ARROW_LEFT Pressed")
        }
        if (keyList.includes(KeyManager.KEYS.ARROW_RIGHT)) {
            console.log("ARROW_RIGHT Pressed")
        }

        // Space Bar
        if (keyList.includes(KeyManager.KEYS.SPACE)) {
            console.log("Space Bar Pressed")
        }
    }
}