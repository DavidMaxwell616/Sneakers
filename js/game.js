var game = new Phaser.Game(800,
  600,
  Phaser.AUTO,
  'phaser-example',
  { preload: preload, create: create, update: update });



function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#000000';
  player = game.add.sprite(game.width / 2, game.height - 70, 'player');

  var background = this.add.image(0, 0, 'background');
  background.width = this.game.width;
  background.height = this.game.height;

  var style = { font: "72px Arial", fill: '#ff0000', align: "center" };
  introText = game.add.text(game.width / 2, game.height / 2, "SNEAKERS", style);
  introText.anchor.set(0.5);
  var introTextString = "Move Right - Right Arrow \n" +
      "Move Left - Left Arrow \n" +
      "Fire - Space Bar \n" +
      "Press Any Key to Start";
  introText2 = game.add.text(game.width / 2, game.height * .75, introTextString, {
      font: "24px Arial",
      fill: "#ff0000",
      align: "center"
  });
  introText2.anchor.set(0.5);
  introText2.visible = false;

  infoText2 = game.add.text(game.width / 2, 20, "", {
      font: "18px Arial",
      fill: "#ff0000",
      align: "left"
  });
  infoText2.anchor.set(0.5);
  infoText2.visible = false;

  infoText = game.add.text(game.width / 2, game.height / 2, "", {
      font: "32px Arial",
      fill: "#ff0000",
      align: "center"
  });
  infoText.anchor.set(0.5);
  infoText.visible = false;

  // initialize the laser pulses
  Init_Laser();
  // init enemies
  Init_Enemies();

  Initialize_Enemy_Positions();

  // init all the explosions
  Init_Bursts();

  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  playKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

}

function Init_Enemies() {
  // this function initializes and loads all the enemies 
  for (var enemy = 0; enemy <= MAX_SNEAKERS; enemy++) {
      sneakers[enemy] = game.add.sprite(game.width / 2, game.height / 2, 'sneakers');
      if (enemy < sneakers_active / 2) {
          //add(name, frames, frameRate, loop, useNumericIndex)
          sneakers[enemy].animations.add('bluesneaker', game.math.numberArray(0, 3));
          sneakers[enemy].animations.play('bluesneaker', 10,true);
      }
      else {
          sneakers[enemy].animations.add('yellowsneaker', game.math.numberArray(4, 7));
          sneakers[enemy].animations.play('yellowsneaker',10, true);
      }
      sneakers[enemy].anchor.set(0.5);
      sneakers[enemy].state = ENEMY_STATE_ON;
      sneakers[enemy].visible = false;
  }

  //CREATE CYCLOPS
  for (enemy = 0; enemy <= MAX_CYCLOPS; enemy++) {
      cyclops[enemy] = game.add.sprite(game.width / 2, game.height - 60, 'cyclops');
      if (enemy < cyclops_active / 2) {
          cyclops[enemy].animations.add('bluecyclops', game.math.numberArray(0, 3));
          cyclops[enemy].animations.play('bluecyclops', 10,true);
      }
      else {
          cyclops[enemy].animations.add('yellowcyclops', game.math.numberArray(4, 7));
          cyclops[enemy].animations.play('yellowcyclops', 10,true);
      }
      cyclops[enemy].anchor.set(0.5);
      cyclops[enemy].state = ENEMY_STATE_OFF;
      cyclops[enemy].visible = false;
  }

  //CREATE SAUCERS
  for (enemy = 0; enemy <= MAX_SAUCERS; enemy++) {
      saucers[enemy] = game.add.sprite(game.width / 2, game.height - 60, 'saucers');
      saucers[enemy].frame = game.rnd.integerInRange(0, 2);
      saucers[enemy].anchor.set(0.5);
      saucers[enemy].state = ENEMY_STATE_OFF;
      saucers[enemy].visible = false;
  }

  //CREATE FANGS
  for (enemy = 0; enemy <= MAX_FANGS; enemy++) {
      fangs[enemy] = game.add.sprite(game.width / 2, game.height - 60, 'fangs');
      fangs[enemy].frame = game.rnd.integerInRange(0, 2);
      fangs[enemy].anchor.set(0.5);
      fangs[enemy].state = ENEMY_STATE_OFF;
      fangs[enemy].visible = false;
  }


  //CREATE HWINGS
  for (enemy = 0; enemy <= MAX_HWINGS; enemy++) {
      hwings[enemy] = game.add.sprite(game.width / 2, game.height - 60, 'hwings');
      hwings[enemy].frame = game.rnd.integerInRange(0, 2);
      hwings[enemy].anchor.set(0.5);
      hwings[enemy].state = ENEMY_STATE_OFF;
      hwings[enemy].visible = false;
  }


  //CREATE METEORS
  for (enemy = 0; enemy <= MAX_METEORS; enemy++) {
      meteors[enemy] = game.add.sprite(game.width / 2, game.height - 60, 'meteors');
      meteors[enemy].anchor.set(0.5);
      meteors[enemy].state = ENEMY_STATE_OFF;
      meteors[enemy].visible = false;
      meteors[enemy].animations.add('meteors', game.math.numberArray(0, 7));
      meteors[enemy].animations.play('meteors', 10, true);
  }


  //CREATE SCRAMBLES
  for (enemy = 0; enemy <= MAX_SCRAMBLES; enemy++) {
      scrambles[enemy] = game.add.sprite(game.width / 2, game.height - 60, 'scrambles');
      scrambles[enemy].frame = game.rnd.integerInRange(0, 2);
      scrambles[enemy].anchor.set(0.5);
      scrambles[enemy].state = ENEMY_STATE_OFF;
      scrambles[enemy].visible = false;
  }

} // end Init_enemies

