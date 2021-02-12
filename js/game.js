var game = new Phaser.Game(800,
  480,
  Phaser.AUTO,
  'phaser-example',
  { preload: preload, create: create, update: update });

const width = game.width-50;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#000000';
  player = game.add.sprite(width / 2, game.height - 82, 'player');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  var background = this.add.image(0, 0, 'background');
  background.width = this.game.width;
  background.height = this.game.height-18;

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

Init_Enemies();

cursors = game.input.keyboard.createCursorKeys();
fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  

leftArrow = game.add.sprite(25, game.world.height-20, 'scrambles');
leftArrow.anchor.set(0.5);
leftArrow.frame = 2;
leftArrow.angle=-270;
leftArrow.inputEnabled = true;
leftArrow.events.onInputDown.add(function () {
  moveleft = true;
});
leftArrow.events.onInputUp.add(function () {
  moveleft = false;
});

rightArrow = game.add.sprite(game.world.width-80, game.world.height-20, 'scrambles');
rightArrow.anchor.set(0.5);
rightArrow.frame = 2;
rightArrow.angle=-90;
rightArrow.inputEnabled = true;
rightArrow.events.onInputDown.add(function () {
  moveleft = true;
});
rightArrow.events.onInputUp.add(function () {
  moveleft = false;
});

game.input.onDown.add(Fire, this);

highScore = localStorage.getItem(localStorageName) == null ? 0 :
          localStorage.getItem(localStorageName);
Draw_Info();
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
    var men = "SHIPS: " + lives;
    scoreText = game.add.text(width *.05, 20, score, format);      
    hiscoreText = game.add.text(width *.25, 20, hiscore, format);
    levelText = game.add.text(width *.55, 20, level, format);
    livesText = game.add.text(width *.75, 20, men, format);
} 

function Start_Burst(sprite1, sprite2) {
  if(sprite1.key=='scrambles' && game.rnd.integerInRange(1,10)<5)
  { 
    sprite1.state = RETREATING;
    sprite1.angle=-180;
    player_score+=sprite1.value;
    sprite2.destroy();
  return;
  }
  var burst = game.add.sprite(game.width / 2, game.height - 10, 'burst');
  burst.anchor.set(0.5);
  var anim = burst.animations.add('burst');
  burst.width = 68 + game.rnd.integerInRange(1,12);
  burst.height = 54 + game.rnd.integerInRange(1,10);
  burst.x = sprite1.x;
  burst.y = sprite1.y;
  burst.xv = sprite1.xv>>1;
  burst.yv = sprite1.yv>>1;
  player_score+=sprite1.value;
  if(sprite2.key=='player')
  {
    lives--;
    ready_state = 1;
    showintro = 0;
    sprite2.visible = true;
    sprite2.x = width/2;
  }
  else
    sprite2.destroy();
  sprite1.destroy();
  burst.animations.play('burst', false);
} 

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
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
    var men = "SHIPS: " + lives;
    scoreText.setText(score);      
    hiscoreText.setText(hiscore);
    levelText.setText(level);
    livesText.setText(men);
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

function Fire(){
  if(!gameStart){
  introText.
  visible = false;
  introText2.visible = false;
  gameStart = true;
}
else{
  var y = game.input.activePointer.position.y;
  if(y<game.height-70 && !isFiring){
    isFiring = true;
    Fire_Laser(player.x, player.y - 5, 16);
  }
}
}

function TouchFire(){
  if(!gameStart)
  {
    introText.visible = false;
    introText2.visible = false;
    gameStart = true;
  }
}


