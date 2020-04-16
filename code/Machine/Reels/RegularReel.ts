import { Reel } from "./Reel";
import { FireSymbol } from "../Symbols/ScoreSymbols/FireSymbol";
import { WaterSymbol } from "../Symbols/ScoreSymbols/WaterSymbol";
import { GrassSymbol } from "../Symbols/ScoreSymbols/GrassSymbol";

export class RegularReel extends Reel
{
    private static regularReels: RegularReel[] = [];
    public static get RegularReels() { return this.regularReels; }

    constructor(machineX: number, machineY: number, machineWidth: number, machineHeight: number, reelIndex: number)
    {
        super(...RegularReel.createReelValues(machineX, machineY, machineWidth, machineHeight, reelIndex));
        this.setUpReel([FireSymbol, WaterSymbol, GrassSymbol], reelIndex);
        RegularReel.regularReels.push(this);
    }

    public static createReelValues(machineX: number, machineY: number, machineWidth: number, machineHeight: number, reelIndex: number)
        :[number, number, number, number, string, string, number, number]
    {
        let newFillColor = "rgba(4, 15, 56, 178)";
        let newStrokeColor = "rgb(22, 163, 219)";
        let newStrokeWidth = 3;

        let [reelX, reelY, reelWidth, reelHeight, junk, junk2, junk3] = Reel.createReelValues(machineX, machineY, machineWidth, machineHeight, reelIndex);

        return [reelX, reelY, reelWidth, reelHeight, newFillColor, newStrokeColor, newStrokeWidth, reelIndex];
    }
}