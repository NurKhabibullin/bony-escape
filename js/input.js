export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];

        window.addEventListener('keydown', e => {
            if ((e.key === 's' || e.key === 'w' || e.key === 'a' || e.key === 'd' 
                    || e.key === 'ф' || e.key === 'ц' || e.key === 'ы' || e.key === 'в' 
                    || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight'
                    || e.key === ' ') 
                    && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if (e.key === 'q' || e.key === 'й') {
                this.game.debug = !this.game.debug;
            }
        });
        
        window.addEventListener('keyup', e => {
            if (e.key === 's' || e.key === 'w' || e.key === 'a' || e.key === 'd'
                    || e.key === 'ф' || e.key === 'ц' || e.key === 'ы' || e.key === 'в' 
                    || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight'
                    || e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}  