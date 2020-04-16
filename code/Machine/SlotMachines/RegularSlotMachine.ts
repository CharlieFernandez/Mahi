import { SlotMachine } from "./SlotMachine";
import { RegularReel } from "../Reels/RegularReel";
import { Canvas } from "../../Tools/Canvas";
import { SlotButton } from "../SlotButtons/SlotButton";
import { Reel } from "../Reels/Reel";
import { AudioManager } from "../../Tools/AudioManager";
import { SoundFX } from "../../Enumerations/SoundFX";

export class RegularSlotMachine extends SlotMachine
{
/*
    x = 200;
    y = 100;
    width = 500;
    height = 270;
    fillColor = "rgb(22, 163, 219)";
    strokeColor = "black";
    strokeWidth = 0;*/
    constructor()
    {
        super(RegularSlotMachine.createRegularSlotMachineValues());
        this.soundMap.set(SoundFX.SlotMachineStart, AudioManager.addAudio("../../audio/Slot Machine Start.mp3"));
        this.setUpReels();       
    }

    static createRegularSlotMachineValues(): [number, number, number, number, string, string, number]
    {
        let x = 200;
        let y = 150;
        let width = 500;
        let height = 270;
        let fillColor = "rgb(22, 163, 219)";
        let strokeColor = "black";
        let strokeWidth = 0.01;

        return [x, y, width, height, fillColor, strokeColor, strokeWidth];
    }
    
    private setUpReels()
    {
        let numOfReels = 3;

        for(let i = 0; i < numOfReels; i++)
        {
            let newReel = new RegularReel(this.x, this.y, this.width, this.height, i);
            let newButton = new SlotButton(newReel.X, newReel.Y, newReel.Width, newReel.Height);

            newReel.addAssociatedButton(newButton);
            newButton.addAssociatedReel(newReel);

            this.allReels.push(newReel);            
            this.allButtons.push(newButton);
        }

        Canvas.setCanvasReelSize(this.allReels[0].Width * numOfReels, this.allReels[0].Height);
    }
}