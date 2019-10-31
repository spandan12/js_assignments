class ChartController{
    constructor(){
        this.currentState = 'start';
        this.previousDataset = 'iris';
        this.algorithmSelected = 'kMeans';
        this.datasetSelected = 'iris';
        this.plot = new ScatterPlot('sample', CANVAS_WIDTH, CANVAS_HEIGHT, DATA_DETAILS[DATA_INDEX][0], DATA_DETAILS[DATA_INDEX][1], DATA_DETAILS[DATA_INDEX][2]);
        this.update();
    }

    getAlgorithmValue(){
        let optionIndex = document.getElementsByClassName('algorithm')[0];
        this.algorithmSelected = optionIndex.options[optionIndex.selectedIndex].value;
    }

    getDatasetValue(){
        let optionIndex = document.getElementsByClassName('dataset')[0];
        this.previousDataset = this.datasetSelected;
        this.datasetSelected = optionIndex.options[optionIndex.selectedIndex].value;
    }

    hasChanged(){
        if(this.previousDataset == this.datasetSelected){
            return false;
        }

        else{
            return true;
        }
    }

    update(){
        this.getAlgorithmValue();
        this.plot.setAlgorithm(this.algorithmSelected);
        this.plot.setAssignedCentroids();
        this.getDatasetValue();
        if(this.hasChanged() ){
            this.plot.setData(this.datasetSelected);
        }
        
        this.plot.render();
        requestAnimationFrame(this.update.bind(this));
        
    }

}