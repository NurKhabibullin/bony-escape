import { InputHandler } from '../js/input.js';
import { Player } from '../js/player.js';
import { GroundEnemy, FlyingEnemy } from '../js/enemies.js';

window.onload = function() {
    let gameSpeed = 1;

    const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');

    canvas.width = 800, canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.marginX = 100;
            this.marginY = 50;
            this.player = new Player(this);
            this.input = new InputHandler();
            this.speed = gameSpeed;
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
        }
        
        update(deltaTime) {
            console.log(this.speed);

            this.player.update(this.input.keys, deltaTime);

            if (this.enemyTimer > this.enemyInterval) {
                this.spawnEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);

                if (enemy.isDeleted) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1)
                }
            });
        }

        draw(context) {
            this.player.draw(context);

            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }

        spawnEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this));
            }

            this.enemies.push(new FlyingEnemy(this));
            console.log(this.enemies);
        }
    }
    
    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
}