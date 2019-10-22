class DataPlot{
    constructor(context,data, xAxis, yAxis, controller, outline){
        this.context = context;
        this.data = data;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.controller = controller;
        this.outline = outline;
        this.xDataPoints = this.controller.actualData(this.xAxis);
        this.yDataPoints = this.controller.actualData(this.yAxis);
    }


    draw(){
        for(let i=0; i<this.xDataPoints.length; i++){
            let scaling = this.outline.getScaling();
            let offset = this.outline.getOffset();
            let mostSignificant = this.outline.getMostSignificant();
            // console.log(scaling);
            let x = this.xDataPoints[i] * mostSignificant[0] * scaling[0] + offset[0];
            let y = -this.yDataPoints[i] * mostSignificant[1] * scaling[1] + offset[1];
            // console.log(mostSignificant);
            // console.log(x,y, this.xDataPoints[i], this.yDataPoints[i]);
            this.plotSinglePoint(x, y, 'red');
        }      
    }

    plotSinglePoint(x,y,color){
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 2, 2);
    }
    




}