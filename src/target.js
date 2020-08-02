class Target {
  constructor(position, offset, x, y, color) {
    this.position = position;
    this.offset = offset;
    this.x = x;
    this.y;
    this.y = -10;
    this.radius = 20;
    this.color;
    if (color) {
      this.color = color
    } else {
      this.color = this.randomColor();
    }
    this.move = this.move.bind(this);
    this.count = 0;
    this.currentY = this.y + (35 * this.count);
    this.hit = false;
    this.drop  = false;
    this.gameOver = this.gameOver.bind(this);
    this.spriteSheet = new Image();
    this.spriteSheet.src = `./dist/assets/${this.color}.png`;
    this.frame = 0;
    this.frameCount = 0;
    this.frameSet = this.frameSet.bind(this);
  }

  move() {
      this.y += 35; 
  }

  randomColor() {
    let colors = ["purple", "green", "skyblue", "yellow", "red"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  gameOver() {
      if ((!this.drop) && (this.y + this.radius >= 545)) {
        return true;
      } else {
        return false;
      }
  }

  frameSet() {
    this.frameCount += 1;
    if (this.frameCount === 80) {
      this.frame = this.frame === 0 ? 41 : 0;
      this.frameCount = 0;
    }
  }
// 
  draw(context) {
    this.frameSet();
    // context.beginPath();
    // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // context.fillStyle = this.color;
    // context.fill();

    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    context.drawImage(this.spriteSheet, this.frame, 0, 41, 41, this.x - 20, this.y - 20, 41, 41);
    //next frame below
    // context.drawImage(this.spriteSheet, 40, 0, 40, 40, this.x, this.y, 40, 40);
  }
}

module.exports = Target;
