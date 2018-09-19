
var INITIAL = 1;
var GAME_PLAYING = 2;
var GAME_OVER = 3;

var KEY_CODE = {
    R: 82,
}

function FlappyMonster(canvas) {

    //Base
    var game = this;

    //Global Attributes
    game.canvas = canvas;
    game.context = game.canvas.getContext('2d');

    // Game State
    game.currentState = INITIAL;

    // Game Speed
    game.velocity = 5;

    // Bind Events
    game.bindEvents();

    // Create Game Objects
    game.createObjects();
};

FlappyMonster.prototype.createObjects = function () {
    // Base
    var game = this;

    // Background
    game.background1 = new GameBackground('images/back.png', game.canvas);
    game.background2 = new GameBackground('images/back.png', game.canvas);
    game.background2.x = game.canvas.width;

    // Score
    game.gameScore = new GameScore(game.canvas);
    game.gameScore.x = game.canvas.width - 150;
    game.gameScore.y = 80;

    // Wall Factory
    game.WallFactory = new WallFactory(game.canvas);

    // Monster
    game.monster = new Monster('images/monster.png', game.canvas);
}

FlappyMonster.prototype.bindEvents = function () {
    // Base
    var game = this;

    // Mouse Listener
    game.canvas.addEventListener('click', function(event) {
        switch (game.currentState) {
            case INITIAL:
                game.currentState = GAME_PLAYING;
                game.WallFactory.generateWalls();
                game.gameScore.start = new Date();
                break;
            case GAME_PLAYING:
                game.monster.vy = -1 * game.velocity;
                break;
            default:
        }
    });

    // Key Listener
    window.addEventListener('keydown', function(event) {
        switch(game.currentState) {
            case GAME_OVER:
                if(event.keyCode === KEY_CODE.R) {
                    game.reset();
                    game.currentState = GAME_PLAYING;
                }
                break;
            default:
        }
    });
}

FlappyMonster.prototype.reset = function () {
    // Base
    var game = this;

    // Reset States
    game.gameScore.start = new Date();
    game.gameScore.score = 0;
    game.WallFactory.walls = [];
    game.monster.x = 115;
    game.monster.y = 115;
};

FlappyMonster.prototype.start = function () {
    //Base
    var game = this;

    // Start Game
    window.requestAnimationFrame(function () {
        game.runGameLoop();
    });
};

FlappyMonster.prototype.runGameLoop = function () {
    //Base
    var game = this;

    switch (game.currentState) {
        case INITIAL:
            // Draw Initial Screen
            game.drawInitialScreen();
            break;
        case GAME_PLAYING:
            // Draw Game Playing Screen
            game.drawGamePlayingScreen();
            break;
        case GAME_OVER:
            // Draw Game Over Screen
            game.drawGameOverScreen();
            break;
        default:
    }

    window.requestAnimationFrame(function () {
        game.runGameLoop();
    });
};

FlappyMonster.prototype.drawInitialScreen = function () {
    // Base
    var game = this;

    // Draw

    // Background
    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Text
    game.context.fillStyle = 'white';
    game.context.font = '36px Arial';
    game.context.fillText('Click to start!', game.canvas.width / 2 - 100, game.canvas.height / 2);
};

FlappyMonster.prototype.drawGamePlayingScreen = function () {
    // Base
    var game = this;

    // Clear Canvas
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    // Background
    game.animateBackground();
    
    // Draw Score
    game.gameScore.draw();

    // Draw Walls
    game.drawWalls();

    // Draw Monster
    game.monster.draw();

    // Collision Check
    game.checkCollisions();
};

FlappyMonster.prototype.checkCollisions = function () {
    // Base
    var game = this;

    var walls = game.WallFactory.walls;

    for(var i = 0; i < walls.length; i++) {
        if(game.isCollided(game.monster, walls[i])) {
            game.currentState = GAME_OVER;
        }
    }
};

FlappyMonster.prototype.isCollided = function(monster, wall) {
    // Base
    var game = this;
    var isCollided = true;

    // Monster Coordinates
    var monsterTop = monster.y;
    var monsterBottom = monster.y + monster.h;
    var monsterRight = monster.x + monster.w;
    var monsterLeft = monster.x;

    // Wall Coordinates
    var wallTop = wall.y + wall.h + wall.gap // top of lower wall
    var wallBottom = wall.y + wall.h // bottom of upper wall
    var wallRight = wall.x + wall.w;
    var wallLeft = wall.x;

    if ((monsterBottom < wallTop && monsterTop > wallBottom)
    || (monsterLeft > wallRight)
    || (monsterRight < wallLeft)) {
        isCollided = false;
    }

    return isCollided;
}

FlappyMonster.prototype.drawWalls = function() {
    // Base
    var game = this;

    // Draw Walls
    var walls = game.WallFactory.walls;

    for(var i = 0; i < walls.length; i++) {
        walls[i].draw();
        walls[i].x = walls[i].x - game.velocity;
    }

    game.removeExtraWalls();
}

FlappyMonster.prototype.removeExtraWalls = function() {
    // Base
    var game = this;

    // Draw Walls
    var walls = game.WallFactory.walls;

    for (var i = 0; i < walls.length; i++) {
        if(walls[i].x + walls[i].w < 0 ) {
            // Remove
            walls.shift();
        }
    }
}

FlappyMonster.prototype.animateBackground = function () {
    // Base
    var game = this;

    // Background1
    game.background1.draw();

    if (Math.abs(game.background1.x) > game.canvas.width) {
        game.background1.x = game.canvas.width - game.velocity;
    }

    game.background1.x = game.background1.x - game.velocity;

    // Background 2
    game.background2.draw();

    if (Math.abs(game.background2.x) > game.canvas.width) {
        game.background2.x = game.canvas.width - game.velocity;
    }

    game.background2.x = game.background2.x - game.velocity;
};

FlappyMonster.prototype.drawGameOverScreen = function () {
    // Base
    var game = this;

    // Draw

    // Background
    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Text
    game.context.fillStyle = 'white';
    game.context.font = '54px Arial';
    game.context.fillText('Your Score : ' + game.gameScore.score, game.canvas.width / 2 - 180, game.canvas.height / 2 - 100);
    game.context.font = '36px Arial';
    game.context.fillText('Game over :(', game.canvas.width / 2 - 100, game.canvas.height / 2);
    game.context.font = '24px Arial';
    game.context.fillText('Press R to Restart', game.canvas.width / 2 - 100, game.canvas.height / 2 + 50);
}