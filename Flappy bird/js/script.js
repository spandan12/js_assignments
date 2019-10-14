class GameWindow{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.context = null;
        this.drawGameWindow();
        this.
        this.playCar =  new Car(10,10,this.context);
    }
    
    drawGameWindow(){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.style.height = this.width + 'px';
        this.canvas.style.width  = this.height + 'px';  
    }


}


class Car{
    constructor(x,y,ctx){
        this.x = x;
        this.y = y;
        this.context = ctx;
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, 20,20); 
    }


}


var newGame = new GameWindow(600,650);


