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
    this.offsetRow = false;
    this.remove = this.remove.bind(this);
    this.gameOver = this.gameOver.bind(this)
    this.playing = false
    this.score = 0;
    this.offset = false;
    this.movingObjects = this.movingObjects.bind(this);
    this.intervals = [];
  }

  movingObjects() {
    return [].concat(this.projectiles, this.turret, this.targets);
  }

  moveTargets() {
    let moveInterval = setInterval(() => {
      this.targets.forEach((target) => {
        if (target instanceof Target) {
          target.count += 1;
          target.y += 35;
        }
      });
      this.projectiles.forEach((target) => {
        if (target instanceof Projectile) {
          target.aimY += 35;
        }
      });
    }, 5000);
      this.intervals.push(moveInterval);
  }

  addTargets() {
   let addInterval = setInterval(() => {
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
          last = i;
        }
        this.offsetRow = true;
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
    this.intervals.push(addInterval);
  }

  addProjectiles(projectile) {
    this.projectiles.push(projectile);
    return projectile;
  }

  gameOver() {
    this.targets.forEach((target) => {
      if (target.gameOver()) {
        this.playing = false
      }
    });
    this.projectiles.forEach((projectile) => {
      if (projectile.gameOver()) {
        this.playing = false;
      }
    });
  }

  remove(obj) {
    if (this.playing === true) {
      if (obj instanceof Projectile) {
        this.projectiles = this.projectiles
          .slice(0, this.projectiles.indexOf(obj))
          .concat(this.projectiles.slice(this.projectiles.indexOf(obj) + 1));
      } else if (obj instanceof Target) {
        this.targets = this.targets
          .slice(0, this.targets.indexOf(obj))
          .concat(this.targets.slice(this.targets.indexOf(obj) + 1));
        this.score += 23;
      }
    }
  }

  drop(obj) {
    if (this.playing === true) {
      if (obj instanceof Projectile) {
        this.projectiles = this.projectiles
          .slice(0, this.projectiles.indexOf(obj))
          .concat(this.projectiles.slice(this.projectiles.indexOf(obj) + 1));
        this.score += 23;
      } else if (obj instanceof Target) {
        this.targets = this.targets
          .slice(0, this.targets.indexOf(obj))
          .concat(this.targets.slice(this.targets.indexOf(obj) + 1));
        this.score += 23;
      }
    }
  }

  drawElements(context, mousePosition) {
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, this.width, this.height);

    this.gameOver();

    let score = document.getElementById("score");
    if (this.playing === true) {
      score.innerHTML = `score: ${this.score}`;
    } else {
      score.innerHTML = `Your final score: ${this.score}`;
    }

    this.movingObjects().forEach((obj) => {
      obj.draw(context);
      if (obj instanceof Turret) {
        obj.swivelTurret(mousePosition);
      }
      if (obj instanceof Projectile) {
        if (obj.hit) {
          this.remove(obj);
        } else if (obj.aimY > 600 || obj.aimY < 0) {
          this.remove(obj);
          //trash collection
        } else if (obj.drop) {
          obj.aimY += 10;
        }
      }
      if (obj instanceof Target) {
        if (obj.hit) {
          this.remove(obj);
        } else if (obj.x > 600 || obj.y < 0) {
          this.remove(obj);
          //trash collection
        } else if (obj.drop) {
          obj.y += 10;
        }
      }
    });
  }
}

module.exports = Game;