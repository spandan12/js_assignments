
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
    }

    updateAssignedCentroids(assignedCentroids){
        this.assignedCentroids = assignedCentroids;
    }

    lightenDarkenColor(col, amt) {
  
        var usePound = false;
      
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
     
        var num = parseInt(col,16);
     
        var r = (num >> 16) + amt;
     
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
     
        var b = ((num >> 8) & 0x00FF) + amt;
     
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
     
        var g = (num & 0x0000FF) + amt;
     
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
     
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
      
    }


    draw(isCluster, clusterValue){

        for(let i = 0; i < this.xDataPoints.length; i++){
            let scaling = this.outline.getScaling();
            let offset = this.outline.getOffset();
            let extremes = this.outline.getResultExtremes();
            let k1 = (this.xDataPoints[i] - extremes[0]) ;
            let k2 = (this.yDataPoints[i] - extremes[1]) ;
            if(isCluster == 1){
                let x =  k1 * scaling[0] + offset[0];
                let y = -k2 * scaling[1] + offset[1];
                let colorSelector = clusterValue; 
                this.plotSinglePoint(x, y, COLORS[colorSelector]);
            }
            else if(isCluster == 2){
                let x =  k1 * scaling[0] + offset[0];
                let y = -k2 * scaling[1] + offset[1];
                let colorSelector = this.assignedCentroids[i]; 
                let color = COLORS[colorSelector];
                if(this.assignedCentroids[i] != clusterValue){
                    color = this.lightenDarkenColor(color, 80);
                    // color = COLORS[colorSelector + 3];
                }

                this.plotSinglePoint(x, y, color);    
            }
            
            else if(isCluster == 0){
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
        this.context.arc(x, y, 2, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    }
    
}