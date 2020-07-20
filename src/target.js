class Target {
  constructor(position, offset, x, y, color) {
    this.position = position;
    this.offset = offset;
    this.x = x;
    this.y;
    this.y = 20;
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
    this.gameOver = this.gameOver.bind(this)
  }

  move() {
      this.y += 35; 
  }

  randomColor() {
    let colors = ["red", "green", "blue", "orange", "gray"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  gameOver() {
      if ((!this.drop) && (this.y + this.radius >= 535)) {
        return true;
      } else {
        return false;
      }
  }

  draw(context) {
    // this.gameOver()
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();

    // this.update();
  }
}

module.exports = Target;
