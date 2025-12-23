export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    return `${minutes}:${second < 10 ? "0" + second : second}`;
}
