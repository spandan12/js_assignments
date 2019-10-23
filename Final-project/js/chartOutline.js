class chartOutline{
    constructor(context, width, height, XAxis, YAxis, controller){
        this.context = context;
        this.width = width;
        this.height = height;
        this.XAxis = XAxis;
        this.YAxis = YAxis;
        this.controller = controller;
        this.scaling = [];
        this.offset = [];
        this.mostSignificant = [];
        // this.scalingFactor = 0.1;
        this.zoomOutExtreme1 = null;
        this.zoomOutExtreme2 = null;
        this.xoffsetExtreme = [0,0];
        this.yoffsetExtreme = [0,0];
        this.resultExtremes = [];
        
    }

    setZoomOutExtreme(extreme1, extreme2){
        this.zoomOutExtreme1 = extreme1;
        this.zoomOutExtreme2 = extreme2;
        // console.log(this.zoomOutExtreme1, this.zoomOutExtreme2);
    }

    //draws all the components of outline
    draw(isCluster){
        this.drawAxis();
        this.PutAxisName();
        this.drawXAxisPoints(isCluster);
        this.drawYAxisPoints(isCluster);
    }

    //general function for drawing line in canvas
    drawLine(x1, y1, x2, y2, color){
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x1,y1);
        this.context.lineTo(x2,y2);
        this.context.stroke();
    }

    //general function for inserting text in canvas
    insertText(text, fontSize, x, y){
        this.context.font = fontSize +'px san-serif';
        this.context.fillText(text, x, y);

    }

    //function for drawing X and Y axis in graph
    drawAxis(){
        this.drawLine(LEFT_EXTREME * this.width, TOP_EXTREME * this.height, LEFT_EXTREME * this.width, BOTTOM_EXTREME * this.height, 'blue');
        this.drawLine(LEFT_EXTREME * this.width, BOTTOM_EXTREME * this.height, RIGHT_EXTREME * this.width, BOTTOM_EXTREME * this.height, 'blue');
    }

    //function for putting Axes name alongside axes
    PutAxisName(){
        let XAxisLength = this.context.measureText(this.XAxis).width;
        this.context.font = 0.03 * this.height +'px san-serif';
        this.context.fillStyle = "black";
        this.context.fillText(this.XAxis , (this.width/2) - (XAxisLength / 2), 0.98*this.height);

        let YAxisLength = this.context.measureText(this.YAxis).width;
        this.context.save();
        this.context.translate(0.03 * this.width, (this.height/2) - (YAxisLength / 2));
        this.context.rotate(-Math.PI / 2);
        this.context.fillText(this.YAxis, 0,0);
        this.context.restore();
    }


    drawXAxisPoints(isCluster){
        
        let extremeData1 = this.controller.findSmallestNumber(this.XAxis);
        let extremeData2 = this.controller.findLargestNumber(this.XAxis);
        let resultExtreme1 = extremeData1;
        let resultExtreme2 = extremeData2;
        this.resultExtremes[0] = resultExtreme1;
        // console.log(isCluster);
        

        if(isCluster){
            // resultExtreme1 = 5.3;
            // resultExtreme2 = 6.55;
            resultExtreme1 = this.zoomOutExtreme1[0] + this.xoffsetExtreme[0];
            resultExtreme2 = this.zoomOutExtreme2[0] - this.xoffsetExtreme[1];
            // console.log(resultExtreme1);
            this.resultExtremes[0] = resultExtreme1;
            
            if(this.xoffsetExtreme[0] < (extremeData1 - this.zoomOutExtreme1[0])){
                this.xoffsetExtreme[0] += 0.02;
            }
            if(this.xoffsetExtreme[1] < ( this.zoomOutExtreme2[0] - extremeData2 )){
                this.xoffsetExtreme[1] += 0.02;
            }
        }
        
        this.mostSignificant[0] = this.findIncrement(resultExtreme1, resultExtreme2); 
        this.scaling[0] = this.calculateScaling(resultExtreme1, resultExtreme2, LEFT_EXTREME*this.width, 0.85 * this.width);
        this.offset[0] = LEFT_EXTREME * this.width;
        let i= resultExtreme1;
        let j = 0;
        
        let scaledIncrement =this.mostSignificant[0] * this.scaling[0];
        
        
        let k = 0;

        while(i<= (resultExtreme2 +  this.mostSignificant[0])){
            
            let xPoint = k * scaledIncrement + this.offset[0];
           
            k++;
            this.drawLine(xPoint, 0.902* this.height, xPoint, 0.92 * this.height, 'black');
            let pointLength = this.context.measureText(Math.trunc(i) + '').width;
            let fontSize = 0.02 * this.height;
            this.insertText((Math.trunc(i * 1000) /1000) + '', fontSize, xPoint- (pointLength), 0.95 * this.height);
            i += this.mostSignificant[0];
            j = k * scaledIncrement; 
        }        
    }


    //draws Y axis reference point
    drawYAxisPoints(isCluster){
        
        let extremeData1 = this.controller.findSmallestNumber(this.YAxis);
        let extremeData2 = this.controller.findLargestNumber(this.YAxis);

        let resultExtreme1 = extremeData1;
        let resultExtreme2 = extremeData2;

        this.resultExtremes[1] = resultExtreme1;
        // console.log(isCluster);
        

        if(isCluster){
            // resultExtreme1 = 5.3;
            // resultExtreme2 = 6.55;
            resultExtreme1 = this.zoomOutExtreme1[1] + this.yoffsetExtreme[0];
            resultExtreme2 = this.zoomOutExtreme2[1] - this.yoffsetExtreme[1];
            // console.log(resultExtreme1);

            this.resultExtremes[1] = resultExtreme1;
            
            if(this.yoffsetExtreme[0] < (extremeData1 - this.zoomOutExtreme1[1])){
                this.yoffsetExtreme[0] += 0.02;
            }
            if(this.yoffsetExtreme[1] < ( this.zoomOutExtreme2[1] - extremeData2 )){
                this.yoffsetExtreme[1] += 0.02;
            }
        }
        this.mostSignificant[1] = this.findIncrement(resultExtreme1, resultExtreme2); 
        this.scaling[1] = this.calculateScaling(resultExtreme1,resultExtreme2, TOP_EXTREME * this.height, 0.8 * this.height);
        this.offset[1] = BOTTOM_EXTREME * this.height;
        let i= resultExtreme1;
        let j = 0;
        let scaledIncrement = this.mostSignificant[1] * this.scaling[1];
        let k = 0;
        while(i <= (resultExtreme2 + this.mostSignificant[1])){
            let yPoint = -j + this.offset[1];
            k++;
            
            this.drawLine(0.08 * this.width, yPoint, 0.098 * this.width, yPoint, 'black');
            let pointLength = this.context.measureText((Math.trunc(i * 1000) /1000) + '').width;
            let fontSize = 0.02 * this.height;
            this.insertText((Math.trunc(i * 1000) /1000) + '', fontSize, 0.07 * this.width - pointLength, yPoint);
            i += this.mostSignificant[1];
            j = k * scaledIncrement;

        }        
    }
    

    
    //finds the exact increment to be increased while plotting axis points
    findIncrement(extremeData1,extremeData2){

        let Difference = (extremeData2 - extremeData1);
        let exponent= parseInt(((Difference.toExponential() + '').split("e"))[1]);
        
        let mostSignificant = Math.pow(10, exponent);
        let IncrementTimes = (Difference / mostSignificant);
        
        while(IncrementTimes <= 8){
            
            mostSignificant /= 2;
            IncrementTimes = (Difference / mostSignificant);
        }

        return mostSignificant;
        
    }

    //calculates scaling factor for the reference points
    calculateScaling(extremeData1, extremeData2, canvasData1, canvasData2){
        let ActualDiff = extremeData2 - extremeData1;
        let CanvasDiff = canvasData2 - canvasData1;
        let scaling = (CanvasDiff / ActualDiff);
        return scaling;
    }

    getScaling(){
        return this.scaling;
    }

    getOffset(){
        return this.offset;
    }

    getMostSignificant(){
        return this.mostSignificant;
    }

    getResultExtremes(){

        return this.resultExtremes;

    }

    getLowerExtremePoints(){
        let extremes = [];
        extremes[0] = this.controller.findSmallestNumber(this.XAxis);
        extremes[1] = this.controller.findSmallestNumber(this.YAxis);
        
        return extremes;
    }

    getHigherExtremePoints(){
        let extremes = [];
        extremes[0] = this.controller.findLargestNumber(this.XAxis);
        extremes[1] = this.controller.findLargestNumber(this.YAxis);
        
        return extremes;

    }


}