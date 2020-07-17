/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./src/game.js");
const GameView = __webpack_require__(/*! ./game_view.js */ "./src/game_view.js");


document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector("canvas");
    let start = document.getElementById("start");
    let pause = document.getElementById("pause");
    let reset = document.getElementById("reset");
    let context = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 540;

    const game = new Game(canvas.width, canvas.height)
    new GameView(game, context, canvas, start, reset, pause).startup();
    //incase of emergency, go back to just start()
});


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Projectile = __webpack_require__(/*! ./projectile */ "./src/projectile.js");
const Target = __webpack_require__(/*! ./target */ "./src/target.js")
const Turret = __webpack_require__(/*! ./turret */ "./src/turret.js")

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
            target.move()
        } else  if (target instanceof Projectile) {
            target.aimY += 35
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

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  }

  getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }
  checkCollision() {
    for (let i = 0; i < this.game.projectiles.length; i++) {
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
          this.game.targets.push(this.game.projectiles[i])
          this.game.projectiles[i].dx = 0;
          this.game.projectiles[i].dy = 0;
          // this.game.projectiles[i].collidedPos = [
          //   this.game.projectiles[i].aimX,
          //   this.game.projectiles[i].aimX,
          // ];
          // this.game.projectiles[i].aimX = tempX;
          // this.game.projectiles[i].aimY = tempY;
        }
      }
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

/***/ }),

/***/ "./src/projectile.js":
/*!***************************!*\
  !*** ./src/projectile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Projectile {
  constructor(props) {
    this.aimX = props.aimX;
    this.aimY = props.aimY;
    this.dx = props.slope[0];
    this.dy = props.slope[1];
    this.radius = 20;
    this.slope = props.slope;
    this.game = props.game;
    this.collided = false;
  }
 
 
  move() {
    if (this.aimX + this.radius > 320 || this.aimX - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.aimY - this.radius < 0) {
      this.dy = -this.dy;
    }
    // if (this.aimY + this.radius > 500) {
    // this.destroy();
    // console.log('FIX THIS')
    // }
    this.aimX += this.dx;
    this.aimY += this.dy;
  }

  //   destroy() {
  //     this.game.remove(this)
  //     console.log('gone?')
  //   }

  draw(context) {
    context.beginPath();
    context.arc(this.aimX, this.aimY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.fill();
    context.closePath();

    if (this.collided === false) {
      this.move();
    }
  }
}

module.exports = Projectile;

/***/ }),

/***/ "./src/target.js":
/*!***********************!*\
  !*** ./src/target.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Target {
  constructor(position, offset) {
    this.position = position;
    this.offset = offset;
    this.x = this.position * 40 - 20;
    this.y = 20;
    this.radius = 20;
    this.color = this.randomColor();
    this.move = this.move.bind(this);
    // this.gameOver = this.gameOver.bind(this)
  }

  move() {
      this.y += 35; 
  }

  randomColor() {
    let colors = ["red", "green", "blue", "orange"];
    // console.log(colors[Math.floor(Math.random() * colors.length)]);
    return colors[Math.floor(Math.random() * colors.length)];
  }

//   gameOver() {
//       if (this.y + this.radius > 540) {
//         return true
//       }
//   }

  draw(context) {
    // this.gameOver()
    context.beginPath();
    if (this.position === 1 && this.offset) {
      context.arc(40, this.y, this.radius, 0, Math.PI * 2, false);
    } else if (this.position === 1 && !this.offset) {
        context.arc(20, this.y, this.radius, 0, Math.PI * 2, false);
    } else if (this.offset) {
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    } else {
        context.arc(this.x + 20, this.y, this.radius, 0, Math.PI * 2, false);
    }
    context.fillStyle = this.color;
    context.fill();

    // this.update();
  }
}

module.exports = Target;


/***/ }),

/***/ "./src/turret.js":
/*!***********************!*\
  !*** ./src/turret.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Projectile = __webpack_require__(/*! ./projectile */ "./src/projectile.js");

class Turret {
  constructor(game) {
    this.game = game;
    this.projectiles = 0;
    // this.slope = [1, -4];
  }

  swivelTurret(mousePosition) {
    this.dx = mousePosition[0] - 160;
    this.dy = 540 - mousePosition[1];
    let swivel = Math.atan2(this.dy, this.dx) + Math.PI;
    let hyp = Math.sqrt(this.dy ** 2 + this.dx ** 2);

    this.aimX = 160 - Math.cos(swivel) * 50;
    this.aimY = 540 + Math.sin(swivel) * 50;
    this.cheatX = 160 - Math.cos(swivel) * 550;
    this.cheatY = 540 + Math.sin(swivel) * 550;

    this.speedX = -Math.cos(swivel) * 15;
    this.speedY = Math.sin(swivel) * 15;
  }

  //   swivelTurret(mousePosition) {
  //     this.dx = mousePosition[0] - 160;
  //     this.dy = 540 - mousePosition[1];
  //     let swivel = Math.atan2(this.dy, this.dx) + Math.PI;
  //     let hyp = Math.sqrt(this.dy ** 2 + this.dx ** 2);

  //     this.aimX = 160 - 50 * Math.cos(swivel);
  //     this.aimY = 540 + 50 * Math.sin(swivel);
  //   }

  fire() {
    const projectile = new Projectile({
      game: this.game,
      slope: [this.speedX, this.speedY],
      aimX: this.aimX,
      aimY: this.aimY,
    });
    this.game.addProjectiles(projectile);
  }

  draw(context) {
    //turret line
    context.beginPath();
    context.moveTo(160, 540);
    context.lineTo(this.cheatX, this.cheatY);
    context.strokeStyle = "grey";
    context.lineWidth = 1;
    context.stroke();

    //turret cannon
    context.beginPath();
    context.moveTo(160, 540);
    context.lineTo(this.aimX, this.aimY);
    context.strokeStyle = "purple";
    context.lineWidth = 45;
    context.stroke();

    //turret base
    context.beginPath();
    context.arc(160, 540, 30, 0, Math.PI * 2, false);
    context.fillStyle = "purple";
    context.fill();
  }
}

module.exports = Turret;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map