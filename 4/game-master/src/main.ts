import './style.css';
import Phaser from 'phaser';
import Preloader from './scenes/Preloader';

import DisplayScene from './scenes/DisplayScene';
import Problem from './scenes/Problem';

await document.fonts.load('15px jalnan', '123456789score');
new Phaser.Game({
    // type: Phaser.CANVAS,
    width: '100%',
    height: '100%',
    physics: {
        default: 'arcade',
        arcade: {
            debug: import.meta.env.DEV,

            gravity: { y: 2500 },
            tileBias: 128
        }
    },
    scene: [Preloader, DisplayScene, Problem]
});
