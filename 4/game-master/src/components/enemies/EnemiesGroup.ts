import BeeEnemy from './BeeEnemy';

import Enemy from './Enemy';
import GroundEnemy from './GroundEnemy';

export default class EnemiesGroup extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, enemies: Phaser.Types.Tilemaps.TiledObject[]) {
        super(scene);
        const enemyArray = enemies.map(config => {
            switch (config.name) {
                case 'worm':
                case 'worm2':
                    return new GroundEnemy(scene, config);
                case 'bee':
                    return new BeeEnemy(scene, config);
                default:
                    return new GroundEnemy(scene, config);
            }
        });

        this.addMultiple(enemyArray);
    }
    update(): void {
        this.children.each(enemy => {
            (enemy as Enemy).update();
        });
    }
}
