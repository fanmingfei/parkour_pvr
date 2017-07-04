var Player = {};

Playback.enum.mechanisimType = {
    time: 'time',
    frame: 'frame'
};


Playback.ready = function() {
    sendMessage(CONST.MEDIATOR.PLAYBACK_READY);
};

Playback.playbackOver = function() {
    sendMessage(CONST.MEDIATOR.PLAYBACK_OVER);
};


var funcCache = {
    playbackStart: [],
    playerOver: [],
    doAction: []
};

Playback.rigisterPlaybackStart = function(func) {
    funcCache.playbackStart.push(func);
};

Playback.rigisterPlayerkOver = function(func) {
    funcCache.playerOver.push(func);
};
Playback.rigisterDoAction = function(func) {
    funcCache.doAction.push(func);
};


Playback.mechanisimType = Playback.enum.mechanisimType.time;
Playback.setType = function(type) {
    if (Object.values(Playback.enum.mechanisimType).indexOf(type) > -1) {
        Playback.mechanisimType = type;
    } else {
        throw new Error('游戏录制类型错误');
    }
};




var playbackController = {};
playbackController.runing = false;
playbackController.mechanisimType = null;

playbackController.startTimePlayback = function(data) {
    playbackController.runing = true;
    data.forEach(function(time) {
        setTimeout(function() {
            funcCache.doAction(data);
        }, time);
    });
};
playbackController.startFramePlayback = function(data) {
    playbackController.runing = true;
    playbackController.frameCount = 0;
    var loop = function() {
        if (data.indexOf(playbackController.frameCount) > -1){
            funcCache.doAction(data);
        }
        playbackController.frameCount++;
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(function() {
        loop();
    });
};


playbackController.startPlayback = function(type) {
    if (playbackController.runing) {
        throw new Error('已经在播放状态！');
    }
    playbackController.mechanisimType = type;
    switch (type) {
        case Playback.enum.mechanisimType.time:
            playbackController.startTimePlayback();
            break;

        case Playback.enum.mechanisimType.frame:
            playbackController.startFramePlayback();
            break;
    }
};

playbackController.stopPlayback = function() {
    playbackController.runing = false;
};



var contoller = {};
controller.startPlayback = function() {
    funcCache.startGame.forEach(function(func) {
        func();
    });
    playbackController.startPlayback(Player.mechanisimType);
};

controller.playerOver = function() {
    funcCache.playerOver.forEach(function(func) {
        func();
    });
};


function sendMessage(event, data) {

}

function receiveMessage(event) {
    var msg = event.data;
    var TYPE = EVENT_TYPE.PLAYBACK;
    switch (msg.type) {
        case TYPE.START_PLAYBACK:
            controller.startPlayback();
            break;
        case TYPE.PLAYER_OVER:
            controller.playerOver();
            break;
    }
}