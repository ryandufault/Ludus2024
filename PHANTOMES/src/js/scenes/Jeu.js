class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: "jeu" });
    }
    preload() {


        this.load.image("leavebtn", "./assets/images/quitter.png");
        this.load.image("staticchar", "./assets/images/idlestatic.png");

        this.load.tilemapTiledJSON("carte1_json", "./assets/maps/carte1.json");
        this.load.image("school", "./assets/maps/school.png");
    }

    create() {
        this.walkSpeed = 150;
        this.runSpeed = 210;

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        

        let leaveBtn;
        leaveBtn = this.add.image(700, 580, "leavebtn").setDepth(2).setScale(0.6);
        leaveBtn.setInteractive();
        leaveBtn.on("pointerdown", () => {
            this.scene.start("accueil");
        });


        this.player = this.physics.add.image(550, 320, 'staticchar').setScale(1.5).setDepth(10).setAlpha(1);
        this.player.body.setSize(16, 16).setOffset(8, 16);
      /*this.anims.create({
            key: 'animate_introtest',
            frames: this.anims.generateFrameNumbers('introchar', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });*/
        //this.player = this.physics.add.sprite(550, 320, 'introchar').setScale(1.5).setDepth(10).setAlpha(1);
        //this.player.play('animate_introtest');

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
        
    }

    update() {
        let velocity = this.walkSpeed;
        if (this.shift.isDown) {
            velocity = this.runSpeed;
        }
    
        this.move(velocity);
    }
    
    move(velocity) {
        if (this.keyA.isDown) {
            this.player.setVelocityX(-velocity);
        } else if (this.keyD.isDown) {
            this.player.setVelocityX(velocity);
        } else {
            this.player.setVelocityX(0);
        }
    
        if (this.keyW.isDown) {
            this.player.setVelocityY(-velocity);
        } else if (this.keyS.isDown) {
            this.player.setVelocityY(velocity);
        } else {
            this.player.setVelocityY(0);
        }
    }
}
