class Jeu3 extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu3",
    });
  }
  preload() {
    this.load.spritesheet("walk", "./assets/images/walksheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("idle", "./assets/images/idlesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.tilemapTiledJSON("carte3_json", "./assets/maps/carte3.json");
    this.load.image("school", "./assets/maps/school.png");
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

    this.walkSpeed = 100;
    this.runSpeed = 165;

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

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
      .sprite(60, 180, "walk")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.player.body.setSize(16, 16).setOffset(8, 16);

    // Tilemap
    const maCarte = this.make.tilemap({
      key: "carte3_json",
    });

    // Tileset
    const tileset = maCarte.addTilesetImage("school", "school");

    // Calques
    const floorLayer = maCarte.createLayer("floor", [tileset], 0, 0);
    const wallsLayer = maCarte.createLayer("walls", [tileset], 0, 0);
    const objpascol = maCarte.createLayer("objpascol", [tileset], 0, 0);
    const objpascol2 = maCarte.createLayer("objpascol2", [tileset], 0, 0);
    const objcol = maCarte.createLayer("objcol", [tileset], 0, 0);
    const wallborderLayer = maCarte
      .createLayer("wallborders", [tileset], 0, 0)
      .setDepth(800);
    // Si un calque contien des zones de collision (variable custom dans Tiled)
    wallsLayer.setCollisionByProperty({
      collision: true,
    });
    objcol.setCollisionByProperty({
      collision: true,
    });
    // Par la suite on peut appliquer une collision avec le layer
    this.physics.add.collider(this.player, wallsLayer);
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
    this.cameras.main.setDeadzone(50, 20);

    // pour changer de scene

    this.sceneZone = this.add.rectangle(360, 100, 40, 100);
    this.physics.add.existing(this.sceneZone);
    this.sceneZone.body.setImmovable(true);

    this.wallborders();

    // Flashlight system
    this.flashlight = this.physics.add.group({
      defaultKey: "flashglow",
      maxSize: 1,
    });
    this.cooldown = false;

    this.ghost = this.physics.add
      .sprite(103, 180, "ghost")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.ghost.body.setSize(16, 16).setOffset(8, 16);
    this.ghost.anims.play("ghost", true);
    this.physics.add.overlap(this.player, this.ghost, () => {
      this.scene.start("end");
    });

    this.headless = this.physics.add
      .sprite(170, 230, "headless")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.headless.body.setSize(16, 16).setOffset(8, 16);
    this.headless.anims.play("headless", true);
    this.physics.add.overlap(this.player, this.headless, () => {
      this.scene.start("end");
    });

    let timelineh = this.add.timeline();
    timelineh.add({
      at: 0,
      tween: {
        targets: this.headless,
        y: 170,
        x: 220,
        duration: 0,
      },
    });
    timelineh.add({
      at: 500,
      tween: {
        targets: this.headless,
        y: 230,
        x: 220,
        duration: 0,
      },
    });
    timelineh.add({
      at: 1000,
      tween: {
        targets: this.headless,
        y: 170,
        x: 220,
        duration: 0,
      },
    });
    timelineh.play().repeat();

    this.dark = this.physics.add
      .sprite(692, 208, "dark")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.dark.body.setSize(16, 16).setOffset(8, 16);
    this.dark.anims.play("dark", true);
    this.physics.add.overlap(this.player, this.dark, () => {
      this.scene.start("end");
    });

    this.ghost2 = this.physics.add
      .sprite(360, 130, "ghost")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.ghost2.body.setSize(16, 16).setOffset(8, 16);
    this.ghost2.anims.play("ghost", true);
    this.physics.add.overlap(this.player, this.ghost2, () => {
      this.scene.start("end");
    });

    let timelineg2 = this.add.timeline();
    timelineg2.add({
      at: 0,
      tween: {
        targets: this.ghost2,
        x: 330,
        duration: 0,
      },
    });
    timelineg2.add({
      at: 500,
      tween: {
        targets: this.ghost2,
        x: 360,
        duration: 0,
      },
    });
    timelineg2.add({
      at: 1000,
      tween: {
        targets: this.ghost2,
        x: 330,
        duration: 0,
      },
    });
    timelineg2.play().repeat();

  }

  update() {
    if (this.keyESC.isDown) { // Alternative pour le HUD
      this.scene.start("accueil");
    }

    let velocity = this.walkSpeed;
    if (this.shift.isDown) {
      velocity = this.runSpeed;
    }

    this.move(velocity);

    if (this.physics.overlap(this.player, this.sceneZone)) {
      this.scene.start("jeu4");
    }

    // Flashlight system
    if (this.keyF.isDown && !this.cooldown) {
      const openflashlight = this.flashlight.get(this.player.x, this.player.y);

      if (openflashlight) {
        openflashlight.setActive(true);
        openflashlight.setVisible(true);
        openflashlight.alpha = 1;
        openflashlight.setScale(2.7);
        this.apparitionFantomes();
        this.tweens.add({
          targets: openflashlight,
          scale: 1,
          alpha: 0,
          duration: 1500,
          onComplete: () => {
            openflashlight.setActive(false);
            openflashlight.setVisible(false);
          },
        });

        this.cooldown = true;
        this.time.delayedCall(4000, () => {
          this.cooldown = false;
        });
      }
    }
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

  wallborders() {
    //bordures (wallborders)

    this.obstacle = this.add.rectangle(0, 0, 10, 444).setOrigin(0, 0); // mur gauche
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle2 = this.add.rectangle(1286, 0, 10, 444).setOrigin(0, 0); // mur droit
    this.physics.add.existing(this.obstacle2);
    this.obstacle2.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle2);

    this.obstacle3 = this.add.rectangle(0, 373, 1286, 10).setOrigin(0, 0); // mur bas
    this.physics.add.existing(this.obstacle3);
    this.obstacle3.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle3);

    // wallbumpsetc

    this.obstacle4 = this.add.rectangle(10, 100, 8, 44).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle4);
    this.obstacle4.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle4);
  }

  apparitionFantomes() {
    let timelineaf = this.add.timeline();
    timelineaf.add({
      at: 0,
      tween: {
        targets: [
          this.ghost,
          this.ghost2,
          this.headless,
          this.faceless,
          this.dark,
          this.glitch,
        ],
        alpha: 0,
        duration: 0,
      },
    });
    timelineaf.add({
      at: 100,
      tween: {
        targets: [
          this.ghost,
          this.ghost2,
          this.headless,
          this.faceless,
          this.dark,
          this.glitch,
        ],
        alpha: 1,
        duration: 0,
      },
    });
    timelineaf.add({
      at: 200,
      tween: {
        targets: [
          this.ghost,
          this.ghost2,
          this.headless,
          this.faceless,
          this.dark,
          this.glitch,
        ],
        alpha: 0,
        duration: 0,
      },
    });
    timelineaf.add({
      at: 250,
      tween: {
        targets: [
          this.ghost,
          this.ghost2,
          this.headless,
          this.faceless,
          this.dark,
          this.glitch,
        ],
        alpha: 1,
        duration: 0,
      },
    });
    timelineaf.add({
      at: 2400,
      tween: {
        targets: [
          this.ghost,
          this.ghost2,
          this.headless,
          this.faceless,
          this.dark,
          this.glitch,
        ],
        alpha: 0.01,
        duration: 0,
      },
    });
    timelineaf.play();
  }
}