class ScatterPlot{
    constructor(Id, width, height, data, XAxis, YAxis){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.setAttribute('id',Id);
        this.canvas.width = width;
        this.canvas.height = height;

        this.controller = new DataController(data);
        this.outline = new chartOutline(this.context, width, height, data, XAxis, YAxis, this.controller);
        this.dataPlot = new DataPlot(this.context, data, XAxis, YAxis, this.controller, this.outline);
        // this.leftPosition = 
    }

    draw(){
        document.body.appendChild(this.canvas);
        Object.assign(this.canvas.style,{
            backgroundColor: 'rgb(212, 216, 219)',
        });
        this.outline.draw();
        this.dataPlot.draw();
    }

}