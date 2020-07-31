const Target = require("./target");
const Turret = require("./turret");
const Projectile = require("./projectile");
const Game = require("./game");
const { Howl, Howler } = require("howler");

class GameView {
  constructor(game, context, canvas, start, newGame, lebron, steph) {
    this.game = game;
    this.start = start;
    this.context = context;
    this.canvas = canvas;
    this.lebron = lebron;
    this.steph = steph;
    this.mousePosition = [0, 0];
    this.handlePlayer1 = this.handlePlayer1.bind(this);
    this.handlePlayer2 = this.handlePlayer2.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.setup = this.setup.bind(this);
    this.approxY = this.approxY.bind(this);
    this.checkChain;
    this.checkCollision = this.checkCollision.bind(this);
    this.andOne = this.andOne.bind(this);
    this.andOneNumber = null;
    this.chainReaction = this.chainReaction.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.checkDrops = this.checkDrops.bind(this);
    this.check;
    this.startUp = this.startUp.bind(this);
    this.reset = false;
    this.newGame = newGame;
    this.player1Selected = false;
    this.player2Selected = false;
    this.setSounds();
    this.popped = false;
    this.intros1 = false;
    this.intros2 = false;
  }

  setSounds() {
    Howler.volume(0.2);
    this.pop = new Howl({src: ['dist/assets/pop.mp3']});
    this.lebronIntro = new Howl({ src: ["dist/assets/lebron-intro.wav"] });
    this.stephIntro = new Howl({ src: ["dist/assets/steph-intro.wav"] });
  }

  soundType() {
    let types = [0.5,0.6,0.7,0.8,0.9,1]
    let randomVolume = Math.floor(Math.random() * types.length)
    return types[randomVolume];
  }

  andOne() {
    if (this.game.playerSelected === 1) {
      let validArr = this.game.targets.filter(target => target.hit === false && target.drop === false);
      let randomNum = Math.floor(Math.random() * validArr.length);
      this.andOneNumber = randomNum;  
      let select = (Math.floor(Math.random() * 100))
      if (select <= 23) {
        validArr[randomNum].drop = true;
        // console.log('AND ONE');
      }
    }
  }

  getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }

  checkCollision() {
    let currentShot = this.game.projectiles[this.game.projectiles.length - 1];
    // if (this.game.projectiles.length > 0) {
    for (let k = 0; k < this.game.projectiles.length - 1; k++) {
      if (this.game.projectiles[k].drop === true) {
        continue;
      }
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

        if (currentShot.color === this.game.projectiles[k].color) {
          if (this.andOneNumber === null) {
            this.andOne();
          }
          //sound
          if (this.popped === false) {
            this.popped = true
            this.pop.rate(this.soundType());
            this.pop.play();
          }
          currentShot.hit = true;
          this.game.projectiles[k].hit = true;
          this.checkChain = true;
          // return;
        }
      }
    }
    for (let j = 0; j < this.game.targets.length; j++) {
      if (this.game.targets[j].drop === true) {
        continue;
      }
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
          if (this.andOneNumber === null) {
            this.andOne();
          }
          //sound
          if (this.popped === false) {
            this.popped = true
            this.pop.rate(this.soundType());
            this.pop.play();
          }
          currentShot.hit = true;
          this.game.targets[j].hit = true;
          this.checkChain = true;
          // return;
        }
      }
      // }
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

  checkDrops() {
    if (this.game.playing) {
      let vt = this.game.targets;
      let vp = this.game.projectiles;
      let targets = [].concat(vt, vp);
      let validTargets = targets.filter((obj) => obj.radius <= 20);
      for (let i = 0; i < validTargets.length - 1; i++) {
        let marker = 0;
        for (let j = 0; j < validTargets.length - 1; j++) {
          if (i !== j) {
            let x1 =
              validTargets[i] instanceof Projectile
                ? validTargets[i].aimX
                : validTargets[i].x;
            let x2 =
              validTargets[j] instanceof Projectile
                ? validTargets[j].aimX
                : validTargets[j].x;
            let y1 =
              validTargets[i] instanceof Projectile
                ? validTargets[i].aimY
                : validTargets[i].y;
            let y2 =
              validTargets[j] instanceof Projectile
                ? validTargets[j].aimY
                : validTargets[j].y;
            let r1 = validTargets[i].radius;
            let r2 = validTargets[j].radius;

            if (this.getDistance(x1, y1, x2, y2) - 5 < r1 + r2) {
              marker += 1;
              break;
            }
          }
        }
        if (marker === 0) {
          let y =
            validTargets[i] instanceof Projectile
              ? validTargets[i].aimY
              : validTargets[i].y;
              if (y > 50) {
                validTargets[i].drop = true;
              }
        }
      }
    }
  }

  chainReaction() {
    // if (this.game.playing) {
    while (this.checkChain === true) {
      //target / target

      for (let i = 0; i < this.game.targets.length; i++) {
        // this.check = 0;
        if (this.game.targets[i].drop === true) {
          continue;
        }
        for (let k = 0; k < this.game.targets.length; k++) {
          if (this.game.targets[k].drop === true) {
            continue;
          }
          if (i !== k) {
            let pX = this.game.targets[i].x;
            let pY = this.game.targets[i].y;
            let pRadius = this.game.targets[i].radius;
            let tX = this.game.targets[k].x;
            let tY = this.game.targets[k].y;
            let tRadius = this.game.targets[k].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
              // this.check += 1;
              if (
                this.game.targets[i].color === this.game.targets[k].color &&
                (this.game.targets[i].hit || this.game.targets[k].hit)
              ) {
                this.game.targets[i].hit = true;
                this.game.targets[k].hit = true;
                //sound
                if (this.popped === false) {
                  this.popped = true;
                  this.pop.rate(this.soundType());
                  this.pop.play();
                }
                this.checkChain = false;
                this.game.reloaded = true;
                //maybe????
              }
            }
          }
        }
        for (let k = 0; k < this.game.projectiles.length; k++) {
          if (this.game.projectiles[k].drop === true) {
            continue;
          }
          if (i !== k) {
            let pX = this.game.targets[i].x;
            let pY = this.game.targets[i].y;
            let pRadius = this.game.targets[i].radius;
            let tX = this.game.projectiles[k].aimX;
            let tY = this.game.projectiles[k].aimY;
            let tRadius = this.game.projectiles[k].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
              // this.check += 1;
              if (
                this.game.targets[i].color === this.game.projectiles[k].color &&
                (this.game.targets[i].hit || this.game.projectiles[k].hit)
              ) {
                  //sound
                  if (this.popped === false) {
                    this.popped = true;
                    this.pop.rate(this.soundType());
                    this.pop.play();
                  }
                  this.game.targets[i].hit = true;
                  this.game.projectiles[k].hit = true;

                  this.checkChain = false;
                  this.game.reloaded = true;
                  //maybe ???
                }
            }
          }
        }
      }
      //projectile / target
      for (let i = 0; i < this.game.projectiles.length; i++) {
        if (this.game.projectiles[i].drop === true) {
          continue;
        }
        // this.check = 0
        for (let k = 0; k < this.game.targets.length; k++) {
          if (this.game.targets[k].drop === true) {
            continue;
          }
          let pX = this.game.projectiles[i].aimX;
          let pY = this.game.projectiles[i].aimY;
          let pRadius = this.game.projectiles[i].radius;
          let tX = this.game.targets[k].x;
          let tY = this.game.targets[k].y;
          let tRadius = this.game.targets[k].radius;

          if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
            // this.check += 1
            this.game.reloaded = true;
            //maybe???
            this.game.projectiles[i].collided = true;
            if (this.game.projectiles[i].color === this.game.targets[k].color) {
              //sound
              if (this.popped === false) {
                this.popped = true;
                this.pop.rate(this.soundType());
                this.pop.play();
              }
              this.game.projectiles[i].hit = true;
              this.game.targets[k].hit = true;
              this.checkChain = false;
            }
          }
        }
        // projectile / projectile
        for (let k = 0; k < this.game.projectiles.length; k++) {
          if (this.game.projectiles[k].drop === true) {
            continue;
          }
          if (i !== k) {
            let pX = this.game.projectiles[i].aimX;
            let pY = this.game.projectiles[i].aimY;
            let pRadius = this.game.projectiles[i].radius;
            let tX = this.game.projectiles[k].aimX;
            let tY = this.game.projectiles[k].aimY;
            let tRadius = this.game.projectiles[k].radius;

            if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
              this.check += 1;
              this.game.reloaded = true;
              if (
                this.game.projectiles[i].color ===
                  this.game.projectiles[k].color &&
                (this.game.projectiles[i].hit || this.game.projectiles[k].hit)
              ) {
                  //sound
                  if (this.popped === false) {
                    this.popped = true;
                    this.pop.rate(this.soundType());
                    this.pop.play();
                  }
                  this.game.projectiles[i].hit = true;
                  this.game.projectiles[k].hit = true;
                  this.game.projectiles[i].collided = true;
                  this.game.projectiles[k].collided = true;
                  this.checkChain = false;
                }
            }
          }
        }
      }
      this.checkChain = false;
    }
    // }
  }

  checkValidation() {
    if (this.game.playing) {
      let shot = this.game.projectiles[this.game.projectiles.length - 1];
      for (let i = 0; i < this.game.projectiles.length - 1; i++) {
        let obj = this.game.projectiles[i];
        if (obj.drop === true) {
          continue;
        }
        if (
          this.getDistance(shot.aimX, shot.aimY, obj.aimX, obj.aimY) - 5 <
          shot.radius + obj.radius
        ) {
          this.game.reloaded = true;
          if (shot.color === obj.color) {
            if (this.andOneNumber === null) {
              this.andOne();
            }
            //sound
          if (this.popped === false) {
            this.popped = true;
            this.pop.rate(this.soundType());
            this.pop.play();
          }
            shot.hit = true;
            obj.hit = true;
            this.checkChain = true;
          }
        }
      }
      for (let i = 0; i < this.game.targets.length; i++) {
        let obj = this.game.targets[i];
        if (obj.drop === true) {
          continue;
        }
        if (
          this.getDistance(shot.aimX, shot.aimY, obj.x, obj.y) - 5 <
          shot.radius + obj.radius
        ) {
          this.game.reloaded = true;
          if (shot.color === obj.color) {
            if (this.andOneNumber === null) {
              this.andOne();
            }
            //sound
          if (this.popped === false) {
            this.popped = true;
            this.pop.rate(this.soundType());
            this.pop.play();
          }
            shot.hit = true;
            obj.hit = true;
            this.checkChain = true;
          }
        }
      }
    }
  }

  listenForMove() {
    this.canvas.addEventListener("mousemove", this.handleMove);
  }

  handleMove(event) {
    this.mousePosition = [event.offsetX, event.offsetY];
    // console.log(this.mousePosition)
  }

  listenForClick() {
    this.canvas.addEventListener("click", this.handleClick);
  }

  handleClick() {
    if (this.game.playing) {
      this.game.turret.fire();
      this.popped = false;
    }
  }

  handlePlayer1() {    
    this.lebron.innerHTML = "* Lebron * ";
    this.intros1 === false ? this.lebronIntro.play() : '';
    this.intros1 = true;
    this.steph.innerHTML = 'Steph';
    this.start.innerHTML = 'start';
    this.player1Selected  = true;
    this.game.playerSelected = 1;
  }

  handlePlayer2() {
    this.steph.innerHTML = "* Steph *";
    this.intros2 === false ? this.stephIntro.play() : "";
    this.intros2 = true;
    this.lebron.innerHTML = "Lebron";
    this.start.innerHTML = "start";
    this.player2Selected  = true;
    this.game.playerSelected = 2;
  }

  startUp() {
    if (!this.game.playing) {
      this.lebron.addEventListener("click", this.handlePlayer1);
      this.steph.addEventListener("click", this.handlePlayer2);
      if ((this.start.innerHTML = "start")) 
      this.start.innerHTML = `start`;
      this.start.addEventListener("click", () => {
        if (this.start.innerHTML === "start" && (this.player1Selected === false && this.player2Selected === false)) {
          this.start.innerHTML = "CHOOSE A PLAYER";
          return
        }
        if (this.start.innerHTML === "CHOOSE A PLAYER" &&
          (this.player1Selected === false || this.player2Selected === false)
        ) {
          return
        }
          if (
            (this.start.innerHTML === "start" ||
              this.start.innerHTML === "CHOOSE A PLAYER") &&
            (this.player1Selected === true || this.player2Selected === true)
          ) {
            this.startGame();
            this.start.innerHTML = "main menu";
          } else {
            this.resetGame();
            this.start.innerHTML = "start";
          }
      });
      this.game.playing = true;
    }
  }

  startGame() {
    // this.newGame = false;
    // this.pause.style.display = "flex"
    this.setup();
    this.animate();
  }

  setup() {
    this.listenForMove();
    this.listenForClick();
    this.game.turret.setColors();
    this.game.addTargets();
    this.game.moveTargets();
  }

  resetGame() {
    // window.location.href = "https://amendoza514.github.io/";
    window.location.href = "http://127.0.0.1:5500/index.html";
    //  this.reset = true
    //  cancelAnimationFrame(this.animation);
    //  this.animation = null;

    // this.game.intervals.forEach((interval) => clearInterval(interval));
    // this.game.intervals = [];
    // this.game.projectiles = [];
    // this.game.targets = [];
    // this.game.score = 0;

    // this.startGame();
    // window.cancelAnimationFrame(this.animation);
    // this.newGame();
  }

  animate() {
    if (this.game.playing) {
      if (this.game.projectiles.length > 0) {
        this.checkCollision();
        this.checkValidation();
        this.chainReaction();
        if (this.checkChain === true) {
          this.chainReaction();
        }
      }
      this.checkDrops();
      this.andOneNumber = null;
    }

    this.game.drawElements(this.context, this.mousePosition);
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }
}
    
module.exports = GameView;
