class Enemy {
    constructor() {
        this.isDeleted = false;
    }

    update(deltaTime) {
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        if (this.x + this.width < 0) {
            this.isDeleted = true;
        }
    }
    
    draw(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.marginY;
        this.img = document.getElementById('enemy-ground');
        this.speedX = Math.random() + 1;
        this.speedY = 0;
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.img = document.getElementById('enemy-fly');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1
        this.speedX = Math.random() + 1;
        this.speedY = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);

        this.angle += this.va;
        this.y += Math.cos(this.angle);
    }
    
}
