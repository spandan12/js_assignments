function randomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


class Pipe{
    constructor(bgImage,context){
        this.image = bgImage;
        this.context = context; 
        this.x = 340;
        this.cropWidth = 53; 
        this.width = 53;
        this.space = 100;  

        this.upCropx = 554;
        this.upCropheight = randomNumber(80,221);
        this.upHeight = this.upCropheight;
        this.upCropy = 401-this.upHeight;  
        this.upy = 0;        
        
        this.downCropx = 502;
        this.downCropy = 0;
        this.downCropheight = 400 - (this.space + this.upHeight);
        this.downy = this.upHeight + this.space;
        this.downHeight = 400 - (this.space + this.upHeight);

        this.draw();

    }

    draw(){
        this.context.drawImage(this.image,this.upCropx,this.upCropy,this.cropWidth,this.upCropheight,this.x,this.upy,this.width,this.upHeight);
        this.context.drawImage(this.image,this.downCropx,this.downCropy,this.cropWidth,this.downCropheight,this.x,this.downy,this.width,this.downHeight);
    }

    move(){
        this.x -= 2;
        this.draw();
    }
}