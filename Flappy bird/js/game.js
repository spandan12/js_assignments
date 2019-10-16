class Game{
    constructor(){
        this.getGameWindow();
        this.drawBackground();
    }
    
    getGameWindow(){
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    drawBackground(){
        let image = new Image();
        image.src = '../images/sprite.png';
        this.context.drawImage(image,0,0,276,228,0,284);

    }
}