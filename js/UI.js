export class UI {
    constructor(game) {
        this.game = game;
        this.font = '30px Yanone Kaffeesatz';
        this.timerImg = document.getElementById('timer');
        this.bonesImg = document.getElementById('bones');
        this.damageImg = document.getElementById('damage');
    }

    draw(context) {
        context.save();
        
        context.textAlign = 'left';

        context.font = `27px Yanone Kaffeesatz`;

        context.font = this.font;
        context.fillStyle = '#fff';
        context.drawImage(this.timerImg, 25, 15, 40, 40);
        context.fillText((this.game.maxTime * 0.001).toFixed(1) - (this.game.time * 0.001).toFixed(1) + 's', 80, 40);

        

        // context.fillText('Bones: ' + this.game.bones, 20, 80);
        context.drawImage(this.bonesImg, 20, 60, 50, 25);
        context.fillText(this.game.bones, 80, 80);
        // context.fillText('Damage: ' + this.game.damage, 20, 200);
        for (let i = 0; i < this.game.damage; i++) {
            context.drawImage(this.damageImg, 30 * i + 20, 100, 25, 25);
        }
        
        if (this.game.gameOver) {
            context.textAlign = 'center';

            if (this.game.bones < 100 || this.game.time < this.game.maxTime) {
                context.fillStyle = 'rgb(255, 32, 32)';
                context.font = `50px Yanone Kaffeesatz`;
                context.fillText('Game over!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.fillStyle = 'rgb(255, 32, 32)';
                context.font = `40px Yanone Kaffeesatz`;
                context.fillText('But did you escape?..', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillStyle = 'rgb(107, 253, 54)';
                context.font = `50px Yanone Kaffeesatz`;
                context.fillText('So good!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.fillStyle = 'rgb(60, 224, 0)';
                context.font = `40px Yanone Kaffeesatz`;
                context.fillText('You escaped succefully! Doggy is free!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }

        context.restore();
    }
}