function preload() {
  //  37x45 is the size of each frame
  //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
  //  blank frames at the end, so we tell the loader how many to load
  game.load.spritesheet('sneakers', 'assets/images/SNEAKERS2.PNG', 47, 47);
  game.load.spritesheet('cyclops', 'assets/images/cyclops.PNG', 50, 34);
  game.load.spritesheet('saucers', 'assets/images/saucers.PNG', 50, 25);
  game.load.spritesheet('fangs', 'assets/images/fangs.PNG', 44, 28);
  game.load.spritesheet('hwings', 'assets/images/hwings.PNG', 41, 37);
  game.load.spritesheet('meteors', 'assets/images/meteors.PNG', 56, 58);
  game.load.spritesheet('scrambles', 'assets/images/scrambles.PNG',50,50);
  game.load.spritesheet('burst', 'assets/images/BURST.PNG', 40, 42);
  game.load.image('laser', 'assets/images/laser.PNG');
  game.load.image('enemy_laser', 'assets/images/enemy_laser.PNG');
  game.load.image('background', 'assets/images/SNEAKERSBKGD.PNG');
  game.load.image('player', 'assets/images/PLAYER.PNG');

}
