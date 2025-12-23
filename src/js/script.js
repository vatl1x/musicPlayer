import {
    song,
    repeatBtn,
    mixBtn,
    volumeBtn,
    volumeRange,
    progressTrack,
    prevBtn,
    playPauseBtn,
    nextBtn,
} from "./ui/dom.js";
import {
    loadTrack,
    handlerLoadMetadata,
    prevTrack,
    playPause,
    nextTrack,
    handlerRepeatTrack,
    handlerShuffle,
    handlerVolumeButtonClick,
    handlerVolumeRangeChange,
    syncPlayButton,
    handlerSeekChange,
    handlerTimeUpdate,
    handlerSongEnd,
} from "./ui/player.js";

song.addEventListener("loadedmetadata", handlerLoadMetadata);
song.volume = 0.1;
loadTrack(0);

song.addEventListener("play", syncPlayButton);
song.addEventListener("pause", syncPlayButton);
song.addEventListener("ended", handlerSongEnd);
song.addEventListener("timeupdate", handlerTimeUpdate);

repeatBtn.addEventListener("click", handlerRepeatTrack);
mixBtn.addEventListener("click", handlerShuffle);

volumeBtn.addEventListener("click", handlerVolumeButtonClick);
volumeRange.addEventListener("input", handlerVolumeRangeChange);

progressTrack.addEventListener("change", handlerSeekChange);

prevBtn.addEventListener("click", prevTrack);
playPauseBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextTrack);
