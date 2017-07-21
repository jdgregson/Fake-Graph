// (C) Jonathan Gregson, 2014
// <jdgregson@gmail.com>



// init
{
    var BAR_WIDTH = 30;
    var BAR_PADDING = 2;
    var GRAPH_HEIGHT = 290;
    var refreshRate = 100;
    var totalSpace = (BAR_PADDING*2) + BAR_WIDTH;
    var barArray = [];
    var squareArray = [];
    var blinkArray = [];
    var barContainer = document.getElementById("graph-container");
    var SQUARE_ROWS = 6;
    var SQUARE_WIDTH = 40;
    var SQUARE_PADDING = 4;
    var SQUARE_SIZE = (SQUARE_PADDING * 2) + SQUARE_WIDTH;
    var globalID = 0;
    var maxDiff = 5;
    var lastNumber = 150;

    var barTimer = self.setInterval(barTimerJob, refreshRate);
    var squareTimer = self.setInterval(squareTimerJob, 1000);
    var blinkTimer = self.setInterval(blinkTimerJob, 1000);

    loadSquares(document.getElementById('square-container'));
}