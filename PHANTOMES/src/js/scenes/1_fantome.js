// fichier de notes pour ajouter les fantômes plus rapidement

//import()
this.load.spritesheet("ghost", "./assets/images/enemies/ghostsheet.png", {
  frameWidth: 32,
  frameHeight: 32,
});

this.load.spritesheet("glitch", "./assets/images/enemies/glitchsheet.png", {
  frameWidth: 32,
  frameHeight: 32,
});

this.load.spritesheet("dark", "./assets/images/enemies/darksheet.png", {
  frameWidth: 32,
  frameHeight: 32,
});

this.load.spritesheet("headless", "./assets/images/enemies/headlesssheet.png", {
  frameWidth: 32,
  frameHeight: 32,
});

this.load.spritesheet("faceless", "./assets/images/enemies/facelesssheet.png", {
  frameWidth: 32,
  frameHeight: 32,
});

//create()

//animghosts
this.anims.create({
  key: "ghost",
  frames: this.anims.generateFrameNumbers("ghost", { start: 0, end: 4 }),
  frameRate: 6,
  repeat: -1,
});

this.anims.create({
  key: "faceless",
  frames: this.anims.generateFrameNumbers("faceless", { start: 0, end: 4 }),
  frameRate: 6,
  repeat: -1,
});

this.anims.create({
  key: "glitch",
  frames: this.anims.generateFrameNumbers("glitch", { start: 0, end: 4 }),
  frameRate: 6,
  repeat: -1,
});

this.anims.create({
  key: "dark",
  frames: this.anims.generateFrameNumbers("dark", { start: 0, end: 4 }),
  frameRate: 6,
  repeat: -1,
});

this.anims.create({
  key: "headless",
  frames: this.anims.generateFrameNumbers("headless", { start: 0, end: 4 }),
  frameRate: 6,
  repeat: -1,
});

//ghosts
this.ghost = this.physics.add
  .sprite(450, 320, "ghost")
  .setScale(2)
  .setDepth(10)
  .setAlpha(1);
this.ghost.body.setSize(16, 16).setOffset(8, 16);
this.ghost.anims.play("ghost", true);
this.physics.add.overlap(this.player, this.ghost, () => {
  this.scene.start("end");
});

this.faceless = this.physics.add
  .sprite(650, 320, "faceless")
  .setScale(2)
  .setDepth(10)
  .setAlpha(1);
this.faceless.body.setSize(16, 16).setOffset(8, 16);
this.faceless.anims.play("faceless", true);
this.physics.add.overlap(this.player, this.faceless, () => {
  this.scene.start("end");
});

this.glitch = this.physics.add
  .sprite(750, 320, "glitch")
  .setScale(2)
  .setDepth(10)
  .setAlpha(1);
this.glitch.body.setSize(16, 16).setOffset(8, 16);
this.glitch.anims.play("glitch", true);
this.physics.add.overlap(this.player, this.glitch, () => {
  this.scene.start("end");
});

this.dark = this.physics.add
  .sprite(700, 420, "dark")
  .setScale(2)
  .setDepth(10)
  .setAlpha(1);
this.dark.body.setSize(16, 16).setOffset(8, 16);
this.dark.anims.play("dark", true);
this.physics.add.overlap(this.player, this.dark, () => {
  this.scene.start("end");
});

this.headless = this.physics.add
  .sprite(500, 420, "headless")
  .setScale(2)
  .setDepth(10)
  .setAlpha(1);
this.headless.body.setSize(16, 16).setOffset(8, 16);
this.headless.anims.play("headless", true);
this.physics.add.overlap(this.player, this.headless, () => {
  this.scene.start("end");
});


//fantôme qui se téléporte
let timeline = this.add.timeline();
timeline.add({
  at: 0,
  tween: {
    targets: this.ghost,
    x: 467,
    y: 275,
    duration: 0,
  }
});
timeline.add({
  at: 1000,
  tween: {
    targets: this.ghost,
    x: 600,
    y: 500,
    duration: 0,
  }
});
timeline.add({
  at: 2000,
  tween: {
    targets: this.ghost,
    x: 400,
    y: 500,
    duration: 0,
  }
});
timeline.add({
  at: 3000,
  tween: {
    targets: this.ghost,
    x: 400,
    y: 300,
    duration: 0,
  }
});
timeline.play().repeat();