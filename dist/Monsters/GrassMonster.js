import { Monster } from "./Monster";
import { Elements } from "../Enumerations/Elements";
export class GrassMonster extends Monster {
    constructor() {
        super("./images/Grass Monster.png");
        this.element = Elements.Grass;
        this.weakness = Elements.Fire;
    }
}
