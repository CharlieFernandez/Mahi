import { ScoreSymbol } from "./ScoreSymbol";
import { Elements } from "../../../Enumerations/Elements";

export class GrassSymbol extends ScoreSymbol
{
    public static readonly ImgPath: string = "../../../../images/Grass Symbol.png";

    constructor(protected x: number, protected y: number, length: number)
    {
        super(GrassSymbol.ImgPath, length, Elements.Grass);
    }
}