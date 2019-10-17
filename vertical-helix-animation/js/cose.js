class cosWave{
    constructor(context,offset){
        this.context = context;
        this.startPositionX = 102;
        this.startPositionY = 250;

        this.finishPositionX = 464;
        this.offset =offset;
        this.CosX = [];
        this.CosY = [];
        this.xchanged = 360;
        this.changeAngle =0;
    }

    drawCosWave(){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=4){
            let temp = (i* Math.PI)/180 + this.changeAngle;
            this.CosX[i] = i;
            this.CosY[i] = (Math.cos(temp))* 50 + 250+ this.offset+ this.oscillateOffset;
            this.context.beginPath();
            this.context.fillStyle = 'black';
            this.context.fillRect(this.CosX[i], this.CosY[i], 2,2);
        }
    }

    drawLinesBetween(cosWave){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=4){
            this.context.moveTo(this.CosX[i], this.CosY[i]);
            this.context.lineTo(cosWave.CosX[i], cosWave.CosY[i]);
            this.context.stroke();
        }
    }

    Oscillate(){
        if(this.xchanged == 0){
            this.xchanged = 360;
        }
        // this.changeAngle ++;
        this.xchanged -= 5;
        let degree = (Math.PI * this.xchanged)/180;
        this.oscillateOffset = 20 * Math.sin(degree);
        this.drawCosWave();
    }
}