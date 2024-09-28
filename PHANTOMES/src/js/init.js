const config = {
    type: Phaser.AUTO,
    parent: "canvas-wrapper",
    width: 816,
    height: 624,
    scene: [Accueil, Jeu, Credits, Faq, PartieTerminee, Victoire],
    transparent: false,
    pixelArt: true,
    disableContextMenu: true,
    backgroundColor: '#12090a',
    physics: {
        default: "arcade",
        arcade: {
            debug: true
          }
    }
};
const game = new Phaser.Game(config);