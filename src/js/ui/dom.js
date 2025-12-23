const playerNav = document.querySelector(".player__nav");
const repeatBtn = document.querySelector("#repeatBtn");
const mixBtn = document.querySelector("#mixBtn");
const volumeBtn = document.querySelector("#volumeBtn");
const volumeRange = document.querySelector("#volumeRange");

let song = document.querySelector("#song");
let progressTrack = document.querySelector("#progressTrack");

const coverEl = document.querySelector(".player__cover");
const titleEl = document.querySelector("h1");
const artistEl = document.querySelector("p");

const currentTimeDisplay = document.querySelector("#currentTime");
const durationDisplay = document.querySelector("#totalTime");

const prevBtn = document.querySelector("#prevTrack");
const playPauseBtn = document.querySelector("#playPause");
const nextBtn = document.querySelector("#nextTrack");

export {
    playerNav,
    repeatBtn,
    mixBtn,
    volumeBtn,
    volumeRange,
    song,
    progressTrack,
    coverEl,
    titleEl,
    artistEl,
    currentTimeDisplay,
    durationDisplay,
    prevBtn,
    playPauseBtn,
    nextBtn,
};
