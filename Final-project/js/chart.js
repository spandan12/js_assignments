class ScatterPlot{
    constructor(Id, width, height, data, XAxis, YAxis){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.setAttribute('id',Id);
        this.wrapper = document.getElementsByClassName('main-wrapper')[0];
        this.wrapper.insertBefore(this.canvas, this.wrapper.childNodes[0]);
        Object.assign(this.canvas.style,{
            backgroundColor: 'rgb(210, 224, 231)',
        });
        this.counter = 0;
        this.canvas.width = width;
        this.canvas.height = height;
        this.height = height;
        this.width = width;
        this.algorithm = 'kMeans';

        this.controller = new DataController(data);
        this.kMeans = new KMeansAlgorithm(data, VALUE_OF_K, this.controller);
        this.valueOfK = this.kMeans.getValueOfK();
        this.zoomCounter = 0;
        
        this.dbScan = new DBSCAN(data, EPSILON, MIN_POINTS, this.controller);

        this.assignedCentroids = this.kMeans.getAssignedCentroid();
        this.outline = new chartOutline(this.context, width, height, XAxis, YAxis, this.controller);
        this.dataPlot = new DataPlot(this.context, XAxis, YAxis, this.controller, this.outline, this.assignedCentroids);
        this.zoomEffects = new ZoomEffect(this.context, this.canvas,this.kMeans, this.controller, this.dataPlot, this.outline, data, XAxis, YAxis, this.sideLegend,this.assignedCentroids);
        
        this.sideLegend = new SideLegend( this.valueOfK, this.zoomEffects, this.kMeans);
    }

    getCurrentState(){
        let currentState = this.zoomEffects.currentState;

        return currentState;

    }

    setAlgorithm(algorithm){
        this.algorithm = algorithm;
        
    }

    setAssignedCentroids(){
        if(this.algorithm == 'kMeans'){

            this.assignedCentroids = this.kMeans.getAssignedCentroid();
            this.noOfClusters = this.kMeans.getValueOfK();
            this.sideLegend.updateAlgorithm('kMeans');
        }
        else if(this.algorithm == 'DBSCAN'){
            this.assignedCentroids = this.dbScan.getAssignedClusters();
            this.noOfClusters = this.dbScan.getClustersNumber();
            this.sideLegend.update();
            this.sideLegend.updateZoomEffects(this.zoomEffects);
            this.sideLegend.updateAlgorithm('DBSCAN');
            // this.sideLegend.update();
        }
    }

    setData(dataset){
        if( dataset == 'iris'){ 
            this.data = DATA_DETAILS[2][0];
            this.XAxis = DATA_DETAILS[2][1];
            this.YAxis = DATA_DETAILS[2][2];
        }

        else if( dataset == 'spiral'){
            this.data = DATA_DETAILS[4][0];
            this.XAxis = DATA_DETAILS[4][1];
            this.YAxis = DATA_DETAILS[4][2];
        }
        this.updateDataset();

    }

    updateDataset(){
        this.controller = new DataController(this.data);
        this.kMeans = new KMeansAlgorithm(this.data, VALUE_OF_K, this.controller);
        
        this.dbScan = new DBSCAN(this.data, EPSILON, MIN_POINTS, this.controller);
        this.setAssignedCentroids();
        this.outline = new chartOutline(this.context, this.width, this.height, this.XAxis, this.YAxis, this.controller);
        this.dataPlot = new DataPlot(this.context, this.XAxis, this.YAxis, this.controller, this.outline, this.assignedCentroids);
        this.sideLegend.updateKMeans(this.kMeans);
        
        this.zoomEffects = new ZoomEffect(this.context, this.canvas,this.kMeans, this.controller, this.dataPlot, this.outline, this.data, this.XAxis, this.YAxis, this.sideLegend,this.assignedCentroids);
        this.sideLegend.updateZoomEffects(this.zoomEffects);
        this.sideLegend.updateClusterNumber(this.noOfClusters);
        this.sideLegend.update(this.algorithm);
        // this.sideLegend.remove();
        // this.sideLegend.drawLegends();

    }


    render(){       
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.zoomEffects.setAssignedCentroids(this.assignedCentroids);
        this.zoomEffects.update();
        
        this.sideLegend.updateClusterNumber(this.noOfClusters);
        this.sideLegend.update(this.algorithm);
        this.dataPlot.updateAssignedCentroids(this.assignedCentroids);
        
    }

}