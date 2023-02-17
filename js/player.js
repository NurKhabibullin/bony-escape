import { Sitting, Running, Jumping, Falling } from '../js/states.js';

export class Player {
    constructor(game) {
        this.game = game; 
        this.width = 100;
        this.height = 91.3;
        this.x = this.game.marginX;;
        this.y = this.game.height - this.height - this.game.marginY;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 25;
        this.frameInterval = 40; // 1000 / fps
        this.frameTimer = 0;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.maxSpeed = 10;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input, deltaTime) {
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

        if (this.x > this.game.width - this.width - this.game.marginX) {
            this.x = this.game.width - this.width - this.game.marginX;
        }

        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
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
        context.drawImage(this.image, 
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
}