import Item from './Item';
const friends = 'friends'.split('');
export default class ItemGroup extends Phaser.GameObjects.Group {
    // texts: Map<string, Phaser.GameObjects.Text> = new Map();
    statusbarGroup: Phaser.GameObjects.Group;
    constructor(scene: Phaser.Scene, configs: Phaser.Types.Tilemaps.TiledObject[]) {
        super(scene);
        this.statusbarGroup = scene.add.group();
        friends.forEach((el, i) => {
            const fixedItem = scene.add
                .image(scene.game.canvas.width - 610 + i * 90, 40, el + '_off')
                .setScale(0.5)
                .setOrigin(0, 0.5)
                .setScrollFactor(0)
                .setDepth(2);

            this.statusbarGroup.add(fixedItem);
        });
        const items = configs.map(config => new Item(scene, config));
        // scene.add.rectangle(0, 0, scene.game.canvas.width, 50, 0x000).setOrigin(0, 0);
        // scene.cameras.add(0, 0, scene.game.canvas.width, 75).setBackgroundColor(0x000000);

        this.addMultiple(items);
    }

    isCollectAll() {
        return true;
    }
}
