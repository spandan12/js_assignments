class Helix{
    constructor(Id){
        this.Id = Id;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('canvas1', this.Id);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.width = '900';
        this.canvas.height = '500';
        this.context = this.canvas.getContext('2d');
        
        this.sineWave1 = new sineWave(this.context, 0);
        this.sineWave1.drawSineWave();
        this.sineWave2 = new sineWave(this.context, 100);
        this.sineWave2.drawSineWave();

        this.sineWave1.drawLinesBetween(this.sineWave2);
        this.counter = 0;

        this.cosWave1 = new cosWave(this.context, 0);
        this.cosWave1.drawCosWave();
        this.cosWave2 = new cosWave(this.context, 100);
        this.cosWave2.drawCosWave();

        this.cosWave1.drawLinesBetween(this.cosWave2);
        
    }

    AnimateHelix(){
        if((this.counter % 10) ==0){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.sineWave1.Oscillate();
            this.sineWave2.Oscillate();
            this.sineWave1.drawLinesBetween(this.sineWave2);

            this.cosWave1.Oscillate();
            this.cosWave2.Oscillate();
            this.cosWave1.drawLinesBetween(this.cosWave2);
            
        }
        this.counter++;
        
        
        

    }

    //     if(this.changeAngleSine ==90){
    //         this.changeFlag = -1;
    //     }

    //     else if(this.changeAngleSine == 0){
    //         this.changeFlag = 1;
    //     }

    //     if((this.counter % 10) ==0){
    //         this.changeAngleSine += this.changeFlag;
    //         this.changeAngleCos -= this.changeFlag;
    //     }

    //     this.counter++;
    //     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //     this.drawSineWave(0);
    //     this.drawSineWave(50);
    //     this.drawCosineWave(0);
    //     this.drawCosineWave(50);
    //     // this.drawCosineWave();
    //     // this.drawBetweenLines();

    //     this.canvas.onclick = function(event){
    //         var x = event.clientX;
    //         var y = event.clientY;
    //         console.log(x + ' ' + y);
    //     }
        
    // }
}