import { ScoreSymbol } from "./ScoreSymbol";
import { Elements } from "../../../Enumerations/Elements";
export class FireSymbol extends ScoreSymbol {
    //public static 
    constructor(x, y, length) {
        super(FireSymbol.ImgPath, length, Elements.Fire);
        this.x = x;
        this.y = y;
    }
}
FireSymbol.ImgPath = "../../../../images/Fire Symbol.png";
