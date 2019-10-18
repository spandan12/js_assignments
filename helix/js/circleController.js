class circleController{
    constructor(context, noOfRows, noOfCols, color1, color2){
        this.context = context;
        this.noOfRows = noOfRows;
        this.noOfCols = noOfCols;
        this.color1 = color1;
        this.color2 = color2;
        this.initialCenter = {
            x : 100,
            y : 60
        }
        this.gapX = 20;
        this.gapY = 30;
        this.circles = [];
        this.update();
    }

    draw(){
        for(let i = 0; i < this.circles.length; i++){
            this.circles[i].update();
            this.circles[i].draw();
        }
    }

    create(isOutOfPhase){

        var color = this.color1;

        if(isOutOfPhase == true){
            color = this.color2;
        }

        let currentPosY = this.initialCenter.y;

        for(let i = 0; i < this.noOfRows; i++){
            currentPosY += this.gapY;

            let currentPoxX = 0;
            let phaseIncrease = 6;
            let currentPhase = 0;

            for(let j = 0; j < this.noOfCols; j++){
                let circle = new Circle(this.context, color, isOutOfPhase);

                circle.center.x = currentPoxX += this.gapX;
                circle.center.y = currentPosY;
                circle.currentX = currentPhase += phaseIncrease;
                circle.currentY = currentPosY;

                this.circles.push(circle);
            }
        }
    }
    update(){
        this.create(false);
        this.create(true);
    }


}