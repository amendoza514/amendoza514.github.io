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
    new GameView(game, context, canvas, start, reset, pause).startUp();
    //for testing use .startGame()
    //for produciton use .startUp()

    //halfcourt semi
    context.beginPath();
    context.arc(160, 550, 50, 0, Math.PI * 2, false);
    context.lineWidth = 4;
    context.strokeStyle = "white";
    context.stroke();

    //top of the key
    context.beginPath();
    context.arc(160, 150, 50, 0, Math.PI, false);
    context.lineWidth = 4.2;
    context.strokeStyle = "white";
    context.stroke();
    //hoop
    context.beginPath();
    context.arc(160, 38, 15, 0, Math.PI * 2, false);
    context.lineWidth = 4;
    context.strokeStyle = "white";
    context.stroke();
    //top of the key
    context.beginPath();
    context.arc(160, 150, 50, 0, Math.PI * 2, false);
    context.setLineDash([9, 9]);
    context.lineWidth = 4;
    context.strokeStyle = "white";
    context.stroke();
    //key line 1
    context.beginPath();
    context.moveTo(110, 0);
    context.lineTo(110, 150);
    context.setLineDash([5,5]);
    context.strokeStyle = "white";
    context.setLineDash([0, 0]);
    context.lineWidth = 4;
    context.stroke();
    //key line 2
    context.beginPath();
    context.moveTo(210, 0);
    context.lineTo(210, 150);
    context.setLineDash([5,5]);
    context.strokeStyle = "white";
    context.setLineDash([0, 0]);
    context.lineWidth = 4;
    context.stroke();
    //backboard
    context.beginPath();
    context.moveTo(130, 17);
    context.lineTo(190, 17);
    context.setLineDash([5,5]);
    context.strokeStyle = "white";
    context.setLineDash([0, 0]);
    context.lineWidth = 4;
    context.stroke();
    //3-point
    context.beginPath();
    context.arc(160, 18, 200, 0, Math.PI, false);
    context.lineWidth = 4;
    context.setLineDash([0, 0]);
    context.strokeStyle = "white";
    context.stroke();
});
