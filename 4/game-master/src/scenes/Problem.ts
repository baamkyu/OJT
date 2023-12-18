import SceneKeys from '../constants/SceneKeys';
class YellowFruit extends Phaser.GameObjects.Group {
    img: Phaser.GameObjects.Image | Phaser.GameObjects.GameObject;
    text: Phaser.GameObjects.Text | Phaser.GameObjects.GameObject;

    _collect = false;
    constructor(scene: Phaser.Scene, x: number, y: number, public answer: string) {
        super(scene);
        this.img = scene.add.image(x, y, 'yellow_fruit');
        this.text = scene.add
            .text(x, y, answer, { color: '#000000', fontFamily: 'jalnan', fontSize: '60px' })
            .setOrigin(0.5, 0.28);
        this.scene.physics.add.existing(this.img);
        this.scene.physics.add.existing(this.text);
        //@ts-ignore
        this.img.body.setImmovable();
        //@ts-ignore
        this.text.body.setImmovable();

        //@ts-ignore
        this.img.body.setAllowGravity(false);
        //@ts-ignore
        this.text.body.setAllowGravity(false);
        this.addMultiple([this.img, this.text]);
    }
    fall() {
        this.scene.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 300,
            yoyo: true,
            onUpdate: tweens => {
                if (this._collect) tweens.remove();
                //@ts-ignore
                this.img.setAngle(tweens.getValue() * 30);
                //@ts-ignore
                this.text.setAngle(tweens.getValue() * 30);
            },
            onComplete: () => {
                this.scene.tweens.addCounter({
                    from: 0,
                    to: 1,
                    duration: 300,
                    yoyo: true,
                    onUpdate: tweens => {
                        if (this._collect) tweens.remove();
                        //@ts-ignore
                        this.img.setAngle(tweens.getValue() * -30);
                        //@ts-ignore
                        this.text.setAngle(tweens.getValue() * -30);
                    },
                    onComplete: () => {
                        //@ts-ignore
                        // this.img.body.setAllowGravity(true);
                        //@ts-ignore
                        // this.text.body.setAllowGravity(true);
                        //@ts-ignore
                        this.img.body.velocity.y = 200;
                        //@ts-ignore
                        this.text.body.velocity.y = 200;
                    }
                });
            }
        });
    }
    collect() {
        this._collect = true;
        //@ts-ignore
        this.scene.physics.world.remove(this.text);
        //@ts-ignore
        this.scene.physics.world.remove(this.img);

        this.text.destroy();
        this.img.destroy();
        // this.destroy();
    }
}

class Player extends Phaser.Physics.Arcade.Sprite {
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    _itemCount = 0;
    _doubleJump = false;

    dead = false;
    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0, 1);

        this.setDisplayOrigin(0, 1);
        this.setCollideWorldBounds(true);

        this.anims.create({
            key: 'stand',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'stand',
                start: 1,
                end: 5,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'walk',
                start: 1,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'climb',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'climb',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpstart',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'jumpstart',
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: 0
        });

        this.play('stand');

        this.setDepth(100);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.cursors.left.on('up', () => {
            if (this.dead) return;
            if (this.body.blocked.down) this.setVelocity(0);
        });
        this.cursors.right.on('up', () => {
            if (this.dead) return;
            if (this.body.blocked.down) this.setVelocity(0);
        });
        this.cursors.space.on('down', () => {
            if (this.dead) return;
            //공중에 있을 때 한번 더 쩜프
            if (!this._doubleJump && !this.body.blocked.down) {
                this._doubleJump = true;
                this.setVelocityY(-900);
                this.play('jumpstart', true);
            }
        });
    }
    kill() {
        this.dead = true;
        this.destroy();
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if (this.dead) return;

        if (cursors.left.isDown) {
            this.setVelocityX(-500);
            // this.body.x -= 10;
            this.setFlipX(true);
            if (this.body.blocked.down) this.play('walk', true);
        } else if (cursors.right.isDown) {
            // this.body.x += 10;
            this.setVelocityX(500);
            this.setFlipX(false);
            if (this.body.blocked.down) this.play('walk', true);
        } else {
            this.setVelocityX(0);
            if (this.body.blocked.down) this.play('stand', true);
        }
        if (this.body.blocked.down) {
            this._doubleJump = false;
        }

        // controls up

        if (cursors.space.isDown && this.body.blocked.down) {
            this.play('jumpstart', true);
            this.setVelocityY(-900);
        }
    }
}

export default class Problem extends Phaser.Scene {
    player!: Player;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    _showFeedback = false;
    constructor() {
        super({ key: 'Problem' });
    }

