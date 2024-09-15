class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: "jeu" });
    }
    preload() {

        this.load.image("leavebtn", "./assets/images/quitter.png");
    }

    create() {
        let leaveBtn;
        leaveBtn = this.add.image(700, 40, "leavebtn").setDepth(2).setScale(0.6);
        leaveBtn.setInteractive();
        leaveBtn.on("pointerdown", () => {
            this.scene.start("accueil");
        });
    }

    update() {

    }
}
