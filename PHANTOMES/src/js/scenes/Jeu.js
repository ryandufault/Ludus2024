class Jeu extends Phaser.Scene {
  constructor() {
    super({ key: "jeu" });
  }
  preload() {
    this.load.spritesheet("ghost", "./assets/images/enemies/ghostsheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("glitch", "./assets/images/enemies/glitchsheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("dark", "./assets/images/enemies/darksheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet(
      "headless",
      "./assets/images/enemies/headlesssheet.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.spritesheet(
      "faceless",
      "./assets/images/enemies/facelesssheet.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.image("leavebtn", "./assets/images/quitter.png");

    this.load.spritesheet("walk", "./assets/images/walksheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("idle", "./assets/images/idlesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.tilemapTiledJSON("carte1_json", "./assets/maps/carte1.json");
    this.load.image("school", "./assets/maps/school.png");
  }

  create() {
    this.walkSpeed = 100;
    this.runSpeed = 165;

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    //anim player
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("walk", { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("walk", { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("walk", { start: 8, end: 11 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("walk", { start: 12, end: 15 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("idle", { start: 5, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });

    //animghosts
    this.anims.create({
      key: "ghost",
      frames: this.anims.generateFrameNumbers("ghost", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "faceless",
      frames: this.anims.generateFrameNumbers("faceless", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "glitch",
      frames: this.anims.generateFrameNumbers("glitch", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "dark",
      frames: this.anims.generateFrameNumbers("dark", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "headless",
      frames: this.anims.generateFrameNumbers("headless", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1,
    });

    // leavebtn (hud) (ne marche pas pour l'instant)
    this.hudContainer = this.add.container(0, 0).setDepth(2220);
    let leaveBtn = this.add.image(700, 580, "leavebtn").setScale(0.6);
    leaveBtn.setInteractive();
    leaveBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });
    this.hudContainer.add(leaveBtn);

    this.player = this.physics.add
      .sprite(550, 320, "walk")
      .setScale(1.5)
      .setDepth(10)
      .setAlpha(1);
    this.player.body.setSize(16, 16).setOffset(8, 16);

    //ghosts
    this.ghost = this.physics.add
      .sprite(450, 320, "ghost")
      .setScale(1.5)
      .setDepth(10)
      .setAlpha(1);
    this.ghost.body.setSize(16, 16).setOffset(8, 16);
    this.ghost.anims.play("ghost", true);

    this.faceless = this.physics.add
      .sprite(650, 320, "faceless")
      .setScale(1.5)
      .setDepth(10)
      .setAlpha(1);
    this.faceless.body.setSize(16, 16).setOffset(8, 16);
    this.faceless.anims.play("faceless", true);

    this.glitch = this.physics.add
      .sprite(750, 320, "glitch")
      .setScale(1.5)
      .setDepth(10)
      .setAlpha(1);
    this.glitch.body.setSize(16, 16).setOffset(8, 16);
    this.glitch.anims.play("glitch", true);

    this.dark = this.physics.add
      .sprite(700, 420, "dark")
      .setScale(1.5)
      .setDepth(10)
      .setAlpha(1);
    this.dark.body.setSize(16, 16).setOffset(8, 16);
    this.dark.anims.play("dark", true);

    this.headless = this.physics.add
      .sprite(500, 420, "headless")
      .setScale(1.5)
      .setDepth(10)
      .setAlpha(1);
    this.headless.body.setSize(16, 16).setOffset(8, 16);
    this.headless.anims.play("headless", true);

    // Tilemap
    const maCarte = this.make.tilemap({ key: "carte1_json" });

    // Tileset
    const tileset = maCarte.addTilesetImage("school", "school");

    // Calques
    const floorLayer = maCarte.createLayer("floor", [tileset], 0, 0);
    const wallsLayer = maCarte.createLayer("walls", [tileset], 0, 0);
    const wallborderLayer = maCarte.createLayer("wallborders", [tileset], 0, 0);
    const objpascol = maCarte.createLayer("objpascol", [tileset], 0, 0);
    const objpascol2 = maCarte.createLayer("objpascol2", [tileset], 0, 0);
    const objcol = maCarte.createLayer("objcol", [tileset], 0, 0);
    // Si un calque contien des zones de collision (variable custom dans Tiled)
    wallsLayer.setCollisionByProperty({ collision: true });
    wallborderLayer.setCollisionByProperty({ collision: true });
    objcol.setCollisionByProperty({ collision: true });
    // Par la suite on peut appliquer une collision avec le layer
    this.physics.add.collider(this.player, wallsLayer);
    this.physics.add.collider(this.player, wallborderLayer);
    this.physics.add.collider(this.player, objcol);

    // Caméra
    this.cameras.main.setBounds(
      this.worldWidth / -2,
      this.worldHeight / -2,
      this.worldWidth,
      this.worldHeight
    );
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.player, true, 0.14, 0.16);
    this.cameras.main.setDeadzone(100, 50);
  }

  update() {
    let velocity = this.walkSpeed;
    if (this.shift.isDown) {
      velocity = this.runSpeed;
    }

    this.move(velocity);
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
}
