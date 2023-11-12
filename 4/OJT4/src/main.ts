import "./style.css";
import Phaser from "phaser";
import Preloader from "./scenes/Preloader";
import BeforeGame from "./scenes/BeforeGame";
import Game from "./scenes/Game";

new Phaser.Game({
  type: Phaser.WEBGL,
  width: "100%",
  height: "93%",
  physics: {
    default: "arcade",
    arcade: {
      debug: import.meta.env.DEV,
      gravity: { y: 2500 },
    },
  },
  scene: [Preloader, BeforeGame, Game], // 씬 추가
});
