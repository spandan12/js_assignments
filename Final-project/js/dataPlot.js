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
            let xScaledIncrement = mostSignificant[0] * scaling[0];
            let yScaledIncrement = mostSignificant[1] * scaling[1];
            let extremes = this.outline.getExtremePoints();
            let k1 = (this.xDataPoints[i] - extremes[0]) / mostSignificant[0];
            let k2 = (this.yDataPoints[i] - extremes[1]) / mostSignificant[1];
            let x =  k1 * xScaledIncrement + offset[0];
            let y = -k2 * yScaledIncrement + offset[1];
            // console.log(mostSignificant);
            // console.log(x, this.xDataPoints[i], k1);
            this.plotSinglePoint(x, y, 'red');
        }      
    }

    plotSinglePoint(x,y,color){
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.fillRect(x-2, y-2, 4, 4);
    }
    




}