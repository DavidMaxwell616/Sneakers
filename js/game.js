var game = new Phaser.Game(640,
  480,
  Phaser.AUTO,
  'phaser-example',
  { preload: preload, create: create, update: update });

const width = game.width-50;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#000000';
  player = game.add.sprite(width / 2, game.height - 70, 'player');
  player.xv = 0;
  var background = this.add.image(0, 0, 'background');
  background.width = this.game.width;
  background.height = this.game.height-6;

  var style = { font: "72px Arial", fill: '#ff0000', align: "center" };
  introText = game.add.text(width / 2, game.height / 3, "SNEAKERS", style);
  introText.anchor.set(0.5);
  var introTextString = "Move Right - Right Arrow \n" +
      "Move Left - Left Arrow \n" +
      "Fire - Space Bar \n" +
      "Press Any Key to Start";
  introText2 = game.add.text(width / 2, game.height /1.75, introTextString, {
      font: "24px Arial",
      fill: "#ff0000",
      align: "center"
  });
  introText2.anchor.set(0.5);
  introText2.visible = false;

  
  infoText = game.add.text(width / 2, game.height / 2, "", {
      font: "32px Arial",
      fill: "#ff0000",
      align: "center"
  });
  infoText.anchor.set(0.5);
  infoText.visible = false;

  Init_Laser();

  Init_Enemies();

  Init_Bursts();
  leftArrow = game.add.button(55, game.world.height+15, 'scrambles', leftClick, this, 2, 1, 0);
  leftArrow.frame = 2;
  leftArrow.angle=-90;
  rightArrow = game.add.button(55, game.world.height-35, 'scrambles', rightClick, this, 2, 1, 0);
  rightArrow.frame = 2;
  rightArrow.angle=-270;
  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  playKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
  game.input.onDown.add(Fire, this);
  highScore = localStorage.getItem(localStorageName) == null ? 0 :
            localStorage.getItem(localStorageName);
  Draw_Info();
}

function leftClick(){
  player.xv = 8;
}

function rightClick(){
  player.xv = -8;

}

