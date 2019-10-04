var MAXWIDTH = 800-20;
var MAXHEIGHT = 500-20;
var DIRECTION = [1,-1];
var MAXSPEED = 10;
var COLORS = ['red', 'green', 'blue', 'black', 'grey'];

function randomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
class Box {
    constructor(parentElement){
        this.parentElement=parentElement;
        this.boxX=0;
        this.BoxY=0;

    }

    create(){
        this.boxX = randomNumber(0,MAXWIDTH);
        this.boxY = randomNumber(0,MAXHEIGHT);
        this.boxElement = document.createElement('div');
        this.boxElement.classList.add('BoxStyle');
        console.log
        this.boxElement.style.backgroundColor = COLORS[randomNumber(0,COLORS.length)] + '';
        this.boxElement.style.left = this.boxX + 'px';
        this.boxElement.style.top = this.boxY + 'px'; 
        this.parentElement.appendChild(this.boxElement);
    }

    draw(){
        this.boxElement.style.left = this.boxX + 'px';
        this.boxElement.style.top = this.boxY + 'px';
    }

    move(){
        var rand1= randomNumber(0,2);
        var rand2=randomNumber(0,2);
        this.boxX += DIRECTION[rand1] * randomNumber(1,MAXSPEED+1);
        this.boxY += DIRECTION[rand2] * randomNumber(1,MAXSPEED+1);
        this.draw();
    }
}

class Game{
    constructor(parentElement, noOfBoxes){
        this.parentElement = parentElement;
        this.noOfBoxes = noOfBoxes;
        this.boxes = [];
        this.createBoxes();
    }

    createBoxes(){
        for(var i = 0; i < this.noOfBoxes; i++) {
            var box = new Box(this.parentElement);
            box.create();
            this.boxes.push(box);
        }
    }

    moveBoxes(){
        var that=this;
        var Interval = setInterval(function(){
            for(var i = 0; i < that.noOfBoxes; i++) {
                that.boxes[i].move();
            }  
        }, 200);
    }
}

var parent = document.getElementsByClassName('main-wrapper')[0];
var newGame = new Game(parent,50);
// newGame.moveBoxes();