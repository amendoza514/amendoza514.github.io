const Target = require("./target");

class GameView {
  constructor(game, context, canvas, start, pause, reset) {
    this.game = game;
    this.start = start;
    this.pause = pause;
    this.reset = reset;
    this.context = context;
    this.canvas = canvas;
    this.mousePosition = [0, 0];
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.startGame = this.startGame.bind(this);
    this.setup = this.setup.bind(this);
    this.playing = false;
    this.tracking = [];
    this.checkCollision = this.checkCollision.bind(this);
    this.approx = this.approx.bind(this)
  }

  getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }
  checkCollision() {
    for (let i = 0; i < this.game.projectiles.length; i++) {
      for (let k = 0; k < this.game.projectiles.length; k ++) {
        for (let j = 1; j < this.game.targets.length; j++) {
          if (
            this.getDistance(
              this.game.projectiles[i].aimX,
              this.game.projectiles[i].aimY,
              this.game.targets[j].x,
              this.game.targets[j].y
            ) < this.game.projectiles[i].radius + this.game.targets[j].radius) {
            //collision response

            this.game.projectiles[i].collided = true
            // this.game.targets.push(this.game.projectiles[i])
            this.game.projectiles[i].dx = 0;
            this.game.projectiles[i].dy = 0;
            this.game.projectiles[i].aimX = this.game.targets[j].x;
            this.game.projectiles[i].aimY = this.approx(this.game.projectiles[i].aimY)
          }
        }
      }
    }
  }

  approx(input) {
    let counts = [55, 90, 125, 160, 195, 230, 265, 300, 335, 370, 405, 440, 475, 510, 545, 580];
    let output = counts.reduce((previous, current) => Math.abs(current - input) < Math.abs(previous - input) ? current : previous);
    return output + 5;
  }

  listenForMove() {
    this.canvas.addEventListener("mousemove", this.handleMove);
  }

  startup() {
    console.log("waiting");
    // if (!this.playing) {
    this.start.addEventListener("click", this.startGame);
    //   this.playing = !this.playing;
    // } else {
    //   this.playing = !this.playing;
    // }
    console.log(this.playing);
  }

  handleMove(event) {
    this.mousePosition = [event.clientX, event.clientY];
  }

  listenForClick() {
    this.canvas.addEventListener("click", this.handleClick);
  }

  handleClick() {
    this.game.turret.fire();
  }

  setup() {
    this.listenForMove();
    this.listenForClick();
    this.game.addTargets();
    this.game.moveTargets();
  }

  startGame() {
    this.setup();
    this.animate();
  }

  animate() {
    this.game.drawElements(this.context, this.mousePosition);
    this.checkCollision();
    // if (!this.game.gameOver()) {
      requestAnimationFrame(this.animate.bind(this));
    // }
  }
};

module.exports = GameView;