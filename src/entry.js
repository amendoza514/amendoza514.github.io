const Game = require('./game.js');
const GameView = require("./game_view.js");


document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector("canvas");
    let start = document.getElementById("start");

    let context = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 540;

    let lebronImg = new Image();
    lebronImg.src = `./dist/assets/lebron.png`;
    lebronImg.onload = () => {
        context.drawImage(lebronImg, 20,  217.5, 140, 100);
    }

    let steph = new Image();
    steph.src = `./dist/assets/steph.png`;
    steph.onload = () => {
      context.drawImage(steph, 165, 217.5, 140, 100);
    }

    let logo = new Image();
    logo.src = `./dist/assets/nba2.png`;
    logo.onload = () => {
      context.drawImage(logo, 87, 208, 153, 100);
        // 
                context.font = "10px 'Press Start 2P', cursive";
                context.fillStyle = "white";
                context.fillText("L.JAMES", 40, 348);  

                       context.font = "10px 'Press Start 2P', cursive";
                       context.fillStyle = "white";
                       context.fillText("S.CURRY", 212, 348);  
    };

    //   let lText = new Image();
    //   lText.src = `./dist/assets/steph.png`;
    //   lText.onload = () => {
    //     context.font = "10px 'Press Start 2P', cursive";
    //     context.fillStyle = "white";
    //     context.fillText("L.JAMES", 40, 348);   
    //   };

    //   let sText = new Image();
    //   sText.src = `./dist/assets/steph.png`;
    //   sText.onload = () => {
    //     context.font = "10px 'Press Start 2P', cursive";
    //     context.fillStyle = "white";
    //      context.fillText("S.CURRY", 212, 348);  
    //   }; 

    go();

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

    //maybe change here for color player select?    
    context.beginPath();
    context.rect(16, 210, 290, 230);
    context.lineWidth = 10;
    context.strokeStyle = 'white';
    context.stroke();
    
    let grd = context.createLinearGradient(0, 580, 0, 0);
    grd.addColorStop(0, "darkblue");
    grd.addColorStop(1, "lightblue");
    context.fillStyle = grd;
    context.lineWidth = 5;
    context.fill();
    context.stroke();

    
    context.beginPath()
    context.moveTo(15, 323);
    context.lineTo(304,323);
    context.lineWidth = 10;
    context.strokeStyle = 'white'
    context.stroke();
   
    //player names 

    // context.font = "10px 'Press Start 2P', cursive";
    // context.fillStyle = "white";
    // context.fillText("L.JAMES", 40, 348);    
    
    // context.font = "10px 'Press Start 2P', cursive";
    // context.fillStyle = "white";
    // context.fillText("S.CURRY", 212, 348);   

    //stat text w/ shadow precursor
        context.font = "10px 'Press Start 2P', cursive";
        context.fillStyle = "black";
        context.fillText("SPEED", 137, 367);   

    context.font = "10px 'Press Start 2P', cursive";
    context.fillStyle = "yellow";
    context.fillText("SPEED", 135, 365);   

        context.font = "10px 'Press Start 2P', cursive";
        context.fillStyle = "black";
        context.fillText("3 PTRS", 132, 387);  
    context.font = "10px 'Press Start 2P', cursive";
    context.fillStyle = "yellow";
    context.fillText("3 PTRS", 130, 385);  
    
        context.font = "10px 'Press Start 2P', cursive";
        context.fillStyle = "black";
        context.fillText("DUNKS", 137, 407);  
    context.font = "10px 'Press Start 2P', cursive";
    context.fillStyle = "yellow";
    context.fillText("DUNKS", 135, 405);  

        context.font = "10px 'Press Start 2P', cursive";
        context.fillStyle = "black";
        context.fillText("DEF.", 146, 427);  
    context.font = "10px 'Press Start 2P', cursive";
    context.fillStyle = "yellow";
    context.fillText("DEF.", 144, 425);  

    //lebron stats
      context.beginPath();
      context.moveTo(37, 361);
      context.lineTo(117, 361);
      context.lineWidth = 7;
      context.strokeStyle = "black";
      context.stroke();
    context.beginPath();
    context.moveTo(35, 359);
    context.lineTo(115, 359);
    context.lineWidth = 7;
    context.strokeStyle = "white";
    context.stroke();

        context.beginPath();
        context.moveTo(36, 359);
        context.lineTo(105, 359);
        context.lineWidth = 6;
        context.strokeStyle = "green";
        context.stroke();

   context.beginPath();
   context.moveTo(37, 381);
   context.lineTo(117, 381);
   context.lineWidth = 7;
   context.strokeStyle = "black";
   context.stroke();
    context.beginPath();
    context.moveTo(35, 379);
    context.lineTo(115, 379);
    context.lineWidth = 7;
    context.strokeStyle = "white";
    context.stroke();

       context.beginPath();
       context.moveTo(36, 379);
       context.lineTo(95, 379);
       context.lineWidth = 6;
       context.strokeStyle = "green";
       context.stroke();
    
    context.beginPath();
    context.moveTo(37, 401);
    context.lineTo(117, 401);
    context.lineWidth = 7;
    context.strokeStyle = "black";
    context.stroke();

     context.beginPath();
     context.moveTo(35, 399);
     context.lineTo(115, 399);
     context.lineWidth = 7;
     context.strokeStyle = "white";
     context.stroke();

       context.beginPath();
       context.moveTo(36, 399);
       context.lineTo(110, 399);
       context.lineWidth = 6;
       context.strokeStyle = "green";
       context.stroke();

    context.beginPath();
    context.moveTo(37, 421);
    context.lineTo(117, 421);
    context.lineWidth = 7;
    context.strokeStyle = "black";
    context.stroke();
    
     context.beginPath();
     context.moveTo(35, 419);
     context.lineTo(115, 419);
     context.lineWidth = 7;
     context.strokeStyle = "white";
     context.stroke();

    context.beginPath();
    context.moveTo(36, 419);
    context.lineTo(95, 419);
    context.lineWidth = 6;
    context.strokeStyle = "green";
    context.stroke();

    //curry stats
    context.beginPath();
    context.moveTo(207, 361);
    context.lineTo(287, 361);
    context.lineWidth = 7;
    context.strokeStyle = "black";
    context.stroke();

     context.beginPath();
     context.moveTo(205, 359);
     context.lineTo(285, 359);
     context.lineWidth = 7;
     context.strokeStyle = "white";
     context.stroke();

        context.beginPath();
        context.moveTo(206, 359);
        context.lineTo(270, 359);
        context.lineWidth = 6;
        context.strokeStyle = "green";
        context.stroke();

    context.beginPath();
    context.moveTo(207, 381);
    context.lineTo(287, 381);
    context.lineWidth = 7;
    context.strokeStyle = "black";
    context.stroke();

     context.beginPath();
     context.moveTo(205, 379);
     context.lineTo(285, 379);
     context.lineWidth = 7;
     context.strokeStyle = "white";
     context.stroke();

        context.beginPath();
        context.moveTo(206, 379);
        context.lineTo(284, 379);
        context.lineWidth = 6;
        context.strokeStyle = "green";
        context.stroke();

    context.beginPath();
    context.moveTo(207, 401);
    context.lineTo(287, 401);
    context.lineWidth = 7;
    context.strokeStyle = "black";
    context.stroke();

     context.beginPath();
     context.moveTo(205, 399);
     context.lineTo(285, 399);
     context.lineWidth = 7;
     context.strokeStyle = "white";
     context.stroke();

        context.beginPath();
        context.moveTo(206, 399);
        context.lineTo(240, 399);
        context.lineWidth = 6;
        context.strokeStyle = "green";
        context.stroke();

    context.beginPath();
    context.moveTo(207, 421);
    context.lineTo(287, 421);
    context.lineWidth = 7;
    context.strokeStyle = "black";
    context.stroke();

     context.beginPath();
     context.moveTo(205, 419);
     context.lineTo(285, 419);
     context.lineWidth = 7;
     context.strokeStyle = "white";
     context.stroke();

        context.beginPath();
        context.moveTo(206, 419);
        context.lineTo(255, 419);
        context.lineWidth = 6;
        context.strokeStyle = "green";
        context.stroke();
});

function newGame() {
    go()
}

function go(){
        let canvas = document.querySelector("canvas");
        let start = document.getElementById("start");
        let lebron = document.getElementById("lebron");
        let steph = document.getElementById("steph");

        let context = canvas.getContext("2d");
        canvas.width = 320;
        canvas.height = 540;
  const game = new Game(canvas.width, canvas.height)
  const gameview = new GameView(game, context, canvas, start, newGame, lebron, steph)
  gameview.startUp();
//   gameview.harlem.play()
    //for testing use .startGame()
    //for production use .startUp()
}

