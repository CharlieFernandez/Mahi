import { SoundFX } from "../Enumerations/SoundFX";
export class Audio {
    static createAudioFiles() {
        let srcMap = new Array();
        srcMap.push(SoundFX.SlotMachineStart, "../../audio/Slot Machine Start.mp3");
        srcMap.push(SoundFX.PullLever, "../../audio/Pull Lever.mp3");
        srcMap.push(SoundFX.StopReel, "../../audio/Stop Reel.mp3");
        srcMap.push(SoundFX.Win, "../../audio/Slot Machine Win.mp3");
        srcMap.push(SoundFX.FireSound, "../../audio/Fire Sound.mp3");
        srcMap.push(SoundFX.WaterSound, "../../audio/Water Sound.wav");
        srcMap.push(SoundFX.GrassSound, "../../audio/Grass Sound.wav");
        for (let i = 0; i < srcMap.length; i += 2) {
            let audioFile = document.createElement("audio");
            audioFile.src = srcMap[i + 1];
            document.body.appendChild(audioFile);
            Audio.soundMap.set(srcMap[i], audioFile);
        }
        console.log(Audio.soundMap);
    }
    static playAudio(soundFX, secondsUntilPlay) {
        secondsUntilPlay *= 1000;
        setTimeout(() => {
            var _a;
            (_a = Audio.soundMap.get(soundFX)) === null || _a === void 0 ? void 0 : _a.play();
            console.log(Audio.soundMap.get(soundFX));
        }, secondsUntilPlay);
    }
}
Audio.soundMap = new Map();
