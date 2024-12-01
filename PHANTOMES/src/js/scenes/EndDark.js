class EndDark extends Phaser.Scene {
  constructor() {
    super({ key: "enddark" });
  }
  preload() {
    this.load.image("enddark", "./assets/images/enddark.png");
  }

  create() {
    this.scene.stop("hud");
    this.time.delayedCall(1, () => {
      this.hz10802.play();
      this.hz8792.play();
    });

    this.hz8792 = this.sound.add("879hz2", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: -120,
      seek: 0,
      loop: false,
      delay: 0,
    });
    this.hz10802 = this.sound.add("1080hz2", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 1200,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.bgc2 = this.add.graphics();
    this.bgc2.fillStyle(0xff0328).setAlpha(1);
    this.bgc2.fillRect(0, 0, config.width, config.height);

    this.bgc3 = this.add.graphics();
    this.bgc3.fillStyle(0x000).setAlpha(0);
    this.bgc3.fillRect(0, 0, config.width, config.height);
    this.time.delayedCall(1900, () => {
      this.bgc3.setAlpha(1);
    });
    this.time.delayedCall(1967, () => {
      this.scene.start("accueil");
      this.hz8792.stop();
      this.hz10802.stop();
    });
    this.dark = this.add.image(408, 312, "enddark").setDepth(2).setScale(26);
  }
  update() {}
}
