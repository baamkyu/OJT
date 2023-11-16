import "./style.css";
import Phaser from "phaser";
import Preloader from "./scenes/Preloader";
import BeforeGame from "./scenes/BeforeGame";
import Game from "./scenes/Game";
import Ending from "./scenes/Ending";

new Phaser.Game({
  type: Phaser.WEBGL,
  width: window.innerWidth > 2560 ? 2560 : "100%",
  height: window.innerHeight > 1440 ? 1440 : "100%",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      // debug: import.meta.env.DEV,
      gravity: { y: 2500 },
    },
  },
  scene: [Preloader, BeforeGame, Game, Ending], // 씬 추가
});
