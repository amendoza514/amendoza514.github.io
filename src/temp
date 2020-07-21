const Target = require("./target");
const Turret = require("./turret");
const Projectile = require("./projectile");

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
    this.resetGame = this.resetGame.bind(this);
    this.setup = this.setup.bind(this);
    this.approxY = this.approxY.bind(this);
    this.checkChain;
    this.checkCollision = this.checkCollision.bind(this);
    this.chainReaction = this.chainReaction.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
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
            this.game.projectiles[i].radius = 20;
            this.game.projectiles[i].aimX = this.approxX(pX, tX);
            this.game.projectiles[i].aimY = this.approxY(pY, tY);

            if (
              this.game.projectiles[i].color === this.game.projectiles[k].color
            ) {
              this.game.projectiles[i].hit = true;
              this.game.projectiles[k].hit = true;
              this.checkChain = true;
            }
          }
        }
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
            // projectile instructions
            this.game.projectiles[i].dx = 0;
            this.game.projectiles[i].dy = 0;
            this.game.projectiles[i].radius = 20;
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
          // this.game.projectiles[i].radius = this.game.targets[j].radius;
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
    } else if (y1 < y2) {
      return y2 - 35;
    }
  }

  //older aiming
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
        // console.log("checking");
        let check = 0;
        for (let k = 0; k < this.game.targets.length; k++) {
          if (i !== k) {
            let pX = this.game.targets[i].x;
            let pY = this.game.targets[i].y;
            let pRadius = this.game.targets[i].radius;
            let tX = this.game.targets[k].x;
            let tY = this.game.targets[k].y;
            let tRadius = this.game.targets[i].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
              check += 1;
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
        if (check === 0) {
          this.game.targets[i].drop = true;
        }
      }
      //projectile / target
      for (let i = 0; i < this.game.projectiles.length; i++) {
        // console.log("checking");
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
              this.game.projectiles[i].hit
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
        // console.log("checking");
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

  checkValidation() {
    let shot = this.game.projectiles[this.game.projectiles.length - 1];
    for (let i = 0; i < this.game.projectiles.length - 1; i++) {
      let obj = this.game.projectiles[i];
      if (
        this.getDistance(shot.aimX, shot.aimY, obj.aimX, obj.aimY) - 5 <
        shot.radius + obj.radius
      ) {
        if (shot.color === obj.color) {
          shot.hit = true;
          obj.hit = true;
          this.checkChain = true;
          // console.log("saved");
        }
      }
    }
    for (let i = 0; i < this.game.targets.length; i++) {
      let obj = this.game.targets[i];
      if (
        this.getDistance(shot.aimX, shot.aimY, obj.x, obj.y) - 5 <
        shot.radius + obj.radius
      ) {
        if (shot.color === obj.color) {
          shot.hit = true;
          obj.hit = true;
          this.checkChain = true;
          // console.log("saved");
        }
      }
    }
  }

  listenForMove() {
    this.canvas.addEventListener("mousemove", this.handleMove);
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

  startUp() {
    if (!this.game.playing) {
      this.start.innerHTML = `start`;
      this.start.addEventListener("click", this.startGame);
      this.game.playing = true;
    }
  }

  startGame() {
    this.setup();
    this.animate();
  }

  resetGame() {
    this.game.playing = true;
    this.game.intervals.forEach(interval => clearInterval(interval));
    // this.game.turret = new Turret(this)
    this.game.intervals = []
    this.game.projectiles = [];
    this.game.targets = [];
    this.game.score = 0;
     this.game.addTargets();
     this.game.moveTargets();
  }

  animate() {
    if (this.game.playing) {
      this.start.innerHTML = `reset`;
      this.start.addEventListener("click", this.resetGame);
    }
    if (this.game.projectiles.length > 0) {
      this.checkCollision();
      this.checkValidation();
      this.chainReaction();
      if (this.checkChain === true) {
        this.chainReaction();
      }
    }
    this.game.drawElements(this.context, this.mousePosition);
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
