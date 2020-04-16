import { Monster } from "./Monster";
import { Elements } from "../Enumerations/Elements";

export class FireMonster extends Monster
{
    constructor(){ 
        super("./images/Fire Monster.png");

        this.element = Elements.Fire;
        this.weakness = Elements.Water;
    }
}