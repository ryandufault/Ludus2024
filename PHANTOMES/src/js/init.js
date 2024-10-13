const config = {
    type: Phaser.AUTO,
    parent: "canvas-wrapper",
    width: 816,
    height: 624,
    scene: [Accueil, Jeu, Credits, Faq, PartieTerminee, Victoire, Jeu2, Jeu3, Jeu4, Jeu5, Jeu6, Jeu7],
    transparent: false,
    pixelArt: true,
    disableContextMenu: true,
    backgroundColor: '#000000',
    physics: {
        default: "arcade",
        arcade: {
            debug: true
          }
    }
};
const game = new Phaser.Game(config);