var CARWIDTH = 70;
var CARHEIGHT = 100;
var COUNT = 0;
function randomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class GameWindow{
    constructor(){
        this.moveInterval = null;
        this.updateInterval = null;
        this.obstacleInterval = null;
        this.score = 0;
        this.width = null;
        this.height = null;
        this.canvas = null;
        this.context = null;
        this.drawGameWindow();
        this.bgTop =  0;
        this.moveRoad();
        this.playCar =  new playCar(1,500,this.context,false);
        this.obstacles = [];
        this.createObstacles();
        // this.obstable = new obstaleCar(2,0,this.context);
        this.updateCanvas();
    }
    
    drawGameWindow(){
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    moveRoad(){
        var that=this;
        this.moveInterval = setInterval(function(){
            that.bgTop += 2;  
            Object.assign(that.canvas.style,{
                backgroundPosition: `0 ${that.bgTop}px`, 
            });
            // console.log(that.bgTop);
        }, 50);
    }

    createObstacles(){
        var that=this;
        this.obstacleInterval = setInterval(function(){
            let index = randomNumber(0,3);
            let obstacle = new obstaleCar(index,0,that.context);
            that.obstacles.push(obstacle);
            // console.log(that.obstacles);
        }, 1000);
    }

    updateScore(){
        document.getElementById('score').innerHTML = 'Score: ' + this.score;
    }

    checkCollisions(){
        for(let i=0; i<this.obstacles.length; i++){
            if((this.obstacles[i].doesCollide(this.playCar))==true){
                this.gameOver();         
            }
        }      
    }


    removeObstacles(){
        for(var i=0; i<this.obstacles.length; i++){
            if(((this.obstacles[i].isOutOfCanvas())==true) && ((this.obstacles[i].doesCollide(this.playCar))==false)){
                this.score +=1; 
                this.obstacles.splice(i,1);     
            }
        } 

    }
    
    updateAllObstacles(){
        for(let i=0; i<this.obstacles.length; i++){
            this.obstacles[i].updateObstacle();
        }
    }

    updateCanvas(){
        var that=this;
        this.updateInterval = setInterval(function(){
            that.context.clearRect(0, 0, canvas.width, canvas.height);
            that.playCar.updatePlayCar();
            that.updateAllObstacles();
            that.checkCollisions();
            that.removeObstacles();
            that.updateScore();
        }, 1);
    }

    gameOver(){
        clearInterval(this.moveInterval);
        clearInterval(this.updateInterval);
        clearInterval(this.obstacleInterval);
        document.getElementById('text').style.display = 'block';
        document.getElementById('game-over').style.display = 'block';
    }
}


class Car{
    constructor(index,y,ctx){
        this.y = y;
        this.index = index;
        this.x = (this.index * 200) + 70;
        this.context = ctx;
        this.img = new Image();       
        
    }

}

class obstaleCar extends Car{
    constructor(index,y,ctx){
        super(index,y,ctx);
        this.drawObstacle();
    }


    drawObstacle(){
        
        var imgRN = randomNumber(1,5);
        this.img.src = `./images/obstacle${imgRN}.png`;
        var that=this;
        this.img.onload = function () {
            that.context.drawImage(that.img, that.x, that.y, CARWIDTH, CARHEIGHT);
        };  
    }

    move(){
        this.y += 1;
    }

    updateObstacle(){
        this.x = (this.index * 200) + 70;
        this.move();
        this.context.drawImage(this.img, this.x, this.y, CARWIDTH, CARHEIGHT);
    }

    doesCollide(car){
        // console.log(this.y);
       
        if(car.index==this.index){
            
            if(this.y >= 400){return true;}
            else{return false;}
        }
        else{return false;}
    }

    isOutOfCanvas(){
        if(this.y >= 550){
            return true;
        }
        else{
            return false;
        }
    }


}

class playCar extends Car{
    constructor(index,y,ctx){
        super(index,y,ctx);
        this.drawPlaycar();
        var that = this;
        this.img.src = './images/playcar2.png';
        var Interval = setInterval(function(){
            document.onkeydown = this.onkeyStroke.bind(this);
        }.bind(this), 1);
    }

    
    drawPlaycar(){
        var that=this;
        this.img.onload = function () {
            // console.log(that.x);
            that.context.drawImage(that.img, that.x, that.y, CARWIDTH, CARHEIGHT);
        };
    }

    updatePlayCar(){
        this.x = (this.index * 200) + 70;
        this.context.drawImage(this.img, this.x, this.y, CARWIDTH, CARHEIGHT);
    }

    onkeyStroke(e){
        e = e || window.event;
        if (e.keyCode == '37') {
            if(this.index == 1){
                this.index = 0;    
            }
            else if(this.index == 2){
                this.index = 1;    
            }
            
        }
        else if (e.keyCode == '39') {
            if(this.index == 1){
                this.index = 2;    
            }
            else if(this.index == 0){
                this.index = 1;   
            }
        }
            
    }
    
}

function startGame(){
    document.getElementById('text').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';
    let newGame = new GameWindow();

}





