export default class Bush extends Phaser.GameObjects.Rectangle {
    meet = false;
    problemType: number;
    bush: Phaser.GameObjects.Image;
    bushQ: Phaser.GameObjects.Sprite;
    constructor(scene: Phaser.Scene, config: Phaser.Types.Tilemaps.TiledObject) {
        const x = config.x ?? 0;
        const y = config.y ?? 0;
        super(scene, x, y, 256, config.properties[0].value);
        this.setOrigin(0, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //@ts-ignore
        this.body.setAllowGravity(false);
        //@ts-ignore
        this.body.setImmovable(true);
        this.problemType = config.properties[1].value;

        this.bush = scene.add.image(x, y, 'bush').setOrigin(0, 1);
        const topCenter = this.bush.getTopCenter();
        this.bushQ = scene.add.sprite(topCenter.x, topCenter.y + 30, 'bush-q').setOrigin(0.5, 1);
        scene.anims.create({
            key: 'q-anim',
            frames: scene.anims.generateFrameNames('bush-q', {
                prefix: 'q',
                start: 1,
                end: 5,
                zeroPad: 1
            }),
            frameRate: 6,
            repeat: -1
        });
        this.bushQ.play('q-anim');
    }
    hide() {
        this.bushQ.destroy();

        this.scene.tweens.addCounter({
            from: 1,
            to: 0,
            duration: 500,
            onUpdate: tween => {
                this.bush.setAlpha(tween.getValue());
            },
            onComplete: () => {
                this.destroy();
            }
        });
    }
}
