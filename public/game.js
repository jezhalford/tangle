var d = {
    'NORTH' : 'NORTH',
    'EAST'  : 'EAST',
    'SOUTH' : 'SOUTH',
    'WEST'  : 'WEST'
};

var board = {
    'height' : 600,
    'width'  : 1000
};

var growBy = 5;

var timer = null;

var createPlayer = function(colour, initialDirection) {

    var templatePosition = {
        'x' : 0,
        'y' : 300,
        'toString' : function() { return '[' + this.x + ',' + this.y + ']';},
        'equals' : function(t) { return this.x == t.x && this.y == t.y;}
    };

    var templatePlayer = {
        'track' : [],
        'interval' : 250,
        'currentDirection' : undefined,
        'colour' : '#ff0000',
        'currentPosition' : undefined,
        'toString' : function() {
            return this.colour + ' heading ' + this.currentDirection + ' from ' + this.currentPosition.toString();
        }
    };

    var newPlayer = $.extend({}, templatePlayer);
    newPlayer.currentPosition = $.extend({}, templatePosition);
    newPlayer.colour = colour;

    if(initialDirection == d.SOUTH) {
        newPlayer.currentPosition.x = board.width / 2;
        newPlayer.currentPosition.y = 0;
        newPlayer.currentDirection = d.SOUTH;
    }
    else if(initialDirection == d.WEST) {
        newPlayer.currentPosition.x = board.width;
        newPlayer.currentPosition.y = board.height / 2;
        newPlayer.currentDirection = d.WEST;
    }
    else if(initialDirection == d.NORTH) {
        newPlayer.currentPosition.x = board.width / 2;
        newPlayer.currentPosition.y = board.height;
        newPlayer.currentDirection = d.NORTH;
    }
    else if(initialDirection == d.EAST) {
        newPlayer.currentPosition.x = 0;
        newPlayer.currentPosition.y = board.height / 2;
        newPlayer.currentDirection = d.EAST;
    }

    return newPlayer;
};

var players = [
    createPlayer('#ff0000', d.NORTH),
    createPlayer('#0000ff', d.SOUTH)
];

var getNextPosition = function(player) {
    var newPosition = $.extend({}, player.currentPosition);

    if(player.currentDirection == d.NORTH) {
        newPosition.y = player.currentPosition.y - growBy;
    }
    else if(player.currentDirection == d.SOUTH) {
        newPosition.y = player.currentPosition.y + growBy;
    }
    else if(player.currentDirection == d.EAST) {
        newPosition.x = player.currentPosition.x + growBy;
    }
    else if(player.currentDirection == d.WEST) {
        newPosition.x = player.currentPosition.x - growBy;
    }
    return newPosition;
};

var detectOwnTrackCollision = function(player) {
    var finalIndex = player.track.length-1;
    var testX = player.track[finalIndex].x;
    var testY = player.track[finalIndex].y;
    $(player.track).each(function(i){

        if(i == finalIndex) {
            return;
        }
        else if(testX == this.x && testY == this.y) {
            clearInterval(timer);
            console.log('self hit: ' + player.toString());
        }
    });
};

var detectWallCollision = function(player) {
    if (
        player.currentPosition.x < 0 ||
        player.currentPosition.x > 1000 ||
        player.currentPosition.y < 0 ||
        player.currentPosition.y > 600
        ) {
        clearInterval(timer);
        console.log('wall hit: ' + player.toString());
    }
};

var detectPlayerCollision = function(players) {

    var combinedTrack = [];

    var heads = [];

    $(players).each(function() {
        var last = this.track.pop();
        combinedTrack = combinedTrack.concat(this.track);
        heads.push(last);
        this.track.push(last);
    });

    $(combinedTrack).each(function() {
        var test = this;
        $(heads).each(function(i) {
            if(this.equals(test)) {
                clearInterval(timer);
                console.log('player collision');
                console.log('player ' + players[i].colour + ' loses');
            }
        });
    });

};


$(document).ready(function(){

    var canvas = $('#play')[0].getContext('2d');

    var tick = function() {
        $(players).each(function() {
            this.track.push(this.currentPosition);
            canvas.strokeStyle = this.colour;
            canvas.beginPath();
            canvas.moveTo(this.currentPosition.x, this.currentPosition.y);
            this.currentPosition = getNextPosition(this);
            canvas.lineTo(this.currentPosition.x, this.currentPosition.y);
            canvas.stroke();
            detectOwnTrackCollision(this);
            detectWallCollision(this);
        });
        detectPlayerCollision(players);
/*
        if(Math.random() > 0.9) {
            var seed = parseInt(Math.random() * 4 + 1);
            if(seed == 1 && players[1].currentDirection != d.SOUTH) {
                players[1].currentDirection = d.NORTH;
            }
            else if(seed == 2 && players[1].currentDirection != d.NORTH) {
                players[1].currentDirection = d.SOUTH;
            }
            else if(seed == 3 && players[1].currentDirection != d.WEST) {
                players[1].currentDirection = d.EAST;
            }
            else if(seed == 4 && players[1].currentDirection != d.EAST) {
                players[1].currentDirection = d.WEST;
            }
        }
        */
    };

    // detect key presses
    $(document).keydown(function(e){
        if(e.keyCode == 37 && players[0].currentDirection != d.EAST) {
            players[0].currentDirection = d.WEST;
        }
        if(e.keyCode == 38 && players[0].currentDirection != d.SOUTH) {
            players[0].currentDirection = d.NORTH;
        }
        if(e.keyCode == 39 && players[0].currentDirection != d.WEST) {
            players[0].currentDirection = d.EAST;
        }
        if(e.keyCode == 40 && players[0].currentDirection != d.NORTH) {
            players[0].currentDirection = d.SOUTH;
        }

        if(e.keyCode == 65 && players[1].currentDirection != d.EAST) {
            players[1].currentDirection = d.WEST;
        }
        if(e.keyCode == 87 && players[1].currentDirection != d.SOUTH) {
            players[1].currentDirection = d.NORTH;
        }
        if(e.keyCode == 68 && players[1].currentDirection != d.WEST) {
            players[1].currentDirection = d.EAST;
        }
        if(e.keyCode == 83 && players[1].currentDirection != d.NORTH) {
            players[1].currentDirection = d.SOUTH;
        }
    });

    timer = setInterval(tick, 50);

});
