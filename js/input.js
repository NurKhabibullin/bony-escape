export class InputHandler {
    constructor() {
        this.keys = [];

        window.addEventListener('keydown', e => {
            if ((e.key === 's' || e.key === 'w' || e.key === 'a' || e.key === 'd' 
                    || e.key === 'ф' || e.key === 'ц' || e.key === 'ы' || e.key === 'в' 
                    || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight'
                    || e.key === ' ') 
                    && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
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