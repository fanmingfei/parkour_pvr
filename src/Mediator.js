var Mediator = {};

Mediator.emum.type = {
    player: "player",
    playback: "playback"
};

var isReady = false;
var isReadyStart = false;
var readyList = [];
Mediator.ready = function(type) {
    if (readyList.indexOf(type) == -1){
        readyList.push(type);
    }
    if (readyList.length == Object.keys(Mediator.emum.type).length) {
        isReady = true;
    }
    if (isReady && isReadyStart) {
        sendMessage(Mediator.emum.type.player, CONST.EVENT.PLAYER.GAME_START);
        sendMessage(Mediator.emum.type.playback, CONST.EVENT.PLAYBACK.GAME_START);
    }
};

Mediator.playerStart = function () {
    isReadyStart = true;
    if (isReady && isReadyStart) {
        sendMessage(Mediator.emum.type.player, CONST.EVENT.PLAYER.GAME_START);
        sendMessage(Mediator.emum.type.playback, CONST.EVENT.PLAYBACK.GAME_START);
    }
};

Mediator.playerOver = function () {
    sendMessage(Mediator.emum.type.playback, CONST.EVENT.PLAYER.PLAYER_OVER);
};

Mediator.playbackOver = function () {
    sendMessage(Mediator.emum.type.player, CONST.EVENT.PLAYER.PLAYBACK_OVER);
};


function sendMessage(type, eventName, data) {
}


function receiveMessage(event) {
    var msg = event.data;
    var TYPE = EVENT_TYPE.MEDIATOR;
    switch (msg.type) {
        case TYPE.PLAYER_READY:
            Mediator.ready(Mediator.emum.type.player);
            break;
        case TYPE.PLAYER_START:
            Mediator.playerStart();
            break;
        case TYPE.PLAYER_OVER:
            Mediator.playerOver();
            break;
        case TYPE.PLAYBACK_READY:
            Mediator.ready(Mediator.emum.type.playback);
            break;
        case TYPE.PLAYBACK_OVER:
            Mediator.playbackOver();
            break;
    }
}