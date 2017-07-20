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
    this.blinkColor = 'yellow';
    this.obj = document.createElement('td');
    this.obj.setAttribute('class', this._class + ' ' + this.color);

    this.getClass = function() {
        return this._class + ' ' + this.color;
    }

    this.setClass = function() {
        this.obj.setAttribute('class', this.getClass());
    }

    this.getColor = function() {
        return this.color;
    }

    this.setColor = function(color) {
        self.clearInterval(this.flashTimer);
        this.color = color;
        this.setClass();
    }

    this.nextColor = function() {
        return this.color==='yellow'?'red':this.color==='blue'?'yellow':'blue';
    }

    this.blink = function() {
        blinkArray.push(this);
    }

    this.unblink = function() {
        if(blinkArray.indexOf(this) > -1) {
            var i = blinkArray.indexOf(this);
            blinkArray.splice(i, 1);
        }
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
    var square = squareArray[Math.floor(Math.random() * (squareArray.length))];
    square.setColor(square.nextColor());
    square.unblink();
    if(square.getColor() !== 'blue') {
        square.blink();
    }
}


function blinkTimerJob() {
    for(var i in blinkArray) {
        var square = blinkArray[i];
        var color = square.getColor();
        if(color === 'blue') {
            square.setColor(square.blinkColor);
            square.blinkColor = null;
        } else {
            square.blinkColor = color;
            square.setColor('blue');
        }
    }
}