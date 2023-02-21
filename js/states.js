const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    DIVING: 4
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
    
}

export class Sitting extends State {
    constructor(game) {
        super('SITTING', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }

    handleInput(input) {
        if (input.includes('a') || input.includes('ф') || input.includes('ArrowLeft')
                || input.includes('d') || input.includes('в') || input.includes('ArrowRight')) {
            this.game.player.setState(states.RUNNING);
        } else if (input.includes('w') || input.includes('ц') || input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING);
        }
    }
}

export class Running extends State {
    constructor(game) {
        super('RUNNING', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }

    handleInput(input) {
        if (this.game.player.speed === 0) {
            this.game.player.setState(states.SITTING);
        } else if (input.includes('w') || input.includes('ц') || input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING);
        }
    }
}

export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game);
    }

    enter() {
        if (this.game.player.onGround()) {
            this.game.player.vy -= 25;
        }

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }

    handleInput(input) {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING);
        } else if ((input.includes('s') || input.includes('ы') || input.includes('ArrowDown')) 
                    && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING);
        }
    }
}

export class Falling extends State {
    constructor(game) {
        super('FALLING', game);
    }

    enter() {
        if (this.game.player.onGround()) {
            this.game.player.vy -= 20;
        }

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
    }

    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING);
        } else if ((input.includes('s') || input.includes('ы') || input.includes('ArrowDown')) 
                    && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING);
        }
    }
}

export class Diving extends State {
    constructor(game) {
        super('DIVING', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;

        this.game.player.vy = 15;   
    }

    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING);
        }
    }
}
