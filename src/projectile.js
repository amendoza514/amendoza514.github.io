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
    this.spriteSheet = new Image();
    this.spriteSheet.src = `./dist/assets/${this.color}.png`;
    this.frame = 0;
    this.frameCount = 0;
    this.rotation = 80;
    this.frameSet = this.frameSet.bind(this);
  }

  gameOver() {
    if (this.drop && this.aimY + this.radius >= 535 && this.collided) {
      return true;
    } else {
      return false;
    }
  }

  targetMove() {
    this.aimY += 35;
  }

  move() {
    if (this.aimY - this.radius <= 0) {
      this.game.reloaded = true;
    }
    if (this.aimX + this.radius > 320 || this.aimX - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.aimX += this.dx;
    this.aimY += this.dy;
  }

  frameSet() {
    this.frameCount += 1;
    if (this.frameCount === this.rotation) {
      this.frame = this.frame === 0 ? 40 : 0;
      this.frameCount = 0;
    }
  }

  draw(context) {
     if (this.collided === false) {
       this.rotation = 3;
     } else {
       this.rotation = 80;
     }
    this.frameSet();
    // context.beginPath();
    // context.arc(this.aimX, this.aimY, this.radius, 0, Math.PI * 2, false);
    // context.fillStyle = this.color;
    // context.fill();
    // context.closePath();

    context.drawImage(this.spriteSheet, this.frame, 0, 41, 41, this.aimX - 20, this.aimY - 20, 41, 41);

    if (this.collided === false) {
      this.move();
    }
  }
}

module.exports = Projectile;