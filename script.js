let progressTrack = document.querySelector("#progressTrack");
const volumeRange = document.querySelector("#volumeRange");
let song = document.querySelector("#song");
const playPauseBtn = document.querySelector("#playPause");
const prevBtn = document.querySelector("#prevTrack");
const nextBtn = document.querySelector("#nextTrack");
const repeatBtn = document.querySelector("#repeatBtn");
const mixBtn = document.querySelector("#mixBtn");
let isRepeat = false;
let isMix = false;

const currentTimeDisplay = document.querySelector("#currentTime");
const durationDisplay = document.querySelector("#totalTime");

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
    {
        title: "Манхэттен",
        artist: "БАНД'ЭРОС",
        img: "media/img/mankhjetten.webp",
        audio: "media/music/mankhjetten.mp3",
    },
];
loadTrack(0);
let currentTrack = 0;
function loadTrack(index) {
    const track = tracks[index];
    const { title, artist, img, audio } = track;
    song.src = audio;
    document.querySelector(".player__cover").src = img;
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
    //prTrack.max & prTrack.value используются для инпута времени
    progressTrack.max = song.duration;
    progressTrack.value = song.currentTime;
    //отображ времени окончания трека
    durationDisplay.textContent = formatTime(song.duration);
    song.volume = 0.5;
    volumeRange.value = song.volume * 100;
});

function playPause() {
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}
song.addEventListener("play", function () {
    playPauseBtn.classList.add("playing");
});
function handlerSongEnd() {
    if (isRepeat) {
        song.currentTime = 0;
        song.play();
    } else nextTrack();
}
song.addEventListener("ended", handlerSongEnd);

song.addEventListener("pause", function () {
    playPauseBtn.classList.remove("playing");
});
song.addEventListener("timeupdate", function () {
    progressTrack.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime);
});

progressTrack.addEventListener("change", function () {
    song.currentTime = progressTrack.value;
    song.play();
});
playPauseBtn.addEventListener("click", playPause);

volumeRange.addEventListener("input", function () {
    console.log(song.volume, volumeRange.value);
    song.volume = volumeRange.value / 100;
});
repeatBtn.addEventListener("click", function () {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active");
});
mixBtn.addEventListener("click", function () {
    isMix = !isMix;
    mixBtn.classList.toggle("active");

    //тут логика перемешки(сделал в тупую/ тк не добавлен плейлист)
    if (isMix) {
        shuffle(tracks);
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    return `${minutes}:${second < 10 ? "0" + second : second}`;
}

//кнопка звука
const playerNav = document.querySelector(".player__nav");
const volumeBtn = document.querySelector("#volumeBtn");
volumeBtn.addEventListener("click", function () {
    playerNav.classList.toggle("volume-active");
});

//перемешка
/*

как трек закончился или включили следующий, то перемешиваем(вызываем функцию) каждый раз?

*/

//вообще принимает альбом
function shuffle(playlist) {
    console.log("вызвал шафл");
    console.log(tracks);

    for (let i = playlist.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
    return playlist;
}
