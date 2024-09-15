class PartieTerminee extends Phaser.Scene {
    constructor() {
      super({ key: "end" });
    }
    preload() {
        this.load.image("restartBtn", "./assets/images/recommencer.png");
        this.load.image("menuBtn", "./assets/images/menu.png");
    }
   
    create() {
        let restartBtn;
        restartBtn = this.add.image(700, 40, "restartBtn").setDepth(2).setScale(0.6);
        restartBtn.setInteractive();
        restartBtn.on("pointerdown", () => {
            this.scene.start("jeu");
        });

        let menuBtn;
        menuBtn = this.add.image(700, 80, "menuBtn").setDepth(2).setScale(0.6);
        menuBtn.setInteractive();
        menuBtn.on("pointerdown", () => {
            this.scene.start("accueil");
        });
    }
    update() {}

  }
  