import { SoundFX } from "../Enumerations/SoundFX";

export class AudioManager
{
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
}