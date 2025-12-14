let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
const playAndPause = document.getElementById("playPause");
const prevBtn = document.querySelector('#prevTrack')
const nextBtn = document.querySelector('#nextTrack')

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
prevBtn.addEventListener('click', prevTrack)
nextBtn.addEventListener('click', nextTrack)

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};
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
song.addEventListener("ended", function () {
    nextTrack()
});

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
