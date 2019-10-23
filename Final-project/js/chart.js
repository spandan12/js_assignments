class ScatterPlot{
    constructor(Id, width, height, data, XAxis, YAxis){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.setAttribute('id',Id);
        this.canvas.width = width;
        this.canvas.height = height;

        this.controller = new DataController(data);
        this.kMeans = new KMeansAlgorithm(data, 7, this.controller);

        this.assignedCentroids = this.kMeans.getAssignedCentroid();
        this.outline = new chartOutline(this.context, width, height, XAxis, YAxis, this.controller);
        this.dataPlot = new DataPlot(this.context, XAxis, YAxis, this.controller, this.outline, this.assignedCentroids);
        this.zoomEffects = new ZoomEffect(this.context, this.canvas,this.kMeans, this.controller, this.dataPlot, this.outline, data, XAxis, YAxis);
    }


    draw(){
        document.body.appendChild(this.canvas);
        Object.assign(this.canvas.style,{
            backgroundColor: 'rgb(212, 216, 219)',
        });
        this.render();
    }

    render(){  
        // this.zoomEffects.checkClick();     
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.zoomEffects.update();
        requestAnimationFrame(this.render.bind(this));
    }

    

}