function Init_Enemies() {
switch (Level) {
  case 1:
    for (var enemy = 0; enemy <= sneakers_active; enemy++) {
      var sneaker = game.add.sprite(game.width / 2, game.height / 2, 'sneakers');
      if (enemy < sneakers_active / 2) {
        sneaker.animations.add('bluesneaker', game.math.numberArray(0, 3));
        sneaker.animations.play('bluesneaker', 10,true);
      }
      else {
        sneaker.animations.add('yellowsneaker', game.math.numberArray(4, 7));
        sneaker.animations.play('yellowsneaker',10, true);
      }
      sneaker.xv = (game.rnd.integerInRange(1,2) * attack_speed);
      sneaker.yv = (game.rnd.integerInRange(1, 2) * attack_speed);
      sneaker.x = game.rnd.integerInRange(0,500);
      sneaker.y = game.rnd.integerInRange(0, 140);
      sneaker.anchor.set(0.5);
      sneaker.value = 50;
      sneakers.push(sneaker);
  }
    
    break;
    case 2:
   //CREATE CYCLOPS
   for (enemy = 0; enemy <= cyclops_active; enemy++) {
    var cyclop = game.add.sprite(game.width / 2, game.height - 60, 'cyclops');
    if (enemy < cyclops_active / 2) {
        cyclop.animations.add('bluecyclops', game.math.numberArray(0, 3));
        cyclop.animations.play('bluecyclops', 10,true);
      }
    else {
        cyclop.animations.add('yellowcyclops', game.math.numberArray(4, 7));
        cyclops.animations.play('yellowcyclops', 10,true);
    }
    cyclop.xv=attack_speed;
    cyclop.value = 100;
        cyclop.anchor.set(0.5);
    cyclops.push(cyclops);
  }
  cyclops[0].x = 250; cyclops[0].y = 100;
  cyclops[1].x = 200; cyclops[1].y = 150;
  cyclops[2].x = 300; cyclops[2].y = 150;
  cyclops[3].x = 150; cyclops[3].y = 200;
  cyclops[4].x = 200; cyclops[4].y = 200;
  cyclops[5].x = 250; cyclops[5].y = 200;
  cyclops[6].x = 300; cyclops[6].y = 200;
  cyclops[7].x = 350; cyclops[7].y = 200;
  cyclops[8].x = 400; cyclops[8].y = 200;
      break;
      case 3:
  //CREATE SAUCERS
  for (enemy = 0; enemy <= saucers_active; enemy++) {
    var saucer = game.add.sprite(game.width / 2, game.height - 60, 'saucers');
    saucer.frame = game.rnd.integerInRange(0, 2);
    saucer.anchor.set(0.5);
    if (enemy >= MAX_SAUCERS / 2)
    saucer.xv = attack_speed;
    else
    saucer.xv = -attack_speed;
    saucer.x = game.rnd.integerInRange(1,game.width - 100);
    saucer.y = game.rnd.integerInRange(0,140);
    saucer.yv = attack_speed - 3;
    saucer.value = 200;
    saucers.push(saucer);
  }
      break;
  case 4:
  //CREATE FANGS
  for (enemy = 0; enemy <= fangs_active; enemy++) {
    var fang = game.add.sprite(game.width / 2, game.height - 60, 'fangs');
    fang.frame = game.rnd.integerInRange(0, 2);
    fang.anchor.set(0.5);
    fang.xv = -attack_speed;
    fang.yv = attack_speed;
    fangs.push(fang);
  } 
  fangs[0].x = 450; fangs[0].y = 50;
  fangs[1].x = 375; fangs[1].y = 50;
  fangs[2].x = 300; fangs[2].y = 50;
  fangs[3].x = 225; fangs[3].y = 50;
  fangs[4].x = 435; fangs[4].y = 100;
  fangs[5].x = 335; fangs[5].y = 100;
  fangs[6].x = 240; fangs[6].y = 100;
  fangs[7].x = 335; fangs[7].y = 150;
      break;
    case 5:
    //CREATE HWINGS
    for (enemy = 0; enemy <= hwings_active; enemy++) {
      var hwing = game.add.sprite(game.width / 2, game.height - 60, 'hwings');
      hwing.frame = game.rnd.integerInRange(0, 2);
      hwing.anchor.set(0.5);
      hwing.x = game.rnd.integerInRange(1,game.width - 100);
      hwing.y = game.rnd.integerInRange(1,140);
      hwing.x = game.rnd.integerInRange(1,game.width - 100);
      hwing.x = game.rnd.integerInRange(1,140);
      if (enemy < MAX_HWINGS / 2)
      hwing.xv = attack_speed;
      else
      hwing.xv = -attack_speed;
      hwing.yv = attack_speed;
      hwing.value = 300;
      hwings.push(hwing);
    }
  
  break;
  case 6:
  //CREATE METEORS
  for (enemy = 0; enemy <= meteors_active; enemy++) {
    var meteor = game.add.sprite(game.width / 2, game.height - 60, 'meteors');
    meteor.anchor.set(0.5);
    meteor.animations.add('meteors', game.math.numberArray(0, 7));
    meteor.animations.play('meteors', 10, true);
    meteor.x = game.rnd.integerInRange(1,game.width - 100);
    meteor.y = game.rnd.integerInRange(1,240);
    meteor.yv = attack_speed;
    meteors.push(meteor);
    meteor.value = 300;
  }

  break;
  case 7:
  //CREATE SCRAMBLES
  for (enemy = 0; enemy <= scrambles_active; enemy++) {
    var scramble = game.add.sprite(game.width / 2, game.height - 60, 'scrambles');
    scramble.frame = game.rnd.integerInRange(0, 2);
    scramble.anchor.set(0.5);
    scramble.x = enemy * 50;
      scramble.y = enemy * 50;
      scramble.yv = attack_speed + 3;
      scramble.xv = attack_speed + 3;
      scramble.value = 300;
      scrambles.add(scramble);
}
            
  default:
    break;
}

} 


function Init_Laser() {
 enemy_lasers.forEach(enemy_laser => {
  enemy_laser = game.add.sprite(game.width / 2, game.height - 10, 'enemy_laser');
   
 });
}

