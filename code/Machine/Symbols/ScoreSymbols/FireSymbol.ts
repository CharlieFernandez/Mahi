import { ScoreSymbol } from "./ScoreSymbol";
import { Elements } from "../../../Enumerations/Elements";

export class FireSymbol extends ScoreSymbol
{
    public static readonly ImgPath: string = "../../../../images/Fire Symbol.png";
    //public static 

    constructor(protected x: number, protected y: number, length: number)
    {
        super(FireSymbol.ImgPath, length, Elements.Fire);
    }
}