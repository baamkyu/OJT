import "./style.css";
import Phaser from "phaser";
import MainScene from "./scenes/mainScene";
import SecondScene from "./scenes/secondScene";

new Phaser.Game({
  type: Phaser.WEBGL,
  width: "100%",
  height: "100%",
  physics: {
    default: "arcade",
    arcade: {
      debug: import.meta.env.DEV,
      gravity: { y: 2500 },
    },
  },
  scene: [MainScene, SecondScene], // 씬 추가
});
