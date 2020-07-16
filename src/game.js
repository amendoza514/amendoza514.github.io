const Projectile = require('./projectile');
const Target = require('./target')
const Turret = require('./turret')

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.projectiles = [];
    this.turret = new Turret(this);
    this.targets = [];
    // this.playing = true
    this.checkCollision = this.checkCollision.bind(this);
    this.offsetRow = false;
  }

  getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }
  checkCollision() {
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 1; j < this.targets.length; j++) {
        if (
          this.getDistance(
            this.projectiles[i].aimX,
            this.projectiles[i].aimY,
            this.targets[j].x,
            this.targets[j].y
          ) <
          this.projectiles[i].radius + this.targets[j].radius
        ) {
             let tempX = this.projectile[i].aimX;
             let tempY = this.projectile[i].aimY;
          this.projectiles[i].aimX = this.tempX;
          this.projectiles[i].aimY = this.tempY;
        }
      }
    }
  }

  movingObjects() {
    return [].concat(this.projectiles, this.turret, this.targets);
  }

  /// TESTING? UNCOMMENT OUT INTERVAL FOR TESTING A ROW
  moveTargets() {
    setInterval(() => {
    this.targets.forEach((target) => {
      target.move();
    });
    }, 2000);
  }

  addTargets() {
    setInterval(() => {
    for (let i = 1; i <= 8; i++) {
      this.targets.push(new Target(i));
      console.log(this.targets);
    }
    }, 2000);
  }
  // END TESTING

  addProjectiles(projectile) {
    this.projectiles.push(projectile);
    return projectile;
  }

  gameOver() {
    this.targets.forEach((target) => {
      if (target.gameOver()) {
        //   this.playing = false
        //  this.projectiles = []
      }
    });
  }

  // remove(obj) {
  //   console.log(this.projectiles)
  //     if (obj instanceof Projectile) {
  //         this.projectiles = this.projectiles.filter(projectile => {
  //             obj !== projectile
  //         })
  //         obj = undefined
  //     }
  //     console.log(this.projectiles);
  // }

  drawElements(context, mousePosition) {
      context.clearRect(0, 0, this.width, this.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, this.width, this.height);
      
    this.movingObjects().forEach((obj) => {
        obj.draw(context);
        // this.checkCollision();
        
        if (obj instanceof Turret) {
            obj.swivelTurret(mousePosition);
        }
    });
  }

  //   clearElements(context) {
  //       this.projectiles = [];
  //       this.targets = []
  //       this.turret = null;
  //     context.clearRect(0, 0, this.width, this.height);
  //     context.fillStyle = "white";
  //     context.fillRect(0, 0, this.width, this.height);
  //   }
}

module.exports = Game;