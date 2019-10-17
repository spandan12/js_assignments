class Circle{
    constructor(context, offset){
        this.context = context;
        this.centerX = 100;
        this.centerY = 200;
        this.radius = 10;
        // this.draw(); 
        this.oscillateControl = 0;  
        this.offset = offset; 
        
    }

    draw(){
        this.context.beginPath();
        this.context.arc(this.centerX + this.offset, this.centerY, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'orange';
        this.context.strokeStyle = 'orange';
        this.context.fill();
        this.context.stroke();
    }


    update(){
        this.oscillateControl += 10  ;
        // console.log(this.centerY);
        if(this.oscillateControl == 360){
            this.oscillateControl = 0;
        }
        let degree = (this.oscillateControl * Math.PI)/180;
        this.centerY = 50 * Math.sin(degree) + 200;
        this.radius = 5 * Math.cos(degree) + 10;
        this.draw();
    }
}