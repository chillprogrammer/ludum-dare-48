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

    constructor(){
        this.init();
    }

    private init(){
        this.pixiManager = getServiceByClass(PixiManager);
        this.textureManager = getServiceByClass(TextureManager);
        this.app = this.pixiManager.getApp();
        this.text = new PIXI.Text("Health Bar");
        this.sprite = new PIXI.Sprite(this.textureManager.getTexture("bar.png"));
        this.text.x = 650;
        this.text.y = 13;
        this.sprite.x = 650;
        this.sprite.y = 43; 
        this.sprite.scale.set(0.3,0.3);
        this.app.stage.addChild(this.text);
        this.app.stage.addChild(this.sprite);
        this.sprite.width = 300;
}   

    setHealth(health: number){
        this.sprite.width = health*3; 
    }


}