export default class Score extends Phaser.GameObjects.Group {
    private _score = 0;
    text: Phaser.GameObjects.Text;
    constructor(scene: Phaser.Scene) {
        super(scene);

        this.text = scene.add
            .text(10, 40, `score : ${this._score}`, {
                stroke: 'rgb(255,255,255)',
                strokeThickness: 12,
                color: 'rgb(58,68,58)',
                fontSize: '70px',
                fontFamily: 'jalnan'
            })
            .setShadow(2, 2, 'rgb(0,0,0,0.3)', 1, true, false)
            .setOrigin(0, 0.5)
            .setScrollFactor(0);
        this.add(this.text);
    }
    addScore(score: number) {
        this._score += score;
        this.text.setText(`score : ${this._score}`);
    }
}
