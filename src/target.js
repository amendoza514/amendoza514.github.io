class Target {
  constructor(position) {
    this.position = position;
    this.x = this.position * 40 - 20;
    this.y = 20;
    this.radius = 20;
    this.color = this.randomColor();
    this.move = this.move.bind(this);
    this.gameOver = this.gameOver.bind(this)
  }

  move() {
      this.y += 40
  }

  randomColor() {
    let colors = ["red", "green", "blue", "orange"];
    // console.log(colors[Math.floor(Math.random() * colors.length)]);
    return colors[Math.floor(Math.random() * colors.length)];
  }

  gameOver() {
      if (this.y + this.radius > 540) {
        return true
      }
  }

  draw(context) {
    this.gameOver()
    context.beginPath();
    if (this.position === 1) {
      context.arc(20, this.y, this.radius, 0, Math.PI * 2, false);
    } else {
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    }
    context.fillStyle = this.color;
    context.fill();

    // this.update();
  }
}

module.exports = Target;
