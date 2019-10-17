class CircleController{
    constructor(context){
        this.context = context;
        this.startPositionX = 0;
        this.finishPositionX = 180;
        this.SinX = [];
        this.SinY = [];
        this.circles = [];
        this.drawSineWave();

    }

    drawSineWave(){
        for(let i=this.startPositionX; i<this.finishPositionX; i+=50){
            let temp = (i* Math.PI)/180
            this.SinX[i] = i;
            this.SinY[i] = (Math.sin(temp))* 50 + 250;
            // console.log('hey');
            var circle = new Circle(this.context, i);
            this.circles.push(circle);
        }
    }

    update(){
        // console.log(this.circles.length);   
        for(let i=0; i< this.circles.length; i++){
            // console.log(;
            // this.context.clearRect(0, 0, canvas.width, canvas.height);
            this.circles[i].update();
        }
    }
}