import { Sprite } from "../../GenericObjects/Sprite";
import { Canvas } from "../../Tools/Canvas";
import { Elements } from "../../Enumerations/Elements";
import { SoundFX } from "../../Enumerations/SoundFX";
import { AudioManager } from "../../Tools/AudioManager";

export class SlotSymbol extends Sprite
{
    private static spacing: number = 0;
    public static get Spacing() { return this.spacing; }
    protected type: number = 0;
    public get Type() { return this.type;}

    private static allSymbols: SlotSymbol[] = [];
    public static get AllSymbols() { return SlotSymbol.allSymbols; }

    constructor(imgPath: string, length: number, element: Elements){
        super(imgPath);        
        this.width = length;
        this.height = length;
        this.type = element;
        SlotSymbol.allSymbols.push(this);
    }

    public static createSymbolValues(reelWidth: number, reelHeight:number, reelIndex: number ): number[]
    {
        let lengthOfSymbol = reelHeight / 4;
        let xPlacement = reelIndex * reelWidth + (reelWidth - lengthOfSymbol) / 2;
        this.spacing = reelHeight / 3;
        let yPlacement = this.spacing / 6;

        return [xPlacement, yPlacement, lengthOfSymbol, this.spacing];
    }

    public descend(speed: number, circumference: number)
    {
        let y = this.y;
        y += speed;

        if(y > circumference / 2)
            this.y = y - circumference;
        else if(y < -circumference / 2)
            this.y = y + circumference;
        else
            this.y = y;
    }

    protected draw()
    {
        this.doAnimations();
        
        Canvas.ReelCtx.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
    }    
}