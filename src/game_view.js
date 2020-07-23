const Target = require("./target");
const Turret = require("./turret");
const Projectile = require("./projectile");
const Game = require("./game");

class GameView {
  constructor(game, context, canvas, start) {
    this.game = game;
    this.start = start;
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
    this.check;
  }

  getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }

  checkCollision() {
      let currentShot = this.game.projectiles[this.game.projectiles.length - 1];
      if (this.game.projectiles.length > 0) {
      for (let k = 0; k < this.game.projectiles.length - 1; k++) {
          let pX = currentShot.aimX;
          let pY = currentShot.aimY;
          let pRadius = currentShot.radius;
          let tX = this.game.projectiles[k].aimX;
          let tY = this.game.projectiles[k].aimY;
          let tRadius = currentShot.radius;

          if (this.getDistance(pX, pY, tX, tY) < pRadius + tRadius) {
            currentShot.dx = 0;
            currentShot.dy = 0;
            currentShot.radius = 20;
            currentShot.aimX = this.approxX(pX, tX);
            currentShot.aimY = this.approxY(pY, tY);
            currentShot.collided = true;
            this.game.reloaded = true;

            if (
              currentShot.color === this.game.projectiles[k].color
            ) {
              currentShot.hit = true;
              this.game.projectiles[k].hit = true;
              this.checkChain = true;
              return
            }
          }
        }
        // }
        for (let j = 0; j < this.game.targets.length; j++) {
          if (
            this.getDistance(
              currentShot.aimX,
              currentShot.aimY,
              this.game.targets[j].x,
              this.game.targets[j].y
            ) <
            currentShot.radius + this.game.targets[j].radius 
          ) {
            //collision response
            // projectile instructions
            currentShot.dx = 0;
            currentShot.dy = 0;
            currentShot.radius = 20;
            this.game.reloaded = true;
            currentShot.collided = true;
            currentShot.aimX = this.approxX(
              currentShot.aimX,
              this.game.targets[j].x
            );
            currentShot.aimY = this.approxY(
              currentShot.aimY,
              this.game.targets[j].y
            );

            if (currentShot.color === this.game.targets[j].color) {
              currentShot.hit = true;
              this.game.targets[j].hit = true;
              this.checkChain = true;
              return
            }
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

  //still need to add collision on ball ball and ball target
  chainReaction() {
    while (this.checkChain === true) {
      //target / target
      for (let i = 0; i < this.game.targets.length; i++) {
        this.check = 0;
        for (let k = 0; k < this.game.targets.length; k++) {
          if (i !== k) {
            let pX = this.game.targets[i].x;
            let pY = this.game.targets[i].y;
            let pRadius = this.game.targets[i].radius;
            let tX = this.game.targets[k].x;
            let tY = this.game.targets[k].y;
            let tRadius = this.game.targets[k].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
              this.check += 1;
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
        for (let k = 0; k < this.game.projectiles.length; k++) {
          if (i !== k) {
            let pX = this.game.targets[i].x;
            let pY = this.game.targets[i].y;
            let pRadius = this.game.targets[i].radius;
            let tX = this.game.projectiles[k].aimX;
            let tY = this.game.projectiles[k].aimY;
            let tRadius = this.game.projectiles[k].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
              this.check += 1;
              if (
                this.game.targets[i].color === this.game.projectiles[k].color &&
                (this.game.targets[i].hit || this.game.projectiles[k].hit)
              ) {
                this.game.targets[i].hit = true;
                this.game.projectiles[k].hit = true;
                this.checkChain = false;
              }
            }
          }
        }
        if (this.check === 0) {
          this.game.targets[i].drop = true;
          this.game.targets[i].radius = 0;
        }
      }
      //projectile / target
      for (let i = 0; i < this.game.projectiles.length; i++) {
        this.check = 0
        for (let k = 0; k < this.game.targets.length; k++) {
          let pX = this.game.projectiles[i].aimX;
          let pY = this.game.projectiles[i].aimY;
          let pRadius = this.game.projectiles[i].radius;
          let tX = this.game.targets[k].x;
          let tY = this.game.targets[k].y;
          let tRadius = this.game.targets[k].radius;

          if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
            this.check += 1
            this.game.reloaded = true;
            this.game.projectiles[i].collided = true;
            if (
              this.game.projectiles[i].color === this.game.targets[k].color 
            ) {
              this.game.projectiles[i].hit = true;
              this.game.targets[k].hit = true;
              this.checkChain = false;
            }
          }
        }
        // projectile / projectile      
          for (let k = 0; k < this.game.projectiles.length; k++) {
          if (i !== k) {
            let pX = this.game.projectiles[i].aimX;
            let pY = this.game.projectiles[i].aimY;
            let pRadius = this.game.projectiles[i].radius;
            let tX = this.game.projectiles[k].aimX;
            let tY = this.game.projectiles[k].aimY;
            let tRadius = this.game.projectiles[k].radius;

            if (this.getDistance(pX, pY, tX, tY) - 10 < pRadius + tRadius) {
              this.check += 1;
              this.game.reloaded = true;
              if (
                this.game.projectiles[i].color ===
                  this.game.projectiles[k].color &&
                (this.game.projectiles[i].hit || this.game.projectiles[k].hit) 
              ) {
                this.game.projectiles[i].hit = true;
                this.game.projectiles[k].hit = true;
                this.game.projectiles[i].collided = true;
                this.game.projectiles[k].collided = true;
                this.checkChain = false;
              }
            }
          }
          
        }
            if (this.check === 0) {
              this.game.projectiles[i].drop = true;
              this.game.projectiles[i].radius = 0;
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
    // this.startUp();

    // this.game.playing = true;
    // this.game.intervals.forEach(interval => clearInterval(interval));
    // this.game.intervals = []
    // this.game.projectiles = [];
    // this.game.targets = [];
    // this.game.score = 0;
    //  this.game.addTargets();
    //  this.game.moveTargets();
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
