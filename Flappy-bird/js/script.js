var newGame = new Game('canvas1',' ');
var newGame2 = new Game('canvas2','a');
document.onkeydown = function(event){
    var pressedKey = event.key;
    console.log(pressedKey);
    newGame.keyDetect(pressedKey);
    newGame2.keyDetect(pressedKey);

};

