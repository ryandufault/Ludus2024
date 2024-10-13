class Accueil extends Phaser.Scene {
  constructor() {
    super({ key: "accueil" });
  }
  preload() {
    this.load.spritesheet("bg", "./assets/images/bgspritesheet.png", {
      frameWidth: 220,
      frameHeight: 165,
    });
    this.load.image("logo", "./assets/images/logo.png");
    this.load.image("startbtn", "./assets/images/commencer.png");
    this.load.image("creditsbtn", "./assets/images/credit.png");
    this.load.image("faqbtn", "./assets/images/faq.png");
    this.load.image("mutebtn", "./assets/images/audio.png");
    this.load.spritesheet("introchar", "./assets/images/accueilperso.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.bgc0 = this.add.graphics();
    this.bgc0.fillStyle(0x000000).setAlpha(1).setDepth(1000);
    this.bgc0.fillRect(0, 0, config.width, config.height);
    this.tweens.add({
      targets: this.bgc0,
      alpha: 0,
      duration: 2000,
      delay: 100,
    });

    this.anims.create({
      key: "animate_bg",
      frames: this.anims.generateFrameNumbers("bg", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.bg = this.add.sprite(400, 300, "bg").setScale(4).setDepth(1);
    this.bg.play("animate_bg");

    this.add.image(275, 125, "logo").setDepth(2).setScale(1.4).setAlpha(1);
    this.add.image(275, 125, "logo").setDepth(1).setScale(1.5).setAlpha(0.3);

    let startBtn;
    startBtn = this.add.image(185, 250, "startbtn").setDepth(2).setScale(1);
    startBtn.setInteractive();
    startBtn.on("pointerdown", () => {
      this.scene.start("jeu");
    });
    startBtn.on("pointerover", () => {
      startBtn.setAlpha(1).setScale(1.04);
    });
    startBtn.on("pointerout", () => {
      startBtn.setAlpha(1).setScale(1);
    });

    let creditBtn;
    creditBtn = this.add.image(185, 310, "creditsbtn").setDepth(2).setScale(1);
    creditBtn.setInteractive();
    creditBtn.on("pointerdown", () => {
      this.scene.start("credits");
    });
    creditBtn.on("pointerover", () => {
      creditBtn.setAlpha(1).setScale(1.04);
    });
    creditBtn.on("pointerout", () => {
      creditBtn.setAlpha(1).setScale(1);
    });

    let faqBtn;
    faqBtn = this.add.image(218, 370, "faqbtn").setDepth(2).setScale(1);
    faqBtn.setInteractive();
    faqBtn.on("pointerdown", () => {
      this.scene.start("faq");
    });
    faqBtn.on("pointerover", () => {
      faqBtn.setAlpha(1).setScale(1.04);
    });
    faqBtn.on("pointerout", () => {
      faqBtn.setAlpha(1).setScale(1);
    });

    let muteBtn;
    muteBtn = this.add.image(110, 430, "mutebtn").setDepth(2).setScale(1);
    muteBtn.setInteractive();
    muteBtn.on("pointerdown", () => {
      if (muteBtn.alpha === 1) {
        muteBtn.setAlpha(0.5).setScale(1);
      } else {
        muteBtn.setAlpha(1).setScale(1);
      }
    });

    muteBtn.on("pointerover", () => {
      if (muteBtn.scale === 1) {
        muteBtn.setScale(1.04);
      } else {
        muteBtn.setScale(1);
      }
    });

    muteBtn.on("pointerout", () => {
      if (muteBtn.scale !== 1.04) {
        muteBtn.setScale(1);
      } else {
        muteBtn.setScale(1.04);
      }
    });

    this.anims.create({
      key: "animate_introchar",
      frames: this.anims.generateFrameNumbers("introchar", {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.bg = this.add
      .sprite(550, 320, "introchar")
      .setScale(8)
      .setDepth(3)
      .setAlpha(0.88);
    this.bg.play("animate_introchar");

    this.anims.create({
      key: "animate_introcharghost",
      frames: this.anims.generateFrameNumbers("introchar", {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.bg = this.add
      .sprite(550, 320, "introchar")
      .setScale(10)
      .setDepth(3)
      .setAlpha(0.2);
    this.bg.play("animate_introcharghost");
  }

  update() {}
}
