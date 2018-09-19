

function GameScore(canvas) {
    // Base
    var gameScore = this;

    // Global Attributes
    gameScore.canvas = canvas;
    gameScore.context = gameScore.canvas.getContext('2d');

    // Specifications
    gameScore.start = 0;
    gameScore.score = 0;
    gameScore.x = 0;
    gameScore.y = 0;
}

GameScore.prototype.draw = function() {
    // Base
    var gameScore = this;

    // Draw
    var drawTime = new Date();

    gameScore.score = parseFloat((drawTime - gameScore.start) / 1000).toFixed(1);

    gameScore.context.font = '45px Verdana';
    gameScore.context.fillText(gameScore.score, gameScore.x, gameScore.y);
};