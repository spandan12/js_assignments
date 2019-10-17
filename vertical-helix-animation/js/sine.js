class sineWave{
    constructor(context,offset){
        this.context = context;
        this.startPositionX = 102;
        this.startPositionY = 250;

        this.finishPositionX = 464;
        this.offset =offset;
        this.SinX = [];
        this.SinY = [];
        this.oscillateOffset = 0;
        this.xchanged = 0;
        this.changeAngle = 90;
    }

    drawSineWave(){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=4){
            let temp = (i* Math.PI)/180-this.changeAngle;
            this.SinX[i] = i;
            this.SinY[i] = (Math.sin(temp))* 50 + 250+ this.offset + this.oscillateOffset;
            this.context.beginPath();
            this.context.fillStyle = 'black';
            this.context.fillRect(this.SinX[i], this.SinY[i], 2,2);
        }
    }

    drawLinesBetween(sineWave){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=4){
            this.context.moveTo(this.SinX[i], this.SinY[i]);
            this.context.lineTo(sineWave.SinX[i], sineWave.SinY[i]);
            this.context.stroke();
        }
    }

    Oscillate(){
        if(this.xchanged == 360){
            this.xchanged = 0;
        }
        this.xchanged += 5;
        // this.changeAngle --;
        let degree = (Math.PI * this.xchanged)/180;
        this.oscillateOffset = 20 * Math.sin(degree);
        this.drawSineWave();
    }

}