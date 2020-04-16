import { ScoreSymbol } from "./ScoreSymbol";
import { Elements } from "../../../Enumerations/Elements";
export class GrassSymbol extends ScoreSymbol {
    constructor(x, y, length) {
        super(GrassSymbol.ImgPath, length, Elements.Grass);
        this.x = x;
        this.y = y;
    }
}
GrassSymbol.ImgPath = "../../../../images/Grass Symbol.png";
