import { Rect } from "../../GenericObjects/Rect";
import { Reel } from "../Reels/Reel";
import { SoundFX } from "../../Enumerations/SoundFX";
import { AudioManager } from "../../Tools/AudioManager";
export class SlotMachine extends Rect {
    constructor(slotMachineValues) {
        super(...slotMachineValues);
        this.allReels = [];
        this.allButtons = [];
    }
    get AllReels() { return this.allReels; }
    startSlotMachine() {
        AudioManager.playAudio(this.soundMap.get(SoundFX.SlotMachineStart), 0);
        this.allReels.forEach(ele => ele.Action = "spin");
        Reel.setReelsSpinning();
    }
}
