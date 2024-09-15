const config = {
    type: Phaser.AUTO,
    parent: "canvas-wrapper",
    width: 800,
    height: 600,
    scene: [Accueil, Jeu, Credits, Faq, PartieTerminee, Victoire],
    transparent: false,
    pixelArt: true,
    disableContextMenu: true,
    backgroundColor: '#12090a'
};
const game = new Phaser.Game(config);