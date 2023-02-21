export class FloatingText {
    constructor(value, x, y, posX, posY) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.posX = posX;
        this.posY = posY;
        this.isDeleted = false;
        this.timer = 0;
    }

    update() {
        this.y += (this.posY - this.y) * 0.03;

        this.timer++;

        if (this.timer > 100) {
            this.isDeleted = true;
        }
    }

    draw(context) {
        context.font = '30px Yanone Kaffeesatz';
        context.fillStyle = 'rgba(255, 255, 255, .5)';
        context.fillText(this.value, this.x, this.y);
    }
}