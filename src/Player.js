var Player = {};

Player.enum.mechanisimType = {
    time: 'time',
    frame: 'frame'
};


Player.ready = function() {
    sendMessage(CONST.MEDIATOR.PLAYER_READY);
};

Player.playerStart = function() {
    sendMessage(CONST.MEDIATOR.PLAYER_START);
};

Player.addAction = function(data) {
    recordController.addAction(data);
};

Player.playerOver = function(data) {
    sendMessage(CONST.MEDIATOR.PLAYER_OVER, data);
};


var funcCache = {
    gameStart: [],
    playbackOver: []
};

Player.rigisterGameStart = function(func) {
    funcCache.gameStart.push(func);
};

Player.rigisterPlaybackOver = function(func) {
    funcCache.playbackOver.push(func);
};


Player.mechanisimType = Player.enum.mechanisimType.time;
Player.setType = function(type) {
    if (Object.values(Player.enum.mechanisimType).indexOf(type) > -1) {
        Player.mechanisimType = type;
    } else {
        throw new Error('游戏录制类型错误');
    }
};




var recordController = {};
recordController.runing = false;
recordController.mechanisimType = null;
recordController.savedData = [];
recordController.requestId = 0;


recordController.createTimeRecord = function () {
    recordController.runing = true;
    recordController.startTime = Date.now();
};
recordController.createFrameRecord = function () {
    recordController.runing = true;
    recordController.frameCount = 0;
    var loop = function () {
        recordController.frameCount ++;
        recordController.requestId = requestAnimationFrame(function () {
            loop();
        });
    };
    recordController.requestId = requestAnimationFrame(function () {
        loop();
    });
};

recordController.addAction = function (data) {
    switch (recordController.mechanisimType) {
        case Player.enum.mechanisimType.time:
            var time = Date().now() - recordController.startTime;
            recordController.savedData.push({past: time, data: data});
        break;
        case Player.enum.mechanisimType.frame:
            recordController.savedData.push({past: recordController.frameCount, data: data});
        break;
    }
};

recordController.startRecord = function (type) {
    if (recordController.runing) {
        throw new Error('已经在录制状态！');
    }
    recordController.mechanisimType = type;
    switch (type) {
        case Player.enum.mechanisimType.time:
            recordController.createTimeRecord();
        break;

        case Player.enum.mechanisimType.frame:
            recordController.createFrameRecord();
        break;
    }
};

recordController.stopRecord = function () {
    // todo
    removeRequestAnimationFrame(recordController.requestId);
    recordController.runing = false;
};



var contoller = {};
controller.startGame = function() {
    funcCache.gameStart.forEach(function(func) {
        func();
    });
    recordController.startRecord(Player.mechanisimType);
};

controller.playBackOver = function() {
    funcCache.playbackOver.forEach(function(func) {
        func();
    });
};



function sendMessage(event, data) {

}


function receiveMessage(event) {
    var msg = event.data;
    var TYPE = EVENT_TYPE.PLAYER;
    switch (msg.type) {
        case TYPE.START_GAME:
            controller.startGame();
            break;
        case TYPE.PLAYBACK_OVER:
            controller.playBackOver();
            break;
    }
}

