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

var Game = __webpack_require__(/*! ./game.js */ "./src/game.js");

var GameView = __webpack_require__(/*! ./game_view.js */ "./src/game_view.js");

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.querySelector("canvas");
  var start = document.getElementById("start");
  var pause = document.getElementById("pause");
  var reset = document.getElementById("reset");
  var context = canvas.getContext("2d");
  canvas.width = 320;
  canvas.height = 540;
  var game = new Game(canvas.width, canvas.height);
  new GameView(game, context, canvas, start, reset, pause).startup(); //incase of emergency, go back to just start()
});

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Projectile = __webpack_require__(/*! ./projectile */ "./src/projectile.js");

var Target = __webpack_require__(/*! ./target */ "./src/target.js");

var Turret = __webpack_require__(/*! ./turret */ "./src/turret.js");

var Game = /*#__PURE__*/function () {
  function Game(width, height) {
    _classCallCheck(this, Game);

    this.width = width;
    this.height = height;
    this.projectiles = [];
    this.turret = new Turret(this);
    this.targets = []; // this.playing = true

    this.offsetRow = false;
  }

  _createClass(Game, [{
    key: "movingObjects",
    value: function movingObjects() {
      return [].concat(this.projectiles, this.turret, this.targets);
    } /// TESTING? UNCOMMENT OUT INTERVAL FOR TESTING A ROW

  }, {
    key: "moveTargets",
    value: function moveTargets() {
      var _this = this;

      setInterval(function () {
        _this.targets.forEach(function (target) {
          if (target instanceof Target) {
            target.count += 1;
            target.y += 35;
          }
        });

        _this.projectiles.forEach(function (target) {
          if (target instanceof Projectile) {
            target.aimY += 35;
          }
        });
      }, 2000);
    }
  }, {
    key: "addTargets",
    value: function addTargets() {
      var _this2 = this;

      setInterval(function () {
        if (!_this2.offsetRow) {
          for (var i = 1; i <= 4; i++) {
            //normally 8
            _this2.targets.push(new Target(i, false)); // console.log(this.targets);
            // debugger

          }

          _this2.offsetRow = true;
        } else {
          for (var _i = 1; _i <= 3; _i++) {
            _this2.targets.push(new Target(_i, true)); // console.log(this.targets);

          }

          _this2.offsetRow = false;
        }
      }, 2000);
    } // END TESTING

  }, {
    key: "addProjectiles",
    value: function addProjectiles(projectile) {
      this.projectiles.push(projectile);
      return projectile;
    } //   gameOver() {
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

  }, {
    key: "drawElements",
    value: function drawElements(context, mousePosition) {
      context.clearRect(0, 0, this.width, this.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, this.width, this.height);
      this.movingObjects().forEach(function (obj) {
        obj.draw(context);

        if (obj instanceof Turret) {
          obj.swivelTurret(mousePosition);
        }
      });
    } //   clearElements(context) {
    //       this.projectiles = [];
    //       this.targets = []
    //       this.turret = null;
    //     context.clearRect(0, 0, this.width, this.height);
    //     context.fillStyle = "white";
    //     context.fillRect(0, 0, this.width, this.height);
    //   }

  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Target = __webpack_require__(/*! ./target */ "./src/target.js");

var GameView = /*#__PURE__*/function () {
  function GameView(game, context, canvas, start, pause, reset) {
    _classCallCheck(this, GameView);

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
    this.approxY = this.approxY.bind(this);
  }

  _createClass(GameView, [{
    key: "getDistance",
    value: function getDistance(x1, y1, x2, y2) {
      var xDist = x2 - x1;
      var yDist = y2 - y1;
      return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      for (var i = 0; i < this.game.projectiles.length; i++) {
        for (var k = 0; k < this.game.projectiles.length; k++) {
          for (var j = 1; j < this.game.targets.length; j++) {
            if (this.getDistance(this.game.projectiles[i].aimX, this.game.projectiles[i].aimY, this.game.targets[j].x, this.game.targets[j].y) < this.game.projectiles[i].radius + this.game.targets[j].radius) {
              //collision response
              this.game.projectiles[i].collided = true;
              var tempX = this.game.targets[j].x; // projectile instructions

              this.game.projectiles[i].aimY = this.approxY(this.game.projectiles[i].aimY);
              this.game.projectiles[i].aimX = this.approxX(this.game.projectiles[i].aimX, this.game.targets[j].offset, tempX);
              this.game.projectiles[i].dx = 0;
              this.game.projectiles[i].dy = 0; // this.game.projectiles[i].aimY = this.approxY(this.game.projectiles[i].aimY)
              // this.game.projectiles[i].aimX = this.approxX(
              //   this.game.projectiles[i],
              //   this.game.targets[j]
              // );
            }
          }
        }
      }
    } // approxX(projectile, target) {
    //   if (projectile.aimX > target.x) {
    //     return target.x + 20;
    //   } else {
    //     return target.x - 20;
    //   }
    // }
    // approxY(projectile, target) {
    //   if (projectile.aimY > target.y) {
    //     return target.y + 20;
    //   } else {
    //     return target.y - 20;
    //   }
    // }

  }, {
    key: "approxY",
    value: function approxY(yInput) {
      var yPositions = [55, 90, 125, 160, 195, 230, 265, 300, 335, 370, 405, 440, 475, 510, 545, 580];
      var yOutput = yPositions.reduce(function (previous, current) {
        return Math.abs(current - yInput) < Math.abs(previous - yInput) ? current : previous;
      });
      return yOutput;
    }
  }, {
    key: "approxX",
    value: function approxX(xInput, offset, tempX) {
      var xPositions;

      if ([20, 60, 100, 140, 180, 220, 260, 300].indexOf(tempX) === -1) {
        xPositions = [20, 60, 100, 140, 180, 220, 260, 300];
      } else {
        xPositions = [40, 80, 120, 160, 200, 240, 280];
      }

      var xOutput = xPositions.reduce(function (previous, current) {
        return Math.abs(current - xInput) < Math.abs(previous - xInput) ? current : previous;
      });
      return xOutput;
    }
  }, {
    key: "listenForMove",
    value: function listenForMove() {
      this.canvas.addEventListener("mousemove", this.handleMove);
    }
  }, {
    key: "startup",
    value: function startup() {
      console.log("waiting"); // if (!this.playing) {

      this.start.addEventListener("click", this.startGame); //   this.playing = !this.playing;
      // } else {
      //   this.playing = !this.playing;
      // }

      console.log(this.playing);
    }
  }, {
    key: "handleMove",
    value: function handleMove(event) {
      this.mousePosition = [event.clientX, event.clientY];
    }
  }, {
    key: "listenForClick",
    value: function listenForClick() {
      this.canvas.addEventListener("click", this.handleClick);
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.game.turret.fire();
    }
  }, {
    key: "setup",
    value: function setup() {
      this.listenForMove();
      this.listenForClick();
      this.game.addTargets();
      this.game.moveTargets();
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.setup();
      this.animate();
    }
  }, {
    key: "animate",
    value: function animate() {
      this.game.drawElements(this.context, this.mousePosition);
      this.checkCollision(); // if (!this.game.gameOver()) {

      requestAnimationFrame(this.animate.bind(this)); // }
    }
  }]);

  return GameView;
}();

;
module.exports = GameView;

/***/ }),

/***/ "./src/projectile.js":
/*!***************************!*\
  !*** ./src/projectile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Projectile = /*#__PURE__*/function () {
  function Projectile(props) {
    _classCallCheck(this, Projectile);

    this.aimX = props.aimX;
    this.aimY = props.aimY;
    this.dx = props.slope[0];
    this.dy = props.slope[1];
    this.radius = 20;
    this.slope = props.slope;
    this.game = props.game;
    this.collided = false;
    this.targetMove = this.targetMove.bind(this);
  }

  _createClass(Projectile, [{
    key: "targetMove",
    value: function targetMove() {
      this.aimY += 35;
    }
  }, {
    key: "move",
    value: function move() {
      if (this.aimX + this.radius > 320 || this.aimX - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.aimY - this.radius < 0) {
        this.dy = -this.dy;
      } // if (this.aimY + this.radius > 500) {
      // this.destroy();
      // console.log('FIX THIS')
      // }


      this.aimX += this.dx;
      this.aimY += this.dy;
    } //   destroy() {
    //     this.game.remove(this)
    //     console.log('gone?')
    //   }

  }, {
    key: "draw",
    value: function draw(context) {
      context.beginPath();
      context.arc(this.aimX, this.aimY, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = "black";
      context.fill();
      context.closePath();

      if (this.collided === false) {
        this.move();
      }
    }
  }]);

  return Projectile;
}();

module.exports = Projectile;

/***/ }),

/***/ "./src/target.js":
/*!***********************!*\
  !*** ./src/target.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Target = /*#__PURE__*/function () {
  function Target(position, offset, x, y) {
    _classCallCheck(this, Target);

    this.position = position;
    this.offset = offset;
    this.x = this.position * 40 - 20;
    this.y = 20;
    this.radius = 20;
    this.color = this.randomColor();
    this.move = this.move.bind(this);
    this.count = 0;
    this.currentY = this.y + 35 * this.count; // this.gameOver = this.gameOver.bind(this)
  }

  _createClass(Target, [{
    key: "move",
    value: function move() {
      this.y += 35;
    }
  }, {
    key: "randomColor",
    value: function randomColor() {
      var colors = ["red", "green", "blue", "orange"]; // console.log(colors[Math.floor(Math.random() * colors.length)]);

      return colors[Math.floor(Math.random() * colors.length)];
    } //   gameOver() {
    //       if (this.y + this.radius > 540) {
    //         return true
    //       }
    //   }

  }, {
    key: "draw",
    value: function draw(context) {
      // this.gameOver()
      context.beginPath();

      if (this.position === 1 && this.offset) {
        context.arc(40, this.y, this.radius, 0, Math.PI * 2, false);
      } else if (this.position === 1 && !this.offset) {
        context.arc(20, this.y, this.radius, 0, Math.PI * 2, false);
      } else if (this.offset) {
        context.arc(this.x + 20, this.y, this.radius, 0, Math.PI * 2, false);
      } else {
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      }

      context.fillStyle = this.color;
      context.fill(); // this.update();
    }
  }]);

  return Target;
}();

module.exports = Target;

/***/ }),

