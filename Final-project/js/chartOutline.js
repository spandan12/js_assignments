class chartOutline{
    constructor(context, width, height, data, XAxis, YAxis, controller){
        this.context = context;
        this.width = width;
        this.height = height;
        this.XAxis = XAxis;
        this.YAxis = YAxis;
        this.controller = controller;
        this.scaling = [];
        this.offset = [];
        this.mostSignificant = [];
    }

    //draws all the components of outline
    draw(){
        this.drawAxis();
        this.PutAxisName();
        this.drawXAxisPoints();
        this.drawYAxisPoints();
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
        this.drawLine(0.098*this.width, 0.0125*this.height, 0.098*this.width,0.902*this.height, 'blue');
        this.drawLine(0.098*this.width, 0.902*this.height, 0.975*this.width,0.902*this.height, 'blue');
    }

    //function for putting Axes name alongside axes
    PutAxisName(){
        let XAxisLength = this.context.measureText(this.XAxis).width;
        this.context.font = 0.03*this.height +'px san-serif';
        this.context.fillText(this.XAxis , (this.width/2) - (XAxisLength / 2), 0.98*this.height);

        let YAxisLength = this.context.measureText(this.YAxis).width;
        this.context.save();
        this.context.translate(0.03 * this.width, (this.height/2) - (YAxisLength / 2));
        this.context.rotate(-Math.PI / 2);
        this.context.fillText(this.YAxis, 0,0);
        this.context.restore();
    }


    //draws X axis reference point
    drawXAxisPoints(){
        
        let extremeData1 = this.controller.findSmallestNumber(this.XAxis);
        let extremeData2 = this.controller.findLargestNumber(this.XAxis);
        this.mostSignificant[0] = this.findIncrement(extremeData1, extremeData2); 
        this.scaling[0] = this.calculateScaling(extremeData1,extremeData2, 0.098*this.width, 0.9 * this.width);
        this.offset[0] = 0.098 * this.width;
        let i= extremeData1;
        let j = 0;
        let scaledIncrement = this.mostSignificant[0] * this.scaling[0];
        let k = 0;

        while(i<= (extremeData2 + this.mostSignificant[0])){
            
            let xPoint = k * scaledIncrement + this.offset[0];
            // console.log(xPoint, i, k);
            k++;
            this.drawLine(xPoint, 0.902* this.height, xPoint, 0.92 * this.height, 'black');
            let pointLength = this.context.measureText(i + '').width;
            let fontSize = 0.02 * this.height;
            this.insertText(i+ '', fontSize, xPoint- (pointLength/2), 0.95 * this.height);
            i += this.mostSignificant[0];
            j = k * scaledIncrement; 
        }        
    }


    //draws Y axis reference point
    drawYAxisPoints(){
        
        let extremeData1 = this.controller.findSmallestNumber(this.YAxis);
        let extremeData2 = this.controller.findLargestNumber(this.YAxis);
        this.mostSignificant[1] = this.findIncrement(extremeData1, extremeData2); 
        this.scaling[1] = this.calculateScaling(extremeData1,extremeData2, 0.0125*this.height, 0.8 * this.height);
        this.offset[1] = 0.902 * this.height;
        let i= extremeData1;
        let j = 0;
        let scaledIncrement = this.mostSignificant[1] * this.scaling[1];
        let k = 0;
        while(i <= (extremeData2 + this.mostSignificant[1])){
            
            let yPoint = -j + this.offset[1];
            k++;
            // console.log(yPoint, i);
            this.drawLine(0.08*this.width, yPoint, 0.098*this.width, yPoint, 'black');
            let pointLength = this.context.measureText(i + '').width;
            let fontSize = 0.02 * this.height;
            this.insertText(i+ '', fontSize, 0.07 * this.width - pointLength, yPoint);
            i += this.mostSignificant[1];
            j = k * scaledIncrement;                  
        }        
    }
    

    
    //finds the exact increment to be increased while plotting axis points
    findIncrement(extremeData1,extremeData2){

        let Difference = (extremeData2 - extremeData1);
        let exponent= parseInt(((Difference.toExponential() + '').split("e+"))[1]);
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

    getExtremePoints(){
        let extremes = [];
        extremes[0] = this.controller.findSmallestNumber(this.XAxis);
        extremes[1] = this.controller.findSmallestNumber(this.YAxis);
        
        return extremes;
    }
}