
var gameStart = false;
// weapons defines
var LASER_STATE_OFF = 0;   // this laser is dead or off
var LASER_STATE_ON = 1;   // this one is alive and in flight

//enemy defines
var MAX_SNEAKERS = 12;
var MAX_CYCLOPS = 12;
var MAX_SAUCERS = 12;
var MAX_FANGS = 12;
var MAX_HWINGS = 22;
var MAX_METEORS = 22;
var MAX_SCRAMBLES = 12;

var ENEMY_STATE_OFF = 0;   // this enemy is dead or off
var ENEMY_STATE_ON = 1;   // this one is alive
var SCRAMBLE_STATE_RETREATING = 2;

var MAX_ENEMY_LASER = 12;
var ENEMY_LASER_STATE_OFF = 0;   // this laser is dead or off
var ENEMY_LASER_STATE_ON = 1;   // this one is alive and in flight

// explosion defines 
var MAX_BURSTS = 8;
var BURST_STATE_OFF = 0;   // this burst is dead or off
var BURST_STATE_ON = 1;   // this one is alive

// defines for player states
var PLAYER_STATE_DEAD = 0;
var PLAYER_STATE_ALIVE = 1;
var player;            // the player 

var introTextSize = .01;
var introText;
var introText2;

var lasers = [];    // laser pulses
var score = 0;
var hscore = 0;
var sneakers = [MAX_SNEAKERS];
var cyclops = [MAX_CYCLOPS];
var fangs = [MAX_FANGS];
var hwings = [MAX_HWINGS];
var meteors = [MAX_METEORS];
var saucers = [MAX_SAUCERS];
var scrambles = [MAX_SCRAMBLES];
var enemy_lasers = [MAX_ENEMY_LASER];

var showintro = 0;
var bursts = [MAX_BURSTS];    // the explosion bursts

var Level = 1;
var levelGroup = 0;
var sneaker_killed = 0, cyclops_killed = 0, saucers_killed = 0,
  fangs_killed = 0, hwings_killed = 0, meteors_killed = 0,
  scrambles_killed = 0;
var sneakers_active = 5, cyclops_active = 8, saucers_active = 8,
  fangs_active = 8, hwings_active = 5, meteors_active = 16,
  scrambles_active = 5, enemy_laser_active = 6;

var fangmovex=0, fangmovey=0;
// player state variables
var player_state = PLAYER_STATE_ALIVE;
var player_score = 0;  // the score
var highscore = 0;  // the high score
var player_ships = 3;  // ships left
var player_damage = 0;  // damage of player
var player_counter = 0;  // used for state transition tracking
var leftKey;
var rightKey;
var fireKey;
var infoText;
var attack_speed = 5;
var scoreText;
var playKey;
var scoreText;
var hiscoreText;
var levelText;
var livesText;
var leftButton;
var rightButton;
var gameOver = false;
var gameOverText;
var gameOverText2;
var gameOverText3;