class Jeu extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu"
    });
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
      "./assets/images/enemies/headlesssheet.png", {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.spritesheet(
      "faceless",
      "./assets/images/enemies/facelesssheet.png", {
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

    //anim player
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 0,
        end: 3
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 4,
        end: 7
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 8,
        end: 11
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 12,
        end: 15
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("idle", {
        start: 5,
        end: 9
      }),
      frameRate: 5,
      repeat: -1,
    });

    //animghosts
    this.anims.create({
      key: "ghost",
      frames: this.anims.generateFrameNumbers("ghost", {
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "faceless",
      frames: this.anims.generateFrameNumbers("faceless", {
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "glitch",
      frames: this.anims.generateFrameNumbers("glitch", {
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "dark",
      frames: this.anims.generateFrameNumbers("dark", {
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "headless",
      frames: this.anims.generateFrameNumbers("headless", {
        start: 0,
        end: 4
      }),
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
      .sprite(265, 530, "walk")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.player.body.setSize(16, 16).setOffset(8, 16);

    //ghosts
    this.ghost = this.physics.add
      .sprite(450, 420, "ghost")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.ghost.body.setSize(16, 16).setOffset(8, 16);
    this.ghost.anims.play("ghost", true);
    this.physics.add.overlap(this.player, this.ghost, () => {
      this.scene.start("end");
    });

    this.faceless = this.physics.add
      .sprite(650, 420, "faceless")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.faceless.body.setSize(16, 16).setOffset(8, 16);
    this.faceless.anims.play("faceless", true);
    this.physics.add.overlap(this.player, this.faceless, () => {
      this.scene.start("end");
    });

    this.glitch = this.physics.add
      .sprite(750, 420, "glitch")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.glitch.body.setSize(16, 16).setOffset(8, 16);
    this.glitch.anims.play("glitch", true);
    this.physics.add.overlap(this.player, this.glitch, () => {
      this.scene.start("end");
    });

    this.dark = this.physics.add
      .sprite(700, 420, "dark")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.dark.body.setSize(16, 16).setOffset(8, 16);
    this.dark.anims.play("dark", true);
    this.physics.add.overlap(this.player, this.dark, () => {
      this.scene.start("end");
    });

    this.headless = this.physics.add
      .sprite(600, 420, "headless")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.headless.body.setSize(16, 16).setOffset(8, 16);
    this.headless.anims.play("headless", true);
    this.physics.add.overlap(this.player, this.headless, () => {
      this.scene.start("end");
    });

    // Tilemap
    const maCarte = this.make.tilemap({
      key: "carte1_json"
    });

    // Tileset
    const tileset = maCarte.addTilesetImage("school", "school");

    // Calques
    const floorLayer = maCarte.createLayer("floor", [tileset], 0, 0);
    const wallsLayer = maCarte.createLayer("walls", [tileset], 0, 0);
    const wallborderLayer = maCarte
      .createLayer("wallborders", [tileset], 0, 0)
      .setDepth(800);
    const objpascol = maCarte.createLayer("objpascol", [tileset], 0, 0);
    const objpascol2 = maCarte.createLayer("objpascol2", [tileset], 0, 0);
    const objcol = maCarte.createLayer("objcol", [tileset], 0, 0);
    // Si un calque contien des zones de collision (variable custom dans Tiled)
    wallsLayer.setCollisionByProperty({
      collision: true
    });
    objcol.setCollisionByProperty({
      collision: true
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

    let timeline = this.add.timeline();
    timeline.add({
      at: 0,
      tween: {
        targets: this.ghost,
        x: 467,
        y: 275,
        duration: 0,
      },
    });
    timeline.add({
      at: 600,
      tween: {
        targets: this.ghost,
        x: 542,
        y: 275,
        duration: 0,
      },
    });
    timeline.add({
      at: 1200,
      tween: {
        targets: this.ghost,
        x: 542,
        y: 325,
        duration: 0,
      },
    });
    timeline.add({
      at: 1800,
      tween: {
        targets: this.ghost,
        x: 467,
        y: 325,
        duration: 0,
      },
    });
    timeline.add({
      at: 2400,
      tween: {
        targets: this.ghost,
        x: 467,
        y: 275,
        duration: 0,
      },
    });
    timeline.play().repeat();

    // pour changer de scene

    this.sceneZone = this.add.rectangle(746, 50, 40, 100);
    this.physics.add.existing(this.sceneZone);
    this.sceneZone.body.setImmovable(true);
  }

  update() {
    let velocity = this.walkSpeed;
    if (this.shift.isDown) {
      velocity = this.runSpeed;
    }

    this.move(velocity);
    this.wallborders();

    if (this.physics.overlap(this.player, this.sceneZone)) {
      this.scene.start('jeu2');
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

    this.obstacle = this.add.rectangle(-4, 0, 10, 624).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle2 = this.add.rectangle(810, 0, 10, 624).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle2);
    this.obstacle2.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle2);

    this.obstacle3 = this.add.rectangle(0, 616, 816, 10).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle3);
    this.obstacle3.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle3);

    // wallbumpsetc

    this.obstacle4 = this.add.rectangle(10, 100, 8, 34).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle4);
    this.obstacle4.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle4);

    this.obstacle5 = this.add.rectangle(10, 190, 8, 184).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle5);
    this.obstacle5.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle5);

    this.obstacle6 = this.add.rectangle(10, 478, 8, 87).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle6);
    this.obstacle6.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle6);


    this.obstacle8 = this.add.rectangle(798, 190, 8, 234).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle8);
    this.obstacle8.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle8);

    this.obstacle9 = this.add.rectangle(798, 440, 8, 74).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle9);
    this.obstacle9.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle9);
  }
}