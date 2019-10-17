class Circle{
    constructor(context, offsetx, offsety,color,wave){
        this.context = context;
        this.centerX = 100;
        this.centerY = 200;
        this.radius = 2;
        // this.draw(); 
        this.wave =wave;
        this.oscillateControl =0;

        // if(this.wave == 'sine'){
        //     this.oscillateControl = 0;
        // }

        // else if(this.wave == 'cos'){
        //     this.oscillateControl = 360;
        // }
          
        this.offsetx = offsetx;
        this.offsety = offsety; 
        this.color = color;
        // console.log(offset);
        
    }

    draw(){
        this.context.beginPath();
        this.context.arc(this.centerX + this.offsetx, this.centerY + this.offsety, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
        this.context.fill();
        this.context.stroke();
    }


    update(){
        

        if(this.wave == 'sine'){
            this.oscillateControl += 10  ;
            if(this.oscillateControl == 360){
                this.oscillateControl = 0;
            }
            let degree = (this.oscillateControl * Math.PI)/180;
            this.centerY = 20 * Math.sin(degree) + 200;
            if(this.offsetx<= 100 ){
                this.radius = 5 * Math.cos(degree) + 6;
            }
    
            else{
                this.radius = -5 * Math.cos(degree) + 6;
            }
        }

        else if(this.wave == 'cos'){
            this.oscillateControl -= 10  ;
            if(this.oscillateControl == -360){
                this.oscillateControl = 0;
            }
            let degree = (this.oscillateControl * Math.PI)/180;
            this.centerY = 20 * Math.sin(degree) + 200;
            if(this.offsetx<= 100 ){
                this.radius = -5 * Math.cos(degree) + 6;
            }
    
            else{
                this.radius = 5 * Math.cos(degree) + 6;
            }
        }

        
        
        
        
        this.draw();
    }
}