function Init_Bursts() {
  bursts.forEach(burst => {
    burst = game.add.sprite(game.width / 2, game.height - 10, 'burst');
          var anim = burst.animations.add('burst');
          anim.onComplete.add(burst_finished, this);
      });
  } 

  function update() {
    if (!gameStart) {

          introText.scale.x = introTextSize;
          introText.scale.y = introTextSize;

          if (introTextSize < 1)
              introTextSize += .05;
          else {
              introText2.visible = true;
          }
           if (fireKey.isDown) {
              introText.visible = false;
              introText2.visible = false;
              gameStart = true;
          }
      }
      else {

          if (showintro < 60) {
              infoText.visible = true;
              if (Level == 1) {
                  for (i = 0; i < sneakers_active; i++)
                      sneakers[i].visible = true;
              }
              Do_Intro();
              showintro++;
          }
          else {
              // only process player if alive
              if (player.state == ALIVE) {

                  // test if player is moving
                  if (rightKey.isDown) {
                      // move player to right
                      player.xv = 8;

                  } 
                  else
                      if (leftKey.isDown) {
                          // move player to left
                          player.xv = -8;

                      } 

                  player.x+=player.xv;

                  // test if player is firing
                  if (fireKey.isDown && !isFiring ){
                      isFiring = true;
                      Fire_Laser(player.x, player.y - 5, 16);
                  }

                  if (player.x < 10)
                      player.x = 10;
                  else
                      if (player.x > (game.width - 100))
                          player.x = (game.width - 100);

                  // test for dying state transition
                  if (player.damage >= 100) {
                      // kill player
                      player.visible = false;
                      player.state = DEAD;
                      lives--;
                      // set counter to 0
                      player.counter = 0;
                  } 

              } 

              if (player.state == DEAD) {
                  // player is dead
                  if (game.rnd.integerInRange(1,4) == 1 && player.counter < 60)
                      Start_Burst(player.x - 16 + game.rnd.integerInRange(1,40), player.y - 5 + game.rnd.integerInRange(1,8),
                                  player.width, player.height,
                                  -4 + game.rnd.integerInRange(1,8), 2 + game.rnd.integerInRange(1,4));

                  if (++player.counter > 60 && lives > 0) {
                      // set state to ready
                      player.state = ALIVE;
                      player.x = game.width / 2;
                      player.y = game.height - 70;
                      ready_state = 1;
                      ready_counter = 0;
                      // set position
                      player.damage = 0;
                      // stop the intro if not already
                      player.visible = true;
                  } 
              } 

              //GAME OVER ?
              if (player.state == DEAD && lives == 0 && !gameOver) {
                 localStorage.setItem(localStorageName, highScore);
                 // player is dead
                  gameOver = true
                  ready_state = 1;
                  gameOverText = game.add.text(game.width *.3, game.height / 2, "G A M E    O V E R", {
                      font: "32px Arial",
                      fill: "#ff0000",
                      align: "center"
                  });
                  // draw text
                  gameOverText2 = game.add.text(game.width *.3, (game.height / 2) + 50, "Hit Escape to Exit", {
                      font: "32px Arial",
                      fill: "#ff0000",
                      align: "center"
                  });
                  gameOverText3 = game.add.text(game.width *.3, (game.height / 2) + 100, "Or P to Play Again", {
                      font: "32px Arial",
                      fill: "#ff0000",
                      align: "center"
                  });

              } 

              switch (Level) {
                case 1:
                  if (sneakers.length==0) {
                    sneakers_active++;
                    Level = 2;
                    Init_Enemies(Level);
                    showintro = 0;
                }
                  break;
              case 2:
                if (cyclops.length==0) {
                  Level = 3;
                  Init_Enemies(Level);
                  showintro = 0;
              }
              break;
              case 3:
                if (saucers.length==0) {
                  Level = 4;
                  showintro = 0;
                  Init_Enemies(Level);
              }
              break;
              case 4:
                if (fangs.length==0) {
                  Level = 5;
                  showintro = 0;
                  Init_Enemies(Level);
              }
              break;
              case 5:
                if (hwings.length==0) {
                  hwings_active++;
                  Level = 6;
                  Init_Enemies(Level);
                  showintro = 0;
              }
              break;
              case 6:
                meteors_active++;
                Level = 7;
                Init_Enemies(Level);
                showintro = 0;
            break;
              case 7:
                scrambles_active++;
                lives++,
                Level = 1;
                attack_speed++;
                showintro = 0;
                Init_Enemies(Level);
                levelGroup += 7;
            break;
                                            
                default:
                  break;
              }

              // check of user is trying to start over
              if (playKey.isDown && ready_state == 1 && lives == 0) {
                gameOver = false;player.xv=0;
                gameOverText.destroy(); gameOverText2.destroy(); gameOverText3.destroy(); 
                  Level = 1; attack_speed = 5; showintro = 0; levelGroup = 0;
                  sneakers_active = 5; cyclops_active = 8;
                  saucers_active = 8; fangs_active = 8; hwings_active = 5;
                  meteors_active = 16; scrambles_active = 5; enemy_laser_active = 6;
                  player.state = ALIVE; player_score = 0; 
                  player.visible = true; player.x = game.width/2;
                  lives = 3; player.damage = 0;
              }

              if (player_score > highscore) highscore = player_score;

              Move_Laser();

              Move_Enemies();
              
              Update_Info();
           }
      }
  }

  function Fire(){
  if(!gameStart){
  introText.visible = false;
  introText2.visible = false;
  gameStart = true;
}
else{
  var y = game.input.activePointer.position.y;
  if(y<game.height-20)
  Fire_Laser(player.x, player.y - 5, 16);
}
}
  function burst_finished(sprite, animation) {
      sprite.destroy();
  }

  function Collision_Test(x1, y1, w1, h1,
                      x2, y2, w2, h2) {
      // this function tests if the two rects overlap

      // get the radi of each rect
      var width1 = (w1 >> 1) - (w1 >> 3);
      var height1 = (h1 >> 1) - (h1 >> 3);

      var width2 = (w2 >> 1) - (w2 >> 3);
      var height2 = (h2 >> 1) - (h2 >> 3);

      // compute center of each rect
      var cx1 = x1 + width1;
      var cy1 = y1 + height1;

      var cx2 = x2 + width2;
      var cy2 = y2 + height2;

      // compute deltas
      var dx = Math.abs(cx2 - cx1);
      var dy = Math.abs(cy2 - cy1);

      // test if rects overlap
      if (dx < (width1 + width2) && dy < (height1 + height2))
          return true;
      else
          // else no collision
          return false;

  } 

