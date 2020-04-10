import { SlotMachine } from "./SlotMachine";
import { RegularReel } from "./RegularReel";

export class RegularSlotMachine extends SlotMachine
{
    x = 200;
    y = 200;
    width = 270;
    height = 120;
    fillColor = "black";
    strokeColor = "yellow";
    strokeWidth = 5;

    constructor()
    {
        super();        

        let reelWidth = this.width / 3;
        
        for(let i = 0; i < 3; i++)
            this.allReels.push(new RegularReel(this.x + reelWidth * i, this.y, reelWidth, this.height));
    }
}