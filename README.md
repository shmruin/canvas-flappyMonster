# canvas-flappyMonster
Simple game of a jumping monster with mouse click in Javascript, canvas

![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)
![Codacy grade](https://img.shields.io/codacy/grade/e27821fb6289410b8f58338c7e0bc686.svg)

## Description
 * `flappy-monster` is a Canvas based simple Javascript game for fun,
 * Following code of udemy Canvas Flappy Monster game, Html5 Canvas class

![Alt text](screenshots/flappy_monster.gif?raw=true "udemy canvas flappy monster")

## Installation
Download or Clone all the files and run `index.html`

## How to play
* *Left mouse click* to jump the monster
* *R key* to restart when game finished
* Get forward the monster as far as you can

## Structure
* `index.html`
* `canvas-script.js` : register the main canvas and start the game
* `util.js` : utility functions. Related to animation frame and random generators.
* `flappy-monster.js` : all main of the game 
* `game-background.js` - background js file. create and draw.
* `game-score.js` : score js file. draw the score.
* `monster.js` : monster(player) js file. create and draw.
* `wall.js` : Individual wall object js file. draw the wall.
* `wall-factory.js` : Wall generator js file. generate the walls.


## License
[MIT](License.md) © [shmruin](https://github.com/shmruin/)
