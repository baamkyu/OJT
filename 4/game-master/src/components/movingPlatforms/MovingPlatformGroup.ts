import MovingPlatform from './MovingPlatform';

export default class MovingPlatformGroup extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, configs: Phaser.Types.Tilemaps.TiledObject[]) {
        super(scene);
        configs.forEach(config => {
            this.add(new MovingPlatform(scene, config));
        });
    }
}
