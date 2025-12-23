//вообще принимает альбом
export function shuffle(playlist) {
    console.log("вызвал шафл");

    for (let i = playlist.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
    return playlist;
}
