import { Rect } from "../../GenericObjects/Rect";
import { Reel } from "../Reels/Reel";
export class SlotButton extends Rect {
    constructor(reelX, reelY, reelWidth, reelHeight) {
        super(...SlotButton.createButtonValues(reelX, reelY, reelWidth, reelHeight));
        this.associatedReel = undefined;
    }
    static createButtonValues(reelX, reelY, reelWidth, reelHeight) {
        let buttonWidth = reelWidth / 3;
        let buttonHeight = buttonWidth * .66;
        let buttonXPos = reelX + buttonWidth;
        let buttonYPos = reelY + reelHeight + 30;
        let fillColor = this.offColor;
        let strokeColor = "black";
        let strokeWidth = 2;
        return [buttonXPos, buttonYPos, buttonWidth, buttonHeight, fillColor, strokeColor, strokeWidth];
    }
    addAssociatedReel(associatedReel) {
        this.associatedReel = associatedReel;
        this.sendMouseEvent(() => {
            var _a;
            if (((_a = this.associatedReel) === null || _a === void 0 ? void 0 : _a.Action) == "spin") {
                this.associatedReel.Action = "prepare to slow";
                Reel.updateLastReelStopped(this.associatedReel);
            }
        });
    }
    toggleColor() {
        if (this.fillColor == SlotButton.offColor)
            this.fillColor = SlotButton.onColor;
        else
            this.fillColor = SlotButton.offColor;
    }
}
SlotButton.offColor = "#555555";
SlotButton.onColor = "white";
