import { Enemy } from "./enemy";

export class EnemyManager {

    private enemyList: Enemy[] = []

    constructor() { }

    spawnEnemy() {
        let enemy = new Enemy(Enemy.EnemyTypes.Enemy1);
        this.enemyList.push(enemy);
    }

    cleanUp() {
        for (let i = 0; i < this.enemyList.length; i++) {
            let enemy = this.enemyList[i];
            if (enemy) {
                enemy.remove();
                enemy = null;
            }
        }
    }

    update(delta: number) {
        for (let i = 0; i < this.enemyList.length; i++) {
            let enemy = this.enemyList[i];
            if (!enemy) {
                this.enemyList.splice(i, 1);
            }
            else {
                enemy.update(delta);

                if (enemy.shouldDestroy) {
                    enemy.remove();
                    this.spawnEnemy();
                    this.enemyList.splice(i, 1);
                    enemy = null;
                }
            }
        }
    }

    getEnemyList() { return this.enemyList }
}