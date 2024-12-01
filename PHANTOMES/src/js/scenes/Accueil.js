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
    this.load.image("loadwin", "./assets/images/loadwin.png");
    this.load.image("creditsbtn", "./assets/images/credit.png");
    this.load.image("faqbtn", "./assets/images/faq.png");
    this.load.image("mutebtn", "./assets/images/audio.png");
    this.load.spritesheet("introchar", "./assets/images/accueilperso.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("music", "./assets/audio/music.mp3");
    this.load.audio("flash", "./assets/audio/flash.mp3");
    this.load.audio("flashclic", "./assets/audio/flashclic.mp3");
    this.load.audio("footstep", "./assets/audio/footstep.mp3");
    this.load.audio("door", "./assets/audio/door.mp3");
    this.load.audio("pianonote", "./assets/audio/pianonote.mp3");
    this.load.audio("whitenoise", "./assets/audio/whitenoise.mp3");
    this.load.audio("a1", "./assets/audio/ambient1.mp3");
    this.load.audio("a2", "./assets/audio/ambient2.mp3");
    this.load.audio("a3", "./assets/audio/ambient3.mp3");
    this.load.audio("a4", "./assets/audio/ambient4.mp3");
    this.load.audio("879hz", "./assets/audio/879hz.mp3");
    this.load.audio("1080hz", "./assets/audio/1080hz.mp3");
    this.load.audio("879hz2", "./assets/audio/879hz2.mp3");
    this.load.audio("1080hz2", "./assets/audio/1080hz2.mp3");
    this.load.image(
      "particleTexture",
      "https://assets.codepen.io/9367036/circle_05.png"
    );

    this.load.spritesheet(
      "particlesTextureFlash",
      "https://assets.codepen.io/9367036/kenneyaveccouleur.png",
      {
        frameWidth: 512,
        frameHeight: 512,
      }
    );
  }

  create() {
    this.scene.stop("hud");
    if (!this.bgMusic || !this.bgMusic.isPlaying) {
      this.bgMusic = this.sound.add("music", {
        mute: false,
        volume: 0.2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      });
      this.bgMusic.play();
    }

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

    let VictoryBtn;
    VictoryBtn = this.add.image(675, 525, "loadwin").setDepth(2).setScale(0.5);
    VictoryBtn.setInteractive();
    VictoryBtn.on("pointerdown", () => {
      this.verifWin();
    });
    VictoryBtn.on("pointerover", () => {
      VictoryBtn.setAlpha(1).setScale(0.52);
    });
    VictoryBtn.on("pointerout", () => {
      VictoryBtn.setAlpha(1).setScale(0.5);
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
      if (muteBtn.alpha === 1 && this.bgMusic.isPlaying) {
        muteBtn.setAlpha(0.5).setScale(1);
        this.bgMusic.pause();
      } else {
        muteBtn.setAlpha(1).setScale(1);
        this.bgMusic.resume();
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

  verifWin() {
    let savedState = localStorage.getItem("gameState");

    if (savedState) {
      let gameState = JSON.parse(savedState);
      if (gameState.winAtteinte) {
        console.log("win atteinte");
        this.scene.start("victoire");
      } else {
        console.log("pas atteint win");
        this.afficherMessage();
      }
    } else {
      console.log("pas de save");
      this.afficherMessage();
    }
  }

  afficherMessage() {
    let messageText = this.add
      .text(200, 500, "Victoire non atteinte, atteigner la fin!", {
        font: "64px VT323",
        fill: "#ffffff",
        align: "center",
      })
      .setScale(0.4)
      .setAlpha(0)
      .setDepth(4);

    let messageText2 = this.add
      .text(197, 500, "Victoire non atteinte, atteigner la fin!", {
        font: "64px VT323",
        fill: "#c4c4c4",
        align: "center",
      })
      .setScale(0.407)
      .setAlpha(0)
      .setDepth(3);

    this.tweens.add({
      targets: [messageText2, messageText],
      alpha: 1,
      duration: 2000,
      ease: "Power1",
    });

    this.time.delayedCall(2000, () => {
      this.tweens.add({
        targets: [messageText2, messageText],
        alpha: 0,
        duration: 2000,
        ease: "Power1",
      });
    });
  }
}
