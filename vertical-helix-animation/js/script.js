var newhelix = new Helix('canvas1');

var Interval = setInterval(function(){
    newhelix.AnimateHelix();
}.bind(this), 1000/60);