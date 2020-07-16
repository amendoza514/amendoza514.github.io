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
    this.offsetRow = false;
  }

  movingObjects() {
    return [].concat(this.projectiles, this.turret, this.targets);
  }

  /// TESTING? UNCOMMENT OUT INTERVAL FOR TESTING A ROW
  moveTargets() {
    setInterval(() => {
      this.targets.forEach((target) => {
        if (target instanceof Target) {
          target.y += 35;
        } else if (target instanceof Projectile) {
          target.aimY += 35;
        } 
      });
    }, 2000);
  }

  addTargets() {
    setInterval(() => {
      if (!this.offsetRow) {
        for (let i = 1; i <= 8; i++) {
          this.targets.push(new Target(i, this.offsetRow));
          this.offsetRow = true;
        //   console.log(this.targets);
        }
    } else {
        for (let i = 1; i <= 7; i++) {
          this.targets.push(new Target(i, this.offsetRow));
          this.offsetRow = false;
        //   console.log(this.targets);
        }
    }
    }, 2000);
  }
  // END TESTING

  addProjectiles(projectile) {
    this.projectiles.push(projectile);
    return projectile;
  }

//   gameOver() {
    // this.targets.forEach((target) => {
    //   if (target.gameOver()) {
        //   this.playing = false
        //  this.projectiles = []
    //   }
    // });
//   }

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