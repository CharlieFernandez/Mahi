export class AudioManager {
    static addAudio(audioPath) {
        let htmlAudioElement = document.createElement("audio");
        htmlAudioElement.src = audioPath;
        document.body.appendChild(htmlAudioElement);
        return htmlAudioElement;
    }
    static playAudio(htmlAudioElement, secondsUntilPlay) {
        secondsUntilPlay *= 1000;
        setTimeout(() => {
            htmlAudioElement.play();
        }, secondsUntilPlay);
    }
}
