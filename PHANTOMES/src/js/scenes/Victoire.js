class Victoire extends Phaser.Scene {
  constructor() {
    super({ key: "victoire" });
  }

  // quand on souffle sur la bougie, ça nous ramène au menu
  preload() {
    this.load.image("menuBtn", "./assets/images/menu.png");
    this.load.spritesheet("walk", "./assets/images/walksheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("idle", "./assets/images/idlesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.tilemapTiledJSON("win_json", "./assets/maps/win.json");
    this.load.image("school", "./assets/maps/school.png");
    this.load.image("winmsg", "./assets/images/thankyou.webp");
    this.load.image("menuwin", "./assets/images/menuwin.webp");

    this.load.image("plant1", "https://assets.codepen.io/9367036/plant1.png");
  }

  create() {
    this.bgc0 = this.add.graphics();
    this.bgc0.fillStyle(0xffffff).setAlpha(1).setDepth(1010);
    this.bgc0.fillRect(0, 0, 10000, 10000);
    this.tweens.add({
      targets: this.bgc0,
      alpha: 0,
      duration: 4000,
      delay: 100,
    });

    this.bgc1 = this.add.graphics();
    this.bgc1.fillStyle(0xffffff).setAlpha(1).setDepth(-1);
    this.bgc1.fillRect(0, 0, 20000, 20000);

    this.walkSpeed = 108;

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyESC = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.player = this.physics.add
      .sprite(945, 628, "walk")
      .setScale(2)
      .setDepth(10)
      .setAlpha(1);
    this.player.body.setSize(16, 16).setOffset(8, 16);

    // Tilemap
    const maCarte = this.make.tilemap({
      key: "win_json",
    });

    // Tileset
    const tileset = maCarte.addTilesetImage("school", "school");

    // Calques
    const floorLayer = maCarte.createLayer("floor", [tileset], 0, 0);
    const wallsLayer = maCarte.createLayer("walls", [tileset], 0, 0);
    const objpascol = maCarte.createLayer("objpascol", [tileset], 0, 0);
    const objcol = maCarte.createLayer("objcol", [tileset], 0, 0);
    const objpascol2 = maCarte.createLayer("objpascol2", [tileset], 0, 0);
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
    this.cameras.main.setZoom(1.7);
    this.cameras.main.startFollow(this.player, true, 0.14, 0.16);
    this.cameras.main.setDeadzone(50, 20);

    this.wallborders();

    this.winmsg = this.add
      .image(450, 320, "winmsg")
      .setOrigin(0, 0)
      .setAlpha(0)
      .setScale(0.54);
    this.menuwin = this.add
      .image(800, 860, "menuwin")
      .setAlpha(0)
      .setScale(0.2);
    this.tweens.add({
      targets: this.winmsg,
      y: 280,
      alpha: 1,
      duration: 1000,
      delay: 500,
      ease: "Quad.easeOut",
    });
    this.tweens.add({
      targets: this.menuwin,
      alpha: 1,
      duration: 1500,
      delay: 1000,
    });
    this.menuwin.setInteractive();
    this.menuwin.on("pointerdown", () => {
      this.scene.start("accueil");
    });
    this.menuwin.on("pointerover", () => {
      this.menuwin.setScale(0.204);
    });
    this.menuwin.on("pointerout", () => {
      this.menuwin.setScale(0.2);
    });

    this.feuille = this.physics.add.image(300, 400, "plant1").setDepth(1002);
    this.feuille
      .setVelocity(Phaser.Math.Between(100, 25))
      .setCollideWorldBounds(false);
    this.feuille2 = this.physics.add.image(500, 300, "plant1").setDepth(1002);
    this.feuille2
      .setVelocity(Phaser.Math.Between(75, 25))
      .setCollideWorldBounds(false);
    this.feuille3 = this.physics.add.image(700, 200, "plant1").setDepth(1002);
    this.feuille3
      .setVelocity(Phaser.Math.Between(50, 25))
      .setCollideWorldBounds(false);

    this.physics.world.setBounds(500, 500, 600, 400);
  }

  update() {
    if (this.keyESC.isDown) {
      // Alternative pour le HUD
      this.scene.start("accueil");
    }

    let velocity = this.walkSpeed;

    this.move(velocity);

    if (this.physics.overlap(this.player, this.sceneZone)) {
      this.scene.start("victoire");
    }
    this.wrapAround();
  }

  wrapAround() {
    this.physics.world.wrap(this.feuille, 5);
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

    this.obstacle = this.add.rectangle(574, 420, 10, 450).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(1000, 520, 10, 250).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(804, 768, 300, 10).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(574, 520, 400, 86).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(776, 593, 63, 23).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(726, 672, 83, 28).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(586, 682, 23, 39).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(639, 773, 19, 19).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(578, 803, 289, 10).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);

    this.obstacle = this.add.rectangle(578, 953, 819, 10).setOrigin(0, 0);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable();
    this.physics.add.collider(this.player, this.obstacle);
  }
}
