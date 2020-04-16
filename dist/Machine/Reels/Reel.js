var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Rect } from "../../GenericObjects/Rect";
import { SlotSymbol } from "../Symbols/SlotSymbol";
import { Canvas } from "../../Tools/Canvas";
import { AudioManager } from "../../Tools/AudioManager";
import { SoundFX } from "../../Enumerations/SoundFX";
import { ScoreSymbol } from "../Symbols/ScoreSymbols/ScoreSymbol";
import { WinConditions } from "../../Tools/WinConditions";
import { Testing } from "../../Tools/Testing";
export class Reel extends Rect {
    constructor(x, y, width, height, fillColor, strokeColor, strokeWidth, reelIndex) {
        super(x, y, width, height, fillColor, strokeColor, strokeWidth);
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.reelIndex = reelIndex;
        this.matchSpacing = 0;
        this.distanceFromMatchPosition = 0;
        this.currentSpeed = 0;
        this.symbolsOnReel = [];
        this.index = 0;
        this.action = "stop";
        this.x = x + width * reelIndex;
        this.soundMap.set(SoundFX.StopReel, AudioManager.addAudio("../../../../audio/Stop Reel.mp3"));
        this.index = reelIndex;
    }
    get Index() { return this.index; }
    get Action() { return this.action; }
    set Action(value) {
        var _a, _b;
        if (this.action != value) {
            this.action = value;
            switch (this.action) {
                case "spin":
                    this.currentSpeed = Reel.speed;
                    (_a = this.associatedButton) === null || _a === void 0 ? void 0 : _a.toggleColor();
                    break;
                case "prepare to slow":
                    (_b = this.associatedButton) === null || _b === void 0 ? void 0 : _b.toggleColor();
                    break;
                case "slow":
                    this.currentSpeed = Reel.slowSpeed;
                    break;
                case "rise":
                    AudioManager.playAudio(this.soundMap.get(SoundFX.StopReel), 0);
                    this.currentSpeed = -Reel.slowSpeed;
                    break;
                case "stop":
                    Testing.checkForSelectedSymbol(this.reelIndex, this.symbolsOnReel);
                    if (Reel.reelsSpinning == 0) {
                        if (this.symbolsOnReel[0] instanceof ScoreSymbol)
                            WinConditions.checkResults();
                    }
            }
        }
    }
    static createReelValues(machineX, machineY, machineWidth, machineHeight, junk) {
        let reelWidth = machineWidth / 4;
        let reelHeight = machineHeight * .66;
        let reelXPos = machineX + reelWidth * 0.5;
        let reelYPos = machineY + machineHeight / 20;
        return [reelXPos, reelYPos, reelWidth, reelHeight, "0", " 0", 0, 0];
    }
    setUpReel(distinctSymbolClasses, reelIndex) {
        let totalSymbolClasses = this.createListOfSymbols(distinctSymbolClasses);
        this.addSymbolsToReel(totalSymbolClasses, reelIndex);
    }
    addAssociatedButton(associatedButton) {
        this.associatedButton = associatedButton;
    }
    createListOfSymbols(distinctSymbolClasses) {
        let totalSymbolClasses = [];
        for (let i = 0; i < 2; i++)
            distinctSymbolClasses.forEach(symbolClass => totalSymbolClasses.push(symbolClass));
        return totalSymbolClasses;
    }
    addSymbolsToReel(totalSymbolClasses, reelIndex) {
        let [xPlacement, yPlacement, lengthOfSymbol, spacing] = SlotSymbol.createSymbolValues(this.width, this.height, reelIndex);
        this.matchSpacing = spacing;
        while (totalSymbolClasses.length > 0) {
            let indexOfSymbol = Math.floor(Math.random() * (totalSymbolClasses.length - 1));
            let symbolToBeSet = totalSymbolClasses[indexOfSymbol];
            this.symbolsOnReel.push(new symbolToBeSet(xPlacement, yPlacement, lengthOfSymbol));
            totalSymbolClasses.splice(indexOfSymbol, 1);
            yPlacement += this.matchSpacing;
        }
    }
    static setReelsSpinning() {
        Reel.reelsSpinning = 3;
    }
    performAction() {
        switch (this.action) {
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
    updateDistanceFromPotentialMatch() {
        this.distanceFromMatchPosition -= this.currentSpeed;
        if (this.distanceFromMatchPosition < 0)
            this.distanceFromMatchPosition = this.matchSpacing + this.distanceFromMatchPosition;
        else if (this.distanceFromMatchPosition >= this.matchSpacing)
            this.distanceFromMatchPosition = this.distanceFromMatchPosition - this.matchSpacing;
    }
    spin() {
        let circumference = (this.symbolsOnReel[0].Height + this.matchSpacing) * 3 + this.symbolsOnReel[0].Height;
        this.symbolsOnReel.forEach(ele => {
            ele.descend(this.currentSpeed, circumference);
        });
        this.updateDistanceFromPotentialMatch();
    }
    prepareToSlow() {
        let willPassMatchPosition = this.distanceFromMatchPosition - this.currentSpeed <= 0;
        if (willPassMatchPosition)
            this.currentSpeed = this.distanceFromMatchPosition;
        this.spin();
        if (willPassMatchPosition)
            this.Action = "slow";
    }
    slow() {
        this.currentSpeed -= Reel.slowSpeed / Reel.framesOfSlowingDown;
        this.spin();
        if (this.currentSpeed <= 0) {
            this.currentSpeed = 0;
            this.Action = "rise";
        }
    }
    rise() {
        let willPassMatchPosition = this.distanceFromMatchPosition - this.currentSpeed >= this.matchSpacing;
        if (willPassMatchPosition) {
            this.currentSpeed = this.distanceFromMatchPosition - this.matchSpacing;
        }
        this.spin();
        if (willPassMatchPosition) {
            Reel.reelsSpinning--;
            this.Action = "stop";
        }
    }
    static updateLastReelStopped(reelStopped) {
        Reel.lastReelStopped = reelStopped;
    }
    draw() {
        super.draw();
        if (this.reelIndex == 0)
            this.drawReelCanvas();
    }
    drawReelCanvas() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield true)
                Canvas.Ctx.drawImage(Canvas.ReelCanvas, this.x, this.y, Canvas.ReelCanvas.width, Canvas.ReelCanvas.height);
        });
    }
}
Reel.speed = 25;
Reel.reelsSpinning = 0;
Reel.slowSpeed = 3;
Reel.framesOfSlowingDown = 15;
