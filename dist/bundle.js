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

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    let canvas = document.querySelector(\"canvas\");\n    let start = document.getElementById(\"start\");\n    let pause = document.getElementById(\"pause\");\n    let reset = document.getElementById(\"reset\");\n    let context = canvas.getContext(\"2d\");\n    canvas.width = 320;\n    canvas.height = 540;\n\n    const game = new Game(canvas.width, canvas.height)\n    new GameView(game, context, canvas, start, reset, pause).startup();\n    //incase of emergency, go back to just start()\n});\n\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Projectile = __webpack_require__(/*! ./projectile */ \"./src/projectile.js\");\nconst Target = __webpack_require__(/*! ./target */ \"./src/target.js\")\nconst Turret = __webpack_require__(/*! ./turret */ \"./src/turret.js\")\n\nclass Game {\n  constructor(width, height) {\n    this.width = width;\n    this.height = height;\n    this.projectiles = [];\n    this.turret = new Turret(this);\n    this.targets = [];\n    // this.playing = true\n    this.offsetRow = false;\n  }\n\n  movingObjects() {\n    return [].concat(this.projectiles, this.turret, this.targets);\n  }\n\n  /// TESTING? UNCOMMENT OUT INTERVAL FOR TESTING A ROW\n  moveTargets() {\n    setInterval(() => {\n      this.targets.forEach((target) => {\n        if (target instanceof Target) {\n          target.y += 35;\n        } else if (target instanceof Projectile) {\n          target.aimY += 35;\n        } \n      });\n    }, 2000);\n  }\n\n  addTargets() {\n    setInterval(() => {\n      if (!this.offsetRow) {\n        for (let i = 1; i <= 8; i++) {\n          this.targets.push(new Target(i, this.offsetRow));\n          this.offsetRow = true;\n        //   console.log(this.targets);\n        }\n    } else {\n        for (let i = 1; i <= 7; i++) {\n          this.targets.push(new Target(i, this.offsetRow));\n          this.offsetRow = false;\n        //   console.log(this.targets);\n        }\n    }\n    }, 2000);\n  }\n  // END TESTING\n\n  addProjectiles(projectile) {\n    this.projectiles.push(projectile);\n    return projectile;\n  }\n\n//   gameOver() {\n    // this.targets.forEach((target) => {\n    //   if (target.gameOver()) {\n        //   this.playing = false\n        //  this.projectiles = []\n    //   }\n    // });\n//   }\n\n  // remove(obj) {\n  //   console.log(this.projectiles)\n  //     if (obj instanceof Projectile) {\n  //         this.projectiles = this.projectiles.filter(projectile => {\n  //             obj !== projectile\n  //         })\n  //         obj = undefined\n  //     }\n  //     console.log(this.projectiles);\n  // }\n\n  drawElements(context, mousePosition) {\n      context.clearRect(0, 0, this.width, this.height);\n      context.fillStyle = \"white\";\n      context.fillRect(0, 0, this.width, this.height);\n      \n    this.movingObjects().forEach((obj) => {\n        obj.draw(context);\n        \n        if (obj instanceof Turret) {\n            obj.swivelTurret(mousePosition);\n        }\n    });\n  }\n\n  //   clearElements(context) {\n  //       this.projectiles = [];\n  //       this.targets = []\n  //       this.turret = null;\n  //     context.clearRect(0, 0, this.width, this.height);\n  //     context.fillStyle = \"white\";\n  //     context.fillRect(0, 0, this.width, this.height);\n  //   }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n  constructor(game, context, canvas, start, pause, reset) {\n    this.game = game;\n    this.start = start;\n    this.pause = pause;\n    this.reset = reset;\n    this.context = context;\n    this.canvas = canvas;\n    this.mousePosition = [0, 0];\n    this.handleClick = this.handleClick.bind(this);\n    this.handleMove = this.handleMove.bind(this);\n    this.startGame = this.startGame.bind(this);\n    this.setup = this.setup.bind(this);\n    this.playing = false;\n    this.tracking = [];\n    this.checkCollision = this.checkCollision.bind(this);\n  }\n\n  getDistance(x1, y1, x2, y2) {\n    const xDist = x2 - x1;\n    const yDist = y2 - y1;\n    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));\n  }\n  checkCollision() {\n    for (let i = 0; i < this.game.projectiles.length; i++) {\n      for (let j = 1; j < this.game.targets.length; j++) {\n        if (\n          this.getDistance(\n            this.game.projectiles[i].aimX,\n            this.game.projectiles[i].aimY,\n            this.game.targets[j].x,\n            this.game.targets[j].y\n          ) < this.game.projectiles[i].radius + this.game.targets[j].radius) {\n          //collision response \n          this.game.projectiles[i].collided = true\n          this.game.targets.push(this.game.projectiles[i])\n          this.game.projectiles[i].dx = 0;\n          this.game.projectiles[i].dy = 0;\n         \n          // this.game.projectiles[i].aimX = tempX;\n          // this.game.projectiles[i].aimY = tempY;\n        }\n      }\n    }\n  }\n\n  listenForMove() {\n    this.canvas.addEventListener(\"mousemove\", this.handleMove);\n  }\n\n  startup() {\n    console.log(\"waiting\");\n    // if (!this.playing) {\n    this.start.addEventListener(\"click\", this.startGame);\n    //   this.playing = !this.playing;\n    // } else {\n    //   this.playing = !this.playing;\n    // }\n    console.log(this.playing);\n  }\n\n  handleMove(event) {\n    this.mousePosition = [event.clientX, event.clientY];\n  }\n\n  listenForClick() {\n    this.canvas.addEventListener(\"click\", this.handleClick);\n  }\n\n  handleClick() {\n    this.game.turret.fire();\n  }\n\n  setup() {\n    this.listenForMove();\n    this.listenForClick();\n    this.game.addTargets();\n    this.game.moveTargets();\n  }\n\n  startGame() {\n    this.setup();\n    this.animate();\n  }\n\n  animate() {\n    this.game.drawElements(this.context, this.mousePosition);\n    this.checkCollision();\n    // if (!this.game.gameOver()) {\n      requestAnimationFrame(this.animate.bind(this));\n    // }\n  }\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/projectile.js":
/*!***************************!*\
  !*** ./src/projectile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Projectile {\n  constructor(props) {\n    this.aimX = props.aimX;\n    this.aimY = props.aimY;\n    this.dx = props.slope[0];\n    this.dy = props.slope[1];\n    this.radius = 20;\n    this.slope = props.slope;\n    this.game = props.game;\n    this.collided = false;\n  }\n \n \n  move() {\n    if (this.aimX + this.radius > 320 || this.aimX - this.radius < 0) {\n      this.dx = -this.dx;\n    }\n    if (this.aimY - this.radius < 0) {\n      this.dy = -this.dy;\n    }\n    // if (this.aimY + this.radius > 500) {\n    // this.destroy();\n    // console.log('FIX THIS')\n    // }\n    this.aimX += this.dx;\n    this.aimY += this.dy;\n  }\n\n  //   destroy() {\n  //     this.game.remove(this)\n  //     console.log('gone?')\n  //   }\n\n  draw(context) {\n    context.beginPath();\n    context.arc(this.aimX, this.aimY, this.radius, 0, Math.PI * 2, false);\n    context.fillStyle = \"black\";\n    context.fill();\n    context.closePath();\n\n      this.move();\n  }\n}\n\nmodule.exports = Projectile;\n\n//# sourceURL=webpack:///./src/projectile.js?");

/***/ }),

