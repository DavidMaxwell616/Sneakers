
//enemy defines
const ALIVE = 1;
const DEAD = 0;
const RETREATING = 2;

var gameStart = false;

var player;            // the player 

var introTextSize = .01;
var introText;
var introText2;

var score = 0;
var hscore = 0;
var sneakers = [];
var cyclops = [];
var fangs = [];
var hwings = [];
var meteors = [];
var saucers = [];
var scrambles = [];
var enemy_lasers = [];
var laser;

var showintro = 0;
var bursts = [];    // the explosion bursts
var isFiring;
var Level = 1;
var levelGroup = 0;
var sneakers_active = 5, 
    cyclops_active = 8, 
    saucers_active = 8,
    fangs_active = 8,
    hwings_active = 5,
    meteors_active = 16,
    scrambles_active = 5,
    enemy_laser_active = 6;

var fangmovex=0; 
fangmovey=0;
var player_score = 0;  // the score
var highscore = 0;  // the high score
var lives = 23;  // ships left
var player_damage = 0;  // damage of player
var player_counter = 0;  // used for state transition tracking
var leftKey;
var rightKey;
var fireKey;
var infoText;
var attack_speed = 5;
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
var localStorageName = "sneakers";
var cursors;
