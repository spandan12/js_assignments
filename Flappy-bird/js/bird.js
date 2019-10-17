class Bird{
    constructor(bgImage,context,currentState,up){
        this.currentState = currentState;
        this.image = bgImage;
        this.context = context;
        this.cropx = 276;
        this.cropy = 112;
        this.cropwidth = 36;
        this.cropheight = 26;
        this.x = 50;
        this.y = 200;
        this.width = 36;
        this.height = 26;
        this.select = 0;
        this.selectControl = 0;
        this.gravity = 3 * 0.01;
        this.velocity = 1;
        this.up = up;
        this.dy = 0;

    }

    draw(){
        switch(this.select) {
            case 0:
                this.cropy = 112;           
              break;
            case 1:
                this.cropy = 138;
              break;
            case 2:
                this.cropy = 164;
              break;
          }

        this.context.drawImage(this.image,this.cropx,this.cropy,this.cropwidth,this.cropheight,this.x,this.y,this.width,this.height);
        this.selectControl ++;
        

        if(this.y >= (400-this.height)){
            this.currentState[0] = 'gameOver';
            this.y += 0;
        }

        if(this.up[0] == true){
            this.y -= 20;
            this.velocity -= 0.7;
            this.gravity =0;
            this.up[0] = false;
        }

        else if(this.y>=200 && (this.y >= (400-this.height))){
            this.velocity += this.gravity;
            this.y += (this.velocity);
        }
        
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.gravity == 0){
            this.gravity = 3 * 0.01;
            this.velocity += 0.2;
        }
    


        if((this.selectControl % 7) == 0){
            this.select = (this.select + 1) % 3;  
        }
        
    }

    
    checkPipeCollision(pipe){
        
        let checkxValue = this.x + this.width;
        
        let pipexvalue = pipe.x + this.width;
        let checkyvalue = this.y + this.height;
        
        
        if(pipe.x <= checkxValue && pipexvalue >= this.x && ((this.y <= pipe.upHeight) || (checkyvalue >= pipe.downy) )){    
            return true;
        }
        else{
            return false;
        }
            

    }
        

}