class Basketball {
    constructor() {
        this.image = new Image();
        this.image.src('assets/basketball.png');
        this.frameIndex = 0;
        this.frameSet = [[0,0],[0,1]];
    }
}

module.exports = Basketball;