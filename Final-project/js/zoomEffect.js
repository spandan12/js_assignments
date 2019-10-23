class ZoomEffect{
    constructor(context, canvas, kMeans, controller, dataPlot, outline, data, xAxis, yAxis){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.kMeans = kMeans;
        this.controller = controller;
        this.canvas.onclick = this.clickEvent.bind(this); 
        this.currentState = 'ZoomOut';
        this.centroids = this.kMeans.getCentroids();
        this.assignedCentroid = this.kMeans.getAssignedCentroid();
        this.outline = outline;
        this.dataPlot = dataPlot;
        this.data = data;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        // this.clusterController = null;
        this.clusterDataPlot = null;
        this.clusterOutline = null;
        this.lowerextremes = this.outline.getLowerExtremePoints();
        this.upperextremes = this.outline.getHigherExtremePoints();
        // this.zoomOutExtremes = null;
    }


    calculateDistance(x, y, centroid){
        let squaredDistance = Math.pow((x - centroid[0]), 2) + Math.pow((y - centroid[1]), 2);
        
        return squaredDistance;
    }

    update(){
        switch(this.currentState) {
            case 'ZoomOut':
                this.outline.draw(false);
                this.dataPlot.draw(false, 0);
                break;
            case 'ZoomIn':

                this.clusterOutline.draw(true);
                this.clusterDataPlot.draw(true, this.assignedCluster);
                break;
          }
    };

    isCanvasPoint(x,y){

        if( (x >= LEFT_EXTREME * this.width) && (x <= RIGHT_EXTREME * this.width) && (y >= TOP_EXTREME * this.height) && (y <= BOTTOM_EXTREME * this.height)){
            return true;
        }
        
        else{
            return false;
        }
    }

    clickEvent(event){
        let x = event.pageX;     
        let y = event.pageY;
        console.log(x,y);

        if(this.currentState == 'ZoomOut'){
            this.currentState = 'ZoomIn';
            let actualPoints = this.findactualPoint(x,y);
            this.assignedCluster = this.findCluster(actualPoints[0], actualPoints[1]);
            // console.log(this.assignedCluster); 
            let clustersData = this.findClusterPoints(this.assignedCluster);

            let clusterController = new DataController(clustersData);
            this.clusterOutline = new chartOutline(this.context, this.width, this.height, this.xAxis, this.yAxis, clusterController);
            this.clusterOutline.setZoomOutExtreme(this.lowerextremes, this.upperextremes);
            this.clusterDataPlot = new DataPlot(this.context, this.xAxis, this.yAxis, clusterController, this.clusterOutline, this.assignedCentroids);
            // console.log(clusterController, this.clusterOutline, this.cluster)
            
        }
        
    }

    findactualPoint(x,y){
        let scaling = this.outline.getScaling();
        let offset = this.outline.getOffset();
        // let extremes = this.outline.getExtremePoints();
        let actualpoints = [];
        actualpoints[0] = ((x - offset[0]) / scaling[0]) + this.lowerextremes[0];
        actualpoints[1] = (-1 * (y - offset[1]) / scaling[1]) + this.lowerextremes[1]; 
        
        return actualpoints;
    }

    findCluster(x, y){
        let valueOfK = this.kMeans.getValueOfK();
        let assignedCluster = 0;
        let refDistance = this.calculateDistance(x, y, this.centroids[0]);
        for(let i = 0; i < valueOfK; i++){
            let tempDistance = this.calculateDistance(x, y, this.centroids[i]);
            if(tempDistance < refDistance){
                refDistance = tempDistance;
                assignedCluster = i;
            }           
        }
        return assignedCluster;
    }

    findClusterPoints(index){
        let clusterPoints = [];
        
        for(let i = 0; i< this.assignedCentroid.length; i++){
            if(index == this.assignedCentroid[i]){
                // console.log()
                clusterPoints.push(this.data[i]);
            }
        }
        return clusterPoints;
    }

    drawCrossPoint(){
        
    }

}
    