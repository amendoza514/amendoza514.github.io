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
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/alexmendoza/Desktop/BubbleBall/src/entry.js: Unexpected token (334:0)\n\n\u001b[0m \u001b[90m 332 | \u001b[39m        context\u001b[33m.\u001b[39mstrokeStyle \u001b[33m=\u001b[39m \u001b[32m\"green\"\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 333 | \u001b[39m        context\u001b[33m.\u001b[39mstroke()\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 334 | \u001b[39m})\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 335 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 336 | \u001b[39m\u001b[36mfunction\u001b[39m newGame() {\u001b[0m\n\u001b[0m \u001b[90m 337 | \u001b[39m    go()\u001b[0m\n    at Parser._raise (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:757:17)\n    at Parser.raiseWithData (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:750:17)\n    at Parser.raise (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:744:17)\n    at Parser.unexpected (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:8834:16)\n    at Parser.parseExprAtom (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:10169:20)\n    at Parser.parseExprSubscripts (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:9688:23)\n    at Parser.parseMaybeUnary (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:9668:21)\n    at Parser.parseExprOps (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:9538:23)\n    at Parser.parseMaybeConditional (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:9511:23)\n    at Parser.parseMaybeAssign (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:9466:21)\n    at Parser.parseExpression (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:9418:23)\n    at Parser.parseStatementContent (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:11332:23)\n    at Parser.parseStatement (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:11203:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:11778:25)\n    at Parser.parseBlockBody (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:11764:10)\n    at Parser.parseTopLevel (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:11134:10)\n    at Parser.parse (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:12836:10)\n    at parse (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/parser/lib/index.js:12889:38)\n    at parser (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/core/lib/parser/index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/core/lib/transformation/normalize-file.js:93:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/core/lib/transformation/index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (/Users/alexmendoza/Desktop/BubbleBall/node_modules/@babel/core/lib/transform.js:27:41)\n    at transform.next (<anonymous>)\n    at step (/Users/alexmendoza/Desktop/BubbleBall/node_modules/gensync/index.js:254:32)\n    at /Users/alexmendoza/Desktop/BubbleBall/node_modules/gensync/index.js:266:13\n    at async.call.result.err.err (/Users/alexmendoza/Desktop/BubbleBall/node_modules/gensync/index.js:216:11)");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map