function Initialize_Enemy_Positions() {
  //SNEAKERS
  for (var enemy = 0; enemy < sneakers_active; enemy++) {
      sneakers[enemy].state = ENEMY_STATE_ON;
      sneakers[enemy].xv = (game.rnd.integerInRange(1,2) * attack_speed);
      sneakers[enemy].yv = (game.rnd.integerInRange(1, 2) * attack_speed);
      sneakers[enemy].x = game.rnd.integerInRange(0,500);
      sneakers[enemy].y = game.rnd.integerInRange(0, 140);
  } // end for enemy
  //CYCLOPS
  for (enemy = 0; enemy <= cyclops_active; enemy++) {
      cyclops[enemy].state = ENEMY_STATE_ON;
  }
  // set position
  cyclops[0].x = 250; cyclops[0].y = 100;
  cyclops[1].x = 200; cyclops[1].y = 150;
  cyclops[2].x = 300; cyclops[2].y = 150;
  cyclops[3].x = 150; cyclops[3].y = 200;
  cyclops[4].x = 200; cyclops[4].y = 200;
  cyclops[5].x = 250; cyclops[5].y = 200;
  cyclops[6].x = 300; cyclops[6].y = 200;
  cyclops[7].x = 350; cyclops[7].y = 200;
  cyclops[8].x = 400; cyclops[8].y = 200;
  //SAUCERS
  for (enemy = 0; enemy < saucers_active; enemy++) {
      if (enemy >= MAX_SAUCERS / 2)
          saucers[enemy].xv = attack_speed;
      else
          saucers[enemy].xv = -attack_speed;
      saucers[enemy].x = game.rnd.integerInRange(1,game.width - 100);
      saucers[enemy].y = game.rnd.integerInRange(0,140);
      saucers[enemy].state = ENEMY_STATE_ON;
      saucers[enemy].yv = attack_speed - 3;
  } // end for enemy

  //FANGS

  for (enemy = 0; enemy < fangs_active; enemy++) {
      // set state to off
      fangs[enemy].state = ENEMY_STATE_ON;
      fangs[enemy].xv = -attack_speed;
      fangs[enemy].yv = attack_speed;
  } // end for enemy
  fangs[0].x = 450; fangs[0].y = 50;
  fangs[1].x = 375; fangs[1].y = 50;
  fangs[2].x = 300; fangs[2].y = 50;
  fangs[3].x = 225; fangs[3].y = 50;
  fangs[4].x = 435; fangs[4].y = 100;
  fangs[5].x = 335; fangs[5].y = 100;
  fangs[6].x = 240; fangs[6].y = 100;
  fangs[7].x = 335; fangs[7].y = 150;

  //HWING
  for (enemy = 0; enemy < hwings_active; enemy++) {
      hwings[enemy].x = game.rnd.integerInRange(1,game.width - 100);
      hwings[enemy].y = game.rnd.integerInRange(1,140);
      hwings[enemy].state = ENEMY_STATE_ON;
      hwings[enemy].x = game.rnd.integerInRange(1,game.width - 100);
      hwings[enemy].x = game.rnd.integerInRange(1,140);
      if (enemy < MAX_HWINGS / 2)
          hwings[enemy].xv = attack_speed;
      else
          hwings[enemy].xv = -attack_speed;
      hwings[enemy].yv = attack_speed;
  } // end for enemy

  //METEORS
  for (enemy = 0; enemy < meteors_active; enemy++) {
      // set state to off
      meteors[enemy].state = ENEMY_STATE_ON;
      // set animation rate
      meteors[enemy].x = game.rnd.integerInRange(1,game.width - 100);
      meteors[enemy].y = game.rnd.integerInRange(1,240);
      //if(enemy<MAX_METEORS/2) Set_Anim_Speed_BOB(meteors[enemy],5);
      //else     Set_Anim_Speed_BOB(meteors[enemy],1);
      meteors[enemy].yv = attack_speed;
  } // end for enemy

  //SCRAMBLES

  for (enemy = 0; enemy < scrambles_active; enemy++) {
      // set state to off
      scrambles[enemy].state = ENEMY_STATE_ON;

      scrambles[enemy].x = enemy * 50;
      scrambles[enemy].y = enemy * 50;
      scrambles[enemy].yv = attack_speed + 3;
      scrambles[enemy].xv = attack_speed + 3;
      scrambles[enemy].state = ENEMY_STATE_ON;
  } // end for enemy

}

