class Jeu4 extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu4",
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
    this.load.tilemapTiledJSON("carte4_json", "./assets/maps/carte4.json");
    this.load.image("school", "./assets/maps/school.png");
  }

  create() {
    this.time.delayedCall(1, () => {
      this.door.play();
    });
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
    this.keyESC = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.player = this.physics.add
      .sprite(450, 480, "walk")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.player.body.setSize(16, 16).setOffset(8, 16);

    // Tilemap
    const maCarte = this.make.tilemap({
      key: "carte4_json",
    });

    // Tileset
    const tileset = maCarte.addTilesetImage("school", "school");

    // Calques
    const floorLayer = maCarte.createLayer("floor", [tileset], 0, 0);
    const wallsLayer = maCarte.createLayer("walls", [tileset], 0, 0);
    const objpascol = maCarte.createLayer("objpascol", [tileset], 0, 0);
    const objpascol2 = maCarte.createLayer("objpascol2", [tileset], 0, 0);
    const objcol = maCarte.createLayer("objcol", [tileset], 0, 0);
    const objcol2 = maCarte.createLayer("objcol2", [tileset], 0, 0);
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
    objcol2.setCollisionByProperty({
      collision: true,
    });
    // Par la suite on peut appliquer une collision avec le layer
    this.physics.add.collider(this.player, wallsLayer);
    this.physics.add.collider(this.player, objcol);
    this.physics.add.collider(this.player, objcol2);

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

    this.sceneZone = this.add.rectangle(280, 210, 45, 28);
    this.physics.add.existing(this.sceneZone);
    this.sceneZone.body.setImmovable(true);

    this.wallborders();

    // Flashlight system
    this.flashlight = this.physics.add.group({
      defaultKey: "flashglow",
      maxSize: 1,
    });
    this.cooldown = false;

    this.dark = this.physics.add
      .sprite(281, 160, "dark")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.dark.body.setSize(16, 16).setOffset(8, 16);
    this.dark.anims.play("dark", true);
    this.physics.add.overlap(this.player, this.dark, () => {
      this.scene.start("end4");
      this.wn.stop();
      this.footstep.stop();
    });

    this.dark2 = this.physics.add
      .sprite(221, 194, "dark")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.dark2.body.setSize(16, 16).setOffset(8, 16);
    this.dark2.anims.play("dark", true);
    this.physics.add.overlap(this.player, this.dark2, () => {
      this.scene.start("end4");
      this.wn.stop();
      this.footstep.stop();
    });

    let timelined1 = this.add.timeline();
    timelined1.add({
      at: 0,
      tween: {
        targets: this.dark,
        y: 160,
        duration: 0,
      },
    });
    timelined1.add({
      at: 500,
      tween: {
        targets: this.dark,
        y: 250,
        duration: 0,
      },
    });
    timelined1.add({
      at: 1000,
      tween: {
        targets: this.dark,
        y: 160,
        duration: 0,
      },
    });
    timelined1.play().repeat();

    let timelined2 = this.add.timeline();
    timelined2.add({
      at: 0,
      tween: {
        targets: this.dark2,
        x: 221,
        duration: 0,
      },
    });
    timelined2.add({
      at: 650,
      tween: {
        targets: this.dark2,
        x: 360,
        duration: 0,
      },
    });
    timelined2.add({
      at: 1300,
      tween: {
        targets: this.dark2,
        x: 221,
        duration: 0,
      },
    });
    timelined2.play().repeat();

    this.headless = this.physics.add
      .sprite(550, 400, "headless")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.headless.body.setSize(16, 16).setOffset(8, 16);
    this.headless.anims.play("headless", true);
    this.physics.add.overlap(this.player, this.headless, () => {
      this.scene.start("end4");
      this.wn.stop();
      this.footstep.stop();
    });

    this.headless2 = this.physics.add
      .sprite(475, 300, "headless") //changer le X a 415 quand t'aura fini le système d'interrupteur
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.headless2.body.setSize(16, 16).setOffset(8, 16);
    this.headless2.anims.play("headless", true);
    this.physics.add.overlap(this.player, this.headless2, () => {
      this.scene.start("end4");
      this.wn.stop();
      this.footstep.stop();
    });

    this.headless3 = this.physics.add
      .sprite(545, 250, "headless")
      .setScale(2)
      .setDepth(10)
      .setAlpha(0);
    this.headless3.body.setSize(16, 16).setOffset(8, 16);
    this.headless3.anims.play("headless", true);
    this.physics.add.overlap(this.player, this.headless3, () => {
      this.scene.start("end4");
      this.wn.stop();
      this.footstep.stop();
    });

    this.audio();
    this.canPlaySound = true;

    this.maxvol = 0.4;
    this.minvol = 0.0;
    this.wn.play();

    this.time.delayedCall(10000, () => {
      this.a2.play();
    });
    this.time.delayedCall(20300, () => {
      this.a3.play();
    });
  }

  update() {
    if (this.keyESC.isDown) {
      // Alternative pour le HUD
      this.scene.start("accueil");
    }

    let velocity = this.walkSpeed;
    if (this.shift.isDown) {
      velocity = this.runSpeed;
    }

    this.move(velocity);

    if (this.physics.overlap(this.player, this.sceneZone)) {
      this.scene.start("jeu5");
      this.wn.stop();
      this.footstep.stop();
      this.wn.stop();
      this.footstep.stop();
    }

    this.wndistance();

    // Flashlight system
    if (this.keyF.isDown) {
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

    this.obstacle = this.add.rectangle(188, 0, 10, 444).setOrigin(0, 0); // mur gauche
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(380, 277, 10, 444).setOrigin(0, 0); // mur gauche
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle2 = this.add.rectangle(1286, 0, 10, 444).setOrigin(0, 0); // mur droit
    this.physics.add.existing(this.obstacle2);
    this.obstacle2.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle2);

    this.obstacle3 = this.add.rectangle(0, 519, 1286, 10).setOrigin(0, 0); // mur bas
    this.physics.add.existing(this.obstacle3);
    this.obstacle3.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle3);

    this.obstacle3 = this.add.rectangle(0, 277, 380, 10).setOrigin(0, 0); // mur bas
    this.physics.add.existing(this.obstacle3);
    this.obstacle3.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle3);

    // wallbumpsetc

    this.obstacle4 = this.add.rectangle(198, 100, 8, 74).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle4);
    this.obstacle4.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle4);

    this.obstacle5 = this.add.rectangle(392, 285, 8, 94).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle5);
    this.obstacle5.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle5);

    this.obstacle6 = this.add.rectangle(392, 430, 8, 94).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle6);
    this.obstacle6.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle6);
  }

  apparitionFantomes() {
    let timelineaf = this.add.timeline();
    timelineaf.add({
      at: 0,
      tween: {
        targets: [
          this.ghost,
          this.headless,
          this.headless2,
          this.headless3,
          this.faceless,
          this.dark,
          this.dark2,
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
          this.headless,
          this.headless2,
          this.headless3,
          this.faceless,
          this.dark,
          this.dark2,
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
          this.headless,
          this.headless2,
          this.headless3,
          this.faceless,
          this.dark,
          this.dark2,
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
          this.headless,
          this.headless2,
          this.headless3,
          this.faceless,
          this.dark,
          this.dark2,
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
          this.headless,
          this.headless2,
          this.headless3,
          this.faceless,
          this.dark,
          this.dark2,
          this.glitch,
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
      volume: 0.9, // 0 (muet) et 1 (volume maximum)
      rate: 1, // Change la vitesse de lecture. 1 est la vitesse normale
      detune: 600, // Change la fréquence (ex : -1200 pour une octave inférieure)
      seek: 0, // Position de démarrage en secondes
      loop: false,
      delay: 0, // Temps en secondes avant de lancer le son après play()
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
      this.dark,
      this.dark2,
      this.headless,
      this.headless2,
      this.headless3,
    ];
    let totalVolume = 0;
    const maxDistance = 100;
    const maxVol = 0.4;

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
}