    create(data: { type: number }) {
        this._showFeedback = false;
        const mainScene = this.scene.get(SceneKeys.Display);
        mainScene.scene.pause();
        const { width, height } = this.game.canvas;
        const scale = 0.9;
        // this.add.rectangle(0, 0, width, height, 0xffffff).setOrigin(0, 0);
        this.add.image(width / 2, height / 2, 'problem_bg').setScale(Math.max(width / 1920, height / 1080));
        const minigameBG = this.add.image(width / 2, height / 2, 'minigame_bg').setScale(scale);

        let range1: [number, number] = [1, 9];
        let range2: [number, number] = [1, 9];
        let condition = (a: number, b: number) => a + b >= 10 && a !== b;
        let getAnswer = (a: number, b: number) => a + b;
        let operator = '+';
        let makeWrong = makeWrong0;

        switch (data.type) {
            case 1:
                range1 = [10, 19];
                range2 = [1, 9];
                condition = (a, b) => a - b < 10;
                getAnswer = (a, b) => a - b;
                makeWrong = makeWrong1;
                operator = '-';
                break;
        }
        const generator = makeNumberGenerator(range1, range2, condition);
        const [num1, num2] = generator.generate();
        const answers = makeWrong(num1, num2);
        const answer = getAnswer(num1, num2);
        const startY = -110;
        const targetY = height / 2 - 220;
        const directionGroup = this.add.group();
        directionGroup.add(this.add.image(width / 2, startY, 'direction_box'));
        directionGroup.add(
            this.add
                .text(width / 2, startY, `${num1} ${operator} ${num2} = ?`, {
                    color: '#000000',
                    fontSize: '100px',
                    fontFamily: 'jalnan'
                })
                .setOrigin(0.3, 0.43)
        );
        const ground = this.add
            .rectangle(width / 2, minigameBG.y + minigameBG.height / 2, width, 100)
            .setOrigin(0.5, 1);
        this.physics.world.setBounds(
            minigameBG.getTopLeft().x,
            minigameBG.getTopCenter().y,
            minigameBG.width * scale,
            minigameBG.height * scale
        );
        this.player = new Player(this, minigameBG.x, minigameBG.y + minigameBG.height / 2 - 300, 'player', 'stand1');

        this.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 1000,
            ease: Phaser.Math.Easing.Back.Out,
            onUpdate(tween) {
                directionGroup.setY(startY + tween.getValue() * (-startY + targetY));
            },
            onComplete: () => {
                this.tweens.addCounter({
                    from: 0,
                    to: 1,
                    duration: 1000,
                    delay: 1000,
                    ease: Phaser.Math.Easing.Back.In,
                    onUpdate(tween) {
                        directionGroup.setY(targetY - tween.getValue() * (-startY + targetY));
                    },
                    onComplete: () => {
                        const fruits = answers.map((choice, i) => {
                            const fruit: YellowFruit = new YellowFruit(
                                this,
                                [width / 2 - 350, width / 2, width / 2 + 350][i],
                                [height / 2 - 290, height / 2 - 240, height / 2 - 290][i],
                                choice.toString()
                            );

                            const collider = this.physics.add.overlap(this.player, fruit, () => {
                                collider.destroy();
                                fruit.collect();
                                fruits.forEach(fr => fr.setVisible(false));
                                this.player.kill();
                                if (choice === answer) {
                                    /**정답시 화면 없애고 메인 화면 재시작 */
                                    this.makeFeedback('feedback_right', 'correct', () => {
                                        this.scene.stop();
                                        mainScene.scene.resume();
                                    });
                                } else {
                                    /** 오답시 재시작 */
                                    this.makeFeedback('feedback_wrong', 'error', () => {
                                        this.scene.restart();
                                    });
                                }
                            });
                            return fruit;
                        });
                        let fruitFalledCount = 0;
                        Phaser.Utils.Array.Shuffle(fruits).forEach((fr, i) => {
                            setTimeout(() => {
                                fr.fall();
                            }, i * 450);
                            const overlap = this.physics.add.overlap(ground, fr, () => {
                                overlap.destroy();
                                fruitFalledCount++;
                                if (fruitFalledCount === 3) {
                                    /** 오답시 재시작 */
                                    this.player.kill();
                                    this.makeFeedback('feedback_wrong', 'error', () => {
                                        this.scene.restart();
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });

        this.physics.add.existing(ground);
        //@ts-ignore
        ground.body.setAllowGravity(false);
        //@ts-ignore
        ground.body.setImmovable();
        this.physics.add.collider(this.player, ground);

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(): void {
        if (this.player.dead) return;
        this.player.update(this.cursors);
    }
    makeFeedback(texture: string, sound: string, callback: Function) {
        if (this._showFeedback) return;
        this._showFeedback = true;
        this.input.keyboard.removeAllListeners();
        const { width, height } = this.game.canvas;
        const bg = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
        const ch = this.add.image(width / 2, height / 2, texture);
        this.sound.play(sound),
            this.time.delayedCall(1000, () => {
                bg.destroy();
                ch.destroy();
                callback();
            });
    }
}
function makeWrong0(num1: number, num2: number) {
    return Phaser.Utils.Array.Shuffle([Math.abs(num1 - num2), num1 + num2, Number('' + num1 + num2)]);
}
function makeWrong1(num1: number, num2: number) {
    return Phaser.Utils.Array.Shuffle([num1 - num2, num1 + num2, num1 - num2 - 1]);
}
function makeNumberGenerator(
    range1: [number, number],
    range2: [number, number],
    condition: (num1: number, num2: number) => boolean
) {
    let num1, num2;
    return {
        generate() {
            while (true) {
                num1 = Phaser.Math.Between.apply(null, range1);
                num2 = Phaser.Math.Between.apply(null, range2);
                if (condition(num1, num2)) return [num1, num2];
            }
        }
    };
}
