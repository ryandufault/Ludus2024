class Jeu2 extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu2",
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
    this.load.tilemapTiledJSON("carte2_json", "./assets/maps/carte2.json");
    this.load.image("school", "./assets/maps/school.png");
  }

  create() {
    this.time.delayedCall(1, () => {
      this.door.play();
    });
    this.scene.launch("hud");
    this.flopen = null;
    this.bgc0 = this.add.graphics();
    this.bgc0.fillStyle(0x000000).setAlpha(1).setDepth(1000);
    this.bgc0.fillRect(0, 0, config.width, config.height);
    this.tweens.add({
      targets: this.bgc0,
      alpha: 0,
      duration: 2000,
      delay: 100,
    });
    this.cameras.main.pan(800, 180, 2000);
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
    this.keyESC = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.player = this.physics.add
      .sprite(60, 180, "walk")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.player.body.setSize(16, 16).setOffset(8, 16);

    // Tilemap
    const maCarte = this.make.tilemap({
      key: "carte2_json",
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
    this.cameras.main.postFX.addVignette(0.5, 0.5, 0.9);

    // pour changer de scene

    this.sceneZone = this.add.rectangle(796, 50, 40, 400).setOrigin(0, 0);
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
      .sprite(250, 120, "ghost")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.ghost.body.setSize(16, 16).setOffset(8, 16);
    this.ghost.anims.play("ghost", true);
    this.physics.add.overlap(this.player, this.ghost, () => {
      this.scene.start("end2");
      this.scene.stop("hud");
      this.wn.stop();
      this.footstep.stop();
    });

    this.faceless = this.physics.add
      .sprite(420, 220, "faceless")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.faceless.body.setSize(16, 16).setOffset(8, 16);
    this.faceless.anims.play("faceless", true);
    this.physics.add.overlap(this.player, this.faceless, () => {
      this.scene.start("end2");
      this.scene.stop("hud");
      this.wn.stop();
      this.footstep.stop();
    });

    this.faceless2 = this.physics.add
      .sprite(220, 290, "faceless")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.faceless2.body.setSize(16, 16).setOffset(8, 16);
    this.faceless2.anims.play("faceless", true);
    this.physics.add.overlap(this.player, this.faceless2, () => {
      this.scene.start("end2");
      this.scene.stop("hud");
      this.wn.stop();
      this.footstep.stop();
    });

    this.glitch = this.physics.add
      .sprite(690, 200, "glitch")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.glitch.body.setSize(16, 16).setOffset(8, 16);
    this.glitch.anims.play("glitch", true);
    this.physics.add.overlap(this.player, this.glitch, () => {
      this.scene.start("end2");
      this.scene.stop("hud");
      this.wn.stop();
      this.footstep.stop();
    });

    this.glitch2 = this.physics.add
      .sprite(790, 300, "glitch")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.glitch2.body.setSize(16, 16).setOffset(8, 16);
    this.glitch2.anims.play("glitch", true);
    this.physics.add.overlap(this.player, this.glitch2, () => {
      this.scene.start("end2");
      this.scene.stop("hud");
      this.wn.stop();
      this.footstep.stop();
    });

    let timelineg2 = this.add.timeline();
    timelineg2.add({
      at: 0,
      tween: {
        targets: this.glitch,
        y: 290,
        duration: 0,
      },
    });
    timelineg2.add({
      at: 1000,
      tween: {
        targets: this.glitch,
        y: 240,
        duration: 0,
      },
    });
    timelineg2.add({
      at: 2000,
      tween: {
        targets: this.glitch,
        y: 290,
        duration: 0,
      },
    });
    timelineg2.play().repeat();

    let timelinef = this.add.timeline();
    timelinef.add({
      at: 0,
      tween: {
        targets: this.faceless2,
        y: 300,
        duration: 0,
      },
    });
    timelinef.add({
      at: 1000,
      tween: {
        targets: this.faceless2,
        y: 250,
        duration: 0,
      },
    });
    timelinef.add({
      at: 2000,
      tween: {
        targets: this.faceless2,
        y: 300,
        duration: 0,
      },
    });
    timelinef.play().repeat();

    let timelinegg2 = this.add.timeline();
    timelinegg2.add({
      at: 0,
      tween: {
        targets: this.glitch2,
        y: 300,
        duration: 0,
      },
    });
    timelinegg2.add({
      at: 500,
      tween: {
        targets: this.glitch2,
        y: 140,
        duration: 0,
      },
    });
    timelinegg2.add({
      at: 1000,
      tween: {
        targets: this.glitch2,
        y: 300,
        duration: 0,
      },
    });
    timelinegg2.play().repeat();

    this.audio();
    this.canPlaySound = true;

    this.maxvol = 0.4;
    this.minvol = 0.0;
    this.wn.play();

    this.time.delayedCall(7000, () => {
      this.a3.play();
    });
    this.time.delayedCall(20300, () => {
      this.a2.play();
    });

    let fx = [
      this.ghost.postFX.addDisplacement("texture", -0.03, -0.03),
      this.faceless.postFX.addDisplacement("texture", -0.03, -0.03),
      this.faceless2.postFX.addDisplacement("texture", -0.03, -0.03),
      this.glitch.postFX.addDisplacement("texture", -0.03, -0.03),
      this.glitch2.postFX.addDisplacement("texture", -0.03, -0.03),
    ];
    this.tweens.add({
      targets: fx,
      x: 0.03,
      y: 0.03,
      yoyo: true,
      loop: -1,
      duration: 2000,
    });
  }

  update() {
    if (this.keyESC.isDown) {
      // Alternative pour le HUD
      this.scene.start("accueil");
      this.scene.stop("hud");
    }

    let velocity = this.walkSpeed;
    if (this.shift.isDown) {
      velocity = this.runSpeed;
    }

    this.move(velocity);

    if (this.physics.overlap(this.player, this.sceneZone)) {
      this.scene.start("jeu3");
      this.wn.stop();
      this.footstep.stop();
    }

    this.wndistance();

    // Flashlight system
    if (this.keyF.isDown) {
      this.showFlopen();
      if (!this.cooldown) {
        const openflashlight = this.flashlight.get(
          this.player.x,
          this.player.y
        );
        if (openflashlight) {
          openflashlight.setActive(true);
          openflashlight.setVisible(true);
          openflashlight.alpha = 1;
          openflashlight.setScale(2.7);
          this.apparitionFantomes();
          this.flashsfx.play();
          this.pianonote.play();
          this.cameras.main.flash(250, 245, 225, 190);
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

      if (!this.reload.isPlaying) {
        this.reload.play();
      }
    }
  }

  move(velocity) {
    this.player.setVelocity(0);

    let isMoving = false;

    if (this.keyA.isDown) {
      this.player.setVelocityX(-velocity);
      this.player.play("left", true);
      isMoving = true;
    } else if (this.keyD.isDown) {
      this.player.setVelocityX(velocity);
      this.player.play("right", true);
      isMoving = true;
    }

    if (this.keyW.isDown) {
      this.player.setVelocityY(-velocity);
      this.player.play("up", true);
      isMoving = true;
    } else if (this.keyS.isDown) {
      this.player.setVelocityY(velocity);
      this.player.play("down", true);
      isMoving = true;
    }

    if (!isMoving) {
      this.player.anims.play("idle", true);
      if (this.footstep.isPlaying) {
        this.footstep.stop();
      }
    } else {
      if (!this.footstep.isPlaying) {
        this.footstep.play();
      }
    }
  }

  wallborders() {
    //bordures (wallborders)

    this.obstacle = this.add.rectangle(0, 0, 10, 444).setOrigin(0, 0); // mur gauche
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle2 = this.add.rectangle(806, 0, 10, 444).setOrigin(0, 0); // mur droit
    this.physics.add.existing(this.obstacle2);
    this.obstacle2.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle2);

    this.obstacle3 = this.add.rectangle(0, 373, 816, 10).setOrigin(0, 0); // mur bas
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
          this.headless,
          this.faceless,
          this.faceless2,
          this.dark,
          this.glitch,
          this.glitch2,
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
          this.headless,
          this.faceless,
          this.faceless2,
          this.dark,
          this.glitch,
          this.glitch2,
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
          this.headless,
          this.faceless,
          this.faceless2,
          this.dark,
          this.glitch,
          this.glitch2,
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
          this.headless,
          this.faceless,
          this.faceless2,
          this.dark,
          this.glitch,
          this.glitch2,
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
          this.headless,
          this.faceless,
          this.faceless2,
          this.dark,
          this.glitch,
          this.glitch2,
        ],
        alpha: 0.01,
        duration: 0,
      },
    });
    timelineaf.play();
  }

  audio() {
    this.flashsfx = this.sound.add("flash", {
      mute: false,
      volume: 0.9,
      rate: 1,
      detune: 600,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.reload = this.sound.add("flashclic", {
      mute: false,
      volume: 0.4,
      rate: 1,
      detune: 400,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.footstep = this.sound.add("footstep", {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 300,
      seek: 1,
      loop: true,
      delay: 0,
    });

    this.door = this.sound.add("door", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.pianonote = this.sound.add("pianonote", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.wn = this.sound.add("whitenoise", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.a4 = this.sound.add("a4", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
    this.a3 = this.sound.add("a3", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
    this.a2 = this.sound.add("a2", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
    this.a1 = this.sound.add("a1", {
      mute: false,
      volume: 0.8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
  }

  wndistance() {
    const ghosts = [
      this.ghost,
      this.faceless,
      this.faceless2,
      this.glitch,
      this.glitch2,
    ];
    let totalVolume = 0;
    const maxDistance = 100;
    const maxVol = 0.8;

    ghosts.forEach((ghost) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        ghost.x,
        ghost.y
      );
      if (distance < maxDistance) {
        const volume = Phaser.Math.Clamp(
          maxVol - (distance / maxDistance) * maxVol,
          0,
          maxVol
        );
        totalVolume += volume;
      }
    });

    this.wn.setVolume(totalVolume);
  }

  showFlopen() {
    if (!this.flopen) {
      this.flopen = this.scene.get("hud").children.getByName("flopen");
    }
    if (this.flopen && this.flopen.alpha === 0) {
      this.flopen.setAlpha(1);
      this.tweens.add({
        targets: this.flopen,
        alpha: 0,
        duration: 4000,
        ease: "cubic.easeOut",
      });
    }
  }
}
