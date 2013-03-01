$(document).ready(function(){

    var track = [];

    var d = {
        'NORTH' : 'NORTH',
        'EAST'  : 'EAST',
        'SOUTH' : 'SOUTH',
        'WEST'  : 'WEST'
    };

    var interval = 41;
    var growBy = 10;

    var currentDirection = d.NORTH;
    var currentPosition = {
        'x' : 500,
        'y' : 600,
        'toString' : function() { return '[' + this.x + ',' + this.y + ']';},
        'equals' : function(t) { return this.x == t.x && this.y == t.y;}
    };

    var canvas = $('#play')[0].getContext('2d');

    var getNextPosition = function() {
        var newPosition = $.extend({}, currentPosition);

        if(currentDirection == d.NORTH) {
            newPosition.y = currentPosition.y - growBy;
        }
        else if(currentDirection == d.SOUTH) {
            newPosition.y = currentPosition.y + growBy;
        }
        else if(currentDirection == d.EAST) {
            newPosition.x = currentPosition.x + growBy;
        }
        else if(currentDirection == d.WEST) {
            newPosition.x = currentPosition.x - growBy;
        }
        return newPosition;
    };

    var detectTrackCollision = function() {
        var finalIndex = track.length-1;
        var testX = track[finalIndex].x;
        var testY = track[finalIndex].y;
        $(track).each(function(i){

            if(i == finalIndex) {
                return;
            }
            else if(testX == this.x && testY == this.y) {
                clearInterval(timer);
                console.log('self hit');
            }
        });
    };

    var detectWallCollision = function() {
        if (
            currentPosition.x < 0 ||
            currentPosition.x > 1000 ||
            currentPosition.y < 0 ||
            currentPosition.y > 600
            ) {
            clearInterval(timer);
            console.log('wall hit');
        }
    };

    var draw = function() {
        track.push(currentPosition);
        canvas.strokeStyle = '#ff0000';
        canvas.beginPath();
        canvas.moveTo(currentPosition.x, currentPosition.y);
        currentPosition = getNextPosition();
        canvas.lineTo(currentPosition.x, currentPosition.y);
        canvas.stroke();
        detectTrackCollision();
        detectWallCollision();
    };

    // detect key presses
    $(document).keydown(function(e){
        if(e.keyCode == 37 && currentDirection != d.EAST) {
            currentDirection = d.WEST;
        }
        if(e.keyCode == 38 && currentDirection != d.SOUTH) {
            currentDirection = d.NORTH;
        }
        if(e.keyCode == 39 && currentDirection != d.WEST) {
            currentDirection = d.EAST;
        }
        if(e.keyCode == 40 && currentDirection != d.NORTH) {
            currentDirection = d.SOUTH;
        }
    });

    var timer = setInterval(draw, interval);

});