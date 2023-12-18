import SceneKeys from '../constants/SceneKeys';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: SceneKeys.Preloader });
    }
    preload() {
        this.load.setBaseURL('assets');
        /**tile */
        this.load.image('platforms', 'map/platform.png');
        this.load.image('ladder', 'map/ladder.png');
        this.load.image('move4', 'map/move4x1.png');
        this.load.image('move6', 'map/move6x1.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');
        /** items */
        this.load.image('f_on', 'items/f_on.png');
        this.load.image('r_on', 'items/r_on.png');
        this.load.image('i_on', 'items/i_on.png');
        this.load.image('e_on', 'items/e_on.png');
        this.load.image('n_on', 'items/n_on.png');
        this.load.image('d_on', 'items/d_on.png');
        this.load.image('s_on', 'items/s_on.png');
        this.load.image('f_off', 'items/f_off.png');
        this.load.image('r_off', 'items/r_off.png');
        this.load.image('i_off', 'items/i_off.png');
        this.load.image('e_off', 'items/e_off.png');
        this.load.image('n_off', 'items/n_off.png');
        this.load.image('d_off', 'items/d_off.png');
        this.load.image('s_off', 'items/s_off.png');
        this.load.image('score', 'items/score.png');
        this.load.image('bush', 'bush/bush.png');
        /** atlas */
        this.load.atlas('player', 'player/poy.png', 'player/poy.json');
        this.load.atlas('bee', 'enemies/bee/bee.png', 'enemies/bee/bee.json');
        this.load.atlas('worm', 'enemies/bug/worm.png', 'enemies/bug/worm.json');
        this.load.atlas('worm2', 'enemies/bug2/bug2.png', 'enemies/bug2/bug2.json');
        this.load.atlas('dust', 'dust/dust.png', 'dust/dust.json');
        this.load.atlas('ending', 'ending/ending.png', 'ending/ending.json');
        this.load.atlas('flares', 'flares/flares.png', 'flares/flares.json');
        this.load.atlas('bush-q', 'bush/bush-q.png', 'bush/bush-q.json');
        /**audio */
        this.load.audio('adventure', 'sounds/adventure.mp3');
        this.load.audio('cheer', 'sounds/cheer.mp3');
        this.load.audio('collect', 'sounds/collect.mp3');
        this.load.audio('die', 'sounds/die.mp3');
        this.load.audio('kill', 'sounds/kill.mp3');
        this.load.audio('change', 'sounds/change.mp3');
        this.load.audio('error', 'sounds/error.mp3');
        this.load.audio('correct', 'sounds/correct.mp3');
        /**bg */
        this.load.image('bg1', 'background/bg1.png');
        this.load.image('bg2', 'background/bg2.png');
        this.load.image('bg3', 'background/bg3.png');
        /**sign */
        this.load.image('sign', 'sign.png');

        /**ending */
        this.load.image('goal', 'goal.png');
        this.load.image('ending_fruit', 'ending.png');
        this.load.image('ending_foot', 'ending/ending_foot.png');
        const { width, height } = this.game.canvas;
        let dotCount = 0;
        const dots = ['.', '..', '...'];
        const text = this.add
            .text(width / 2, height / 2, `LOADING${dots[dotCount]}`, {
                color: 'rgb(255,255,255)',
                fontSize: '200px',
                fontFamily: 'Jalnan'
            })
            .setOrigin(0.5);
        this.time.addEvent({
            delay: 300,
            repeat: -1,
            callback: () => {
                dotCount++;
                text.setText(`LOADING${dots[dotCount % 3]}`);
            }
        });
    }
    create() {
        this.game.scene.start(SceneKeys.Display);

        // this.game.scene.start('problem');
    }
}
