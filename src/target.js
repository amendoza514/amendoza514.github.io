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
    this.pop = new Image();
    this.pop.src = `./dist/assets/pop1.png`;
    this.frame = 0;
    this.frameCount = 0;
    this.frameSet = this.frameSet.bind(this);
    this.popFrame = 0;
    this.popFrameCount = 0;
    this.popFrameSet = this.popFrameSet.bind(this);
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

  popFrameSet() {
    this.popFrameCount += 0.2;
    if (this.popFrameCount % 32 === 0){
      this.popFrame = this.popFrameCount * 32;
    }
  }


  //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  draw(context) {
    if (!this.hit) {
      this.frameSet();
      context.drawImage(this.spriteSheet, this.frame, 0, 41, 41, this.x - 20, this.y - 20, 41, 41);
    }
     if (this.hit) {
      this.popFrameSet();
      context.drawImage(this.pop, this.popFrame, 0, 32, 32, this.x - 20, this.y - 20, 32, 32);
    }

    //next frame below
    // context.drawImage(this.spriteSheet, 40, 0, 40, 40, this.x, this.y, 40, 40);
  }
}

module.exports = Target;
