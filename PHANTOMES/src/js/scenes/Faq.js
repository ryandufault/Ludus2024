class Faq extends Phaser.Scene {
    constructor() {
      super({ key: "faq" });
    }
    preload() {
        this.load.image("backbtn", "./assets/images/retour.png");
    }
   
    create() {
        let backBtn;
        backBtn = this.add.image(700, 40, "backbtn").setDepth(2).setScale(0.6);
        backBtn.setInteractive();
        backBtn.on("pointerdown", () => {
            this.scene.start("accueil");
        });
    }
    update() {}

  }
  