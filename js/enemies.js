import { FloatingText } from '../js/floatingText.js';

class Enemy {
    constructor() {
        this.isDeleted = false;
        this.hp = 2;
    }

    update(deltaTime) {
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        if (this.hp <= 0) {
            this.isDeleted = true;

            this.game.player.currentValue = Math.ceil(Math.random() * 3);
            this.game.bones += this.game.player.currentValue;
            
            this.game.floatingTexts.push(new FloatingText(`+${this.game.player.currentValue}`, this.x, this.y, 150, 50));
        }

        if (this.x + this.width < this.game.marginX) {
            this.isDeleted = true;
            this.game.damage--;
            this.game.bones -= Math.floor(Math.random() * 3);
        }
    }
    
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }

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
        this.imgs = document.querySelectorAll('#enemy-ground');
        this.img = this.imgs[Math.round(Math.random() * 2)];
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
        this.imgs = document.querySelectorAll('#enemy-fly');
        this.img = this.imgs[Math.round(Math.random())];
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);

        this.angle += this.va;
        this.y += Math.cos(this.angle);
    }
    
}
