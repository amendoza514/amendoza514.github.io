# Bubble Ball!

[*Bubble Ball!*](https://amendoza514.github.io/) is an arcade-styled shooter/puzzle game that leverages varied custom collision detection patterns to reward accurate shot placement by players

# About

*Bubble Ball!* was inspired by the NBA’s move to Disney’s Orlando campus for a restart to the NBA season and eventual playoffs (i.e. the “NBA Bubble”) in response to the 2020 COVID crisis. Players must use the mouse to aim and fire a turret to destroy targets of like-color in order to prevent them from crossing  the 'half-court' and ending the game. 

Players can target clusters of targets with the same color of the current projectile loaded (projectile previews are visible at the turret) to destroy multiple at the same time. Targets that are completely isolated from other targets as a result of a shot are rewarded as 'free throws' and dropped from the court for free points.

Additionally, players can choose from "LeBron James" or "Steph Curry" player types that grant additional abilities. These abilities allow a user to utilize either a built in aiming reticle for more precise shooting (Curry), or the chance for *AND - 1* free target hits anywhere on the map following any successful shot (LeBron).

Check out the [live demo](https://amendoza514.github.io/) if you are interested!

## Features
### Collision Detection and Chain-Reaction Dynamic
I chose to expand on basic 2D circle detection logic for my primary game mechanics, as I wanted to avoid leveraging any external libraries or resources. By isolating targets and projectiles into separate object types, I was able to register valid collisions in real time by checking object type, color, and distance from other surrounding objects (preventing self-generating targets of the same color from 'popping' on load). 

    
    getDistance(x1, y1, x2, y2) {
	    const  xDist = x2 - x1;
	    const  yDist = y2 - y1;
	    return  Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }
    
    checkCollision() {
	    let  currentShot = this.game.projectiles
		    [this.game.projectiles.length - 1];
        
	    for (let  k = 0; k < this.game.projectiles.length - 1; k++) {
	    if (this.game.projectiles[k].drop === true) {
	    continue;
	    }
	    let  pX = currentShot.aimX;
	    let  pY = currentShot.aimY;
	    let  pRadius = currentShot.radius;
	    let  tX = this.game.projectiles[k].aimX;
	    let  tY = this.game.projectiles[k].aimY;
	    let  tRadius = currentShot.radius;

	    if (this.getDistance(pX, pY, tX, tY) < pRadius + tRadius) {
		    currentShot.dx = 0;
		    currentShot.dy = 0;
		    currentShot.radius = 20;
		    currentShot.aimX = this.approxX(pX, tX);
		    currentShot.aimY = this.approxY(pY, tY);	
		    currentShot.collided = true;
		    this.game.reloaded = true;
 
	    if (currentShot.color === this.game.projectiles[k].color) {
		    if (this.andOneNumber === null) {
			    this.andOne();
		    }
		    
		    if (this.popped === false) {
			    this.popped = true;
			    this.pop.rate(this.soundType());
			    this.pop.play();
		    }
		    currentShot.hit = true
		    this.game.projectiles[k].hit = true;
		    this.checkChain = true;
		    }
	    }}
	    
	    for (let  j = 0; j < this.game.targets.length; j++) {
	    
	    if (this.game.targets[j].drop === true) {
		    continue;
	    }
	    if (this.getDistance(currentShot.aimX, currentShot.aimY, this.game.targets[j].x,this.game.targets[j].y) <
	    currentShot.radius + this.game.targets[j].radius
	    ) {
		    currentShot.dx = 0;
		    currentShot.dy = 0;
		    currentShot.radius = 20;
		    this.game.reloaded = true;
		    currentShot.collided = true;
		    currentShot.aimX = this.approxX(
			    currentShot.aimX,
			    this.game.targets[j].x
		    );
		    currentShot.aimY = this.approxY(
			    currentShot.aimY,
			    this.game.targets[j].y
			);
	       
	    if (currentShot.color === this.game.targets[j].color) {
	    if (this.andOneNumber === null) {
		    this.andOne();
	    }
	    if (this.popped === false) {
		    this.popped = true;
		    this.pop.rate(this.soundType());
		    this.pop.play();
	    }
	    currentShot.hit = true;
	    this.game.targets[j].hit = true;
	    this.checkChain = true;
	    }}
	  }
	}

Objects that have collided then get sent to a separate custom algorithm that allows for collisions to 'pop' surrounding targets/projectile based on valid location data and various collision related flags that now live in the targets/projectiles. These collisions and cluster chain-reaction checks are being rendered on every animation frame to allow for fluid gameplay.

