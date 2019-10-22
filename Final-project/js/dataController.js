class DataController{
    constructor(data){
        this.data = data;
        this.dataLength = this.data.length;
    }

    findSmallestNumber(axisname){
        let targetArray = this.actualData(axisname);
        let smallestNumber = Math.min.apply(null, targetArray);
        
        return smallestNumber;
    }

    findLargestNumber(axisname){
        let targetArray = this.actualData(axisname);
        let largestNumber = Math.max.apply(null, targetArray);

        return largestNumber;
    }

    actualData(axisname){
        let actualData = [];
        for(let i = 0; i < this.dataLength; i++){
            actualData.push(this.data[i][axisname]);
        }

        return actualData;
    }
}