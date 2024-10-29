class Faq extends Phaser.Scene {
    constructor() {
        super({
            key: "faq"
        });
    }
    preload() {
        this.load.image("backbtn", "./assets/images/retour.png");
        this.load.spritesheet("bg", "./assets/images/bgspritesheet.png", {
            frameWidth: 220,
            frameHeight: 165,
        });
        this.load.image("header", "./assets/images/faq/commentjouerheader.png");
        this.load.image("esc", "./assets/images/faq/esc.png");
        this.load.image("f", "./assets/images/faq/f.png");
        this.load.image("f2", "./assets/images/faq/f2.png");
        this.load.spritesheet("ghost", "./assets/images/enemies/ghostsheet.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet("walk", "./assets/images/walksheet.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image("flashglow", "./assets/images/flashglow.png");
    }

    create() {
        this.bgc0 = this.add.graphics();
        this.bgc0.fillStyle(0x000000).setAlpha(1).setDepth(1000);
        this.bgc0.fillRect(0, 0, config.width, config.height);
        this.tweens.add({
            targets: this.bgc0,
            alpha: 0,
            duration: 1000,
            delay: 100,
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
            key: "ghost",
            frames: this.anims.generateFrameNumbers("ghost", {
                start: 0,
                end: 4
            }),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "animate_bg",
            frames: this.anims.generateFrameNumbers("bg", {
                start: 0,
                end: 4
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.bg = this.add.sprite(400, 300, "bg").setScale(4).setDepth(-1).setAlpha(0.4);
        this.bg.play("animate_bg");

        let backBtn;
        backBtn = this.add.image(700, 40, "backbtn").setDepth(2).setScale(0.6);
        backBtn.setInteractive();
        backBtn.on("pointerdown", () => {
            this.scene.start("accueil");
        });
        backBtn.on("pointerover", () => {
            backBtn.setAlpha(1).setScale(0.64).setDepth(223);
        });
        backBtn.on("pointerout", () => {
            backBtn.setAlpha(1).setScale(0.6).setDepth(2);
        });

        this.header = this.add
            .image(0, 100, "header")
            .setOrigin(0, 0)
            .setAlpha(0);
        this.f2 = this.add
            .image(0, 0, "f2")
            .setOrigin(0, 0)
            .setAlpha(0);
        this.f = this.add
            .image(0, 20, "f")
            .setOrigin(0, 0)
            .setAlpha(0);
        this.esc = this.add
            .image(0, 20, "esc")
            .setOrigin(0, 0)
            .setAlpha(0);
        this.tweens.add({
            targets: this.header,
            alpha: 1,
            y: 0,
            duration: 2000,
            delay: 0,
            ease: "Expo.easeOut",
        });
        this.tweens.add({
            targets: this.f,
            alpha: 1,
            y: 0,
            duration: 1000,
            delay: 500,
        });
        this.tweens.add({
            targets: this.esc,
            alpha: 1,
            y: 0,
            duration: 1000,
            delay: 800,
        });
        this.tweens.add({
            targets: this.f2,
            alpha: 1,
            y: 0,
            duration: 1000,
            delay: 1000,
        });

        //visuels
        this.ghost = this.physics.add
            .sprite(720, 220, "ghost")
            .setScale(3.8)
            .setDepth(10)
            .setAlpha(0);
        this.ghost.body.setSize(16, 16).setOffset(8, 16);
        this.ghost.anims.play("ghost", true);
        this.apparitionFantomes()

        this.player = this.physics.add
            .sprite(565, 220, "walk")
            .setScale(3.8)
            .setDepth(10)
            .setAlpha(1);
        this.player.body.setSize(16, 16).setOffset(8, 16);
        this.player.play("right");

        this.flashlight = this.add.sprite(600, 230, "flashglow").setScale(3.1).setDepth(-1).setAlpha(0);
        this.flashlightAnim()


    }
    update() {

    }
    apparitionFantomes() {
        let timelineaf = this.add.timeline();
        timelineaf.add({
            at: 1000,
            tween: {
                targets: [
                    this.ghost,
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
            at: 1100,
            tween: {
                targets: [
                    this.ghost,
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
            at: 1200,
            tween: {
                targets: [
                    this.ghost,
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
            at: 1250,
            tween: {
                targets: [
                    this.ghost,
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
            at: 3400,
            tween: {
                targets: [
                    this.ghost,
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
            at: 4400,
            tween: {
                targets: [
                    this.ghost,
                    this.headless,
                    this.faceless,
                    this.dark,
                    this.glitch,
                ],
                alpha: 0,
                duration: 0,
            },
        });
        timelineaf.play().repeat();
    }

    flashlightAnim() {
        let timelinefa = this.add.timeline();
        timelinefa.add({
            at: 1000,
            tween: {
                targets: this.flashlight,
                scale: 3.1,
                alpha: 1,
                duration: 0,
            },
        });
        timelinefa.add({
            at: 1500,
            tween: {
                targets: this.flashlight,
                scale: 1,
                alpha: 0,
                duration: 1000,
            },
        });
        timelinefa.add({
            at: 4380,
            tween: {
                targets: this.flashlight,
                alpha: 0,
                duration: 0,
            },
        });
        timelinefa.play().repeat();
    }
}