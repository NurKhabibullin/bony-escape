export class UI {
    constructor(game) {
        this.game = game;
        this.font = '30px Yanone Kaffeesatz';
        this.bonesImg = document.getElementById('bones');
        this.damageImg = document.getElementById('damage');
    }

    draw(context) {
        context.save();
        
        context.textAlign = 'left';

        context.font = `27px Yanone Kaffeesatz`;
        context.fillText('Time left: ' + ((this.game.maxTime * 0.001).toFixed(1) 
                        - (this.game.time * 0.001).toFixed(1)) + 's', 20, 40);

        context.font = this.font;
        context.fillStyle = '#000';

        // context.fillText('Bones: ' + this.game.bones, 20, 80);
        context.drawImage(this.bonesImg, 20, 60, 50, 25);
        context.fillText(this.game.bones, 80, 80);
        // context.fillText('Damage: ' + this.game.damage, 20, 200);
        for (let i = 0; i < this.game.damage; i++) {
            context.drawImage(this.damageImg, 30 * i + 20, 100, 25, 25);
        }
        
        if (this.game.gameOver) {
            context.textAlign = 'center';

            if (this.game.bones < 100) {
                context.fillStyle = '#500';
                context.font = `50px Yanone Kaffeesatz`;
                context.fillText('Game over!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.fillStyle = '#403';
                context.font = `40px Yanone Kaffeesatz`;
                context.fillText('But did you escape?..', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillStyle = '#050';
                context.font = `50px Yanone Kaffeesatz`;
                context.fillText('So good!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.fillStyle = '#483';
                context.font = `40px Yanone Kaffeesatz`;
                context.fillText('You escaped succefully! Doggy is free!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }

        context.restore();
    }
}