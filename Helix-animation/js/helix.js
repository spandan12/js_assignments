class Helix{
    constructor(Id){
        this.startPositionX = 0;
        this.startPositionY = 250;

        this.finishPositionX = 800;

        this.SinX = [];
        this.CosX = [];

        this.SinY = [];
        this.CosY = [];
        this.Id = Id;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('canvas1', this.Id);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.width = '900';
        this.canvas.height = '500';
        this.context = this.canvas.getContext('2d');
        
        // this.context.translate(this.canvas.width/2, this.canvas.he)
        // this.context.rotate((90*Math.PI)/180);
        this.changeFlag = -1;
        this.counter = 0;
        this.changeAngleSine = 90;
        this.changeAngleCos = 0;
        this.drawSineWave();
        this.drawCosineWave();
        this.drawBetweenLines();       
    }

    drawSineWave(){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=4){
            let temp = (i* Math.PI)/180 - this.changeAngleSine;
            this.SinX[i] = i - this.changeAngleSine;
            this.SinY[i] = (Math.sin(temp))* 50 + 250;
            this.context.beginPath();
            this.context.fillStyle = '#FF0000';
            this.context.fillRect(this.SinX[i], this.SinY[i], 2,2);
        }
    }

    drawCosineWave(){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=4){
            let temp = (i* Math.PI)/180 + this.changeAngleCos;
            this.CosX[i] = i + this.changeAngleCos;
            this.CosY[i] = (Math.cos(temp))* 50 + 250;
            this.context.beginPath();
            this.context.fillStyle = '#FF0000';
            this.context.fillRect(this.CosX[i], this.CosY[i], 2,2);
        }   
    }

    drawBetweenLines(){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=4){
            this.context.moveTo(this.SinX[i], this.SinY[i]);
            this.context.lineTo(this.CosX[i], this.CosY[i]);
            this.context.stroke();
        }
    }

    AnimateHelix(){
        if(this.changeAngleSine ==90){
            this.changeFlag = -1;
        }

        else if(this.changeAngleSine == 0){
            this.changeFlag = 1;
        }

        if((this.counter % 10) ==0){
            this.changeAngleSine += this.changeFlag;
            this.changeAngleCos -= this.changeFlag;
        }

        this.counter++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawSineWave();
        this.drawCosineWave();
        this.drawBetweenLines();
        
    }
}