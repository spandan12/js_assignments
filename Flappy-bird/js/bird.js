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
        this.gravity = 9.81 * 0.01;
        this.velocity = 0.11;
        this.up = up;
        this.dy = 0;
        // console.log(this.up);

    }

    draw(){
        // console.log(this.up[0]);
        // this.upMovement();
        // console.log(this.dy);
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
        
        else{
            this.velocity += this.gravity;
            this.y += (this.velocity - this.dy);
            this.dy =0;
        }


        if((this.selectControl % 7) == 0){
            this.select = (this.select + 1) % 3;  
        }
        
    }

    upMovement(){
        if(this.currentState[0] == 'play'){
            this.y -= 100;
            console.log(this.y);
        }
        // this.y += 2;
    }
    
    checkPipeCollision(pipe){
        
        let checkxValue = this.x + this.width;
        // console.log(checkxValue);
        
        let pipexvalue = pipe.x + this.width;
        // console.log(pipexvalue);
        let checkyvalue = this.y + this.height;
        
        
        if(pipe.x <= checkxValue && pipexvalue >= this.x && ((this.y <= pipe.upHeight) || (checkyvalue >= pipe.downy) )){    
            // console.log('hi');
            return true;
        }
        else{
            return false;
        }
            

    }
        

}