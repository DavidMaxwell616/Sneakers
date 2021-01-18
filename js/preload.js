function preload() {
  //  37x45 is the size of each frame
  //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
  //  blank frames at the end, so we tell the loader how many to load
  game.load.spritesheet('sneakers', 'assets/images/sneakers.png', 47, 47);
  game.load.spritesheet('cyclops', 'assets/images/cyclops.png', 50, 34);
  game.load.spritesheet('saucers', 'assets/images/saucers.png', 50, 25);
  game.load.spritesheet('fangs', 'assets/images/fangs.png', 44, 28);
  game.load.spritesheet('hwings', 'assets/images/hwings.png', 41, 37);
  game.load.spritesheet('meteors', 'assets/images/meteors.png', 56, 58);
  game.load.spritesheet('scrambles', 'assets/images/scrambles.png',50,50);
  game.load.spritesheet('burst', 'assets/images/burst.png', 40, 43);
  game.load.image('laser', 'assets/images/laser.png');
  game.load.image('enemy_laser', 'assets/images/enemy_laser.png');
  game.load.image('background', 'assets/images/background.png');
  game.load.image('player', 'assets/images/player.png');

}
