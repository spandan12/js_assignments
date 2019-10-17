class Helix{
    constructor(Id){
        this.Id = Id;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('canvas1', this.Id);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.width = '900';
        this.canvas.height = '500';
        this.context = this.canvas.getContext('2d');
        // this.circle = new circle(this.context);
        this.counter =0;
        this.circleController = new CircleController(this.context);
        // this.circleController.drawSineWave();

}

    AnimateHelix(){
        if((this.counter % 5) ==0){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // this.circle.update();
            this.circleController.update();
            
        }
        this.counter++;

    }

}