import { Rect } from "../../GenericObjects/Rect";
import { SlotSymbol } from "../Symbols/SlotSymbol";
import { Canvas } from "../../Tools/Canvas";
import { SlotButton } from "../SlotButtons/SlotButton";
import { AudioManager } from "../../Tools/AudioManager";
import { SoundFX } from "../../Enumerations/SoundFX";
import { ScoreSymbol } from "../Symbols/ScoreSymbols/ScoreSymbol";
import { WinConditions } from "../../Tools/WinConditions";
import { Testing } from "../../Tools/Testing";

export class Reel extends Rect
{
    protected static speed: number = 25;
    protected static lastReelStopped: Reel;
    private matchSpacing: number = 0;
    private distanceFromMatchPosition: number = 0;
    private currentSpeed: number = 0;
    protected symbolsOnReel: SlotSymbol[] = [];
    private associatedButton?: SlotButton;

    private index: number = 0;
    public get Index() { return this.index; }

    private static reelsSpinning = 0;

    private static slowSpeed: number = 3;
    private static framesOfSlowingDown: number = 15;

    private action: "spin" | "prepare to slow" | "slow" | "rise" | "stop" = "stop";

    public get Action() { return this.action; }
    public set Action(value: "spin" | "prepare to slow" | "slow" | "rise" | "stop")
    {
        if(this.action != value)
        {
            this.action = value;

            switch(this.action)
            {
                case "spin":
                    this.currentSpeed = Reel.speed;
                    this.associatedButton?.toggleColor();
                    break;
                case "prepare to slow":
                    this.associatedButton?.toggleColor();
                    break;
                case "slow":
                    this.currentSpeed = Reel.slowSpeed;                    
                    break;
                case "rise":
                    AudioManager.playAudio(this.soundMap.get(SoundFX.StopReel)!, 0);
                    this.currentSpeed = -Reel.slowSpeed;
                    break;
                case "stop":
                    Testing.checkForSelectedSymbol(this.reelIndex, this.symbolsOnReel as ScoreSymbol[]);

                    if(Reel.reelsSpinning == 0)
                    {
                        if(this.symbolsOnReel[0] instanceof ScoreSymbol)
                            WinConditions.checkResults();
                    }
            }
                
        }
    }

    constructor(x: number, protected y: number, protected width: number, protected height: number,
        protected fillColor: string, strokeColor: string, strokeWidth: number, private reelIndex: number)
    {
        super(x, y, width, height, fillColor, strokeColor, strokeWidth);
        this.x = x + width * reelIndex;
        this.soundMap.set(SoundFX.StopReel, AudioManager.addAudio("../../../../audio/Stop Reel.mp3"));
        this.index = reelIndex;
    }

    public static createReelValues(machineX: number, machineY: number, machineWidth: number, machineHeight: number, junk: number): [number, number, number, number, string, string, number, number]
    {
        let reelWidth = machineWidth / 4;        
        let reelHeight = machineHeight * .66;
        let reelXPos = machineX + reelWidth * 0.5;
        let reelYPos = machineY + machineHeight / 20;

        return [reelXPos, reelYPos, reelWidth, reelHeight, "0"," 0", 0, 0];
    }
    
    protected setUpReel(distinctSymbolClasses: any[], reelIndex: number)
    {
        let totalSymbolClasses = this.createListOfSymbols(distinctSymbolClasses);
        this.addSymbolsToReel(totalSymbolClasses, reelIndex);
    }

    public addAssociatedButton(associatedButton: SlotButton)
    {
        this.associatedButton = associatedButton;
    }

    private createListOfSymbols(distinctSymbolClasses: SlotSymbol[])
    {
        let totalSymbolClasses: SlotSymbol[] = [];

        for(let i = 0; i < 2; i++)
            distinctSymbolClasses.forEach(symbolClass =>
                totalSymbolClasses.push(symbolClass));

        return totalSymbolClasses;
    }

    private addSymbolsToReel(totalSymbolClasses: any[], reelIndex: number)
    {
        let [xPlacement, yPlacement, lengthOfSymbol, spacing] = SlotSymbol.createSymbolValues(this.width, this.height, reelIndex);
        this.matchSpacing = spacing;
        
        while(totalSymbolClasses.length > 0)
        {
            
            let indexOfSymbol = Math.floor(Math.random() * (totalSymbolClasses.length - 1));
            let symbolToBeSet = totalSymbolClasses[indexOfSymbol];
            this.symbolsOnReel.push(new symbolToBeSet(xPlacement, yPlacement, lengthOfSymbol));
            totalSymbolClasses.splice(indexOfSymbol, 1); 
            yPlacement += this.matchSpacing;
        }
    }

    public static setReelsSpinning()
    { 
        Reel.reelsSpinning = 3;
    }

    public performAction()
    {
        switch(this.action)
        {
            case "spin":
                this.spin();
                break;
            case "prepare to slow":
                this.prepareToSlow();
                break;
            case "slow":
                this.slow();
                break;
            case "rise":
                this.rise();
                break;
        }
    }

    private updateDistanceFromPotentialMatch()
    {
        this.distanceFromMatchPosition -= this.currentSpeed;

        if(this.distanceFromMatchPosition < 0)
            this.distanceFromMatchPosition = this.matchSpacing + this.distanceFromMatchPosition;
        else if(this.distanceFromMatchPosition >= this.matchSpacing)
            this.distanceFromMatchPosition = this.distanceFromMatchPosition - this.matchSpacing;
    }

    private spin()
    {
        let circumference = (this.symbolsOnReel[0].Height + this.matchSpacing) * 3 + this.symbolsOnReel[0].Height;
        this.symbolsOnReel.forEach(ele =>
            {
                ele.descend(this.currentSpeed, circumference);
            });

        this.updateDistanceFromPotentialMatch();
    }

    private prepareToSlow()
    {
        let willPassMatchPosition = this.distanceFromMatchPosition - this.currentSpeed <= 0;
        if(willPassMatchPosition)
            this.currentSpeed = this.distanceFromMatchPosition;

        this.spin();

        if(willPassMatchPosition)
            this.Action = "slow";
    }

    private slow()
    {
        this.currentSpeed -= Reel.slowSpeed / Reel.framesOfSlowingDown;
        this.spin();

        if(this.currentSpeed <= 0)
        {
            this.currentSpeed = 0;
            this.Action = "rise";
        }
    }

    private rise()
    {
        let willPassMatchPosition = this.distanceFromMatchPosition - this.currentSpeed >= this.matchSpacing;

        if(willPassMatchPosition){
            this.currentSpeed = this.distanceFromMatchPosition - this.matchSpacing;
        }

        this.spin();

        if(willPassMatchPosition){
            Reel.reelsSpinning--;
            this.Action = "stop";
        }
    }

    public static updateLastReelStopped(reelStopped: Reel)
    {
        Reel.lastReelStopped = reelStopped;
    }

    protected draw()
    {
        super.draw();

        if(this.reelIndex == 0)
            this.drawReelCanvas();
    }

    private async drawReelCanvas()
    {
        if(await true) Canvas.Ctx.drawImage(Canvas.ReelCanvas, this.x, this.y, Canvas.ReelCanvas.width, Canvas.ReelCanvas.height);
    }
}