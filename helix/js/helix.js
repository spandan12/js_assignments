class Helix{
    constructor(canvasId, width, height, rows, cols, color1, color2){
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id',canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.rows = rows;
        this.cols = cols;
        this.color1 = color1;
        this.color2 = color2;
        
        this.circleController = new circleController(this.context, this.rows, this.cols, this.color1, this.color2);
    }

    clear(){
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "skyblue";
        this.context.fillRect(0 , 0, this.canvas.width, this.canvas.height);
        this.circleController.draw();
    }

    Animate(){

        this.clear();
        requestAnimationFrame(this.Animate.bind(this));
    }
}


