class End3 extends Phaser.Scene {
  constructor() {
    super({ key: "end3" });
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
    this.scene.stop("hud");
    this.time.delayedCall(1, () => {
      this.hz879.play();
      this.hz1080.play();
    });

    this.hz879 = this.sound.add("879hz", {
      mute: false,
      volume: 0.4,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
    this.hz1080 = this.sound.add("1080hz", {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.bgc0 = this.add.graphics();
    this.bgc0.fillStyle(0x000000).setAlpha(1).setDepth(999);
    this.bgc0.fillRect(0, 0, config.width, config.height);

    this.bgc4 = this.add.graphics();
    this.bgc4.fillStyle(0xfff).setAlpha(1).setDepth(1000);
    this.bgc4.fillRect(0, 0, config.width, config.height);

    this.bgc1 = this.add.graphics();
    this.bgc1.fillStyle(0x870014, 1);
    this.bgc1.fillRect(0, 0, config.width, config.height);

    this.bgc2 = this.add.graphics();
    this.bgc2.fillStyle(0xec0023).setAlpha(0);
    this.bgc2.fillRect(0, 0, config.width, config.height);

    this.tweens.add({
      targets: this.bgc2,
      alpha: 1,
      duration: 1400,
      repeatDelay: 100,
      delay: 100,
      hold: 100,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.bgc4,
      alpha: 0,
      duration: 1000,
      delay: 50,
    });

    this.tweens.add({
      targets: this.bgc0,
      alpha: 0,
      duration: 2100,
      delay: 100,
    });

    this.deathmsg = this.add
      .image(0, -165, "deathmsg")
      .setOrigin(0, 0)
      .setAlpha(0);
    this.deathcar = this.add
      .image(408, 257, "deathchar")
      .setScale(11)
      .setAngle(-90)
      .setDepth(222);

    this.tweens.add({
      targets: this.deathmsg,
      alpha: 1,
      y: -180,
      duration: 1400,
      delay: 1000,
      ease: "Expo.easeOut",
    });

    this.tweens.add({
      targets: this.deathcar,
      scale: 10,
      duration: 1400,
      delay: 100,
    });

    let restartBtn;
    restartBtn = this.add
      .image(408, 407, "restartBtn")
      .setDepth(2)
      .setScale(1.9);
    restartBtn.setInteractive();
    restartBtn.on("pointerdown", () => {
      this.scene.start("jeu3");
      this.bgm.resume();
    });
    restartBtn.on("pointerover", () => {
      restartBtn.setAlpha(1).setScale(1.44).setDepth(223);
    });
    restartBtn.on("pointerout", () => {
      restartBtn.setAlpha(1).setScale(1.4).setDepth(2);
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

    this.emitter = this.add.particles(
      config.width / 2,
      config.height / 2,
      "particleTexture",
      {
        scale: { start: 0.2, end: 0, ease: "Sine.easeInOut", random: true },
        lifespan: 1000,
        frequency: 5,
        maxParticles: 20,
        gravityY: 1000,
        speed: { min: 100, max: 300 },
        blendMode: "DIFFERENCE",
      }
    );
  }
  update() {}
}