function Init_Enemies() {
  switch (Level) {
    case 1:
      for (var enemy = 0; enemy <= sneakers_active; enemy++) {
        var sneaker = game.add.sprite(game.width / 2, game.height / 2, 'sneakers');
        if (enemy < sneakers_active / 2) {
          var anim = sneaker.animations.add('bluesneaker', [0,1,2,3], 10, true);
        anim.play();
        }
        else {
          var anim = sneaker.animations.add('yellowsneaker', [4,5,6,7], 10, true);
          anim.play();
        }
        sneaker.xv = (game.rnd.integerInRange(1,2) * attack_speed);
        sneaker.yv = (game.rnd.integerInRange(1, 2) * attack_speed);
        sneaker.x = game.rnd.integerInRange(20,game.width-100);
        sneaker.y = game.rnd.integerInRange(20, 140);
        sneaker.anchor.set(0.5);
        sneaker.value = 50;
        sneaker.alive = true;
        game.physics.arcade.enable([sneaker,player]);
        sneaker.body.onCollide = new Phaser.Signal();
        sneaker.body.onCollide.add(Start_Burst,this);
        sneakers.push(sneaker);
    }
      
      break;
      case 2:
     //CREATE CYCLOPS
     for (enemy = 0; enemy <= cyclops_active; enemy++) {
      var cyclop = game.add.sprite(game.width / 2, game.height - 60, 'cyclops');
      game.physics.enable(cyclop, Phaser.Physics.ARCADE);
      if (enemy < cyclops_active / 2) {
        var anim = cyclop.animations.add('bluecyclops', [0,1,2,3], 10, true);
        anim.play();
          }
      else {
        var anim = cyclop.animations.add('yellowcyclops', [4,5,6,7], 10, true);
        anim.play();
      }
      cyclop.xv=attack_speed;
      cyclop.value = 100;
      cyclop.alive = true;
      cyclop.anchor.set(0.5);
          game.physics.arcade.enable([cyclop,player]);
          cyclop.body.onCollide = new Phaser.Signal();
          cyclop.body.onCollide.add(Start_Burst,this);
           cyclops.push(cyclop);
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
      game.physics.enable(saucer, Phaser.Physics.ARCADE);
      saucer.frame = game.rnd.integerInRange(0, 2);
      saucer.anchor.set(0.5);
      if (enemy >= saucers_active / 2)
      saucer.xv = attack_speed;
      else
      saucer.xv = -attack_speed;
      saucer.x = game.rnd.integerInRange(1,game.width - 100);
      saucer.y = game.rnd.integerInRange(0,140);
      saucer.yv = attack_speed - 3;
      saucer.value = 200;
      game.physics.arcade.enable([saucer,player]);
      saucer.body.onCollide = new Phaser.Signal();
      saucer.body.onCollide.add(Start_Burst,this);
      saucers.push(saucer);
    }
        break;
    case 4:
    //CREATE FANGS
    for (enemy = 0; enemy <= fangs_active; enemy++) {
      var fang = game.add.sprite(game.width / 2, game.height - 60, 'fangs');
      game.physics.enable(fang, Phaser.Physics.ARCADE);
      fang.frame = game.rnd.integerInRange(0, 2);
      fang.anchor.set(0.5);
      fang.xv = -attack_speed;
      fang.yv = attack_speed;
      game.physics.arcade.enable([fang,player]);
      fang.body.onCollide = new Phaser.Signal();
      fang.body.onCollide.add(Start_Burst,this);
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
        game.physics.enable(hwing, Phaser.Physics.ARCADE);
        hwing.frame = game.rnd.integerInRange(0, 2);
        hwing.anchor.set(0.5);
        hwing.x = game.rnd.integerInRange(1,game.width - 100);
        hwing.y = game.rnd.integerInRange(1,140);
        hwing.x = game.rnd.integerInRange(1,game.width - 100);
        hwing.x = game.rnd.integerInRange(1,140);
        if (enemy < hwings_active / 2)
        hwing.xv = attack_speed;
        else
        hwing.xv = -attack_speed;
        hwing.yv = attack_speed;
        hwing.value = 300;
        game.physics.arcade.enable([hwing,player]);
        hwing.body.onCollide = new Phaser.Signal();
        hwing.body.onCollide.add(Start_Burst,this);
          hwings.push(hwing);
      }
    
    break;
    case 6:
    //CREATE METEORS
    for (enemy = 0; enemy <= meteors_active; enemy++) {
      var meteor = game.add.sprite(game.width / 2, game.height - 60, 'meteors');
      game.physics.enable(meteor, Phaser.Physics.ARCADE);
      meteor.anchor.set(0.5);
      meteor.animations.add('meteors', [0,1,2,3,4,5,6,7], 10, true);
      meteor.animations.play('meteors');
      meteor.x = game.rnd.integerInRange(1,game.width - 100);
      meteor.y = game.rnd.integerInRange(1,240);
      meteor.yv = attack_speed;
      game.physics.arcade.enable([meteor,player]);
      meteor.body.onCollide = new Phaser.Signal();
      meteor.body.onCollide.add(Start_Burst,this);
      meteors.push(meteor);
      meteor.value = 300;
    }
  
    break;
    case 7:
    //CREATE SCRAMBLES
    for (enemy = 0; enemy <= scrambles_active; enemy++) {
      var scramble = game.add.sprite(game.width / 2, game.height - 60, 'scrambles');
      game.physics.enable(scramble, Phaser.Physics.ARCADE);
      scramble.frame = game.rnd.integerInRange(0, 2);
      scramble.anchor.set(0.5);
      scramble.x = enemy * 50;
        scramble.y = enemy * 50;
        scramble.yv = attack_speed + 3;
        scramble.xv = attack_speed + 3;
        scramble.value = 300;
        game.physics.arcade.enable([scramble,player]);
        scramble.body.onCollide = new Phaser.Signal();
        scramble.body.onCollide.add(Start_Burst,this);
        scramble.state = ALIVE;
        scrambles.push(scramble);
  }
              
    default:
      break;
  }
  
  } 


 function moveLeft(){
  if(player.x>10)
  player.x -= 4;
 }

 function moveRight(){
  if(player.x<game.width-100)
  player.x += 4;
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
          if (cursors.left.isDown || moveleft)
          {
            moveLeft();
          }
          else if (cursors.right.isDown || moveright)
          {
            moveRight();
          }
        
        // test if player is firing
        if (fireKey.isDown && !isFiring ){
            isFiring = true;
            Fire_Laser(player.x, player.y - 5, 16);
        }

        } 
            // if (lives > 0) {
            //     // set state to ready
            //     player.x = game.width / 2;
            //     player.y = game.height - 70;
            //     ready_state = 1;
            //     ready_counter = 0;
            //     // stop the intro if not already
            //     player.visible = true;
            // } 
 
        //GAME OVER ?
        if (lives == 0 && !gameOver) {
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
            var enemiesLeft = sneakers.filter(x => x.alive).length;
            if (enemiesLeft==0) {
              sneakers_active++;
              Level = 2;
              Init_Enemies(Level);
              showintro = 0;
           }
            break;
        case 2:
          enemiesLeft = cyclops.filter(x => x.alive).length;
          if (enemiesLeft==0) {
            Level = 3;
            Init_Enemies(Level);
            showintro = 0;
        }
        break;
        case 3:
          enemiesLeft = saucers.filter(x => x.alive).length;
          if (enemiesLeft==0) {
            Level = 4;
            showintro = 0;
            Init_Enemies(Level);
        }
        break;
        case 4:
          enemiesLeft = fangs.filter(x => x.alive).length;
          if (enemiesLeft==0) {
            Level = 5;
            showintro = 0;
            Init_Enemies(Level);
        }
        break;
        case 5:
          enemiesLeft = hwings.filter(x => x.alive).length;
          if (enemiesLeft==0) {
            hwings_active++;
            Level = 6;
            Init_Enemies(Level);
            showintro = 0;
        }
        break;
        case 6:
          enemiesLeft = meteors.filter(x => x.alive).length;
          if (enemiesLeft==0) {
         meteors_active++;
          Level = 7;
          Init_Enemies(Level);
          showintro = 0;
          }
      break;
        case 7:
          enemiesLeft = scrambles.filter(x => x.alive).length;
          if (enemiesLeft==0) {
          scrambles_active++;
          lives++,
          Level = 1;
          attack_speed++;
          showintro = 0;
          Init_Enemies(Level);
          levelGroup += 7;
                }
          break;
                                      
          default:
            break;
        }

     //   check if user is trying to start over
    if (isFiring && ready_state == 1 && lives == 0) {
      gameOver = false;player.xv=0;
      gameOverText.destroy(); gameOverText2.destroy(); gameOverText3.destroy(); 
        Level = 1; attack_speed = 5; showintro = 0; levelGroup = 0;
        sneakers_active = 5; cyclops_active = 8;
        saucers_active = 8; fangs_active = 8; hwings_active = 5;
        meteors_active = 16; scrambles_active = 5; enemy_laser_active = 6;
        player_score = 0; player.visible = true; player.x = game.width/2;
        lives = 3; 
    }

        if (player_score > highscore) highscore = player_score;

        if(isFiring){
          laser.y += laser.yv;
            if (laser.y < -50) {
              isFiring = false;
                laser.destroy();
            }
          }

      if(gameStart && showintro>59)  
      {
        Move_Enemies();
        
        Update_Info();
      }
     }