/***/ "./src/target.js":
/*!***********************!*\
  !*** ./src/target.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Target {\n  constructor(position, offset) {\n    this.position = position;\n    this.offset = offset;\n    this.x = this.position * 40 - 20;\n    this.y = 20;\n    this.radius = 20;\n    this.color = this.randomColor();\n    // this.gameOver = this.gameOver.bind(this)\n  }\n\n  randomColor() {\n    let colors = [\"red\", \"green\", \"blue\", \"orange\"];\n    // console.log(colors[Math.floor(Math.random() * colors.length)]);\n    return colors[Math.floor(Math.random() * colors.length)];\n  }\n\n//   gameOver() {\n//       if (this.y + this.radius > 540) {\n//         return true\n//       }\n//   }\n\n  draw(context) {\n    // this.gameOver()\n    context.beginPath();\n    if (this.position === 1 && this.offset) {\n      context.arc(40, this.y, this.radius, 0, Math.PI * 2, false);\n    } else if (this.position === 1 && !this.offset) {\n        context.arc(20, this.y, this.radius, 0, Math.PI * 2, false);\n    } else if (this.offset) {\n        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n    } else {\n        context.arc(this.x + 20, this.y, this.radius, 0, Math.PI * 2, false);\n    }\n    context.fillStyle = this.color;\n    context.fill();\n\n    // this.update();\n  }\n}\n\nmodule.exports = Target;\n\n\n//# sourceURL=webpack:///./src/target.js?");

/***/ }),

