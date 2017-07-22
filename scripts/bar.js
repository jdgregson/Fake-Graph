// (C) Jonathan Gregson, 2017
// <jdgregson@gmail.com>

/*
 * You must define these variables in your main js file.
 *
 * var BAR_WIDTH = 30;
 * var BAR_PADDING = 2;
 * var GRAPH_HEIGHT = 290;
 * var refreshRate = 100;
 * var totalSpace = (BAR_PADDING*2) + BAR_WIDTH;
 * var barArray = []; 
 * var barContainer;
 * var globalID = 0;
 * var maxDiff = 2;
 * var lastNumber = 150;
 * var barTimer;
 *
 */


// makeshift class
function BarObject(right, height) {
    if((GRAPH_HEIGHT - height) < maxDiff) {
        var color = 'red';
    } else if((GRAPH_HEIGHT-height) < (maxDiff)*2) {
        var color = 'yellow';
    } else {
        var color = 'blue';
    }

    this.right = right;
    this.height = height;
    this.id = globalID = (globalID>=9007199254740990?0:++globalID);
    this.obj = document.createElement('DIV');
    this.obj.setAttribute('id', this.id);
    this.obj.setAttribute('class', 'bar ' + color);
    this.obj.innerHTML = '<span class="data" style="top:' + (height-
                         (height>20?20:0)) + 'px;">' + height + '</span>';

    this.getStyle = function() {
        return('right:' + this.right + 'px; height:' + this.height + 'px;');
    }

    this.applyStyle = function() {
        this.obj.setAttribute('style', this.getStyle())
    }

    this.setRight = function(right) {
        this.right = right;
        this.applyStyle();
    }

    this.setHeight = function(height) {
        this.height = height;
        this.applyStyle();
    }

    this.applyStyle();
}


// move every bar over one space and delete old bars
function moveAll() {
    // prune old bars if necessary
    if((barArray.length * totalSpace) > window.innerWidth) {
        var deleted = barArray.splice(0, 1)[0];
        barContainer.removeChild(deleted.obj);
    }

    for(i in barArray) {
        var bar = barArray[i];
        bar.setRight(bar.right + totalSpace);
    }
}


// wrapper method for adding a new bar to the graph
function simpleAdd(height) {
    moveAll();

    var bar = new BarObject(BAR_PADDING, height);
    barArray.push(bar);
    barContainer.appendChild(bar.obj);
}


// setter for refteshRate
function setBarSpeed(s) {
    if(s == 'stop') {
        self.clearInterval(barTimer);
        return;
    } else if(s === 'slow') {
        self.clearInterval(barTimer);
        refreshRate = 1000;
    } else if(s === 'normal') {
        self.clearInterval(barTimer);
        refreshRate = 100;
    } else if(s === 'fast') {
        self.clearInterval(barTimer);
        refreshRate = 20;
    } else if(s === 'wayfast') {
        self.clearInterval(barTimer);
        refreshRate = 5;
    }
    barTimer = self.setInterval(barTimerJob, refreshRate);
}


// get the height of the next bar
function nextRandom() {
    if(lastNumber < maxDiff) {
        var num = Math.floor(Math.random() * (maxDiff*2));
    } else if((GRAPH_HEIGHT-lastNumber) < maxDiff) {
        var num = Math.floor(Math.random() * (GRAPH_HEIGHT - maxDiff));
    } else {
        if(Math.floor(Math.random(2)*2)) { // returns 0 or 1 
            var num = lastNumber + Math.floor(Math.random() * maxDiff);
        } else {
            var num = lastNumber - Math.floor(Math.random() * maxDiff);
        }
    }
    lastNumber = num;
    return num
}


// job to run when updating the graph. Put it in a timer, yo!
function barTimerJob() {
    var width = window.innerWidth;
    simpleAdd(nextRandom());
}