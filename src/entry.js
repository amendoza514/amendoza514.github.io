const Game = require('./game.js');
const GameView = require("./game_view.js");


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
