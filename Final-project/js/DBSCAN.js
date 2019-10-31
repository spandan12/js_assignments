class DBSCAN{
    constructor(data, epsilon, minPoints, controller){
        this.data = data;
        this.epsilon = epsilon;
        this.minPoints = minPoints;
        this.controller = controller;
        this.dataLength = this.data.length;

        this.attributes = Object.keys(this.data[0]);
        this.noOfIterations = 0;

        //get actual data points
        this.xDataPoints = this.controller.findNormalisedData(this.attributes[0]);
        this.yDataPoints = this.controller.findNormalisedData(this.attributes[1]);
        
        this.typeofElement = [];
        this.visited = [];
        this.notVisted = [];
        this.clusters = [];

        this.assignedClusters = [];
        this.loop();
       
    }

    calculateDistance(x1, y1, x2, y2){
        let squaredDistance = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
        
        return squaredDistance;
    }

    isInsideRadius(index1, index2){
        let squaredDistance = this.calculateDistance(this.xDataPoints[index1], this.yDataPoints[index1], this.xDataPoints[index2], this.yDataPoints[index2]);
        let squaredRadius = Math.pow(this.epsilon, 2);
        // console.log(squaredDistance, squaredRadius);
        if(squaredDistance <= squaredRadius){
            return true;
        }
        
        else{
            return false;
        }
    }

    findNotVisited(){
        for(let i = 0; i<this.dataLength; i++){
            this.notVisted.push(i);
            this.typeofElement[i] = 'nv';
        }
        
    }

    removeSpecificValue(val){
        this.notVisted = this.notVisted.filter(e => e !== val);
    }



    findCLusters(){

        while(this.notVisted.length != 0){
            let nextIndex = this.notVisted.shift();
            // console.log(nextIndex);
            this.typeofElement[nextIndex] = 'v';
            this.visited.push(nextIndex);
            let cArray = new ClusterArray();
            cArray.addValue(nextIndex);
            this.clusters.push(cArray);
            let clusterQueue = [nextIndex];
            while(clusterQueue.length != 0){
                let firstElement = clusterQueue.pop();
                
                for( let i = 0; i < this.dataLength; i++){
                    if( this.typeofElement[i] == 'nv' ){
                        if(this.isInsideRadius(i, firstElement) == true){
                            cArray.addValue(i);
                            clusterQueue.push(i);
                            this.removeSpecificValue(i);
                            this.typeofElement[i] = 'v';
                        }
                    }
                    
                } 
                
            }

            
                
        }

              
        
    }

    loop(){
        this.findNotVisited();
        this.findCLusters();
        this.findAssignedClusters();
        // console.log(this.clusters);
        
    }

    findAssignedClusters(){
        for(let i = 0; i < this.clusters.length; i++){
            let clusterArray  = this.clusters[i].getArray();
            for(let j = 0; j < clusterArray.length; j++ ){
                this.assignedClusters[clusterArray[j]] = i;
            }
        }

    }

    getAssignedClusters(){
        return this.assignedClusters;
    }

    getClustersNumber(){

        return this.clusters.length;
    }




}