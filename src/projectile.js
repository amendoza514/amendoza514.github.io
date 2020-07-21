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
    this.drop = false;
    this.gameOver = this.gameOver.bind(this);
  }

  gameOver() {
    if ((!this.drop) && (this.aimY + this.radius >= 535) && (this.collided)) {
      return true;
    } else {
      return false;
    }
  }

  targetMove() {
    this.aimY += 35;
  }

  move() {
    if (this.aimX + this.radius > 320 || this.aimX - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.aimX += this.dx;
    this.aimY += this.dy;
  }

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