function TouchFire(){
  if(!gameStart)
  {
    introText.visible = false;
    introText2.visible = false;
    gameStart = true;
  }
}

function HandleCollision(bodyA, bodyB)
{
  // test for collision 
    if (Collision_Test(bodyA.x, bodyA.y,
      bodyA.width, bodyA.height,
      bodyB.x, bodyB.y,
      bodyB.width, bodyB.height)) {

  Start_Burst(bodyA.x - 10, bodyA.y - 20, 42, 36,
    bodyB.xv >> 1, bodyB.yv >> 1);

    bodyA.destroy();
    isFiring = false;
    bodyB.destroy();
    player_score += bodyB.value;
  } 
}


  function Move_Laser() {
  lasers.forEach(burst => {
    burst.y += burst.yv;
    if (burst.y < -50) {
      isFiring = false;
        burst.destroy();

    }
  });
    
//COLLISIONS

switch (Level) {
  case 1:
    sneakers.forEach(enemy => {
      Handle_Collision(burst,enemy);
    });
  break;
  case 2:
      //COLLISION WITH CYCLOPS
      cyclops.forEach(enemy => {
        Handle_Collision(burst,enemy);
      });
  break;
  case 3:
      saucers.forEach(enemy => {
        Handle_Collision(burst,enemy);
      }); 
  break;
  case 4:
      //COLLISION WITH FANGS
    fangs.forEach(enemy => {
      Handle_Collision(burst,enemy);
    });
  break;
  case 5:
  //COLLISION WITH HWINGS
    hwings.forEach(enemy => {
      Handle_Collision(burst,enemy);
    }); 
  break;
  case 6:
  //COLLISION WITH METEORS
    meteors.forEach(enemy => {
      Handle_Collision(burst,enemy);
    });
  break;
  case 7:
  //COLLISION WITH SCRAMBLES
  fangs.forEach(enemy => {
    Handle_Collision(burst,enemy);
    });                                    
    break;
    default:
  break;
}

//MOVE ENEMY LASER
for (var index = 0; index < enemy_lasers.length; index++) {
        // move the pulse downward
        //Move_Laser(enemy_laser);
        enemy_laser.y += enemy_laser.yv;
        // test for boundaries
        if (enemy_laser.y > player.y) {
            // kill the pulse
            enemy_laser.destroy();
        } 
      
        // test for collision with player
        if (Collision_Test(enemy_laser.x, enemy_laser.y,
            enemy_laser.width, enemy_laser.height,
            player.x, player.y, player.width, player.height) && player.state == ALIVE) {
            Start_Burst(enemy_laser.x, enemy_laser.y,
                      68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                    enemy_laser.xv >> 1, enemy_laser.yv >> 1);

            // update players damage
            player.damage += 100;


            // kill the original
            enemy_laser.destroy();

        } 

    } 
  }


  function Fire_Laser(x, y, vel) {
var laser = game.add.sprite(x, y, 'laser');
laser.yv = -vel;
laser.visible = true;
lasers.push(laser);

  } 

  function Fire_Enemy_Laser(x, y, vel) {
      enemy_lasers.forEach(enemy_laser => {
        enemy_laser.x = x;
        enemy_laser.y = y;
        enemy_laser.yv = vel;
        return;

      });
  }
 


  function Move_Enemies() {
      // this function moves all the enemies pulses and checks for
      // collision with the enemies

switch (Level) {
  case 1:
  sneakers.forEach(sneaker => {
      // test if enemies pulse is in flight
    if (sneaker.x > game.width - 100 || sneaker.x < 10) {
        sneaker.xv *= -1;
        sneaker.yv = game.rnd.integerInRange(1,5);
    }
    if (sneaker.y > game.height - 70 || sneaker.y < 10) {
        sneaker.yv *= -1;
        sneaker.xv = game.rnd.integerInRange(1,5);;
    }
    // move the enemy
    sneaker.x += sneaker.xv;
    sneaker.y += sneaker.yv;
      // test for collision with enemies
    if (Collision_Test(player.x, player.y,
        player.width, player.height,
        sneaker.x, sneaker.y,
        sneaker.width, sneaker.height) && player.state == ALIVE) {
        Start_Burst(sneaker.x, sneaker.y,
        68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
        sneaker.xv >> 1, sneaker.yv >> 1);
          // update players damage
          player.damage += 100;

          // update score
          player_score += sneaker.value;

          sneaker.destroy();
        }
  });
    case 2:
      cyclops.forEach(cyclop => {
          if (cyclop.x > game.width - 100) cyclop.x = 10;
            if (cyclop.y > player.y) cyclop.y = 10;
            lasers.forEach(laser => {
              if (laser) {
                cyclop.xv = 5 + attack_speed;
                cyclop.y += attack_speed;
              }
                 else
                cyclop.xv = attack_speed;
              });

            cyclop.x += cyclop.xv;

            // test for collision with enemies
            if (Collision_Test(player.x, player.y,
                            player.width, player.height,
                            cyclop.x, cyclop.y,
                            cyclop.width, cyclop.height)) {
                Start_Burst(cyclop.x, cyclop.y,
                            68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                            cyclop.xv >> 1, cyclop.yv >> 1);
                // update players damage
                player.damage += 100;
                cyclop.destroy();
            } 
          });

    break;
    case 3:
      saucers.forEach(saucer => {
                  if (saucer.x > game.width - 100) saucer.x = 10;
                  if (saucer.x < 10) saucer.x = game.width - 101;
                  if (saucer.y > game.height - 200) saucer.yv = -saucer.yv;
                  if (saucer.y < 10) saucer.yv = -saucer.yv;
                  // move the enemy
                  // Move_BOB(saucer);
                  saucer.x += saucer.xv;
                  saucer.y += saucer.yv;
                  if (game.rnd.integerInRange(1,100 - levelGroup) == 1 && player.state == ALIVE)
                      Fire_Enemy_Laser(saucer.x, saucer.y, attack_speed + 5);
              } );
    break;
    case 4:
      fangmovex++; fangmovey++;
      if (fangmovex > 40) fangmovex = 0;
      if (fangmovey > 20) fangmovey = 0;
      fangs.forEach(fang => {
        // test if enemies pulse is in flight
              // move the enemy
              if (fang.y > player.y) fang.y = 0;
              if (fang.x < 10) fang.x = game.width - 101;
              if (fangmovex < 20) fang.xv = -5;
              if (fangmovex > 20) fang.xv = 5;
              if (fangmovey < 10) fang.yv = 5;
              if (fangmovey > 10) fang.yv = -5;
              fang.x += fang.xv;
              fang.y += fang.yv;
              if (game.rnd.integerInRange(1,90 - levelGroup) == 1 && player.state == ALIVE)
                  Fire_Enemy_Laser(fang.x, fang.y, attack_speed + 5);

              // test for collision with enemies
              if (Collision_Test(player.x, player.y,
                              player.width, player.height,
                              fang.x, fang.y,
                              fang.width, fang.height) && player.state == ALIVE) {
                  Start_Burst(fang.x, fang.y,
                              68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                              fang.xv >> 1, fang.yv >> 1);

                  // update players damage
                  player.damage += 100;
                  fang.destroy();
          }
        }); 
    break;
    case 5:
      hwings.forEach(hwing => {
        // move the enemy
        if (hwing.x < 10) hwing.x = game.width - 101;
        if (hwing.x > game.width - 100) hwing.x = 10;
        if (hwing.y > player.y) hwing.y = 10;
        hwing.x += hwing.xv;
        hwing.y += hwing.yv;



        // test for collision with enemies
        if (Collision_Test(hwing.x, hwing.y,
                            hwing.width, hwing.height,
                            player.x, player.y,
                        player.width, player.height) && player_state == PLAYER_STATE_ALIVE) {
            Start_Burst(hwing.x, hwing.y,
                        68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                        hwing.xv >> 1, hwing.yv >> 1);

            // update players damage
            player_damage += 100;
            Initialize_Enemy_Positions();
            hwings_killed = 0;
        } // end if collision


    }); // end for index
        break;
    case 6:
      meteors.forEach(meteor => {
        // test if enemies pulse is in flight
            // move the enemy
            if (meteor.y > player.y) {
                meteor.y = 10;
                meteor.x = game.rnd.integerInRange(1,500);
            }

            //meteor.x += meteor.xv;
            meteor.y += meteor.yv;

            // test for collision with enemies
            if (Collision_Test(meteor.x, meteor.y,
                                meteor.width, meteor.height,
                                player.x, player.y,
                            player.width, player.height) && player.state == ALIVE) {
                Start_Burst(meteor.x, meteor.y,
                            68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                            meteor.xv >> 1, meteor.yv >> 1);

                // update players damage
                player.damage += 100;

        }

    });
    break;
    case 7:
      scrambles.forEach(scramble => {
            scramble.xv = 5;
            scramble.yv = 5;
            if (scramble.y > player.y) scramble.y = 10;
            if (scramble.x > game.width - 100) scramble.x = 10;
            if (scramble.x < 10) scramble.x = game.width - 100;

            scramble.x += scramble.xv;
            scramble.y += scramble.yv;

            // test for collision with enemies
            if (Collision_Test(scramble.x, scramble.y,
                                scramble.width, scramble.height,
                                player.x, player.y,
                            player.width, player.height)) {
                Start_Burst(scramble.x, scramble.y,
                            68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                            scramble.xv >> 1, scramble.yv >> 1);

                // update players damage
                player.damage += 100;
                Initialize_Enemy_Positions();


        }

        if (scramble.state == RETREATING) {

            if (scramble.y < 10) {
                scramble.destroy();

            }
            scramble.yv = -5;
            scramble.xv = 0;
            if (game.rnd.integerInRange(1, 100) == 1) {
                scramble.frame-=3;
            }
            scramble.x += scramble.xv;
            scramble.y += scramble.yv;
        } 

    });

    break;
                              
  default:
    break;
}
  }
 
    
  function Start_Burst(x, y, width, height, xv, yv) {
    bursts.forEach(burst => {
              burst.curr_frame = 0;
              burst.x = x;
              burst.y = y;
              burst.state = BURST_STATE_ON;
              burst.animations.play('burst', false);
              return;
          }); 
  } 
  
  function pad(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
  }

  function Draw_Info() {
    var format={
      font: "18px Arial",
      fill: "#ff0000",
      align: "left"
  };
      var score = "SCORE: " + player_score;
      var hiscore = "HIGH SCORE: " + highscore;
      var level  = "LEVEL: " + (Level + levelGroup) ;
      var lives = "SHIPS: " + lives;
      scoreText = game.add.text(width *.05, 20, score, format);      
      hiscoreText = game.add.text(width *.25, 20, hiscore, format);
      levelText = game.add.text(width *.55, 20, level, format);
      livesText = game.add.text(width *.75, 20, lives, format);
  } 

  function Update_Info(){
    var format={
      font: "18px Arial",
      fill: "#ff0000",
      align: "left"
  };
      var score = "SCORE: " + player_score;
      var hiscore = "HIGH SCORE: " + highscore;
      var level  = "LEVEL: " + (Level + levelGroup) ;
      var lives = "SHIPS: " + lives;
      scoreText.setText(score);      
      hiscoreText.setText(hiscore);
      levelText.setText(level);
      livesText.setText(lives);
  }

  function Do_Intro() {
      var info = "LEVEL: " + (Level+levelGroup) + '\n';
      switch (Level) {
          case 1:
              info += "SNEAKERS";
              break;
          case 2:
              info += "CYCLOPS";
              break;
          case 3:
              info += "SAUCERS";
              break;
          case 4:
              info += "FANGS";
              break;
          case 5:
              info += "HWINGS";
              break;
          case 6:
              info += "METEORS";
              break;
          case 7:
              info += "SCRAMBLE";
          default:
      }
      infoText.setText(info);
      infoText.visible = showintro < 59;
  }


