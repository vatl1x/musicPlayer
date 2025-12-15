let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
const playAndPause = document.getElementById("playPause");
const prevBtn = document.querySelector("#prevTrack");
const nextBtn = document.querySelector("#nextTrack");
const repeatBtn = document.querySelector("#repeatBtn");
const mixBtn = document.querySelector("#mixBtn");
let isRepeat = false;
let isMix = false;

const currentTimeDisplay = document.querySelector(".current-time");
const durationDisplay = document.querySelector(".duration");

const tracks = [
    {
        title: "Кукла колдуна",
        artist: "Король и шут",
        img: "media/img/kish.webp",
        audio: "media/music/kish.mp3",
    },
    {
        title: "Моргенштерн",
        artist: "Повод",
        img: "media/img/povod.webp",
        audio: "media/music/povod.mp3",
    },
    {
        title: "Новогодняя",
        artist: "Дискотека Авария",
        img: "media/img/diskotekaAvaria.webp",
        audio: "media/music/diskotekaAvaria.mp3",
    },
];
let currentTrack = 0;
function loadTrack(index) {
    const track = tracks[index];
    const { title, artist, img, audio } = track;
    song.src = audio;
    document.querySelector(".song-img").src = img;
    document.querySelector("h1").textContent = title;
    document.querySelector("p").textContent = artist;
}
function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    song.play();
}
function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    song.play();
}
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);
//связано  с function formatTime
song.addEventListener("loadedmetadata", function () {
    //pr.max & pr.value используются для инпута времени
    progress.max = song.duration;
    progress.value = song.currentTime;
    //отображ времени окончания трека
    durationDisplay.textContent = formatTime(song.duration);
    
});
song.addEventListener("timeupdate", function () {
    currentTimeDisplay.textContent = formatTime(song.currentTime);
});

song.volume = 0.025;

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
    } else {
        song.play();
    }
}
song.addEventListener("play", function () {
    ctrlIcon.classList.replace("fa-play", "fa-pause");
});
function handlerSongEnd() {
    if (isRepeat) {
        song.currentTime = 0;
        song.play();
    } else nextTrack();
}
song.addEventListener("ended", handlerSongEnd);

song.addEventListener("pause", function () {
    ctrlIcon.classList.replace("fa-pause", "fa-play");
});
song.addEventListener("timeupdate", function () {
    progress.value = song.currentTime;
});

progress.addEventListener("change", function () {
    song.currentTime = progress.value;
    song.play();
});
playAndPause.addEventListener("click", playPause);

repeatBtn.addEventListener("click", function () {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active");
});
mixBtn.addEventListener("click", function () {
    isMix = !isMix;
    mixBtn.classList.toggle("active");
    //тут логика перемешки
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = Math.round(seconds % 60);
    return `${minutes}:${second < 10 ? "0" + second : second}`;
}
