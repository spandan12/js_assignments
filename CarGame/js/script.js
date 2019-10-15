var CARWIDTH = 70;
var CARHEIGHT = 100;
var COUNT = 0;
var FPS = 60;
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
        this.score = [];
        this.score[0] = 0;
        this.bulletsCount = [];
        this.bulletsCount[0] = 0;
        this.width = null;
        this.height = null;
        this.canvas = null;
        this.context = null;
        this.drawGameWindow();
        this.bgTop =  0;
        this.moveRoad();
        this.obstacles = [];
        this.createObstacles();
        this.gameOverState = false;
        this.playCar =  new playCar(1,500,this.context, this.obstacles,this.score,this.bulletsCount); 
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
        }, 1000/FPS);
    }

    createObstacles(){
        var that=this;
        this.obstacleInterval = setInterval(function(){
            let index = randomNumber(0,3);
            let obstacle = new obstaleCar(index,0,that.context);
            that.obstacles.push(obstacle);
            // console.log(that.obstacles);
        }, 1300);
    }

    updateScore(){
        document.getElementById('score').innerHTML = this.score[0];
        document.getElementById('bullets').innerHTML = "Bullets: " + (10 - this.bulletsCount[0]);
    }

    checkCollisions(){
        for(let i=0; i<this.obstacles.length; i++){
            if((this.obstacles[i].doesCollide(this.playCar))==true){
                this.gameOver();         
            }
        }      
    }


    removeObstacles(){
        for(let i=0; i<this.obstacles.length; i++){
            if(((this.obstacles[i].isOutOfCanvas())==true) && ((this.obstacles[i].doesCollide(this.playCar))==false)){
                this.score[0] +=1; 
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
        }, 1000/FPS);
    }

    gameOver(){
        clearInterval(this.moveInterval);
        clearInterval(this.updateInterval);
        clearInterval(this.obstacleInterval);
        // document.getElementById('text').style.display = 'block';
        document.getElementById('game-over').style.display = 'block';
        var that=this;
        this.obstacleInterval = setInterval(function(){
            location.reload();
        }, 1000);
        
    }
}

class Bullet{
    constructor(index, y, ctx){
        this.index = index;
        this.x = (this.index * 200) + 70 + (CARWIDTH/2);
        this.context = ctx;
        this.y = y;
        this.draw();
    }

    draw(){
        this.context.beginPath();
        this.context.fillStyle = '#FF0000';
        this.context.fillRect(this.x, this.y, 10, 10);
    }

    move(){
        this.y -= 2;
    }

    updateBullet(){
        this.move();
        this.draw();
    }

    isOutOfFrame(){
        if(this.y <= 0){
            return true;
        }
        else{
            return false;
        }
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
        this.y += 3;
    }

    updateObstacle(){
        this.x = (this.index * 200) + 70;
        this.move();
        this.context.drawImage(this.img, this.x, this.y, CARWIDTH, CARHEIGHT);
    }

    doesCollide(car){
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

    doesKill(bullet)
    {
        
        if((bullet.index == this.index) && ((this.y+CARHEIGHT)>= bullet.y)){
            return true;
        }

        else{
            return false;
        }

    }

}

class playCar extends Car{
    constructor(index,y,ctx,obstacles,score,bulletsCount){
        super(index,y,ctx);
        this.obstacles = obstacles;
        this.drawPlaycar();
        this.bullets = [];
        this.bulletsCount = bulletsCount;
        this.up = false;
        this.score = score;
        this.img.src = './images/playcar2.png';
        var Interval = setInterval(function(){
            document.onkeydown = this.onkeyStroke.bind(this);
        }.bind(this), 50);

        document.onkeypress = function(event){
            var pressedKey = event.key;
            if (pressedKey == ' ') {
                this.up = true;  
                var Timeout = setTimeout(function(){
                     this.up=false;
                }.bind(this),10 );
            }
        }.bind(this);

        this.createAllBullets();
        this.updateBullets();
        this.checkBulletKilled();

    }

    
    drawPlaycar(){
        var that=this;
        this.img.onload = function () {
            // console.log(that.x);
            that.context.drawImage(that.img, that.x, that.y, CARWIDTH, CARHEIGHT);
        };
    }

    createAllBullets(){
        var Interval1 = setInterval(function(){
            // console.log(this.score[0]);
            if((this.up == true) && (this.bulletsCount <= 9)){
                let newbullet = new Bullet(this.index, this.y, this.context);
                this.bullets.push(newbullet);
                this.bulletsCount[0]++;
                
            }     
        }.bind(this), 60);

    }
    
    updateBullets(){
        var Interval1 = setInterval(function(){
            for(let i=0; i<this.bullets.length; i++){
                this.bullets[i].updateBullet();
            }
            this.removeOutBullets();
        }.bind(this), 10);
    }
    
    removeOutBullets(){
        for(let i=0; i<this.bullets.length; i++){
            if(this.bullets[i].isOutOfFrame() == true){
                this.bullets.splice(i,1);
            }
        }
        
          
    }

    checkBulletKilled(){
        var Interval1 = setInterval(function(){
            if(this.bullets.length >= 1){
                for(let i=0; i<this.obstacles.length; i++){
                    for(let j=0; j<this.bullets.length; j++){
                        if(this.obstacles[i].doesKill(this.bullets[j]) == true){
                            this.bullets.splice(j,1);
                            this.obstacles.splice(i,1);
                            this.score[0] += 1; 
                            continue;
                        }
                    }
                }
            }
        }.bind(this), 5);
        
    }

    updatePlayCar(){
        this.x = (this.index * 200) + 70;
        this.context.drawImage(this.img, this.x, this.y, CARWIDTH, CARHEIGHT);
        // this.updateBullets();
    }
    
    onkeyStroke(e){
        e = e || window.event;
        // this.up = false;
        if (e.keyCode == '37') {
            // this.up = false; 
            if(this.index == 1){
                this.index = 0;                 
            }
            else if(this.index == 2){
                this.index = 1;    
            }
            
        }
        else if (e.keyCode == '39') {
            // this.up = false; 
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