function Init_Laser() {
  // this function initializes and loads all the laser 
  // weapon pulses

  // now create and load each laser pulse
  laser = game.add.sprite(game.width / 2, game.height - 10, 'laser');
  laser.frame = 1;
  // set state to off
  laser.state = LASER_STATE_OFF;
  for (var pulse = 0; pulse < MAX_ENEMY_LASER; pulse++) {
      enemy_lasers[pulse] = game.add.sprite(game.width / 2, game.height - 10, 'enemy_laser');
      enemy_lasers[pulse].state = LASER_STATE_OFF;
  } // end for pulse
}

function Init_Bursts() {
  // this function initializes and loads all the bursts 

  // create the first burst bob
  for (var burst = 0; burst < MAX_BURSTS; burst++) {
          bursts[burst] = game.add.sprite(game.width / 2, game.height - 10, 'burst');
          var anim = bursts[burst].animations.add('burst');
          anim.onComplete.add(burst_finished, this);
          bursts[burst].state = BURST_STATE_OFF;
      }
  } // end Init_Bursts

  function update() {
      if (!gameStart) {

          introText.scale.x = introTextSize;
          introText.scale.y = introTextSize;

          if (introTextSize < 1)
              introTextSize += .01;
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
              if (player_state == PLAYER_STATE_ALIVE) {

                  // test if player is moving
                  if (rightKey.isDown) {
                      // move player to right
                      player.x += 8;

                  } // end if
                  else
                      if (leftKey.isDown) {
                          // move player to left
                          player.x -= 8;

                      } // end if


                  // test if player is firing
                  if (fireKey.isDown)
                      Fire_Laser(player.x, player.y - 5, 16);


                  // check of user is trying to exit
                  //if (KEY_DOWN(VK_ESCAPE))
                  //    PostMessage(main_window_handle, WM_DESTROY, 0, 0);

                  // do bounds check

                  if (player.x < 10)
                      player.x = 10;
                  else
                      if (player.x > (game.width - 100))
                          player.x = (game.width - 100);

                  // test for dying state transition
                  if (player_damage >= 100) {
                      // kill player
                      player_state = PLAYER_STATE_DEAD;
                      player_ships--;
                      // set counter to 0
                      player_counter = 0;
                  } // end if

              } // end if player alive

              if (player_state == PLAYER_STATE_DEAD) {
                  // player is dead
                  if (game.rnd.integerInRange(1,4) == 1 && player_counter < 60)
                      Start_Burst(player.x - 16 + game.rnd.integerInRange(1,40), player.y - 5 + game.rnd.integerInRange(1,8),
                                  player.width, player.height,
                                  -4 + game.rnd.integerInRange(1,8), 2 + game.rnd.integerInRange(1,4));

                  if (++player_counter > 60 && player_ships > 0) {
                      // set state to ready
                      player_state = PLAYER_STATE_ALIVE;
                      player.x = game.width / 2;
                      player.y = game.height - 70;
                      ready_state = 1;
                      ready_counter = 0;
                      // set position
                      player_damage = 0;
                      // stop the intro if not already

                  } // end if
              } // end if

              //GAME OVER ?
              if (player_state == PLAYER_STATE_DEAD && player_ships == 0) {
                  // player is dead
                  ready_state = 1;
                  game.add.text(game.width / 2, game.height / 2, "G A M E    O V E R", {
                      font: "32px Arial",
                      fill: "#ff0000",
                      align: "center"
                  });
                  // draw text
                  game.add.text(game.width / 2, (game.height / 2) + 20, "Hit Escape to Exit", {
                      font: "32px Arial",
                      fill: "#ff0000",
                      align: "center"
                  });
                  game.add.text(game.width / 2, (game.height / 2) + 40, "Or P to Play Again", {
                      font: "32px Arial",
                      fill: "#ff0000",
                      align: "center"
                  });

              } // end if

              //NEXT LEVEL?
              if (sneaker_killed == sneakers_active) {

                  if (sneakers_active < MAX_SNEAKERS) sneakers_active++;
                  for (i = 0; i < cyclops_active; i++) {
                      cyclops[i].state = ENEMY_STATE_ON;
                      cyclops[i].visible = true;
                  }
                  sneaker_killed = 0;
                  Level = 2;
                  showintro = 0;
              }

              if (cyclops_killed == cyclops_active) {
                  for (i = 0; i < saucers_active; i++) {
                      saucers[i].state = ENEMY_STATE_ON;
                      saucers[i].visible = true;
                  }
                  cyclops_killed = 0;
                  Level = 3;
                  showintro = 0;
              }

              if (saucers_killed == saucers_active) {
                  for (i = 0; i < fangs_active; i++) {
                      fangs[i].state = ENEMY_STATE_ON;
                      fangs[i].visible = true;
                  }
                  saucers_killed = 0;
                  Level = 4;
                  showintro = 0;
              }

              if (fangs_killed == fangs_active) {
                  fangs_killed = 0,
                  Level = 5;
                  showintro = 0;
                  for (i = 0; i < hwings_active; i++) {
                      hwings[i].state = ENEMY_STATE_ON;
                      hwings[i].visible = true;
                  }
              }

              if (hwings_killed == hwings_active) {
                  if (hwings_active < MAX_HWINGS) hwings_active++;
                  hwings_killed = 0,
                  Level = 6;
                  showintro = 0;
                  for (i = 0; i < meteors_active; i++) {
                      meteors[i].state = ENEMY_STATE_ON;
                      meteors[i].visible = true;
                  }
              }

              if (meteors_killed == meteors_active) {
                  if (meteors_active < MAX_METEORS) meteors_active++;
                  meteors_killed = 0;
                  Level = 7;
                  showintro = 0;
                  for (i = 0; i < scrambles_active; i++) {
                      scrambles[i].state = ENEMY_STATE_ON;
                      scrambles[i].visible = true;
                  }
              }

              if (scrambles_killed == scrambles_active) {
                  if (scrambles_active < MAX_SCRAMBLES) scrambles_active++;
                  scrambles_killed = 0;
                  player_ships++,
                  Level = 1;
                  attack_speed++;
                  showintro = 0;
                  levelGroup += 7;
                  if (sneakers_active < MAX_SNEAKERS) sneakers_active++;
                  if (saucers_active < MAX_SAUCERS) saucers_active++;
                  if (hwings_active < MAX_HWINGS) hwings_active++;
                  if (meteors_active < MAX_METEORS) meteors_active++;
                  if (scrambles_active < MAX_SCRAMBLES) scrambles_active++;
                  if (enemy_laser_active < MAX_ENEMY_LASER) enemy_laser_active++;
                  for (i = 0; i < sneakers_active; i++)
                      sneakers[i].visible = true;
                  Initialize_Enemy_Positions();
              }

              // check of user is trying to start over
              if (playKey.isDown && ready_state == 1 && player_ships == 0) {
                  Level = 1; attack_speed = 5; showintro = 0; levelGroup = 0;
                  sneaker_killed = 0; cyclops_killed = 0; saucers_killed = 0;
                  fangs_killed = 0; hwings_killed = 0; meteors_killed = 0;
                  scrambles_killed = 0; sneakers_active = 5; cyclops_active = 8;
                  saucers_active = 8; fangs_active = 8; hwings_active = 5;
                  meteors_active = 16; scrambles_active = 5; enemy_laser_active = 6;
                  player_state = PLAYER_STATE_ALIVE; player_score = 0;
                  player_ships = 3; player_damage = 0;
                  Initialize_Enemy_Positions();
              }
              if (player_score > highscore) highscore = player_score;
              // draw the player if alive
              //if (player_state == PLAYER_STATE_ALIVE) {
              // Draw_BOB(player, lpddsback);
              //} // end if

              Move_Laser();

              Move_Enemies();

              // for (i = 0; i < MAX_SNEAKERS; i++)
              // draw the score and ships left
              Draw_Info();
          }
      }
  }

  function burst_finished(sprite, animation) {
      sprite.state = BURST_STATE_OFF;
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

  } // end Collision_Test


  function Move_Laser() {
      // this function moves all the laser pulses and checks for
      // collision with the enemies

      if (laser.state == LASER_STATE_ON) {
          // move the pulse upward
          //Move_BOB(laser);
          //laser.x += laser.xv;
          laser.y += laser.yv;
          // test for boundaries
          if (laser.y < -50) {
              // kill the pulse
              laser.state = LASER_STATE_OFF;

          } // end if

          // test for collision with enemies

          //COLLISION WITH SNEAKERS
          if (Level == 1) {
              for (var enemy = 0; enemy < sneakers_active; enemy++) {
                  if (sneakers[enemy].state == ENEMY_STATE_ON) {
                      // test for collision 
                      if (Collision_Test(laser.x, laser.y,
                                          laser.width, laser.height,
                                          sneakers[enemy].x, sneakers[enemy].y,
                                          sneakers[enemy].width, sneakers[enemy].height)) {
                          // kill pulse
                          laser.state = LASER_STATE_OFF;

                          sneakers[enemy].state = ENEMY_STATE_OFF;

                          Start_Burst(laser.x - 10, laser.y - 20,
                                      42, 36,
                                      sneakers[enemy].xv >> 1, sneakers[enemy].yv >> 1);
                          sneakers[enemy].visible = false;
                          laser.visible = false;
                          // update score
                          player_score += 10;
                          sneaker_killed++;
                      } // end if collision
                  } // end if enemy alive
              } // end for enemy

          }

          //COLLISION WITH CYCLOPS
          if (Level == 2) {
              for (var enemy = 0; enemy < cyclops_active; enemy++) {
                  if (cyclops[enemy].state == ENEMY_STATE_ON) {
                      // test for collision 
                      if (Collision_Test(laser.x, laser.y,
                                          laser.width, laser.height,
                                          cyclops[enemy].x, cyclops[enemy].y,
                                          cyclops[enemy].width, cyclops[enemy].height)) {
                          // kill pulse
                          laser.state = LASER_STATE_OFF;
                          laser.visible = false;
                          cyclops[enemy].state = ENEMY_STATE_OFF;

                          Start_Burst(laser.x - 10, laser.y - 20, 42, 36,
                                      cyclops[enemy].xv >> 1, cyclops[enemy].yv >> 1);
                          cyclops[enemy].visible = false;
                          // update score
                          player_score += 80;
                          cyclops_killed++;
                      } // end if collision
                  } // end if enemy alive
              } // end for enemy

          }
          //COLLISION WITH SAUCERS
          if (Level == 3) {
              for (var enemy = 0; enemy < saucers_active; enemy++) {
                  if (saucers[enemy].state == ENEMY_STATE_ON) {
                      // test for collision 
                      if (Collision_Test(laser.x, laser.y,
                                          laser.width, laser.height,
                                          saucers[enemy].x, saucers[enemy].y,
                                          saucers[enemy].width, saucers[enemy].height)) {
                          // kill pulse
                          laser.state = LASER_STATE_OFF;
                          laser.visible = false;

                          saucers[enemy].state = ENEMY_STATE_OFF;
                          saucers[enemy].visible = false;

                          Start_Burst(laser.x - 10, laser.y - 20,
                                      42, 36,
                                      saucers[enemy].xv >> 1, saucers[enemy].yv >> 1);
                          // update score
                          player_score += 300;
                          saucers_killed++;
                      } // end if collision
                  } // end if enemy alive
              } // end for enemy
          } // end if

          //COLLISION WITH FANGS

          if (Level == 4) {
              for (var enemy = 0; enemy < fangs_active; enemy++) {
                  if (fangs[enemy].state == ENEMY_STATE_ON) {
                      // test for collision 
                      if (Collision_Test(fangs[enemy].x, fangs[enemy].y,
                          fangs[enemy].width, fangs[enemy].height,
                          laser.x, laser.y, laser.width, laser.height)) {
                          // kill pulse
                          laser.state = LASER_STATE_OFF;
                          laser.visible = false;

                          fangs[enemy].state = ENEMY_STATE_OFF;
                          fangs[enemy].visible = false;

                          Start_Burst(laser.x - 10, laser.y - 20, 42, 36,
                                      fangs[enemy].xv >> 1, fangs[enemy].yv >> 1);

                          // update score
                          player_score += 100;
                          fangs_killed++;
                      } // end if collision
                  } // end if enemy alive
              } // end for enemy


          }
      }

      //COLLISION WITH HWINGS
      if (Level == 5) {
          for (var enemy = 0; enemy < hwings_active; enemy++) {
              if (hwings[enemy].state == ENEMY_STATE_ON) {
                  // test for collision 
                  if (Collision_Test(laser.x, laser.y,
                                      laser.width, laser.height,
                                      hwings[enemy].x, hwings[enemy].y,
                                      hwings[enemy].width, hwings[enemy].height)) {
                      // kill pulse
                      laser.state = LASER_STATE_OFF;
                      laser.visible = false;

                      hwings[enemy].state = ENEMY_STATE_OFF;
                      hwings[enemy].visible = false;

                      Start_Burst(laser.x - 10, laser.y - 20,
                                  42, 36,
                                  hwings[enemy].xv >> 1, hwings[enemy].yv >> 1);

                      // update score
                      player_score += 300;
                      hwings_killed++;
                  } // end if collision
              } // end if enemy alive
          } // end for enemy
      } // end if

      //COLLISION WITH METEORS
      if (Level == 6) {
          for (var enemy = 0; enemy < meteors_active; enemy++) {
              if (meteors[enemy].state == ENEMY_STATE_ON) {
                  // test for collision 
                  if (Collision_Test(laser.x, laser.y,
                                      laser.width, laser.height,
                                      meteors[enemy].x, meteors[enemy].y,
                                      meteors[enemy].width, meteors[enemy].height)) {
                      // kill pulse
                      laser.state = LASER_STATE_OFF;
                      laser.visible = false;

                      meteors[enemy].state = ENEMY_STATE_OFF;
                      meteors[enemy].visible = false;

                      Start_Burst(laser.x - 10, laser.y - 20,
                                  42, 36,
                                  meteors[enemy].xv >> 1, meteors[enemy].yv >> 1);

                      // update score
                      player_score += 300;
                      meteors_killed++;
                  } // end if collision
              } // end if enemy alive
          } // end for enemy
      } // end if


      //COLLISION WITH SCRAMBLES
      if (Level == 7) {
          for (var enemy = 0; enemy < scrambles_active; enemy++) {
              if (scrambles[enemy].state == ENEMY_STATE_ON) {
                  // test for collision 
                  if (Collision_Test(laser.x, laser.y,
                                      laser.width, laser.height,
                                      scrambles[enemy].x, scrambles[enemy].y,
                                      scrambles[enemy].width, scrambles[enemy].height)) {
                      // kill pulse
                      laser.state = LASER_STATE_OFF;
                      laser.visible = false;

                      scrambles[enemy].state = SCRAMBLE_STATE_RETREATING;
                      scrambles[enemy].frame += 3;
                      // update score
                      player_score += 300;
                  } // end if collision
              } // end if enemy alive
          } // end for enemy
      } // end if

      //MOVE ENEMY LASER
      for (var index = 0; index < enemy_laser_active; index++) {
          if (enemy_lasers[index].state == ENEMY_LASER_STATE_ON) {
              // move the pulse downward
              //Move_Laser(enemy_lasers[index]);
              enemy_lasers[index].y += enemy_lasers[index].yv;
              // test for boundaries
              if (enemy_lasers[index].y > player.y) {
                  // kill the pulse
                  enemy_lasers[index].state = ENEMY_LASER_STATE_OFF;
                  enemy_lasers[index].visible = false;
              } // end if

              // test for collision with player
              if (Collision_Test(enemy_lasers[index].x, enemy_lasers[index].y,
                  enemy_lasers[index].width, enemy_lasers[index].height,
                  player.x, player.y, player.width, player.height) && player_state == PLAYER_STATE_ALIVE) {
                  Start_Burst(enemy_lasers[index].x, enemy_lasers[index].y,
                            68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                          enemy_lasers[index].xv >> 1, enemy_lasers[index].yv >> 1);

                  // update players damage
                  player_damage += 100;


                  // kill the original
                  enemy_lasers[index].state = ENEMY_LASER_STATE_OFF;
                  enemy_lasers[index].visible = false;

              } // end if collision

          } // end if
      }
  } // end Move_Laser

  //////////////////////////////////////////////////////////


  function Fire_Laser(x, y, vel) {
      // this function fires a laser pulse at the given starting
      // position and velocity, of course, one must be free for 
      // this to work
      // test if laser pulse is in flight
      if (laser.state == LASER_STATE_OFF) {
          // start this one up
          laser.x = x;
          laser.y = y;
          laser.yv = -vel;
          laser.state = LASER_STATE_ON;
          laser.visible = true;
          // later
          return;

      } // end if


  } // end Fire_Laser

  ///////////////////////////////////////////////////////////

  function Fire_Enemy_Laser(x, y, vel) {
      // this function fires a laser pulse at the given starting
      // position and velocity, of course, one must be free for 
      // this to work

      for (var index = 0; index < enemy_laser_active; index++)
          // test if laser pulse is in flight
          if (enemy_lasers[index].state == ENEMY_LASER_STATE_OFF) {
              // start this one up
              enemy_lasers[index].x = x;
              enemy_lasers[index].y = y;
              enemy_lasers[index].yv = vel;
              enemy_lasers[index].state = ENEMY_LASER_STATE_ON;
              enemy_lasers[index].visible = true;
              // later
              return;

          } // end if


  } // end Fire_Laser

  ///////////////////////////////////////////////////////////


  function Move_Enemies() {
      // this function moves all the enemies pulses and checks for
      // collision with the enemies

      //MOVE SNEAKERS
      if (Level == 1) {
          for (var index = 0; index < sneakers_active; index++) {
              // test if enemies pulse is in flight
              if (sneakers[index].state == ENEMY_STATE_ON) {
                  if (sneakers[index].x > game.width - 100) {
                      sneakers[index].xv = -5;
                      sneakers[index].yv = game.rnd.integerInRange(1,5);
                  }
                  if (sneakers[index].x < 10) {
                      sneakers[index].xv = 5;
                      sneakers[index].yv = game.rnd.integerInRange(1,5);;
                  }
                  if (sneakers[index].y > game.height - 70) {
                      sneakers[index].yv = -5;
                      sneakers[index].xv = game.rnd.integerInRange(1,5);;
                  }
                  if (sneakers[index].y < 10) {
                      sneakers[index].yv = 5;
                      sneakers[index].xv = game.rnd.integerInRange(1,5);;
                  }
                  // move the enemy
                  sneakers[index].x += sneakers[index].xv;
                  sneakers[index].y += sneakers[index].yv;
              } // end for index


              // test for collision with enemies
              if (Collision_Test(player.x, player.y,
                              player.width, player.height,
                              sneakers[index].x, sneakers[index].y,
                              sneakers[index].width, sneakers[index].height) && player_state == PLAYER_STATE_ALIVE) {
                  Start_Burst(sneakers[index].x, sneakers[index].y,
                              68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                              sneakers[index].xv >> 1, sneakers[index].yv >> 1);

                  // update players damage
                  player_damage += 100;

                  // update score
                  player_score += 60;

                  // kill the original
                  sneakers[index].x = game.rnd.integerInRange(1,500), sneakers[index].y = game.rnd.integerInRange(1,140);
                  sneakers[index].xv = (game.rnd.integerInRange(1,3) * 5);
                  sneakers[index].yv = (game.rnd.integerInRange(1,3) * 5);
              } // end if collision
          }
      }//Level 1

      //MOVE CYCLOPS	
      if (Level == 2) {
          for (var index = 0; index <= cyclops_active; index++) {
              // test if enemies pulse is in flight
              if (cyclops[index].state == ENEMY_STATE_ON) {
                  if (cyclops[index].x > game.width - 100) cyclops[index].x = 10;
                  if (cyclops[index].y > player.y) cyclops[index].y = 10;
                  if (laser.state == LASER_STATE_ON) {
                      cyclops[index].xv = 5 + attack_speed;
                  cyclops[index].y += attack_speed;
                  }
                  else
                      cyclops[index].xv = attack_speed;
                  // move the enemy

                  cyclops[index].x += cyclops[index].xv;

                  // test for collision with enemies
                  if (Collision_Test(player.x, player.y,
                                  player.width, player.height,
                                  cyclops[index].x, cyclops[index].y,
                                  cyclops[index].width, cyclops[index].height) && player_state == PLAYER_STATE_ALIVE) {
                      Start_Burst(cyclops[index].x, cyclops[index].y,
                                  68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                                  cyclops[index].xv >> 1, cyclops[index].yv >> 1);

                      // update players damage
                      player_damage += 100;
                      cyclops_killed = 0;
                      Initialize_Enemy_Positions();
                  } // end if collision


              } // end for index
          }
      }//Level 2

      //MOVE SAUCERS	
      if (Level == 3) {
          for (var index = 0; index <= saucers_active; index++) {
              // test if enemies pulse is in flight
              if (saucers[index].state == ENEMY_STATE_ON) {
                  if (saucers[index].x > game.width - 100) saucers[index].x = 10;
                  if (saucers[index].x < 10) saucers[index].x = game.width - 101;
                  if (saucers[index].y > game.height - 200) saucers[index].yv = -saucers[index].yv;
                  if (saucers[index].y < 10) saucers[index].yv = -saucers[index].yv;
                  // move the enemy
                  // Move_BOB(saucers[index]);
                  saucers[index].x += saucers[index].xv;
                  saucers[index].y += saucers[index].yv;
                  if (game.rnd.integerInRange(1,100 - levelGroup) == 1 && player_state == PLAYER_STATE_ALIVE)
                      Fire_Enemy_Laser(saucers[index].x, saucers[index].y, attack_speed + 5);
              } // end for index
          }
      }//Level 3

      //MOVE FANGS	
      if (Level == 4) {
          fangmovex++; fangmovey++;
          if (fangmovex > 40) fangmovex = 0;
          if (fangmovey > 20) fangmovey = 0;
          for (var index = 0; index < fangs_active; index++) {
              // test if enemies pulse is in flight
              if (fangs[index].state == ENEMY_STATE_ON) {
                  // move the enemy
                  if (fangs[index].y > player.y) fangs[index].y = 0;
                  if (fangs[index].x < 10) fangs[index].x = game.width - 101;
                  if (fangmovex < 20) fangs[index].xv = -5;
                  if (fangmovex > 20) fangs[index].xv = 5;
                  if (fangmovey < 10) fangs[index].yv = 5;
                  if (fangmovey > 10) fangs[index].yv = -5;
                  fangs[index].x += fangs[index].xv;
                  fangs[index].y += fangs[index].yv;
                  if (game.rnd.integerInRange(1,90 - levelGroup) == 1 && player_state == PLAYER_STATE_ALIVE)
                      Fire_Enemy_Laser(fangs[index].x, fangs[index].y, attack_speed + 5);

                  // test for collision with enemies
                  if (Collision_Test(player.x, player.y,
                                  player.width, player.height,
                                  fangs[index].x, fangs[index].y,
                                  fangs[index].width, fangs[index].height) && player_state == PLAYER_STATE_ALIVE) {
                      Start_Burst(fangs[index].x, fangs[index].y,
                                  68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                                  fangs[index].xv >> 1, fangs[index].yv >> 1);

                      // update players damage
                      player_damage += 100;
                      Initialize_Enemy_Positions();
                      fangs_killed = 0;
                  } // end if collision

              } // end for index
          }
      }//Level4

      //MOVE HWINGS	
      if (Level == 5) {
          for (var index = 0; index < hwings_active; index++) {
              // test if enemies pulse is in flight
              if (hwings[index].state == ENEMY_STATE_ON) {
                  // move the enemy
                  if (hwings[index].x < 10) hwings[index].x = game.width - 101;
                  if (hwings[index].x > game.width - 100) hwings[index].x = 10;
                  if (hwings[index].y > player.y) hwings[index].y = 10;
                  hwings[index].x += hwings[index].xv;
                  hwings[index].y += hwings[index].yv;



                  // test for collision with enemies
                  if (Collision_Test(hwings[index].x, hwings[index].y,
                                      hwings[index].width, hwings[index].height,
                                      player.x, player.y,
                                  player.width, player.height) && player_state == PLAYER_STATE_ALIVE) {
                      Start_Burst(hwings[index].x, hwings[index].y,
                                  68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                                  hwings[index].xv >> 1, hwings[index].yv >> 1);

                      // update players damage
                      player_damage += 100;
                      Initialize_Enemy_Positions();
                      hwings_killed = 0;
                  } // end if collision


              } // end for index
          }
      }//Level5

      //MOVE METEORS	
      if (Level == 6) {
          for (var index = 0; index < meteors_active; index++) {
              // test if enemies pulse is in flight
              if (meteors[index].state == ENEMY_STATE_ON) {
                  // move the enemy
                  if (meteors[index].y > player.y) {
                      meteors[index].y = 10;
                      meteors[index].x = game.rnd.integerInRange(1,500);
                  }

                  //meteors[index].x += meteors[index].xv;
                  meteors[index].y += meteors[index].yv;

                  // test for collision with enemies
                  if (Collision_Test(meteors[index].x, meteors[index].y,
                                      meteors[index].width, meteors[index].height,
                                      player.x, player.y,
                                  player.width, player.height) && player_state == PLAYER_STATE_ALIVE) {
                      Start_Burst(meteors[index].x, meteors[index].y,
                                  68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                                  meteors[index].xv >> 1, meteors[index].yv >> 1);

                      // update players damage
                      player_damage += 100;
                      Initialize_Enemy_Positions();
                      meteors_killed = 0;

                  } // end if collision
              }

          } // end for index
      }//Level6

      //MOVE SCRAMBLES	
      if (Level == 7) {
          for (var index = 0; index < scrambles_active; index++) {
              // test if enemies pulse is in flight
              if (scrambles[index].state == ENEMY_STATE_ON) {
                  // move the enemy
                  scrambles[index].xv = 5;
                  scrambles[index].yv = 5;
                  if (scrambles[index].y > player.y) scrambles[index].y = 10;
                  if (scrambles[index].x > game.width - 100) scrambles[index].x = 10;
                  if (scrambles[index].x < 10) scrambles[index].x = game.width - 100;

                  scrambles[index].x += scrambles[index].xv;
                  scrambles[index].y += scrambles[index].yv;

                  // test for collision with enemies
                  if (Collision_Test(scrambles[index].x, scrambles[index].y,
                                      scrambles[index].width, scrambles[index].height,
                                      player.x, player.y,
                                  player.width, player.height) && player_state == PLAYER_STATE_ALIVE) {
                      Start_Burst(scrambles[index].x, scrambles[index].y,
                                  68 + game.rnd.integerInRange(1,12), 54 + game.rnd.integerInRange(1,10),
                                  scrambles[index].xv >> 1, scrambles[index].yv >> 1);

                      // update players damage
                      player_damage += 100;
                      Initialize_Enemy_Positions();
                      scrambles_killed = 0;

                  } // end if collision

              }

              if (scrambles[index].state == SCRAMBLE_STATE_RETREATING) {

                  if (scrambles[index].y < 10) {
                      scrambles[index].state = ENEMY_STATE_OFF;
                      scrambles[index].visible = false;
                      scrambles_killed++;

                  }
                  scrambles[index].yv = -5;
                  scrambles[index].xv = 0;
                  if (game.rnd.integerInRange(1, 100) == 1) {
                      scrambles[index].state = ENEMY_STATE_ON;
                      scrambles[index].frame-=3;
                  }
                  scrambles[index].x += scrambles[index].xv;
                  scrambles[index].y += scrambles[index].yv;
              } // end for index

          }
      }//Level7

  } // end Move_enemies

  ///////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////


  function Start_Burst(x, y, width, height, xv, yv) {
      // this function starts a burst up

      // now test if it's time to add a new burst to the list

      // scan for a burst to initialize
      for (var index = 0; index < MAX_BURSTS; index++) {
          // is this burst available?
          if (bursts[index].state == BURST_STATE_OFF) {
              // set animation rate
              bursts[index].curr_frame = 0;


              // set position
              bursts[index].x = x;
              bursts[index].y = y;


              // turn burst on
              bursts[index].state = BURST_STATE_ON;
              bursts[index].animations.play('burst', false);
              // later
              return;

          } // end if

      } // end for index

  } // end Start_Burst

  ///////////////////////////////////////////////////////////
  function pad(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
  }

  function Draw_Info() {
      // this function draws all the information at the top of the screen
      // build up score string
      infoText2.visible = true;
      var scoreText = pad(player_score, 10);
      var info = "SCORE: " + scoreText + '     ';

      scoreText = (pad(highscore, 10));
      info += "HIGH SCORE: " + scoreText + '     ';

      // Level
      info += "LEVEL: " + (Level + levelGroup) +'     ';

      // draw ships
      info += "SHIPS: " + player_ships;
      infoText2.setText(info);

  } // end Draw_Info

  ///////////////////////////////////////////////////////////

  function Do_Intro() {
      // the world's simplest intro

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
      //Sleep(2000);
  } // end Do_Intro


