class Layer {
    constructor(game, width, height, img) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.img = img;
        this.x = 0;
        this.y = 0;
    }

    draw(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

export class Bg {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layerImage1 = document.getElementById('bg');
        this.layer1 = new Layer(this.game, this.width, this.height, this.layerImage1);
        this.bgLayers = [this.layer1];
    }

    draw(context) {
        this.bgLayers.forEach(l => {
            l.draw(context);
        });
    }
}