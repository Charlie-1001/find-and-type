const soundList = {
  keyClick: `${import.meta.env.BASE_URL}sounds/key-click.wav`,
  bgSound: `${import.meta.env.BASE_URL}sounds/bgm-best-day-ever.mp3`,
  victorySound: `${import.meta.env.BASE_URL}sounds/eff-victory-ring.wav`,
}
const music = new Audio();
const bgm = new Audio();

export function playSound(sound, volume = 1, loop = false) {
  if (loop) {
    bgm.src = soundList[sound];
    bgm.volume = volume;
    bgm.loop = loop;
    bgm.play();
    return;
  }

  music.src = soundList[sound];
  music.volume = volume;
  music.loop = loop;
  music.play();
}

export function stopSound(soundType) {
  if (soundType === 'bgm') {
    bgm.pause();
    bgm.currentTime = 0;
  } else if (soundType === 'music') {
    music.pause();
    music.currentTime = 0;
  }
}