import { Enemy } from "./enemy";
import { PixiManager } from "./services/pixi-manager/pixi-manager.service";
import { getServiceByClass } from "./services/service-injector.module";

export class EnemyManager {

    private enemyList: Enemy[] = []
    private pixiManager: PixiManager = getServiceByClass(PixiManager);

    constructor() {

    }

    spawnEnemy() {
        let enemy = new Enemy(Enemy.EnemyTypes.Enemy1);
        this.enemyList.push(enemy);
    }

    update(delta: number) {
        for (let i = 0; i < this.enemyList.length; ++i) {
            let enemy = this.enemyList[i];
            if (!enemy) {
                this.enemyList.splice(i, 1);
            }
            else {
                enemy.update(delta);

                if(enemy.shouldDestroy) {
                    enemy.remove();
                    this.spawnEnemy();
                    this.enemyList.splice(i, 1);
                    enemy = null;
                }
            }
        }
    }
}