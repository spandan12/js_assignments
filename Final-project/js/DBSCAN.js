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
        this.xDataPoints = this.controller.actualData(this.attributes[0]);
        this.yDataPoints = this.controller.actualData(this.attributes[1]);
        
        this.typeOfPoint = []; // core: 0, Border: 1, noise: 2
        this.corePointIndex = [];
        this.borderPointIndex = [];
        this.noisePointIndex = [];
        this.loop();
       
    }

    calculateDistance(x1, y1, x2, y2){
        let squaredDistance = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
        
        return squaredDistance;
    }

    isInsideRadius(index1, index2){
        let squaredDistance = this.calculateDistance(this.xDataPoints[index1], this.yDataPoints[index1], this.xDataPoints[index2], this.yDataPoints[index2]);
        let squaredRadius = Math.pow(this.epsilon, 2);
        if(squaredDistance <= squaredRadius){
            return true;
        }
        
        else{
            return false;
        }
    }

    isCorePoint(index){
        let counter = 0;
        for(let i = 0; i < this.dataLength; i++){
            if(index == i){
                continue;
            }
            if(this.isInsideRadius(index, i) == true){
                counter++;
            }
            if(counter >= this.minPoints){
                return true;
            }
        }

        return false;
    }

    findCorePoints(){
        for(let i = 0; i < this.dataLength; i++){
            if(this.isCorePoint(i) == true){
                this.typeOfPoint[i] = 0;
                this.corePointIndex.push(i);
            }
            else{
                this.typeOfPoint[i] = 2;
            }
        }
    }


    findBorderPoints(){
        for(let i = 0; i < this.dataLength; i++){
            if(this.typeOfPoint[i] == 0){
                continue;
            }
            for(let j = 0; j < this.corePointIndex.length; j++){
                
                if(this.isInsideRadius(i, this.corePointIndex[j]) == true){
                    this.typeOfPoint[i] = 1;
                    this.borderPointIndex.push(i);
                    break;
                }
            }
            
        }

    }

    findNoisePoints(){
        for(let i = 0; i < this.dataLength; i++){
            if(this.typeOfPoint[i] == 2){
                this.noisePointIndex.push(i);
            }
        }
    }




    loop(){
        this.findCorePoints();
        this.findBorderPoints();
        this.findNoisePoints();
        console.log(this.corePointIndex, this.borderPointIndex, this.noisePointIndex);
    }







}