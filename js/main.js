import { InputHandler } from '../js/input.js';
import { Player } from '../js/player.js';

window.onload = function() {
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
        }
        
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime);
        }

        draw(context) {
            this.player.draw(context);
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