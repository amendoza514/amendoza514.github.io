const Projectile = require('./projectile');

class Turret {
  constructor(game) {
    this.game = game;
    this.projectiles = 0;
    this.color = this.randomColor()
    // this.nextShot = asd;
    this.currentShot = this.color;
  }
  randomColor() {
    let colors = ["red", "green", "blue", "orange", "gray"];
    return colors[Math.floor(Math.random() * colors.length)];
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

    this.speedX = -Math.cos(swivel) * 10;
    this.speedY = Math.sin(swivel) * 10;
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
      color: this.color
    });
    this.game.addProjectiles(projectile);
    this.color = this.randomColor();
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
    context.strokeStyle = this.color;
    context.lineWidth = 45;
    context.stroke();

    //turret base
    context.beginPath();
    context.arc(160, 540, 30, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
}

module.exports = Turret;