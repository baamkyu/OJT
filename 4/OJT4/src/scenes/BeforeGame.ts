import { Background } from "../components/Background";
import Player from "../components/Player";
import { GameNPC, NPCChat } from "../components/MapElement";

export default class BeforeGame extends Phaser.Scene {
  player!: Player;
  background!: Background;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  gameNPC!: GameNPC;
  NPCChat!: NPCChat;

  constructor() {
    super({ key: "BeforeGame" });
  }

  preload() {}

  create() {
    // make map, background
    this.background = new Background(this);

    // game NPC
    this.gameNPC = new GameNPC(this, 300, 720, "gamenpc");

    this.gameNPC.setScale(1.5);
    (this.gameNPC.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.gameNPC.setInteractive(); // 클릭 이벤트를 받기 위해 interactive 설정
    this.gameNPC.on("pointerdown", () => {
      console.log("click");
      this.showModal(this.scene);
    });

    // NPC chat
    this.NPCChat = new NPCChat(this, 300, 590, "npcchat");
    (this.NPCChat.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

    // player
    this.player = new Player(this, 500, 500, "player", "stand1");
    this.player.setScale(0.5);
    this.player.body?.setSize(50, 130);
    const map = this.make.tilemap({
      key: "entranceMap",
      tileWidth: 16,
      tileHeight: 16,
    });

    // 카메라 설정
    this.cameras.main.setBounds(0, 0, 2560, 1440); // 전체 맵 크기를 설정
    this.cameras.main.startFollow(this.player, true); // 카메라가 플레이어를 따라다니도록 설정
    this.physics.world.setBounds(0, 0, 2560, 1440);

    ///@ts-ignore
    const tileset = map.addTilesetImage("tile", "tiles");
    ///@ts-ignore
    const platformsLayer = map.createLayer("entrance", tileset, 0, 0);
    this.platformsLayer = platformsLayer!;
    // make platform
    const platformGroup = this.physics.add.staticGroup();
    const tileBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.block)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 16, tile.y * 16, 16, 16)
          .setOrigin(0);
      });

    const wallBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.wall)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 16, tile.y * 16, 16, 16)
          .setOrigin(0);
      });

    platformGroup.addMultiple(tileBodies);
    platformGroup.addMultiple(wallBodies);

    tileBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
      ///@ts-ignore
      el.body.checkCollision.left = false;
      ///@ts-ignore
      el.body.checkCollision.right = false;
    });

    wallBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = true;
      ///@ts-ignore
      el.body.checkCollision.left = true;
      ///@ts-ignore
      el.body.checkCollision.right = true;
    });

    this.physics.add.collider(platformGroup, this.player);
    this.physics.add.collider(platformGroup, this.gameNPC);

    // 키보드 감지
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  showModal(scene: any) {
    // 모달 창을 생성합니다.
    var modal = document.createElement("div");
    modal.id = "modalDiv";
    modal.style.position = "absolute";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.padding = "20px";
    modal.style.backgroundColor = "#fff";
    modal.style.borderRadius = "20px";
    modal.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.5)";

    // 모달 내용을 추가합니다.
    modal.innerHTML = `
      <p style="font-size: 24px; color: black; text-align: center;">레이스를 시작할까요?</p>
      <div style="text-align: center;">
        <button id="xButton" style="background-color: #A9D2EE; color: #fff; padding: 10px 20px; width: 96px; border: none; cursor: pointer; font-size: 20px; margin: 0 10px;">
          <div style="height: 100%; display: flex; align-items: center; justify-content: center;">아니오</div>
        </button>
        <button id="oButton" style="background-color: #1E9CD7; color: #fff; padding: 10px 20px; width: 56px; border: none; cursor: pointer; font-size: 20px; margin: 0 10px;">
            <div style="height: 100%; display: flex; align-items: center; justify-content: center;">네</div>
        </button>
      </div>
    `;

    // 모달을 body에 추가합니다.
    document.body.appendChild(modal);

    // X 버튼에 클릭 이벤트를 추가합니다.
    var xButton = document.getElementById("xButton");
    if (xButton) {
      xButton.addEventListener("click", () => this.chooseOption("X"));
    }

    // O 버튼에 클릭 이벤트를 추가합니다.
    var oButton = document.getElementById("oButton");
    if (oButton) {
      oButton.addEventListener("click", () => this.chooseOption("O"));
    }
  }
  chooseOption(option: any) {
    console.log(option);
    if (option === "X") {
      this.closeModal();
    } else if (option === "O") {
      this.closeModal();
      this.scene.stop();
      this.game.scene.start("Game");
    }
  }
  closeModal() {
    // 모달을 닫습니다.
    var modal = document.querySelector("#modalDiv");
    if (modal) {
      document.body.removeChild(modal);
    }
  }
  update() {
    // console.log("beforegame update");
    this.player.update(this.cursors);
  }
}
