import * as PIXI from "pixi.js"
import { Sprite } from "pixi.js";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { getServiceByClass } from "./services/service-injector.module";

export class FxManager {

    private bubbleList: {
        graphic: PIXI.Graphics,
        floatSpeed: number;
    }[] = [];

    private pixiManager: PixiManager = getServiceByClass(PixiManager);

    constructor() {
        this.init();
    }

    init() {

    }

    spawnBubble() {
        let radius = Math.ceil(Math.random() * 8 + 2);
        let xPos = Math.ceil(Math.random() * PixiManager.INITIAL_WIDTH);

        const gr = new PIXI.Graphics();
        gr.beginFill(0xccccff, 0.4);
        gr.drawCircle(xPos, PixiManager.INITIAL_HEIGHT + radius, radius);
        gr.endFill();
        this.pixiManager.getApp().stage.addChild(gr);

        let floatSpeed = Math.ceil(Math.random() * 3 + 1);
        this.bubbleList.push({
            graphic: gr,
            floatSpeed: floatSpeed
        });
    }

    update(delta: number) {
        for (let i = 0; i < this.bubbleList.length; ++i) {
            let bubble = this.bubbleList[i];
            if (!bubble) {
                this.bubbleList.splice(i, 1);
            }
            else {
                bubble.graphic.position.y -= bubble.floatSpeed * delta;

                // Cleanup bubble if off screen
                if (bubble.graphic.position.y < -PixiManager.INITIAL_HEIGHT) {
                    this.pixiManager.getApp().stage.removeChild(bubble.graphic);
                    this.bubbleList.splice(i, 1);
                    bubble.graphic.clear();
                    bubble.graphic.destroy();
                    bubble.graphic = null;
                }
            }
        }
    }
}