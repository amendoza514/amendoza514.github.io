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
    this.remove = this.remove.bind(this)
  }

  movingObjects() {
    return [].concat(this.projectiles, this.turret, this.targets);
  }

  /// TESTING? UNCOMMENT OUT INTERVAL FOR TESTING A ROW
  moveTargets() {
    setInterval(() => {
      this.targets.forEach((target) => {
        if (target instanceof Target) {
          target.count += 1
            target.y += 35;
        } 
      })
      this.projectiles.forEach((target) => {
        if (target instanceof Projectile) {
          target.aimY += 35
        }
      });
    }, 5000);
  }

  addTargets() {
    setInterval(() => {
      if (!this.offsetRow) {
        for (let i = 1; i <= 8; i++) {
          //normally 8
          this.targets.push(new Target(i, false));
          // console.log(this.targets);
        }
        this.offsetRow = true;
        // debugger
    } else {
        for (let i = 1; i <= 7; i++) {
          this.targets.push(new Target(i, true));
          // console.log(this.targets);
        }
        this.offsetRow = false;
        // debugger
    }
    }, 5000);
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

  remove(obj) {
      if (obj instanceof Projectile) {
        this.projectiles.splice(this.projectiles.indexOf(obj), 1);
      } else if (obj instanceof Target) {
        this.targets.splice(this.targets.indexOf(obj), 1);
      }
  }

  drawElements(context, mousePosition) {
      context.clearRect(0, 0, this.width, this.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, this.width, this.height);
      
    this.movingObjects().forEach((obj) => {
        obj.draw(context);
        if (obj instanceof Turret) {
            obj.swivelTurret(mousePosition);
        } else if (obj.hit) {
          console.log('hit')
          this.remove(obj);
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