var CARWIDTH = 70;
var CARHEIGHT = 100;

class GameWindow{
    constructor(){
        this.width = null;
        this.height = null;
        this.context = null;
        this.drawGameWindow();
        this.playCar =  new Car(270,500,this.context);
    }
    
    drawGameWindow(){
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    drawLane(positionX){
        this.context.setLineDash([5, 3]);
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        this.context.moveTo(positionX,0);
        this.context.lineTo(positionX,600);
        this.context.stroke();
    }
}


class Car{
    constructor(x,y,ctx){
        this.x = x;
        this.y = y;
        this.context = ctx;
        this.draw();
    }

    draw(){
        var img = new Image();
        img.src = './images/2.png';
        console.log(img);
        var that=this
        img.onload = function () {
            that.context.drawImage(img, that.x, that.y, CARWIDTH, CARHEIGHT);
        };
    }


}


var newGame = new GameWindow();


