import { InputHandler } from '../js/input.js';
import { Player } from '../js/player.js';
import { GroundEnemy, FlyingEnemy } from '../js/enemies.js';
import { UI } from '../js/UI.js'



window.onload = function() {
    let pause = false, resume = false;
    
    document.getElementById('pause').addEventListener('click', () => {
        pause = true;
        resume = false;
    });
    
    document.getElementById('resume').addEventListener('click', () => {
        resume = true;
        pause = false;
    });

    document.getElementById('reload').addEventListener('click', () => {
        location.reload();
    });

    let gameMode = +document.getElementById('mode-choose').value;

    const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');

    canvas.width = 800, canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;

            this.mode = gameMode;
            this.pause = pause;
            this.debug = false;
            this.speed = 1;
            this.time = 0;
            this.maxTime = 90000;
            this.gameOver = false;
            this.bones = 0;
            this.damage = 3;
            this.floatingTexts = [];

            this.marginX = 100;
            this.marginY = 50;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1500;

            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        
        update(deltaTime) {
            if (pause && this.mode < 2) {
                this.speed = 0;
            }

            if (resume) {
                this.speed = 1;
            }

            if (this.speed > 0) {
                this.time += deltaTime;

                if (this.time > this.maxTime || this.damage === 0) {
                    this.gameOver = true;
                }
    
                this.player.update(this.input.keys, deltaTime);
    
                if (this.enemyTimer > this.enemyInterval) {
                    this.spawnEnemy();
                    this.enemyTimer = 0;
                } else {
                    this.enemyTimer += deltaTime;
                }
    
                this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                });
    
                this.floatingTexts.forEach(text => {
                    text.update();
                });
    
                this.enemies = this.enemies.filter(enemy => !enemy.isDeleted);
    
                this.floatingTexts = this.floatingTexts.filter(text => !text.isDeleted);
            }
        }

        draw(context) {
            this.player.draw(context);

            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });

            this.floatingTexts.forEach(text => {
                text.draw(context);
            });

            this.UI.draw(context);
        }

        spawnEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this));
            }

            this.enemies.push(new FlyingEnemy(this));
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

        if (!game.gameOver) {
            requestAnimationFrame(animate);
        }
    }

    animate(0);
}