class Accueil extends Phaser.Scene {
    constructor() {
        super({ key: "accueil" }); 
      }
    preload() {
        this.load.spritesheet("bg", "./assets/images/bgspritesheet.png", { frameWidth: 220, frameHeight: 165 });
        this.load.image("logo", "./assets/images/logo.png");
        this.load.image("startbtn", "./assets/images/commencer.png");
        this.load.image("creditsbtn", "./assets/images/credit.png");
        this.load.image("faqbtn", "./assets/images/faq.png");
        this.load.image("mutebtn", "./assets/images/audio.png");
    }

    create() {
        this.anims.create({
            key: 'animate_bg',
            frames: this.anims.generateFrameNumbers('bg', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.bg = this.add.sprite(400, 300, 'bg').setScale(4).setDepth(1);
        this.bg.play('animate_bg');

        this.add.image(275, 125, "logo").setDepth(2).setScale(1.4);

        let startBtn;
        startBtn = this.add.image(185, 250, "startbtn").setDepth(2).setScale(1);
        startBtn.setInteractive();
        startBtn.on("pointerdown", () => {
            this.scene.start("jeu");
        });

        let creditBtn;     
        creditBtn = this.add.image(185, 310, "creditsbtn").setDepth(2).setScale(1);
        creditBtn.setInteractive();
        creditBtn.on("pointerdown", () => {
            this.scene.start("credits");
        });

        
        let faqBtn;     
        faqBtn = this.add.image(218, 370, "faqbtn").setDepth(2).setScale(1);
        faqBtn.setInteractive();
        faqBtn.on("pointerdown", () => {
            this.scene.start("faq");
        });

        let muteBtn;
        muteBtn = this.add.image(110, 430, "mutebtn").setDepth(2).setScale(1);
        muteBtn.setInteractive();
        muteBtn.on("pointerdown", () => {

        });
    }

    update() {

    }
}