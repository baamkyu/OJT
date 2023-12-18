export default class Item extends Phaser.Physics.Arcade.Image {
    private _collecting = false;
    name: string;
    constructor(scene: Phaser.Scene, config: Phaser.Types.Tilemaps.TiledObject) {
        super(scene, config.x ?? 0, config.y ?? 0, config.name.toLowerCase() + '_on');
        this.name = config.name;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0, 1);
        // this.setScale(0.7);
        // this.setVelocity(0);
        //@ts-ignore
        this.body.setAllowGravity(false);

        //@ts-ignore
        this.body.label = 'item';
    }

    collect() {
        if (this._collecting) return;
        this._collecting = true;
        this.scene.sound.play('collect');
        let targetX = 0;
        const endX = this.scene.game.canvas.width - 610;
        switch (this.name) {
            case 'F':
                targetX = endX + 90 * 0;
                break;
            case 'R':
                targetX = endX + 90 * 1;
                break;
            case 'I':
                targetX = endX + 90 * 2;
                break;
            case 'E':
                targetX = endX + 90 * 3;
                break;
            case 'N':
                targetX = endX + 90 * 4;
                break;
            case 'D':
                targetX = endX + 90 * 5;
                break;
            case 'S':
                targetX = endX + 90 * 6;
                break;
        }
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: 72,
            duration: 1000,
            scale: 0.5,
            ease: 'Power2',

            onStart: () => {
                /** 좌표를 절대 -> 상대로 수정 */
                this.scene.cameras.getCamera('minimap').ignore(this);
                this.setScrollFactor(0);
                this.x = this.x - this.scene.cameras.main.worldView.x;
                this.y = this.y - this.scene.cameras.main.worldView.y;
            },
            onComplete: () => {
                this.emit('collectend', this.name);

                // this.destroy();
            }
        });
    }
}