/***/ "./src/turret.js":
/*!***********************!*\
  !*** ./src/turret.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Projectile = __webpack_require__(/*! ./projectile */ "./src/projectile.js");

var Turret = /*#__PURE__*/function () {
  function Turret(game) {
    _classCallCheck(this, Turret);

    this.game = game;
    this.projectiles = 0; // this.slope = [1, -4];
  }

  _createClass(Turret, [{
    key: "swivelTurret",
    value: function swivelTurret(mousePosition) {
      this.dx = mousePosition[0] - 160;
      this.dy = 540 - mousePosition[1];
      var swivel = Math.atan2(this.dy, this.dx) + Math.PI;
      var hyp = Math.sqrt(Math.pow(this.dy, 2) + Math.pow(this.dx, 2));
      this.aimX = 160 - Math.cos(swivel) * 50;
      this.aimY = 540 + Math.sin(swivel) * 50;
      this.cheatX = 160 - Math.cos(swivel) * 550;
      this.cheatY = 540 + Math.sin(swivel) * 550;
      this.speedX = -Math.cos(swivel) * 10;
      this.speedY = Math.sin(swivel) * 10;
    } //   swivelTurret(mousePosition) {
    //     this.dx = mousePosition[0] - 160;
    //     this.dy = 540 - mousePosition[1];
    //     let swivel = Math.atan2(this.dy, this.dx) + Math.PI;
    //     let hyp = Math.sqrt(this.dy ** 2 + this.dx ** 2);
    //     this.aimX = 160 - 50 * Math.cos(swivel);
    //     this.aimY = 540 + 50 * Math.sin(swivel);
    //   }

  }, {
    key: "fire",
    value: function fire() {
      var projectile = new Projectile({
        game: this.game,
        slope: [this.speedX, this.speedY],
        aimX: this.aimX,
        aimY: this.aimY
      });
      this.game.addProjectiles(projectile);
    }
  }, {
    key: "draw",
    value: function draw(context) {
      //turret line
      context.beginPath();
      context.moveTo(160, 540);
      context.lineTo(this.cheatX, this.cheatY);
      context.strokeStyle = "grey";
      context.lineWidth = 1;
      context.stroke(); //turret cannon

      context.beginPath();
      context.moveTo(160, 540);
      context.lineTo(this.aimX, this.aimY);
      context.strokeStyle = "purple";
      context.lineWidth = 45;
      context.stroke(); //turret base

      context.beginPath();
      context.arc(160, 540, 30, 0, Math.PI * 2, false);
      context.fillStyle = "purple";
      context.fill();
    }
  }]);

  return Turret;
}();

module.exports = Turret;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map