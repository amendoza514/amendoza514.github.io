class Target {
  constructor(position, offset) {
    this.position = position;
    this.offset = offset;
    this.x = this.position * 40 - 20;
    this.y = 20;
    this.radius = 20;
    this.color = this.randomColor();
    // this.gameOver = this.gameOver.bind(this)
  }

  randomColor() {
    let colors = ["red", "green", "blue", "orange"];
    // console.log(colors[Math.floor(Math.random() * colors.length)]);
    return colors[Math.floor(Math.random() * colors.length)];
  }

//   gameOver() {
//       if (this.y + this.radius > 540) {
//         return true
//       }
//   }

  draw(context) {
    // this.gameOver()
    context.beginPath();
    if (this.position === 1 && this.offset) {
      context.arc(40, this.y, this.radius, 0, Math.PI * 2, false);
    } else if (this.position === 1 && !this.offset) {
        context.arc(20, this.y, this.radius, 0, Math.PI * 2, false);
    } else if (this.offset) {
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    } else {
        context.arc(this.x + 20, this.y, this.radius, 0, Math.PI * 2, false);
    }
    context.fillStyle = this.color;
    context.fill();

    // this.update();
  }
}

module.exports = Target;
