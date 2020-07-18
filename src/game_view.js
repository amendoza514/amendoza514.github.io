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
    this.checkChain;
    this.checkCollision = this.checkCollision.bind(this);
    this.chainReaction = this.chainReaction.bind(this);
    this.approxY = this.approxY.bind(this);
  }

  getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }
  checkCollision() {
    for (let i = 0; i < this.game.projectiles.length; i++) {
      for (let k = 0; k < this.game.projectiles.length; k++) {
        if (i !== k) {
          let pX = this.game.projectiles[i].aimX;
          let pY = this.game.projectiles[i].aimY;
          let pRadius = this.game.projectiles[i].radius;
          let tX = this.game.projectiles[k].aimX;
          let tY = this.game.projectiles[k].aimY;
          let tRadius = this.game.projectiles[i].radius;

          if (this.getDistance(pX, pY, tX, tY) < pRadius + tRadius) {
            this.game.projectiles[i].dx = 0;
            this.game.projectiles[i].dy = 0;
            this.game.projectiles[i].aimX = this.approxX(pX, tX);
            this.game.projectiles[i].aimY = this.approxY(pY, tY);
            pRadius = tRadius;

            if (
              this.game.projectiles[i].color === this.game.projectiles[k].color
            ) {
              this.game.projectiles[i].hit = true;
              this.game.projectiles[k].hit = true;
              this.checkChain = true;
            }
          }
        }
        this.game.projectiles[i].radius = this.game.projectiles[k].radius;
        for (let j = 0; j < this.game.targets.length; j++) {

          if (
            this.getDistance(
              this.game.projectiles[i].aimX,
              this.game.projectiles[i].aimY,
              this.game.targets[j].x,
              this.game.targets[j].y
            ) <
            this.game.projectiles[i].radius + this.game.targets[j].radius
          ) {
            //collision response
            this.game.projectiles[i].collided = true;
            let tempX = this.game.targets[j].x;
            // projectile instructions
            this.game.projectiles[i].radius = this.game.targets[j].radius;
            this.game.projectiles[i].dx = 0;
            this.game.projectiles[i].dy = 0;
            this.game.projectiles[i].aimX = this.approxX(
              this.game.projectiles[i].aimX,
              this.game.targets[j].x
              );
              this.game.projectiles[i].aimY = this.approxY(
                this.game.projectiles[i].aimY,
                this.game.targets[j].y
                );

            if (this.game.projectiles[i].color === this.game.targets[j].color) {
              this.game.projectiles[i].hit = true;
              this.game.targets[j].hit = true;
              this.checkChain = true;
            }
          }
          this.game.projectiles[i].radius = this.game.targets[j].radius;
        }
      }
    }
  }

  approxX(x1, x2) {
    if (x1 > x2) {
      return x2 + 20;
    } else {
      return x2 - 20;
    }
  }
  approxY(y1, y2) {
    if (y1 > y2) {
      return y2 + 35;
    } else {
      return y2 - 35;
    }
  }
  // approxY(yInput, y2) {
  //   let yPositions = [20, 55, 90, 125, 160, 195, 230, 265, 300, 335, 370, 405, 440, 475, 510, 545, 580];
  //   let yOutput = yPositions.reduce((previous, current) => Math.abs(current - yInput) < Math.abs(previous - yInput) ? current : previous);
  //   return yOutput;
  // }
  // approxX(pX, offset, tX) {
  //   let xPositions = [40, 80, 120, 160, 200, 240, 280, 20, 60, 100, 140, 180, 220, 260, 300];
  //   // if ([20, 60, 100, 140, 180, 220, 260, 300].indexOf(tempX) === - 1) {
  //   //   xPositions = [20, 60, 100, 140, 180, 220, 260, 300];
  //   // } else {
  //   //   xPositions = [40, 80, 120, 160, 200, 240, 280];
  //   // }
  //   let xOutput = xPositions.reduce((previous, current) => Math.abs(current - pX) < Math.abs(previous - pX) ? current : previous);
  //   return xOutput;
  // }

  //still need to add collision on ball ball and ball target
  chainReaction() {
    while (this.checkChain === true) {
      //target / target
      for (let i = 0; i < this.game.targets.length; i++) {
        console.log("checking");
        for (let k = 0; k < this.game.targets.length; k++) {

          if (i !== k) {
            let pX = this.game.targets[i].x;
            let pY = this.game.targets[i].y;
            let pRadius = this.game.targets[i].radius;
            let tX = this.game.targets[k].x;
            let tY = this.game.targets[k].y;
            let tRadius = this.game.targets[i].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {

              if (
                this.game.targets[i].color === this.game.targets[k].color &&
                (this.game.targets[i].hit || this.game.targets[k].hit)
              ) {
                this.game.targets[i].hit = true;
                this.game.targets[k].hit = true;
                this.checkChain = false;
              }
            }
          }
        }
      }
      //projectile / target
      for (let i = 0; i < this.game.projectiles.length; i++) {
        console.log("checking");
        for (let k = 0; k < this.game.targets.length; k++) {
            let pX = this.game.projectiles[i].aimX;
            let pY = this.game.projectiles[i].aimY;
            let pRadius = this.game.projectiles[i].radius;
            let tX = this.game.targets[k].x;
            let tY = this.game.targets[k].y;
            let tRadius = this.game.targets[i].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {

              if (
                this.game.projectiles[i].color === this.game.targets[k].color &&
                (this.game.projectiles[i].hit)
              ) {
                this.game.projectiles[i].hit = true;
                this.game.targets[k].hit = true;
                this.checkChain = false;
              }
            }
        }
      }
      // projectile / projectile
      for (let i = 0; i < this.game.projectiles.length; i++) {
        console.log("checking");
        for (let k = 0; k < this.game.projectiles.length; k++) {

          if (i !== k) {
            let pX = this.game.projectiles[i].aimX;
            let pY = this.game.projectiles[i].aimY;
            let pRadius = this.game.projectiles[i].radius;
            let tX = this.game.projectiles[k].aimX;
            let tY = this.game.projectiles[k].aimY;
            let tRadius = this.game.projectiles[i].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
              
              if (
                this.game.projectiles[i].color ===
                  this.game.projectiles[k].color &&
                (this.game.projectiles[i].hit || this.game.projectiles[k].hit)
              ) {
                this.game.projectiles[i].hit = true;
                this.game.projectiles[k].hit = true;
                this.checkChain = false;
              }
            }
          }
        }
      }
      this.checkChain = false;
    }
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
    this.mousePosition = [event.offsetX, event.offsetY];
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
    this.game.turret.setColors();
    this.game.addTargets();
    this.game.moveTargets();
  }

  startGame() {
    this.setup();
    this.animate();
  }

  animate() {
    this.checkCollision();
    this.chainReaction();
    this.game.drawElements(this.context, this.mousePosition);
    // if (!this.game.gameOver()) {
    requestAnimationFrame(this.animate.bind(this));
    // }
  }
};

module.exports = GameView;