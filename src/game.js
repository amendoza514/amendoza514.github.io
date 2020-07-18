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
    this.remove = this.remove.bind(this);
    this.score = 0;
    this.offset = false
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
        let last;
        for (let i = 1; i <= 8; i++) {
          let x;
          if (i === 1) {
            x = 20;
          } else {
            x = i * 40 - 20;
          }
          this.targets.push(new Target(i, false, x));
          last = i
          // console.log(this.targets);
        }
        this.offsetRow = true;
        // debugger
    } else {
        for (let j = 1; j <= 7; j++) {
          let x;
          if (j === 1) {
            x = 40;
          } else {
            x = j * 40;
          }
          this.targets.push(new Target(j, false, x));
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
        this.projectiles = this.projectiles.slice(0, this.projectiles.indexOf(obj)).concat(
        this.projectiles.slice(this.projectiles.indexOf(obj) + 1)); 
        // this.projectiles.splice(this.projectiles.indexOf(obj), 1);
      } else if (obj instanceof Target) {
        this.targets = this.targets.slice(0, this.targets.indexOf(obj)).concat(
        this.targets.slice(this.targets.indexOf(obj) + 1));
        // this.targets.splice(this.targets.indexOf(obj), 1);
      }
      this.score += 23
  }

  drawElements(context, mousePosition) {
      context.clearRect(0, 0, this.width, this.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, this.width, this.height);
      let score = document.getElementById("score");
      score.innerHTML=`score: ${this.score}`;
      
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
}

module.exports = Game;