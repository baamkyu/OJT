import Bush from './Bush';

export default class Logs extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, configs: Phaser.Types.Tilemaps.TiledObject[]) {
        super(scene);
        //@ts-ignore
        configs.forEach(config => {
            this.add(new Bush(scene, config));
        });
    }
}
