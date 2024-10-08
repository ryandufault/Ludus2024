class PartieTerminee extends Phaser.Scene {
  constructor() {
    super({ key: "end" });
  }
  preload() {
    this.load.image("restartBtn", "./assets/images/recommencer.png");
    this.load.image("menuBtn", "./assets/images/menu.png");
    this.load.image("deathmsg", "./assets/images/deathmessage.webp");
    this.load.image("deathchar", "./assets/images/deathchar.png");
    this.load.spritesheet("deathbg", "./assets/images/bgdeathsheet.png", {
        frameWidth: 102,
        frameHeight: 78,
      });
  }

  create() {
    this.anims.create({
        key: "deathbg",
        frames: this.anims.generateFrameNumbers("deathbg", { start: 0, end: 65 }),
        frameRate: 10,
        repeat: -1,
      });
    
    this.bg = this.add
    .sprite(0, 0, "deathbg").setOrigin(0, 0)
    .setScale(8)
    this.bg.anims.play("deathbg", true);

    this.add.image(0, -180, "deathmsg").setOrigin(0, 0);
    this.add.image(408, 257, "deathchar").setScale(10).setRotation(Phaser.Math.DegToRad(-90));

    let restartBtn;
    restartBtn = this.add
      .image(408, 407, "restartBtn")
      .setDepth(2)
      .setScale(1.4);
    restartBtn.setInteractive();
    restartBtn.on("pointerdown", () => {
      this.scene.start("jeu");
    });
    restartBtn.on("pointerover", () => {
      restartBtn.setAlpha(1).setScale(1.44);
    });
    restartBtn.on("pointerout", () => {
      restartBtn.setAlpha(1).setScale(1.4);
    });

    let menuBtn;
    menuBtn = this.add.image(408, 477, "menuBtn").setDepth(2).setScale(1);
    menuBtn.setInteractive();
    menuBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });
    menuBtn.on("pointerover", () => {
      menuBtn.setAlpha(1).setScale(1.04);
    });
    menuBtn.on("pointerout", () => {
      menuBtn.setAlpha(1).setScale(1);
    });
  }
  update() {}
}
