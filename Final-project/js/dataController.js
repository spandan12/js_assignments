class DataController{
    constructor(data){
        this.data = data;
        this.dataLength = this.data.length;
    }

    setData(data){
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

    getDataLength(){
        return this.dataLength;
    }

    normaliseData(x, minValue, maxValue){
        let normalised = (x - minValue) / (maxValue - minValue);

        return normalised;
    }

    findNormalisedData(axisname){
        let normalisedData = [];
        let minValue = this.findSmallestNumber(axisname);
        let maxValue = this.findLargestNumber(axisname);
        let actualData = this.actualData(axisname);
        for(let i = 0; i < this.dataLength; i++){
            normalisedData.push(this.normaliseData(actualData[i], minValue, maxValue));
        }

        return normalisedData;
    }

}