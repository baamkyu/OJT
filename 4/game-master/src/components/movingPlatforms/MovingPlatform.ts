type MovingPlatformObjectProperty = {
    name: 'duration' | 'velocity' | 'height';
    value: number;
};
export default class MovingPlatform extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, config: Phaser.Types.Tilemaps.TiledObject) {
        super(scene, config.x ?? 0, config.y ?? 0, config.name);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //@ts-ignore
        this.body.setAllowGravity(false);
        const properties = config.properties as MovingPlatformObjectProperty[];

        const duration = Number(properties.find(el => el.name === 'duration')?.value);
        const velocity = Number(properties.find(el => el.name === 'velocity')?.value);
        this.setImmovable(true).setSize(this.width, 70).setOrigin(0, 1);

        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
        scene.tweens.timeline({
            targets: this.body.velocity,
            tweens: [
                { x: velocity, duration, ease: 'Stepped' },
                { x: -velocity, duration, ease: 'Stepped' }
            ],
            loop: -1
        });
    }
}
