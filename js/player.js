import { Sitting, Running, Jumping, Falling, Diving } from '../js/states.js';
import { FloatingText } from '../js/floatingText.js';

export class Player {
    constructor(game) {
        this.game = game; 
        this.width = 100;
        this.height = 91.3;
        this.x = this.game.marginX;;
        this.y = this.game.height - this.height - this.game.marginY;
        
        this.img = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 25;
        this.frameInterval = 40; // 1000 / fps
        this.frameTimer = 0;
        
        this.attackDamage = 1;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.maxSpeed = 10;

        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), 
            new Diving(this.game)];
        this.currentState = null;

        this.attackInterval = 350;
        this.lastAttackTimer = 0;
    }

    update(input, deltaTime) {
        this.isCollision(input);

        this.lastAttackTimer += deltaTime;

        this.currentState.handleInput(input);

        this.x += this.speed;

        if (input.includes('a') || input.includes('ф') || input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        else if (input.includes('d') || input.includes('в') || input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        else {
            this.speed = 0;
        }

        if (this.x < this.game.marginX) {
            this.x = this.game.marginX;
        }

        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }

        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

        if (this.y > this.game.height - this.height - this.game.marginY) {
            this.y = this.game.height - this.height - this.game.marginY;
        }

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;

            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context) {
        if (this.game.debug) {
            context.strokeStyle = '#fff';
            context.strokeRect(this.x, this.y, this.width, this.height);
        }

        context.drawImage(this.img, 
            this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.marginY;
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    isCollision(input) {
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.x + this.width && enemy.x > this.x - enemy.width 
                && enemy.y < this.y + this.height && enemy.y > this.y - enemy.height 
                && this.attackInterval < this.lastAttackTimer && input.includes(' ')) {
                enemy.hp -= this.attackDamage;
                enemy.x += 30;
                enemy.speedX--;
                this.lastAttackTimer = 0;

                // this.game.floatingTexts.push(new FloatingText(`-${1}`, enemy.x, enemy.y, 150, 50));
            }
        });
    }
}