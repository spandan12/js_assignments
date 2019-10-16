class foreGround{
    constructor(bgImage,context){
        this.context = context;
        this.image = bgImage;
        this.cropx = 276;
        this.cropy = 0;
        this.cropwidth = 224;
        this.cropheight = 112;
        this.x = 0;
        this.y = 400;
        this.width = 224;
        this.height = 112;
        this.dx = 1;
    }

    draw(){
        this.context.drawImage(this.image,this.cropx,this.cropy,this.cropwidth,this.cropheight,this.x,this.y,this.width,this.height);
        this.context.drawImage(this.image,this.cropx,this.cropy,this.cropwidth,this.cropheight,this.x + this.cropwidth,this.y,this.width,this.height);
    }

    move(){
        this.x = (this.x - this.dx) % (this.width/2);
    }
}