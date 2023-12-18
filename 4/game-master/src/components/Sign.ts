export default class Sign extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene) {
        super(scene);

        const signImg = scene.physics.add.staticImage(128, 128 * 4, 'sign').setOrigin(0);
        const dustSprite = scene.physics.add.staticSprite(128 + 80, 128 * 9 + 180, 'dust').setOrigin(0);

        dustSprite.anims.create({
            key: 'start',
            frames: scene.anims.generateFrameNames('dust', {
                prefix: 'dust',
                start: 1,
                end: 10,
                zeroPad: 2
            }),
            frameRate: 25,
            repeat: 0
        });
        dustSprite.setVisible(false);
        scene.tweens.add({
            targets: signImg,
            y: 128 * 8 + 100,
            duration: 500,
            onComplete: () => {
                dustSprite.setVisible(true);
                dustSprite.play('start');
            }
        });
        this.add(signImg);
    }
}
