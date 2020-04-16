import { ScoreSymbol } from "./ScoreSymbol";
import { Elements } from "../../../Enumerations/Elements";
export class WaterSymbol extends ScoreSymbol {
    constructor(x, y, length) {
        super(WaterSymbol.ImgPath, length, Elements.Water);
        this.x = x;
        this.y = y;
    }
}
WaterSymbol.ImgPath = "../../../../images/Water Symbol.png";
