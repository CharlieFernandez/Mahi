import { Rect } from "../../GenericObjects/Rect";
import { Reel } from "../Reels/Reel";
import { AudioManager } from "../../Tools/AudioManager";
import { SoundFX } from "../../Enumerations/SoundFX";

export class SlotButton extends Rect
{
    private associatedReel?: Reel = undefined;
    private static offColor: string = "#555555";
    private static onColor: string = "white";

    constructor(reelX: number, reelY: number, reelWidth:number, reelHeight: number)
    {
        super(...SlotButton.createButtonValues(reelX, reelY, reelWidth, reelHeight));
    }

    public static createButtonValues(reelX: number, reelY: number, reelWidth: number, reelHeight: number)
        : [number, number, number, number, string, string, number]
    {
        let buttonWidth = reelWidth / 3;
        let buttonHeight = buttonWidth * .66;
        let buttonXPos = reelX + buttonWidth;
        let buttonYPos = reelY + reelHeight + 30;
        let fillColor = this.offColor
        let strokeColor = "black";
        let strokeWidth = 2;

        return [buttonXPos, buttonYPos, buttonWidth, buttonHeight, fillColor, strokeColor, strokeWidth];
    }

    public addAssociatedReel(associatedReel: Reel)
    {
        this.associatedReel = associatedReel;
        this.sendMouseEvent(() =>
        {
            if(this.associatedReel?.Action == "spin"){
                this.associatedReel.Action = "prepare to slow";
                Reel.updateLastReelStopped(this.associatedReel);
            }          
        });
    }

    public toggleColor()
    {
        if(this.fillColor == SlotButton.offColor)
            this.fillColor = SlotButton.onColor;
        else
            this.fillColor = SlotButton.offColor;
    }
}