import { InputHandler } from '../js/input.js';
import { Player } from '../js/player.js';
import { GroundEnemy, FlyingEnemy } from '../js/enemies.js';
import { UI } from '../js/UI.js';
import { Bg } from '../js/bg.js';
 
window.onload = function() {
    let pause = false, reload = false, gameSpeed = 0;

    let pauseButton = document.getElementById('pause');
    let reloadButton = document.getElementById('reload')

    pauseButton.addEventListener('click', () => {
        pause = !pause;
        
        if (pause) {
            pauseButton.innerHTML = 'Resume';
        } else {
            pauseButton.innerHTML = 'Pause';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            pause = !pause;

            if (pause) {
                pauseButton.innerHTML = 'Resume';
            } else {
                pauseButton.innerHTML = 'Pause';
            }
        }
    }, true);

    reloadButton.addEventListener('click', () => {
        if (!reload) {
            reloadButton.innerHTML = 'Reload';
            reload = true;
        } else {
            location.reload();
        }
    });

    let canvas = document.getElementById('canvas');
    canvas.id = 'canvas';

    const ctx = canvas.getContext('2d');

    canvas.width = 800, canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;

            this.pause = pause;
            this.debug = false;
            this.speed = gameSpeed;
            this.time = 0;
            this.maxTime = 90000;
            this.gameOver = false;
            this.bones = 0;
            this.damage = 3;
            this.floatingTexts = [];
            this.bg = new Bg(this);

            this.marginX = 0;
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
            if (pause || !reload) {
                this.speed = 0;
            } else {
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
            this.bg.draw(context);

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