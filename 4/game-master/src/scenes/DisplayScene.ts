import { Background } from '../components/Background';
import Ending from '../components/Ending';
import EnemiesGroup from '../components/enemies/EnemiesGroup';
import Enemy from '../components/enemies/Enemy';
import Flares from '../components/Flares';
import ItemGroup from '../components/items/ItemGroup';
import BushGroup from '../components/problem/BushGroup';
import MiniMap from '../components/MiniMap';
import MovingPlatformGroup from '../components/movingPlatforms/MovingPlatformGroup';
import Player from '../components/Player';
import Score from '../components/Score';
import Sign from '../components/Sign';

import { findObjectInMap, makeTileLayer } from '../util';
import Bush from '../components/problem/Bush';
import SceneKeys from '../constants/SceneKeys';

const preloadProblemAssets = (scene: Phaser.Scene) => {
    scene.load.setBaseURL('assets');
    scene.load.image('direction_box', 'problem/direction_box.png');
    scene.load.image('yellow_fruit', 'problem/yellow_fruit.png');

    scene.load.image('feedback_right', 'problem/feedback_right.png');
    scene.load.image('feedback_wrong', 'problem/feedback_wrong.png');

    scene.load.image('problem_bg', 'problem/bg.png');
    scene.load.image('minigame_bg', 'problem/minigame_bg.png');
    scene.load.start();
};

export default class DisplayScene extends Phaser.Scene {
    player!: Player;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    enemiesGroup!: EnemiesGroup;
    ladderLayer!: Phaser.Tilemaps.TilemapLayer;
    platformsLayer!: Phaser.Tilemaps.TilemapLayer;
    minimap!: MiniMap;
    tileMap!: Phaser.GameObjects.TileSprite;
    background!: Background;
    constructor() {
        super({ key: SceneKeys.Display });
    }

    create() {
        preloadProblemAssets(this);
        const map = this.make.tilemap({ key: 'map' });
        this.background = new Background(this);
        const score = new Score(this);
        /** make tile layer */
        const platformsLayer = makeTileLayer(map, 'map', 'platforms', 'platforms');
        this.platformsLayer = platformsLayer;
        this.ladderLayer = makeTileLayer(map, 'ladder', 'ladder', 'ladder');
        /**player */
        const spawnPoint = findObjectInMap(map, 'player', 'spawn');
        const goalPoint = findObjectInMap(map, 'player', 'goal');

        const goal = this.physics.add.staticImage(goalPoint.x!, goalPoint.y!, 'goal').setOrigin(0, 1);
        goal.body.x += goal.width / 2;
        goal.body.y -= goal.height / 2;
        /** 움직이는 플랫폼 */
        const movingPlatforms = new MovingPlatformGroup(this, map.getObjectLayer('movingPlatforms').objects);
        const sign = new Sign(this);

        this.player = new Player(this, spawnPoint.x!, spawnPoint.y, 'player', 'stand1');

        /**camera */
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.minimap = new MiniMap(this, 20, 80, 300, map.heightInPixels / 10, map);

        /**bounding */
        this.physics.world.setBounds(0, -200, map.widthInPixels, map.heightInPixels + 200);
        /**collider */

        this.ladderLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, platformsLayer);
        this.physics.add.collider(this.player, movingPlatforms);

        const goalCollider = this.physics.add.collider(this.player, goal, () => {
            goalCollider.destroy();
            new Ending(this);
            new Flares(this);
            this.sound.play('cheer');
            this.player.complete();
            ///@ts-ignore
            this.cameras.remove(this.minimap.camera);
            [...this.enemiesGroup.getChildren()].forEach(el => {
                el.destroy();
            });
        });

        /** 먹어야 할 아이템들 */
        const items = new ItemGroup(this, map.getObjectLayer('items').objects).setDepth(2);

        //@ts-ignore
        this.physics.add.overlap(this.player, items, (player, item) => {
            //@ts-ignore
            item.collect();
            score.addScore(100);
        });

        /** 적들 */
        this.enemiesGroup = new EnemiesGroup(this, map.getObjectLayer('enemies').objects);
        // this.minimap.camera.ignore(this.enemiesGroup);
        this.minimap.camera.ignore(this.background);
        this.minimap.camera.ignore(items.statusbarGroup);
        const a = this.physics.add.collider(this.player, this.enemiesGroup, (p, e) => {
            const enemy = e as Enemy;
            const player = p as Player;

            if (enemy.dead) return;

            if (player.body.touching.down && enemy.body.touching.up) {
                this.enemiesGroup.remove(enemy);

                switch (enemy.name) {
                    case 'worm':
                        score.addScore(30);
                        break;
                    case 'worm2':
                        score.addScore(50);
                    case 'bee':
                        score.addScore(70);
                }
                enemy.kill();
                player.killEnemy();
            } else {
                player.kill();
                /** 죽였다 살리기 */
                a.active = false;
                setTimeout(() => {
                    a.active = true;
                }, 500);
            }
        });
        const bushGroup = new BushGroup(this, map.getObjectLayer('logs').objects);
        this.physics.add.collider(this.player, bushGroup, (_, _bush) => {
            const bush = _bush as Bush;
            if (bush.meet) return;
            bush.meet = true;
            const problem = this.scene.get(SceneKeys.Problem);
            problem.scene.start(SceneKeys.Problem, { type: bush.problemType });
            const resumeCallback = () => {
                this.events.off('resume');
                bush.hide();
            };
            this.events.on('resume', resumeCallback);
        });

        /** keyboard, input */
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-UP', () => {
            if (this.ladderLayer.getTileAtWorldXY(this.player.x, this.player.y)) {
                this.player.laddering = true;
            }
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            const bottomCenter = this.player.getBottomCenter();
            if (this.ladderLayer.getTileAtWorldXY(bottomCenter.x, bottomCenter.y)) {
                this.player.laddering = true;
            }
        });
        const platformGroup = this.physics.add.staticGroup();
        const tileBodies = this.platformsLayer
            ///@ts-ignore
            .filterTiles(tile => tile.properties.collides)
            .map(tile => {
                return this.add
                    .rectangle(tile.x * 128, tile.y * 128 + 128, 128, tile.properties.height)
                    .setOrigin(0, 1);
            });
        platformGroup.addMultiple(tileBodies);
        tileBodies.forEach(el => {
            ///@ts-ignore
            el.body.checkCollision.down = false;
            ///@ts-ignore
            el.body.checkCollision.left = false;
            ///@ts-ignore
            el.body.checkCollision.right = false;
        });

        this.ladderLayer
            ///@ts-ignore
            .filterTiles(tile => tile.index !== -1)
            .forEach(tile => {
                tile.pixelY += 34;
            });
        this.physics.add.collider(platformGroup, this.player);
        this.physics.add.collider(platformGroup, sign);

        this.minimap.camera.ignore(score);
        if (!this.sound.get('adventure')) this.sound.play('adventure', { loop: true });
    }
    update(): void {
        this.player.update(this.cursors, this.platformsLayer, this.ladderLayer);
        this.enemiesGroup.update();
        this.minimap.update(this.player);
        this.background.update();
    }
}
