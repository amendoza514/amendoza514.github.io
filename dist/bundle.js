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
  new GameView(game, context, canvas, start, reset, pause).startUp(); //for testing use .startGame()
  //for produciton use .startUp()
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
    this.targets = [];
    this.offsetRow = false;
    this.remove = this.remove.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.playing = false;
    this.score = 0;
    this.offset = false;
    this.movingObjects = this.movingObjects.bind(this);
    this.intervals = [];
  }

  _createClass(Game, [{
    key: "movingObjects",
    value: function movingObjects() {
      return [].concat(this.projectiles, this.turret, this.targets);
    }
  }, {
    key: "moveTargets",
    value: function moveTargets() {
      var _this = this;

      var moveInterval = setInterval(function () {
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
      }, 5000);
      this.intervals.push(moveInterval);
    }
  }, {
    key: "addTargets",
    value: function addTargets() {
      var _this2 = this;

      var addInterval = setInterval(function () {
        if (!_this2.offsetRow) {
          var last;

          for (var i = 1; i <= 8; i++) {
            var x = void 0;

            if (i === 1) {
              x = 20;
            } else {
              x = i * 40 - 20;
            }

            _this2.targets.push(new Target(i, false, x));

            last = i;
          }

          _this2.offsetRow = true;
        } else {
          for (var j = 1; j <= 7; j++) {
            var _x = void 0;

            if (j === 1) {
              _x = 40;
            } else {
              _x = j * 40;
            }

            _this2.targets.push(new Target(j, false, _x));
          }

          _this2.offsetRow = false; // debugger
        }
      }, 5000);
      this.intervals.push(addInterval);
    }
  }, {
    key: "addProjectiles",
    value: function addProjectiles(projectile) {
      this.projectiles.push(projectile);
      return projectile;
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      var _this3 = this;

      this.targets.forEach(function (target) {
        if (target.gameOver()) {
          _this3.playing = false;
        }
      });
    }
  }, {
    key: "remove",
    value: function remove(obj) {
      if (this.playing === true) {
        if (obj instanceof Projectile) {
          this.projectiles = this.projectiles.slice(0, this.projectiles.indexOf(obj)).concat(this.projectiles.slice(this.projectiles.indexOf(obj) + 1));
        } else if (obj instanceof Target) {
          this.targets = this.targets.slice(0, this.targets.indexOf(obj)).concat(this.targets.slice(this.targets.indexOf(obj) + 1));
          this.score += 23;
        }
      }
    }
  }, {
    key: "drop",
    value: function drop(obj) {
      if (this.playing === true) {
        if (obj instanceof Projectile) {
          this.projectiles = this.projectiles.slice(0, this.projectiles.indexOf(obj)).concat(this.projectiles.slice(this.projectiles.indexOf(obj) + 1));
          this.score += 23;
        } else if (obj instanceof Target) {
          this.targets = this.targets.slice(0, this.targets.indexOf(obj)).concat(this.targets.slice(this.targets.indexOf(obj) + 1));
          this.score += 23;
        }
      }
    }
  }, {
    key: "drawElements",
    value: function drawElements(context, mousePosition) {
      var _this4 = this;

      context.clearRect(0, 0, this.width, this.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, this.width, this.height);
      this.gameOver();
      var score = document.getElementById("score");

      if (this.playing === true) {
        score.innerHTML = "score: ".concat(this.score);
      } else {
        score.innerHTML = "Your final score: ".concat(this.score);
      }

      this.movingObjects().forEach(function (obj) {
        obj.draw(context);

        if (obj instanceof Turret) {
          obj.swivelTurret(mousePosition);
        }

        if (obj instanceof Projectile) {
          if (obj.hit) {
            _this4.remove(obj);
          } else if (obj.aimY > 600 || obj.aimY < 0) {
            _this4.remove(obj); //trash collection

          } else if (obj.drop) {
            obj.aimY += 10;
          }
        }

        if (obj instanceof Target) {
          if (obj.hit) {
            _this4.remove(obj);
          } else if (obj.x > 600 || obj.y < 0) {
            _this4.remove(obj); //trash collection

          } else if (obj.drop) {
            obj.y += 10;
          }
        }
      });
    }
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

var Turret = __webpack_require__(/*! ./turret */ "./src/turret.js");

var Projectile = __webpack_require__(/*! ./projectile */ "./src/projectile.js");

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
    this.resetGame = this.resetGame.bind(this);
    this.setup = this.setup.bind(this);
    this.approxY = this.approxY.bind(this);
    this.checkChain;
    this.checkCollision = this.checkCollision.bind(this);
    this.chainReaction = this.chainReaction.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
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
      // for (let i = 0; i < this.game.projectiles.length; i++) {
      var currentShot = this.game.projectiles[this.game.projectiles.length - 1]; // console.log(currentShot)

      if (this.game.projectiles.length > 0) {
        for (var k = 0; k < this.game.projectiles.length - 1; k++) {
          // if (i !== k) {
          var pX = currentShot.aimX;
          var pY = currentShot.aimY;
          var pRadius = currentShot.radius;
          var tX = this.game.projectiles[k].aimX;
          var tY = this.game.projectiles[k].aimY;
          var tRadius = currentShot.radius;

          if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
            currentShot.dx = 0;
            currentShot.dy = 0;
            currentShot.radius = 20;
            currentShot.aimX = this.approxX(pX, tX);
            currentShot.aimY = this.approxY(pY, tY);

            if (currentShot.color === this.game.projectiles[k].color) {
              currentShot.hit = true;
              this.game.projectiles[k].hit = true;
              this.checkChain = true;
              return;
            }
          }
        } // }


        for (var j = 0; j < this.game.targets.length; j++) {
          if (this.getDistance(currentShot.aimX, currentShot.aimY, this.game.targets[j].x, this.game.targets[j].y) < currentShot.radius + this.game.targets[j].radius) {
            //collision response
            // projectile instructions
            currentShot.dx = 0;
            currentShot.dy = 0;
            currentShot.radius = 20;
            currentShot.aimX = this.approxX(currentShot.aimX, this.game.targets[j].x);
            currentShot.aimY = this.approxY(currentShot.aimY, this.game.targets[j].y);

            if (currentShot.color === this.game.targets[j].color) {
              currentShot.hit = true;
              this.game.targets[j].hit = true;
              this.checkChain = true;
              return;
            }
          } // this.game.projectiles[i].radius = this.game.targets[j].radius;

        }
      } // }

    }
  }, {
    key: "approxX",
    value: function approxX(x1, x2) {
      if (x1 > x2) {
        return x2 + 20;
      } else {
        return x2 - 20;
      }
    }
  }, {
    key: "approxY",
    value: function approxY(y1, y2) {
      if (y1 > y2) {
        return y2 + 35;
      } else if (y1 < y2) {
        return y2 - 35;
      } else {
        return y2;
      }
    } //older aiming
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

  }, {
    key: "chainReaction",
    value: function chainReaction() {
      while (this.checkChain === true) {
        //target / target
        for (var i = 0; i < this.game.targets.length; i++) {
          // console.log("checking");
          var check = 0;

          for (var k = 0; k < this.game.targets.length; k++) {
            if (i !== k) {
              var pX = this.game.targets[i].x;
              var pY = this.game.targets[i].y;
              var pRadius = this.game.targets[i].radius;
              var tX = this.game.targets[k].x;
              var tY = this.game.targets[k].y;
              var tRadius = this.game.targets[i].radius;

              if (this.getDistance(pX, pY, tX, tY) - 5 < pRadius + tRadius) {
                check += 1;

                if (this.game.targets[i].color === this.game.targets[k].color && (this.game.targets[i].hit || this.game.targets[k].hit)) {
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
        } //projectile / target


        for (var _i = 0; _i < this.game.projectiles.length; _i++) {
          // console.log("checking");
          for (var _k = 0; _k < this.game.targets.length; _k++) {
            var _pX = this.game.projectiles[_i].aimX;
            var _pY = this.game.projectiles[_i].aimY;
            var _pRadius = this.game.projectiles[_i].radius;
            var _tX = this.game.targets[_k].x;
            var _tY = this.game.targets[_k].y;
            var _tRadius = this.game.targets[_i].radius;

            if (this.getDistance(_pX, _pY, _tX, _tY) - 5 < _pRadius + _tRadius) {
              if (this.game.projectiles[_i].color === this.game.targets[_k].color && this.game.projectiles[_i].hit) {
                this.game.projectiles[_i].hit = true;
                this.game.targets[_k].hit = true;
                this.checkChain = false;
              }
            }
          }
        } // projectile / projectile


        for (var _i2 = 0; _i2 < this.game.projectiles.length; _i2++) {
          // console.log("checking");
          for (var _k2 = 0; _k2 < this.game.projectiles.length; _k2++) {
            if (_i2 !== _k2) {
              var _pX2 = this.game.projectiles[_i2].aimX;
              var _pY2 = this.game.projectiles[_i2].aimY;
              var _pRadius2 = this.game.projectiles[_i2].radius;
              var _tX2 = this.game.projectiles[_k2].aimX;
              var _tY2 = this.game.projectiles[_k2].aimY;
              var _tRadius2 = this.game.projectiles[_i2].radius;

              if (this.getDistance(_pX2, _pY2, _tX2, _tY2) - 5 < _pRadius2 + _tRadius2) {
                if (this.game.projectiles[_i2].color === this.game.projectiles[_k2].color && (this.game.projectiles[_i2].hit || this.game.projectiles[_k2].hit)) {
                  this.game.projectiles[_i2].hit = true;
                  this.game.projectiles[_k2].hit = true;
                  this.checkChain = false;
                }
              }
            }
          }
        }

        this.checkChain = false;
      }
    }
  }, {
    key: "checkValidation",
    value: function checkValidation() {
      var shot = this.game.projectiles[this.game.projectiles.length - 1];

      for (var i = 0; i < this.game.projectiles.length - 1; i++) {
        var obj = this.game.projectiles[i];

        if (this.getDistance(shot.aimX, shot.aimY, obj.aimX, obj.aimY) - 5 < shot.radius + obj.radius) {
          if (shot.color === obj.color) {
            shot.hit = true;
            obj.hit = true;
            this.checkChain = true;
            console.log("saved");
          }
        }
      }

      for (var _i3 = 0; _i3 < this.game.targets.length; _i3++) {
        var _obj = this.game.targets[_i3];

        if (this.getDistance(shot.aimX, shot.aimY, _obj.x, _obj.y) - 5 < shot.radius + _obj.radius) {
          if (shot.color === _obj.color) {
            shot.hit = true;
            _obj.hit = true;
            this.checkChain = true;
            console.log("saved");
          }
        }
      }
    }
  }, {
    key: "listenForMove",
    value: function listenForMove() {
      this.canvas.addEventListener("mousemove", this.handleMove);
    }
  }, {
    key: "handleMove",
    value: function handleMove(event) {
      this.mousePosition = [event.offsetX, event.offsetY];
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
      this.game.turret.setColors();
      this.game.addTargets();
      this.game.moveTargets();
    }
  }, {
    key: "startUp",
    value: function startUp() {
      if (!this.game.playing) {
        this.start.innerHTML = "start";
        this.start.addEventListener("click", this.startGame);
        this.game.playing = true;
      }
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.setup();
      this.animate();
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.game.playing = true;
      this.game.intervals.forEach(function (interval) {
        return clearInterval(interval);
      }); // this.game.turret = new Turret(this)

      this.game.intervals = [];
      this.game.projectiles = [];
      this.game.targets = [];
      this.game.score = 0;
      this.game.addTargets();
      this.game.moveTargets();
    }
  }, {
    key: "animate",
    value: function animate() {
      if (this.game.playing) {
        this.start.innerHTML = "reset";
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
  }]);

  return GameView;
}();

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

    this.color = props.color;
    this.aimX = props.aimX;
    this.aimY = props.aimY;
    this.dx = props.slope[0];
    this.dy = props.slope[1];
    this.radius = 16;
    this.slope = props.slope;
    this.game = props.game;
    this.collided = false;
    this.targetMove = this.targetMove.bind(this);
    this.hit = false;
    this.drop = false;
    this.gameOver = this.gameOver.bind(this);
  }

  _createClass(Projectile, [{
    key: "gameOver",
    value: function gameOver() {
      if (!this.drop && this.aimY + this.radius >= 535) {
        return true;
      } else {
        return false;
      }
    }
  }, {
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

      this.aimX += this.dx;
      this.aimY += this.dy;
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.beginPath();
      context.arc(this.aimX, this.aimY, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
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
  function Target(position, offset, x, y, color) {
    _classCallCheck(this, Target);

    this.position = position;
    this.offset = offset;
    this.x = x;
    this.y;
    this.y = 20;
    this.radius = 20;
    this.color;

    if (color) {
      this.color = color;
    } else {
      this.color = this.randomColor();
    }

    this.move = this.move.bind(this);
    this.count = 0;
    this.currentY = this.y + 35 * this.count;
    this.hit = false;
    this.drop = false;
    this.gameOver = this.gameOver.bind(this);
  }

  _createClass(Target, [{
    key: "move",
    value: function move() {
      this.y += 35;
    }
  }, {
    key: "randomColor",
    value: function randomColor() {
      var colors = ["red", "green", "blue", "orange", "gray"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      if (!this.drop && this.y + this.radius >= 535) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "draw",
    value: function draw(context) {
      // this.gameOver()
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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
    this.projectiles = 0;
    this.setColors = this.setColors.bind(this);
    this.shots = [];
    this.color = this.shots[0];
    this.nextShot = this.shots[1];
    this.nextNextShot = this.shots[2];
  }

  _createClass(Turret, [{
    key: "setColors",
    value: function setColors() {
      for (var i = 0; i < 3; i++) {
        this.shots.push(this.randomColor());
      }
    }
  }, {
    key: "randomColor",
    value: function randomColor() {
      var colors = ["red", "green", "blue", "orange", "gray"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }, {
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
      this.speedX = -Math.cos(swivel) * 12;
      this.speedY = Math.sin(swivel) * 12;
    }
  }, {
    key: "fire",
    value: function fire() {
      var projectile = new Projectile({
        game: this.game,
        slope: [this.speedX, this.speedY],
        aimX: this.aimX,
        aimY: this.aimY,
        color: this.shots[0]
      });
      this.game.addProjectiles(projectile);
      this.shots.shift();
      this.shots.push(this.randomColor());
    }
  }, {
    key: "draw",
    value: function draw(context) {
      //turrent base
      context.beginPath();
      context.rect(180, 530, 50, 5);
      context.fillStyle = "gray";
      context.fill();
      context.stroke(); //turret line

      context.beginPath();
      context.moveTo(160, 540);
      context.lineTo(this.cheatX, this.cheatY);
      context.strokeStyle = "grey";
      context.lineWidth = 1;
      context.stroke(); //turret cannon

      context.beginPath();
      context.moveTo(160, 540);
      context.lineTo(this.aimX, this.aimY);
      context.strokeStyle = this.shots[0];
      context.lineWidth = 45;
      context.stroke(); //turret base

      context.beginPath();
      context.arc(160, 560, 50, 0, Math.PI * 2, false);
      context.fillStyle = this.shots[0];
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = "black";
      context.stroke(); //next shot

      context.beginPath();
      context.arc(210, 525, 5, 0, Math.PI * 2, false);
      context.fillStyle = this.shots[1];
      context.fill(); // next next shot

      context.beginPath();
      context.arc(222, 525, 5, 0, Math.PI * 2, false);
      context.fillStyle = this.shots[2];
      context.fill();
    }
  }]);

  return Turret;
}();

module.exports = Turret;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map