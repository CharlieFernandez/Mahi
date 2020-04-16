import { SoundFX } from "../Enumerations/SoundFX";
export class AudioManager {
    static get SoundMap() { return AudioManager.soundMap; }
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
    static initializeSharedAudio() {
        debugger;
        this.soundMap.set(SoundFX.Win, AudioManager.addAudio("../../audio/Win.mp3"));
        this.soundMap.set(SoundFX.FireSound, AudioManager.addAudio("../../audio/Fire Sound.mp3"));
        this.soundMap.set(SoundFX.WaterSound, AudioManager.addAudio("../../audio/Water Sound.wav"));
        this.soundMap.set(SoundFX.GrassSound, AudioManager.addAudio("../../audio/Grass Sound.wav"));
    }
}
AudioManager.soundMap = new Map();
