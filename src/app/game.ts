import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { TextureManager } from './services/texture-manager/texture-manager.service'
import { SoundManager } from "./services/sound-manager/sound-manager.service";
import { KeyManager } from "./services/keyboard-manager/key-manager.service";
import { Enemy } from "./enemy";
import { TitleScreen } from "./title";
import { Player } from "./player";


export class Game {

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
    private enemy: Enemy;

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

        //Create the game loop.
        this.app.ticker.add(delta => this.gameLoop(delta));

        
    }

    titleHidden(){
        console.log("title hidden");
        this.player = new Player();
        this.enemy = new Enemy(Enemy.EnemyTypes.Enemy1);
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
        let keyList = this.keyboardManager.getKeyList();

        // WASD
        if (keyList.includes(KeyManager.KEYS.W)) {
            //console.log("W Pressed")
            this.player.moveUp();
        }
        if (keyList.includes(KeyManager.KEYS.A)) {
            //console.log("A Pressed")
            this.player.moveLeft();
        }
        if (keyList.includes(KeyManager.KEYS.S)) {
            //console.log("S Pressed")
            this.player.moveDown();
        }
        if (keyList.includes(KeyManager.KEYS.D)) {
            //console.log("D Pressed")
            this.player.moveRight();
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

        // Update functions
       if(this.player){
        this.player.update(delta);
       } 
    
       if(this.enemy){
           this.enemy.update(delta);
       }
    }
}