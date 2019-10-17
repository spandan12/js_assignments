class CircleController{
    constructor(context){
        this.context = context;
        this.startPositionX = 0;
        this.finishPositionX = 300;
        this.SinX = [];
        this.SinY = [];

        this.CosX = [];
        this.CosY = [];
        this.circles = [];
        

        this.drawCosWave(0);
        this.drawCosWave(30);
        this.drawCosWave(60);
        this.drawCosWave(90);

        this.drawSineWave(0);
        this.drawSineWave(30);
        this.drawSineWave(60);
        this.drawSineWave(90);
    }

    drawSineWave(offset){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=50){
            let temp = (i* Math.PI)/180;
            this.SinX[i] = i;
            this.SinY[i] = (Math.sin(temp))* 50 + offset;
            var circle = new Circle(this.context, i , this.SinY[i], 'pink', 'sine');
            this.circles.push(circle);
        }
    }

    drawCosWave(offset){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=50){
            let temp = (i* Math.PI)/180-180;
            this.CosX[i] = i;
            this.CosY[i] = (Math.sin(temp))* 50 + offset;
            var circle = new Circle(this.context, i , this.CosY[i],'red', 'cos');
            this.circles.push(circle);
        }
    }

    update(){
        for(let i=0; i< this.circles.length; i++){
            this.circles[i].update();
        }
    }
}