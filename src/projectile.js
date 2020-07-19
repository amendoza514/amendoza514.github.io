class Projectile {
  constructor(props) {
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
    this.grip = true;
    this.drop = false;
  }

  // randomColor() {
  //   let colors = ["red", "green", "blue", "orange", "gray"];
  //   return colors[Math.floor(Math.random() * colors.length)];
  // }

  targetMove() {
    this.aimY += 35;
  }

  move() {
    if (this.aimX + this.radius > 320 || this.aimX - this.radius < 0) {
      this.dx = -this.dx;
    }
    // if (this.aimY - this.radius < 0) {
    //   this.dy = -this.dy;
    // }
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
    context.fillStyle = this.color;
    context.fill();
    context.closePath();

    if (this.collided === false) {
      this.move();
    }
  }
}

module.exports = Projectile;