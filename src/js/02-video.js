import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const CURRENT_PLAYER_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('loaded', function () {
  const currentTime = localStorage.getItem(CURRENT_PLAYER_TIME);
  if (currentTime) {
    player.setCurrentTime(Number(JSON.parse(currentTime)));
  }
});

player.on(
  'timeupdate',
  throttle(function () {
    player
      .getCurrentTime()
      .then(sec =>
        localStorage.setItem(CURRENT_PLAYER_TIME, JSON.stringify(sec))
      );
  }, 1000)
);
