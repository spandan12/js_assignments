class PipeController{
    constructor(bgImage,context,bird,scores){
        this.image = bgImage;
        this.context = context;
        this.pipes = [];
        this.bird = bird;
        this.counter = 0;
        this.scores = scores;
    }

    createPipe(){
        let pipe = new Pipe(this.image, this.context);
        this.pipes.push(pipe);

    }

    removePipe(){
        // console.log(this.scores);
        for(let i = 0; i< this.pipes.length; i++ ){
            if(this.pipes[i].x <= -53){
                this.pipes.splice(i,1);
                this.scores[0]++;
            }
        }
    }

    createRandomPipes(){
        this.counter++;
        if((this.counter % 120) == 0){
            this.createPipe();
        }
    }

    movePipes(){
        for(let i = 0; i< this.pipes.length; i++ ){
            this.pipes[i].move();
        }
    }

    updatePipes(){
        this.movePipes();
        this.removePipe();
    }



}