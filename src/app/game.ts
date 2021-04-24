import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'
import { SoundManager } from "./services/sound-manager/sound-manager.service";

export class Game {

    private app: PIXI.Application;
    private textureManager: TextureManager;
    private pixiManager: PixiManager;
    private soundManager: SoundManager;

    constructor() {
        this.textureManager = getServiceByClass(TextureManager);
        this.pixiManager = getServiceByClass(PixiManager);
        this.soundManager = getServiceByClass(SoundManager);

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

        let sound = this.soundManager.getSound("Ludemdare_More_Bass_v2_Electric_Boogaloo.mp3");
        //sound.loop(true)
        //sound.play();
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
        //console.log(delta)
    }
}