//COLLISIONS

if(laser!=null){

switch (Level) {
  case 1:
    sneakers.forEach(enemy => {
      game.physics.arcade.collide(player, enemy);
      game.physics.arcade.collide(laser, enemy);
      });
  break;
  case 2:
  //COLLISION WITH CYCLOPS
  cyclops.forEach(enemy => {
    game.physics.arcade.collide(player, enemy);
    game.physics.arcade.collide(laser, enemy);
  });
  break;
  case 3:
  saucers.forEach(enemy => {
    game.physics.arcade.collide(player, enemy);
    game.physics.arcade.collide(laser, enemy);
  }); 
  enemy_lasers.forEach(enemy_laser => {
    game.physics.arcade.collide(player, enemy_laser);
  }); 
  break;
  case 4:
  //COLLISION WITH FANGS
  fangs.forEach(enemy => {
    game.physics.arcade.collide(player, enemy);
    game.physics.arcade.collide(laser, enemy);
  });
  enemy_lasers.forEach(enemy_laser => {
    game.physics.arcade.collide(player, enemy_laser);
  }); 
  break;
  case 5:
  //COLLISION WITH HWINGS
  hwings.forEach(enemy => {
    game.physics.arcade.collide(player, enemy);
    game.physics.arcade.collide(laser, enemy);
  }); 
  break;
  case 6:
  //COLLISION WITH METEORS
  meteors.forEach(enemy => {
    game.physics.arcade.collide(player, enemy);
    game.physics.arcade.collide(laser, enemy);
  });
  break;
  case 7:
  //COLLISION WITH SCRAMBLES
  scrambles.forEach(enemy => {
    game.physics.arcade.collide(player, enemy);
    game.physics.arcade.collide(laser, enemy);
  });                                    
  break;
  default:
  break;
  }
}
 }




  function Fire_Laser(x, y, vel) {
    laser = game.add.sprite(x, y, 'laser');
    game.physics.enable(laser, Phaser.Physics.ARCADE);
    laser.yv = -vel;
    isFiring = true;
  } 

  function Fire_Enemy_Laser(x, y, vel) {
   var enemy_laser = game.add.sprite(x, y, 'enemy_laser');
   game.physics.enable(enemy_laser, Phaser.Physics.ARCADE);
        enemy_laser.yv = vel;
        game.physics.arcade.enable([enemy_laser,player]);
        enemy_laser.body.onCollide = new Phaser.Signal();
        enemy_laser.body.onCollide.add(Start_Burst,this);
  
        enemy_lasers.push(enemy_laser);
  }

  function Move_Enemies() {
  switch (Level) {
    case 1:
    sneakers.forEach(sneaker => {
    // test if enemies pulse is in flight
    if (sneaker.x > game.width - 100 || sneaker.x < 10) {
      sneaker.xv *= -1;
      sneaker.yv = game.rnd.integerInRange(-5,5);
    }
    if (sneaker.y > game.height - 70 || sneaker.y < 10) {
      sneaker.yv *= -1;
      sneaker.xv = game.rnd.integerInRange(-5,5);
    }
    // move the enemy
    sneaker.x += sneaker.xv;
    sneaker.y += sneaker.yv;
    });
    case 2:
    cyclops.forEach(cyclop => {
        if (cyclop.x > game.width - 100) cyclop.x = 10;
          if (cyclop.y > player.y) cyclop.y = 10;
            if (isFiring) {
              cyclop.xv = 5 + attack_speed;
              cyclop.y += attack_speed;
            }
                else
              cyclop.xv = attack_speed;

          cyclop.x += cyclop.xv;
        });

    break;
    case 3:
    saucers.forEach(saucer => {
                if (saucer.x > game.width - 100) saucer.x = 20;
                if (saucer.x < 20) saucer.x = game.width - 101;
                if (saucer.y > game.height - 200) saucer.yv = -saucer.yv;
                if (saucer.y < 20) saucer.yv = -saucer.yv;
                saucer.x += saucer.xv;
                saucer.y += saucer.yv;
                if (game.rnd.integerInRange(1,100 - levelGroup) == 1 && player.x>saucer.x-50 
                && player.x<saucer.x+50  &&player.visible)
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
            if (game.rnd.integerInRange(1,100 - levelGroup) == 1 && player.x>fang.x-50 
            && player.x<fang.x+50  && player.visible)
           Fire_Enemy_Laser(fang.x, fang.y, attack_speed + 5);
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

    });
      break;
    case 6:
    meteors.forEach(meteor => {
          if (meteor.y > player.y) {
              meteor.y = 10;
              meteor.x = game.rnd.integerInRange(1,500);
          }
          meteor.y += meteor.yv;
    });
    break;
    case 7:
    scrambles.forEach(scramble => {
          scramble.xv = 5;
          scramble.yv = 5;
          if (scramble.y > player.y) scramble.y = 10;
          if (scramble.x > game.width - 100) scramble.x = 10;
          if (scramble.x < 10) scramble.x = game.width - 100;


      if (scramble.state == RETREATING) {
      scramble.yv*=-1;
        if (scramble.y < 20) {
          scramble.angle=0;
          scramble.yv*=-1;
              scramble.state = ALIVE;
          }
          if (game.rnd.integerInRange(1, 100) == 1) {
              scramble.frame-=3;
          }
      } 
      scramble.x += scramble.xv;
      scramble.y += scramble.yv;

    });

    break;
                            
    default:
    break;
  }
  //MOVE ENEMY LASER
  enemy_lasers.forEach(enemy_laser => {
    enemy_laser.y += enemy_laser.yv;
    if (enemy_laser.y > player.y+20) {
        enemy_laser.destroy();
    } 

  });
}

 
