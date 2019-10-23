const COLORS = ['red', 'green', 'blue', 'purple', 'yellow',  'orange', 'black'];

class DataPlot{
    constructor(context, xAxis, yAxis, controller, outline, assignedCentroids){
        this.context = context;
        // this.data = data;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.controller = controller;
        this.outline = outline;
        this.xDataPoints = this.controller.actualData(this.xAxis);
        this.yDataPoints = this.controller.actualData(this.yAxis);
        this.assignedCentroids = assignedCentroids;
        this.scalingFactor = 1;
    }


    draw(isCluster, clusterValue){
        if(isCluster && this.scalingFactor < 1){
            this.scalingFactor = 1;

        }

        // let assignedCluster = clusterValue;
        for(let i = 0; i < this.xDataPoints.length; i++){
            let scaling = this.outline.getScaling();
            let offset = this.outline.getOffset();
            let extremes = this.outline.getResultExtremes();
            let k1 = (this.xDataPoints[i] - extremes[0]) ;
            let k2 = (this.yDataPoints[i] - extremes[1]) ;
            // let scalingFactor = 0.1;
            if(isCluster){
                // if(this.scalingFactor < 1){
                //     this.scalingFactor += 0.1;

                // }
                let x =  k1 * this.scalingFactor * scaling[0] + offset[0];
                let y = -k2 * this.scalingFactor * scaling[1] + offset[1];
                let colorSelector = clusterValue; 
                this.plotSinglePoint(x, y, COLORS[colorSelector]);
            }
            else{
                let x =  k1 * scaling[0] + offset[0];
                let y = -k2 * scaling[1] + offset[1];
                let colorSelector = this.assignedCentroids[i]; 
                this.plotSinglePoint(x, y, COLORS[colorSelector]);    
            }     
        }      
    }

    plotSinglePoint(x,y,color){
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(x, y, 4, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    }
    
}