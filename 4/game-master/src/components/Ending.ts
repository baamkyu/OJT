export default class Ending extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene) {
        super(scene);
        const { width, height } = scene.game.canvas;

        const bg = scene.add.rectangle(0, 0, width, height, 0x000, 0.35).setOrigin(0, 0).setScrollFactor(0);
        const imgScale = Math.min(0.7, width / 1920);
        const img = scene.add
            .image(width / 2, 0, 'ending_fruit')
            .setOrigin(0.5, 0)
            .setScale(imgScale)
            .setScrollFactor(0);
        const foot = scene.add
            .image(width / 2, height / 2 + 220, 'ending_foot')
            .setOrigin(0.5, 0)
            .setScrollFactor(0);
        const endingSprite = scene.add
            .sprite(width / 2, height / 2 + 40, 'ending')
            .setOrigin(0.5, 0.5)
            .setDisplayOrigin(0.5, 0.5)
            .setScrollFactor(0);

        endingSprite.anims.create({
            key: 'start',
            frames: scene.anims.generateFrameNames('ending', {
                prefix: 'ending',
                start: 1,
                end: 7,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        endingSprite.play('start');

        this.addMultiple([bg, img, foot, endingSprite]);
        this.setDepth(100);
    }
}
