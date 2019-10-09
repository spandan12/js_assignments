// var DIRECTION = [-5,-4,-3,3,4,5];
var DIRECTION = [-5,-4,-3,3,4,5];
var MAXSPEED = 3;
var WIDTHS = [59,60];
var MASS = [40,50];
var MAXWIDTH = 1200-120;
var MAXHEIGHT = 1000-120;
var COLORS = ['red', 'green', 'blue'];
var urlstr;
function randomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
class Box {
    constructor(parentElement, radius){
        this.parentElement=parentElement;
        this.boxX=0;
        this.boxY=0;
        this.index = randomNumber(0,COLORS.length);
        this.mass = MASS[this.index];
        this.dx = 0;
        this.dx = 0;
        this.radius = radius;
        
    }

    create(){
        this.boxX = randomNumber(0,MAXWIDTH);
        this.boxY = randomNumber(0,MAXHEIGHT);
        this.boxElement = document.createElement('div');
        this.boxElement.style.height = this.radius + 'px';
        this.boxElement.style.width  = this.radius + 'px';
        this.boxElement.classList.add('BoxStyle');
        // this.boxElement.style.backgroundColor = COLORS[this.index] + '';
        this.boxElement.style.left = this.boxX + 'px';
        this.boxElement.style.top = this.boxY + 'px'; 
        
        this.parentElement.appendChild(this.boxElement);
        return this.boxElement;
    }


    setDirection(a,b){
        this.dx = DIRECTION[a];
        this.dy = DIRECTION[b];
    }

    reverseXDirection(){
        this.dx *= -1;
    }

    reverseYDirection(){
        this.dy *= -1;
    }


    ChangeVelocity(box){
        // var tempSpeed1 = this.XSpeed;
        var change1 = this.dx * (this.radius / box.radius);
        this.dx = box.dx * (box.radius / this.radius);

        box.dx = change1;

        change1 = this.dy * (this.radius / box.radius);
        this.dy = box.dy * (box.radius / this.radius);
        box.dy = change1;

        this.move();
        box.move();

    }

    draw(){
        this.boxElement.style.left = this.boxX + 'px';
        this.boxElement.style.top = this.boxY + 'px';
    }

    move(){
        
        this.boxX += this.dx;
        this.boxY += this.dy;
        this.draw();
    }

    isXWallCollision(){
        if(((this.boxX + (2*this.radius)) >= 1260) || ((this.boxX) <=0) ){
            return true;
        }
        else{
            return false;
        }
    }


    isYWallCollision(){
        if(((this.boxY + (2*this.radius)) >= 1050) || ((this.boxY) <=0) ){
            return true;
        }
        else{
            return false;
        }
    }


}

class Game{
    constructor(parentElement, noOfBoxes){
        this.parentElement = parentElement;
        this.noOfBoxes = noOfBoxes;
        this.boxes = [];
        this.createBoxes();
        this.Scorecount = 0;
        this.smash();

    }

    createBoxes(){
        for(var i = 0; i < this.noOfBoxes; i++) {
            var randWidth = randomNumber(0,WIDTHS.length);
            var box = new Box(this.parentElement,WIDTHS[randWidth]);
            var DomBox=box.create();
            var rand1 = randomNumber(2,5);
            var rand2 = randomNumber(2,5);
            box.setDirection(rand1,rand2);
            // box.setSpeed(3,3);
            this.boxes.push(box);
            // var that = this;
            // this.setOnClick();
        
                        
            }
    }
    
    smash(){
        // console.log(this.parentElement.children);
        var DOMboxes = this.parentElement.children;
        for( let y= 0; y< DOMboxes.length ; y++ ){
            DOMboxes[y].onclick =  function(){
                    this.boxes.splice(y,1);
                    this.parentElement.removeChild(DOMboxes[y]);
                    this.Scorecount++;
                    console.log(this.Scorecount);
                        // console.log(this.Scorecount);
                }.bind(this);
        }
    }

    showScore(){
        document.getElementById('score-wrapper').innerHTML = 'Score: ' + this.Scorecount;
    }

    // setOnClick(){
    //     var that = this;
    //     console.log(this.boxes);
    //     // console.log(index);
    //     for(let y = 0; y<that.noOfBoxes; y++){
    //         that.boxes[0].onclick = function(){
    //             console.log('hurray');
    //         }
    //     }
        
    // } 



    detectCollision(box1,box2){
        var radiusSum = (box1.radius/2) + (box2.radius/2);
        var x1 = box1.boxX + (box1.radius/2);
        var x2 = box2.boxX + (box2.radius/2);
        var y1 = box1.boxY + (box1.radius/2);
        var y2 = box2.boxY + (box2.radius/2);
        var distance = (x1- x2) * (x1 - x2) + (y1-y2) * (y1-y2);
        var radiusSquare = radiusSum * radiusSum;
        
        if(distance <= radiusSquare){
            // console.log(true);
            return true;
        }
        else{
            return false;
        }
    }

    detectAllCollision(){
            for(var k=0; k <(this.boxes.length); k++){
                for(var j=0; j<(this.boxes.length);j++){
                    if(k != j){
                        if(this.detectCollision(this.boxes[k],this.boxes[j])){
                            this.boxes[k].ChangeVelocity(this.boxes[j]);
                        }
                    }
                }
    
            }
    }

    moveBoxes(){
        var that=this;
        var Interval = setInterval(function(){
            for(var i = 0; i < that.boxes.length; i++) {
                

                if(that.boxes[i].isXWallCollision()){
                    that.boxes[i].reverseXDirection();
                    // that.boxes[i].reverseYDirection();
                }
                if(that.boxes[i].isYWallCollision()){
                    // that.boxes[i].reverseXDirection();
                    that.boxes[i].reverseYDirection();
                }
                that.boxes[i].move();
            }  
            that.smash();
            that.showScore();
            that.detectAllCollision();
        }, 50);
    }

}

var parent = document.getElementsByClassName('main-wrapper')[0];
var newGame = new Game(parent,20);
newGame.moveBoxes();