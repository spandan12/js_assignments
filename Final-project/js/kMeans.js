class KMeansAlgorithm{
    constructor(data, k, controller){
        this.data = data;
        this.valueOfK = k;
        this.controller = controller;
        this.dataLength = this.controller.getDataLength();
        
        this.attributes = Object.keys(this.data[0]);
        this.noOfIterations = 0;

        //find extreme points of both attributes
        this.xDataPoints = this.controller.actualData(this.attributes[0]);
        this.yDataPoints = this.controller.actualData(this.attributes[1]);
        this.centroids = [];
        this.defineCentroids();
        this.assigedCentroid = [];
        this.sumofSqauredError = 0;
        this.LoopAlgorithm();
    }

    randomNumber(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //randomly assign k-centroid points to any of the data points
    defineCentroids(){
        for(let i = 0; i < this.valueOfK; i++){
            let rand1 = this.randomNumber(0, this.dataLength);
            // let rand2 = this.randomNumber(0, this.dataLength);
            // console.log(rand2);
            let centroid = [this.xDataPoints[rand1], this.yDataPoints[rand1]];
            this.centroids.push(centroid);   
        }
        // console.log(this.centroids);
    }

    calculateDistance(index, centroid){
        let squaredDistance = Math.pow((this.xDataPoints[index] - centroid[0]), 2) + Math.pow((this.yDataPoints[index] - centroid[1]), 2);
        return squaredDistance;
    }

    assignToCentroid(){
        for(let i = 0; i < this.dataLength; i++){
            
            let refDistance = this.calculateDistance(i, this.centroids[0]);
            this.assigedCentroid[i] = 0;
            this.assigedCentroid[i] = 0;
            for(let j = 0; j < this.valueOfK; j++){
                // let tempPoint = [this.xDataPoints[i], this. yDataPoints[i]
                let tempDistance = this.calculateDistance(i, this.centroids[j]);
                if(tempDistance < refDistance){
                    refDistance = tempDistance;
                    this.assigedCentroid[i] = j;
                }
            }     
        }
    }

    recomputeCentroids(){

        //define total sum and count for calculating centroids of each cluster
        let xtempCentroid = [];
        let ytempCentroid = [];
        let tempCount = [];
        let centroid = [];
        for(let j = 0; j < this.valueOfK; j++){ 
            xtempCentroid[j] = 0;
            ytempCentroid[j] = 0;
            tempCount[j] = 0;  
        }
        
        //calculate sum and count for computing centroid
        for(let i = 0; i < this.dataLength; i++){
            let assignedValue = this.assigedCentroid[i];
            xtempCentroid[assignedValue] += this.xDataPoints[i];
            ytempCentroid[assignedValue] += this.yDataPoints[i];
            tempCount[assignedValue] += 1;
        }

        //compute centroid
        for(let j = 0; j < this.valueOfK; j++){
            if(tempCount[j] == 0){
                centroid[j] = this.centroids[j];
            }
            else{
                centroid[j] = [(xtempCentroid[j] / tempCount[j]), (ytempCentroid[j] / tempCount[j])];
            }
            
        }
        this.centroids = centroid;
    }

    hasCentroidsChanged(centroid1, centroid2){
        let delta = 0.000001;
        let changed = false;
        for(let i = 0; i< this.valueOfK; i++){
            if((Math.abs(centroid1[i][0] - centroid2[i][0])) >= delta){
                changed = true;
                break;
            }
            else if((Math.abs(centroid1[i][1] - centroid2[i][1])) >= delta){
                changed = true;
                break;
            }
        }   
        
        return changed;

    }

    LoopAlgorithm(){
        // let noOfIterations = 0;
        let tempCentroid =  [];
        for(let j = 0; j < this.valueOfK; j++){ 
            tempCentroid[j] = [0,0];  
        }
        
        // console.log(this.assigedCentroid);
        let loopCondition = null;
        do{
            this.noOfIterations++;
            this.assignToCentroid();
            tempCentroid = [...this.centroids];
            this.recomputeCentroids();   
            loopCondition = this.hasCentroidsChanged(tempCentroid, this.centroids);
            // console.log(tempCentroid, this.centroids, loopCondition, noOfIterations);
        }while( loopCondition == true);

        // console.log(this.getSumofSquaredError());
    }

    getAssignedCentroid(){
        // console.log(this.assigedCentroid);
        
        return this.assigedCentroid;
    }

    getIndividualSSE(clusterNumber){
        // console.log(this.centroids);
        let SSE = 0;
        for(let j = 0; j < this.dataLength; j++){
            if(this.assigedCentroid[j] == clusterNumber){
                SSE += this.calculateDistance(j, this.centroids[clusterNumber]);
            }
            
        }  
        
        return SSE;     
    }


    getSumofSquaredError(){
        // let SSE = 0;
        for(let i = 0; i < this.valueOfK; i++){
            this.sumofSqauredError += this.getIndividualSSE(i);
        }

        return this.sumofSqauredError;
    }

    getCentroids(){
        
        return this.centroids;
    }

    getValueOfK(){
        return this.valueOfK;
    }

    getNoOfIterations(){

        return this.noOfIterations;
    }

    

}