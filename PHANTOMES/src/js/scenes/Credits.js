class Credits extends Phaser.Scene {
  constructor() {
    super({ key: "credits" });
  }
  preload() {
    this.load.image("credits", "./assets/images/credits.png");
    this.load.image("credits2", "./assets/images/credits2.png");
    this.load.image("backbtn", "./assets/images/retour.png");
    this.load.spritesheet("walk", "./assets/images/walksheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("idle", "./assets/images/idlesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.scene.stop("hud");
    this.bgc0 = this.add.graphics();
    this.bgc0.fillStyle(0x000000).setAlpha(1).setDepth(1000);
    this.bgc0.fillRect(-1110, -1110, 4000, 4000);
    this.tweens.add({
      targets: this.bgc0,
      alpha: 0,
      duration: 2000,
      delay: 100,
    });

    this.bg = this.add
      .sprite(0, 0, "bg")
      .setScale(7)
      .setDepth(-1)
      .setAlpha(0.22);
    this.bg.play("animate_bg");

    let backBtn;
    backBtn = this.add.image(110, 100, "backbtn").setDepth(2).setScale(0.3);
    backBtn.setInteractive();
    backBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });
    backBtn.on("pointerover", () => {
      backBtn.setAlpha(1).setScale(0.32).setDepth(223);
    });
    backBtn.on("pointerout", () => {
      backBtn.setAlpha(1).setScale(0.3).setDepth(2);
    });

    this.credits = this.add.image(0, 0, "credits").setDepth(2).setScale(0.6);
    this.credits2 = this.add.image(0, 0, "credits2").setDepth(2).setScale(0.6);

    this.tweens.add({
      targets: this.credits2,
      alpha: { from: 0.43, to: 0.86 },
      duration: 200,
      repeat: -1,
      yoyo: true,
      ease: "cubic.easeOut",
    });

    this.walkSpeed = 108;

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //anim player
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 4,
        end: 7,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 8,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 12,
        end: 15,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("idle", {
        start: 5,
        end: 9,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.player = this.physics.add
      .sprite(-80, -10, "walk")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.player.body.setSize(16, 16).setOffset(8, 16);

    // Caméra
    this.cameras.main.setBounds(
      this.worldWidth / -2,
      this.worldHeight / -2,
      this.worldWidth,
      this.worldHeight
    );
    this.cameras.main.setZoom(1.7);
    this.cameras.main.startFollow(this.player, true, 0.14, 0.16);
    this.cameras.main.setDeadzone(50, 20);

    this.physics.world.setBounds(-310, -210, 500, 270);
  }

  update() {
    let velocity = this.walkSpeed;

    this.move(velocity);

    if (this.physics.overlap(this.player, this.sceneZone)) {
      this.scene.start("victoire");
    }

    this.wrapAround();
  }

  move(velocity) {
    this.player.setVelocity(0);

    if (this.keyA.isDown) {
      this.player.setVelocityX(-velocity);
      this.player.play("left", true);
    } else if (this.keyD.isDown) {
      this.player.setVelocityX(velocity);
      this.player.play("right", true);
    }

    if (this.keyW.isDown) {
      this.player.setVelocityY(-velocity);
      this.player.play("up", true);
    } else if (this.keyS.isDown) {
      this.player.setVelocityY(velocity);
      this.player.play("down", true);
    }

    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0
    ) {
      this.player.anims.play("idle", true);
    }
  }

  wrapAround() {
    const bounds = this.physics.world.bounds;
    if (this.player.x < bounds.x) {
      this.player.x = bounds.x + bounds.width;
    } else if (this.player.x > bounds.x + bounds.width) {
      this.player.x = bounds.x;
    }
    if (this.player.y < bounds.y) {
      this.player.y = bounds.y + bounds.height;
    } else if (this.player.y > bounds.y + bounds.height) {
      this.player.y = bounds.y;
    }
  }
}
