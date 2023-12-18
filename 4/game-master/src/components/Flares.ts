import confetti from 'canvas-confetti';
export default class Flares {
    constructor(scene: Phaser.Scene) {
        let i = 0;
        const origins = [
            { x: 0.3, y: 0.3 },
            { x: 0.6, y: 0.3 },
            { x: 0.5, y: 0.6 }
        ];
        scene.time.addEvent({
            delay: 1000,
            callback() {
                confetti({
                    particleCount: 200,
                    spread: 360,
                    origin: origins[i % 3],
                    ticks: 200
                });
                i++;
            },
            repeat: -1
        });
    }
}
