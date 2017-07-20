// (C) Jonathan Gregson, 2014
// <jdgregson@gmail.com>

/*
 * You must define these variables in your main js file.
 *
 * var squareArray = [];
 * var blinkArray = [];
 * var SQUARE_ROWS = 6;
 * var SQUARE_WIDTH = 40;
 * var SQUARE_PADDING = 4;
 * var SQUARE_SIZE = (SQUARE_PADDING * 2) + SQUARE_WIDTH; 
 *
 */


function SquareObject() {
    this._class = 'square';
    this.color = 'blue';
    this.flashTimer = null;
    this.obj = document.createElement('td');
    this.obj.setAttribute('class', this._class + ' ' + this.color);

    this.getClass = function() {
        return this._class + ' ' + this.color;
    }

    this.setClass = function() {
        this.obj.setAttribute('class', this.getClass())
    }

    this.setColor = function(color) {
        // remove ourselves from blinkkArray to stop blinking
        // TODO: This method is used by the class that adds it
        // to the array, so it's removed right away. Find a way
        // to not do that.
        if(blinkArray.indexOf(this) > -1 && 
          (blinkArray.indexOf(this) !== (blinkArray.length-1))) {
            var i = blinkArray.indexOf(this);
            blinkArray.splice(i, 1);
        }

        self.clearInterval(this.flashTimer);
        this.color = color;
        this.setClass();
    }

    this.nextColor = function() {
        return(this.color === 'yellow'? 'blue':'yellow');
    }

    this.blinkYellow = function() {
        //this.flashTimer = self.setInterval('this.setColor(this.nextColor())', 1000);
        blinkArray.push(this);
    }
}


function loadSquares(target) {
    var table = document.getElementById(target);
    var numSquares = window.innerWidth / SQUARE_SIZE;

    for(var I=0; I<SQUARE_ROWS; I++) {
        table.appendChild(document.createElement('TR'));
        for(var i=0; i<numSquares; i++) {
            var square = new SquareObject();
            squareArray.push(square);
            table.children[I].appendChild(square.obj);
        }
    }
}


function squareTimerJob() {
    var rand = Math.floor(Math.random() * (squareArray.length));
    squareArray[rand].setColor('red');
}


function blinkTimerJob() {
    for(var i in blinkArray) {
        blinkArray[i].setColor(blinkArray[i].nextColor());
    }
}