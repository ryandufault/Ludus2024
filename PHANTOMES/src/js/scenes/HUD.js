class HUD extends Phaser.Scene {
  constructor() {
    super({ key: "hud" });
  }
  preload() {
    this.load.image("leavebtn", "./assets/images/quitter.png");
    this.load.image("flclose", "./assets/images/flashspriteclose.png");
    this.load.image("flopen", "./assets/images/spriteflashopen.png");
  }

  create() {
    let leaveBtn = this.add
      .image(720, 585, "leavebtn")
      .setScale(0.6)
      .setAlpha(0.9)
      .setTint(0xfbfbfe)
      .setBlendMode(Phaser.BlendModes.SCREEN);

    this.flclose = this.add.image(80, 565, "flclose").setScale(2);
    this.flopen = this.add
      .image(80, 565, "flopen")
      .setScale(2)
      .setAlpha(0)
      .setName("flopen");

    leaveBtn.setInteractive();
    leaveBtn.on("pointerdown", () => {
      this.scene.stop("jeu");
      this.scene.stop("jeu2");
      this.scene.stop("jeu3");
      this.scene.stop("jeu4");
      this.scene.stop("jeu5");
      this.scene.stop("jeu6");
      this.scene.stop("jeu7");
      this.scene.start("accueil");
    });
    leaveBtn.on("pointerover", () => {
      leaveBtn
        .setScale(0.64)
        .setTint(0xe22a2a)
        .setBlendMode(Phaser.BlendModes.ADD);
    });
    leaveBtn.on("pointerout", () => {
      leaveBtn
        .setScale(0.6)
        .setAlpha(0.9)
        .setTint(0xfbfbfe)
        .setBlendMode(Phaser.BlendModes.SCREEN);
    });
  }

  update() {}
}
