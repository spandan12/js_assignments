class ZoomEffect{
    constructor(context, canvas, kMeans, controller, dataPlot, outline, data, xAxis, yAxis, sideLegend, assignedCentroidss){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.kMeans = kMeans;
        this.controller = controller;
        this.canvas.onclick = this.clickEvent.bind(this);
        this.canvas.onmousemove = this.hoverEvent.bind(this); 
        this.canvas.ondblclick = this.doubleClickEvent.bind(this);
        this.currentState = 'ZoomOut';
        this.centroids = this.kMeans.getCentroids();
        this.assignedCentroid = assignedCentroidss;
        this.outline = outline;
        this.dataPlot = dataPlot;
        this.data = data;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.clusterDataPlot = null;
        this.clusterOutline = null;
        this.lowerextremes = this.outline.getLowerExtremePoints();
        this.upperextremes = this.outline.getHigherExtremePoints();
        this.crossImage = new Image();
        this.crossImage.src = './images/cross.png';
        this.sideLegend = sideLegend;
        this.previousCluster = null;
    }

    setAssignedCentroids(aCentroids){
        this.assignedCentroid = aCentroids;
    }

    getDistance(x1,y1, x2, y2){
        let squaredDistance = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);

        return squaredDistance;
    }

    isNear(distance){
        let delta = 1;
        if(distance <= delta){
            return true;
        }
        else{
            return false;
        }
    }


    calculateDistance(x, y, centroid){
        let squaredDistance = Math.pow((x - centroid[0]), 2) + Math.pow((y - centroid[1]), 2);
        
        return squaredDistance;
    }

    update(){
        switch(this.currentState) {
            
            case 'ZoomOut':
                this.outline.draw(false);
                this.dataPlot.draw(0, 0);
                break;
            case 'ZoomIn':

                this.clusterOutline.draw(true);
                this.clusterDataPlot.draw(1, this.assignedCluster);
                this.drawCrossPoint();
                break;

            case 'Hovered':
                this.outline.draw(false);
                this.dataPlot.draw(2, this.assignedCluster);
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

    hoverEvent(e){
        let x = e.clientX - OFFSET_X;
        let y = e.clientY - OFFSET_Y;
        if(this.currentState == 'ZoomOut' && this.isCanvasPoint(x, y) == true){
            
            let actualPoints = this.findactualPoint(x,y);
            this.assignedCluster = this.findCluster(actualPoints[0], actualPoints[1]);
            if(this.assignedCluster == -1){
               this.currentState = 'ZoomOut';
            }
            else{
                this.previousCluster = this.assignedCluster;
                this.currentState = 'Hovered';
                
            }
            
        }
        if(this.currentState == 'Hovered'){
            let actualPoints = this.findactualPoint(x,y);
            this.assignedCluster = this.findCluster(actualPoints[0], actualPoints[1]);
            if(this.assignedCluster == -1){
               this.currentState = 'ZoomOut';
            }
            else{
                if(this.previousCluster != this.assignedCluster){
                    this.currentState = 'ZoomOut';
                }
                    
                
            }
        }
        
    }

    doubleClickEvent(event){
        let x = event.pageX - OFFSET_X;     
        let y = event.pageY - OFFSET_Y;
        if(this.currentState == 'ZoomIn'  && this.isCanvasPoint(x, y) == true){
            this.currentState = 'ZoomOut';
        }

    }

    clickEvent(event){
        let x = event.pageX - OFFSET_X;     
        let y = event.pageY - OFFSET_Y;

        if((this.currentState == 'ZoomOut' || this.currentState == 'Hovered')  && this.isCanvasPoint(x, y) == true){
            
            let actualPoints = this.findactualPoint(x,y);
            this.assignedCluster = this.findCluster(actualPoints[0], actualPoints[1]);
            if(this.assignedCluster == -1){
               this.currentState = 'ZoomOut';
            }
            else{
                this.currentState = 'ZoomIn';
           
                let clustersData = this.findClusterPoints(this.assignedCluster);

                let clusterController = new DataController(clustersData);
                this.clusterOutline = new chartOutline(this.context, this.width, this.height, this.xAxis, this.yAxis, clusterController);
                this.clusterOutline.setZoomOutExtreme(this.lowerextremes, this.upperextremes);
                this.clusterDataPlot = new DataPlot(this.context, this.xAxis, this.yAxis, clusterController, this.clusterOutline, this.assignedCentroids);
            }
            
        }

        else if(this.currentState == 'ZoomIn'){
            if((x >= this.width-IMAGE_SIZE) && (x<= this.width) && (y >= 0) && (y <= IMAGE_SIZE)){
                this.currentState = 'ZoomOut';
            }

        }
        
    }

    findactualPoint(x,y){
        let scaling = this.outline.getScaling();
        let offset = this.outline.getOffset();
        let actualpoints = [];
        actualpoints[0] = ((x - offset[0]) / scaling[0]) + this.lowerextremes[0];
        actualpoints[1] = ( -1 * (y - offset[1]) / scaling[1]) + this.lowerextremes[1]; 
        
        return actualpoints;
    }

    findCluster(x,y){
        let xdata = this.controller.actualData(this.xAxis);
        let ydata = this.controller.actualData(this.yAxis);
        let datalength = this.data.length;
        let closestDistance = this.getDistance(x, y, xdata[0], ydata[0]);
        let returnValue = this.assignedCentroid[0];
        for(let i = 0; i < datalength; i++){
            
            let distance = this.getDistance(x,y,xdata[i], ydata[i]);
            if(distance < closestDistance){
                
                closestDistance = distance;
                returnValue = this.assignedCentroid[i];
            }
        }
        return returnValue;
    

    }

    // findCluster(x, y){
    //     let valueOfK = this.kMeans.getValueOfK();
    //     let assignedCluster = 0;
    //     let refDistance = this.calculateDistance(x, y, this.centroids[0]);
    //     for(let i = 0; i < valueOfK; i++){
    //         let tempDistance = this.calculateDistance(x, y, this.centroids[i]);
    //         if(tempDistance < refDistance){
    //             refDistance = tempDistance;
    //             assignedCluster = i;
    //         }           
    //     }
    //     let length = this.findClusterPoints(assignedCluster).length;
        
    //     let meanDistance = (this.kMeans.getIndividualSSE(assignedCluster))/length;
    //     if(refDistance < meanDistance){
    //         return assignedCluster;
    //     }

    //     else{
    //         return -1;
    //     }
        
    // }

    findClusterPoints(index){
        let clusterPoints = [];
        
        for(let i = 0; i< this.assignedCentroid.length; i++){
            if(index == this.assignedCentroid[i]){
                clusterPoints.push(this.data[i]);
            }
        }
        return clusterPoints;
    }


    drawCrossPoint(){
        this.context.drawImage(this.crossImage, this.width - IMAGE_SIZE, 0, IMAGE_SIZE,IMAGE_SIZE); 
    }

    getState(){

        return this.currentState;
    }

    getclickedCluster(){
        
        return this.assignedCluster;
    }

}
    