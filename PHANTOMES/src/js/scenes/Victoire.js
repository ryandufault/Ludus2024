class Victoire extends Phaser.Scene {
    constructor() {
      super({ key: "victoire" });
    }
    preload() {
        this.load.image("menuBtn", "./assets/images/menu.png");
    }
   
    create() {
        let menuBtn;
        menuBtn = this.add.image(700, 80, "menuBtn").setDepth(2).setScale(0.6);
        menuBtn.setInteractive();
        menuBtn.on("pointerdown", () => {
            this.scene.start("accueil");
        });
    }

    update() {}

  }
  