/***/ "./src/turret.js":
/*!***********************!*\
  !*** ./src/turret.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Projectile = __webpack_require__(/*! ./projectile */ \"./src/projectile.js\");\n\nclass Turret {\n  constructor(game) {\n    this.game = game;\n    this.projectiles = 0;\n    // this.slope = [1, -4];\n  }\n\n  swivelTurret(mousePosition) {\n    this.dx = mousePosition[0] - 160;\n    this.dy = 540 - mousePosition[1];\n    let swivel = Math.atan2(this.dy, this.dx) + Math.PI;\n    let hyp = Math.sqrt(this.dy ** 2 + this.dx ** 2);\n\n    this.aimX = 160 - Math.cos(swivel) * 50;\n    this.aimY = 540 + Math.sin(swivel) * 50;\n    this.cheatX = 160 - Math.cos(swivel) * 550;\n    this.cheatY = 540 + Math.sin(swivel) * 550;\n\n    this.speedX = -Math.cos(swivel) * 15;\n    this.speedY = Math.sin(swivel) * 15;\n  }\n\n  //   swivelTurret(mousePosition) {\n  //     this.dx = mousePosition[0] - 160;\n  //     this.dy = 540 - mousePosition[1];\n  //     let swivel = Math.atan2(this.dy, this.dx) + Math.PI;\n  //     let hyp = Math.sqrt(this.dy ** 2 + this.dx ** 2);\n\n  //     this.aimX = 160 - 50 * Math.cos(swivel);\n  //     this.aimY = 540 + 50 * Math.sin(swivel);\n  //   }\n\n  fire() {\n    const projectile = new Projectile({\n      game: this.game,\n      slope: [this.speedX, this.speedY],\n      aimX: this.aimX,\n      aimY: this.aimY,\n    });\n    this.game.addProjectiles(projectile);\n  }\n\n  draw(context) {\n    //turret line\n    context.beginPath();\n    context.moveTo(160, 540);\n    context.lineTo(this.cheatX, this.cheatY);\n    context.strokeStyle = \"grey\";\n    context.lineWidth = 1;\n    context.stroke();\n\n    //turret cannon\n    context.beginPath();\n    context.moveTo(160, 540);\n    context.lineTo(this.aimX, this.aimY);\n    context.strokeStyle = \"purple\";\n    context.lineWidth = 45;\n    context.stroke();\n\n    //turret base\n    context.beginPath();\n    context.arc(160, 540, 30, 0, Math.PI * 2, false);\n    context.fillStyle = \"purple\";\n    context.fill();\n  }\n}\n\nmodule.exports = Turret;\n\n//# sourceURL=webpack:///./src/turret.js?");

/***/ })

/******/ });