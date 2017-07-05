# parkour_pvr
简单操作的跑酷游戏，与回放比赛，Player Vs. Recording。

在同屏幕有两个游戏同时运行，一个是玩家、一个是录像。

对简单的跑酷类游戏进行改造成PVR模式，目前只支持改造简单操作的，比如只需要点击键盘或者鼠标，控制跳或者攻击等动作。


Mediator 作为一个中介者，管理玩家和录像两个游戏的状态。


游戏接入SDK需要对游戏代码进行改造。

Player 玩家游戏，需要引入 Player.js 和 Mediator.js

Playback 录像游戏，需要引入 Playback.js 和 Mediator.js

Player 需要注册回调：

- Player.rigisterGameStart：游戏开始的回调（必须）
- Player.rigisterPlaybackOver：录像游戏结束的回调


Playback 需要注册回调：

- Playback.rigisterPlaybackStart：回放开始的回调（必须）
- Playback.rigisterPlayerkOver：玩家游戏结束的回调（必须）
- Playback.rigisterDoAction：游戏操作（回放功能）的回调（必须）

Player 需要设置录制方式：

`Player.setType`，有 帧录制 和 时间录制 两种方式。

```
Player.enum.mechanisimType = {
    time: 'time',
    frame: 'frame'
};
```


Player 游戏资源加载完成后，调用`Player.ready`;

Playback 游戏资源加载完成后，调用`Playback.ready`;

用户点击开始游戏，调用 `Player.playerStart`,

Mediator 检测到两个游戏的资源都准备好了，游戏开始，如果没有，进入排队状态

Mediator 会通知 Player/Playback 开始，他们分别调用通过`Player.rigisterGameStart`和`Playback.rigisterPlaybackStart`注册的回调。

如果Player/Playback游戏失败，调用`Player.playerOver`或`Playback.playbackOver`。

Madiator 会通知 Player/Playback ，会分别调用通过通过`Player.rigisterPlaybackOver`和`Playback.rigisterPlaybackOver`注册的回调。
