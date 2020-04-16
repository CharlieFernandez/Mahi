import { Rect } from "../../GenericObjects/Rect";
import { Reel } from "../Reels/Reel";
import { SlotButton } from "../SlotButtons/SlotButton";
import { SoundFX } from "../../Enumerations/SoundFX";
import { AudioManager } from "../../Tools/AudioManager";

export class SlotMachine extends Rect
{
    protected allReels: Reel[] = [];
    public get AllReels() { return this.allReels; }
    protected allButtons: SlotButton[] =[];

    constructor(slotMachineValues: [number, number, number, number, string, string, number])
    {
        super(...slotMachineValues);
        this.soundMap.set(SoundFX.Win, AudioManager.addAudio("../../audio/Slot Machine Win.mp3"));
    }

    public startSlotMachine()
    {
        AudioManager.playAudio(this.soundMap.get(SoundFX.SlotMachineStart)!, 0);
        this.allReels.forEach(ele => ele.Action = "spin");
        Reel.setReelsSpinning();
    }
}