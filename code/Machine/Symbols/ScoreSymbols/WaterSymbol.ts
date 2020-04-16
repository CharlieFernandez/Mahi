import { ScoreSymbol } from "./ScoreSymbol";
import { Elements } from "../../../Enumerations/Elements";

export class WaterSymbol extends ScoreSymbol
{
    public static readonly ImgPath: string = "../../../../images/Water Symbol.png"
    constructor(protected x: number, protected y: number, length: number)
    {
        super(WaterSymbol.ImgPath, length, Elements.Water);
    }
}