import { Sprite } from "../../GenericObjects/Sprite";
import { Canvas } from "../../Tools/Canvas";
export class SlotSymbol extends Sprite {
    constructor(imgPath, length, element) {
        super(imgPath);
        this.type = 0;
        this.width = length;
        this.height = length;
        this.type = element;
        SlotSymbol.allSymbols.push(this);
    }
    static get Spacing() { return this.spacing; }
    get Type() { return this.type; }
    static get AllSymbols() { return SlotSymbol.allSymbols; }
    static createSymbolValues(reelWidth, reelHeight, reelIndex) {
        let lengthOfSymbol = reelHeight / 4;
        let xPlacement = reelIndex * reelWidth + (reelWidth - lengthOfSymbol) / 2;
        this.spacing = reelHeight / 3;
        let yPlacement = this.spacing / 6;
        return [xPlacement, yPlacement, lengthOfSymbol, this.spacing];
    }
    descend(speed, circumference) {
        let y = this.y;
        y += speed;
        if (y > circumference / 2)
            this.y = y - circumference;
        else if (y < -circumference / 2)
            this.y = y + circumference;
        else
            this.y = y;
    }
    draw() {
        this.doAnimations();
        Canvas.ReelCtx.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
    }
}
SlotSymbol.spacing = 0;
SlotSymbol.allSymbols = [];
