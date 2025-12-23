import {
    song,
    coverEl,
    titleEl,
    artistEl,
    progressTrack,
    durationDisplay,
    volumeRange,
    playPauseBtn,
    repeatBtn,
    mixBtn,
    playerNav,
    currentTimeDisplay,
} from "./dom.js";
import { tracks } from "../data/tracks.js";
import { formatTime } from "../utils/formatTime.js";
import { shuffle } from "../utils/shuffle.js";

let currentTrack = 0;
let isRepeat = false;
let isMix = false;

export function loadTrack(index) {
    const { title, artist, img, audio } = tracks[index];

    song.src = audio;
    coverEl.src = img;
    titleEl.textContent = title;
    artistEl.textContent = artist;
}

export function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    song.play();
}

export function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    song.play();
}

export function playPause() {
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

export function handlerSongEnd() {
    if (isRepeat) {
        song.currentTime = 0;
        song.play();
    } else nextTrack();
}

export function handlerLoadMetadata() {
    //prTrack.max & prTrack.value используются для инпута времени
    progressTrack.max = song.duration;
    progressTrack.value = song.currentTime;
    //отображ времени окончания трека
    durationDisplay.textContent = formatTime(song.duration);

    volumeRange.value = song.volume * 100;
}

export function syncPlayButton() {
    playPauseBtn.classList.toggle("playing", !song.paused);
}

export function handlerRepeatTrack() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active");
}

export function handlerShuffle() {
    isMix = !isMix;
    mixBtn.classList.toggle("active");

    //тут логика перемешки(сделал в тупую/ тк не добавлен плейлист)
    if (isMix) {
        shuffle(tracks);
    }
}

export function handlerVolumeButtonClick() {
    playerNav.classList.toggle("volume-active");
}

export function handlerVolumeRangeChange() {
    song.volume = volumeRange.value / 100;
}

export function handlerTimeUpdate() {
    progressTrack.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime);
}

export function handlerSeekChange() {
    song.currentTime = Number(progressTrack.value);
    song.play();
}
