class Enemy {
    constructor() {
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        this.x -= this.speedX;
        this.y += this.speedY;
    }
    
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById('enemy');
        this.speedX = 2;
        this.speedY = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
    
}
