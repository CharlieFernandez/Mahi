import { SoundFX } from "../Enumerations/SoundFX";

export class AudioManager
{
    private static soundMap = new Map<SoundFX, HTMLAudioElement>();
    public static get SoundMap() { return AudioManager.soundMap; }
    

    public static addAudio(audioPath: string): HTMLAudioElement
    {
        let htmlAudioElement = document.createElement("audio");
        htmlAudioElement.src = audioPath;
        document.body.appendChild(htmlAudioElement);
        return htmlAudioElement;
    }

    public static playAudio(htmlAudioElement: HTMLAudioElement, secondsUntilPlay: number)
    {
        secondsUntilPlay *= 1000;
        setTimeout(() =>
        {
            htmlAudioElement.play();
        }, secondsUntilPlay);
    }

    public static initializeSharedAudio()
    {
        debugger;
        this.soundMap.set(SoundFX.Win, AudioManager.addAudio("../../audio/Win.mp3"));
        this.soundMap.set(SoundFX.FireSound, AudioManager.addAudio("../../audio/Fire Sound.mp3"));
        this.soundMap.set(SoundFX.WaterSound, AudioManager.addAudio("../../audio/Water Sound.wav"));
        this.soundMap.set(SoundFX.GrassSound, AudioManager.addAudio("../../audio/Grass Sound.wav"));
    }
}