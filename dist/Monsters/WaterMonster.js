import { Monster } from "./Monster";
import { Elements } from "../Enumerations/Elements";
export class WaterMonster extends Monster {
    constructor() {
        super("./images/Water Monster.png");
        this.element = Elements.Water;
        this.weakness = Elements.Grass;
    }
}
