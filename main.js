const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const title = document.getElementById('track-title');
const artist = document.getElementById('track-artist');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('total-duration');
const volumeSlider = document.getElementById('volume-slider');

// 1. Preloaded Track Information List (Using public copyright-free media streams)
const songs = [
  {
    name: 'Retro Synthwave',
    artist: 'Hobbyist Producer',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    name: 'Lo-Fi Chill Beats',
    artist: 'Coffee Shop Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    name: 'Ambient Electronic',
    artist: 'Digital Horizon',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  }
];

let songIndex = 0;

// Initialize & load the active track info state
function loadSong(song) {
  title.textContent = song.name;
  artist.textContent = song.artist;
  audio.src = song.url;
}

function playSong() {
  playBtn.textContent = '⏸';
  playBtn.setAttribute('title', 'Pause');
  audio.play();
}

function pauseSong() {
  playBtn.textContent = '▶';
  playBtn.setAttribute('title', 'Play');
  audio.pause();
}

// Track progress updating calculation logic
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (!duration) return;
  
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Dynamic formatting calculation loops for duration tracking layouts
  let currentMins = Math.floor(currentTime / 60);
  let currentSecs = Math.floor(currentTime % 60);
  if (currentSecs < 10) currentSecs = `0${currentSecs}`;
  currentTimeEl.textContent = `${currentMins}:${currentSecs}`;

  let durationMins = Math.floor(duration / 60);
  let durationSecs = Math.floor(duration % 60);
  if (durationSecs < 10) durationSecs = `0${durationSecs}`;
  durationTimeEl.textContent = `${durationMins}:${durationSecs}`;
}

// Seek inside the audio track container timeline frame layout
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
}

// Navigational logic operations
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// Wire Event Track Triggers
playBtn.addEventListener('click', () => {
  const isPlaying = playBtn.textContent === '⏸';
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong); // Auto-advances cleanly to the next loop block

volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Primary load instantiation target configuration profile deployment parameters
loadSong(songs[songIndex]);
audio.volume = volumeSlider.value;