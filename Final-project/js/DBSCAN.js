class DBSCAN{
    constructor(data, epsilon, minPoints, controller){
        this.data = data;
        this.epsilon = epsilon;
        this.minPoints = minPoints;
        this.controller = controller;
        this.dataLength = this.data.length;
        console.log(this.dataLength);
        this.typeOfPoint = []; // core: 0, Border: 1, noise: 2
        // console.log(this.calculateDistance(1,2,3,5));
       
    }

    calculateDistance(x1,y1,x2,y2){
        let squaredDistance = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
        
        return squaredDistance;
    }
    






}