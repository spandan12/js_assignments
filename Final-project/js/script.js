var controller = new DataController(data[0]);

var plot = new ScatterPlot('sample', 700, 500, data[0], 'sepal_length', 'sepal_width');
plot.draw();
