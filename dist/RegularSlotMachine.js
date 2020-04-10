import { SlotMachine } from "./SlotMachine";
import { RegularReel } from "./RegularReel";
export class RegularSlotMachine extends SlotMachine {
    constructor() {
        super();
        this.x = 200;
        this.y = 200;
        this.width = 270;
        this.height = 120;
        this.fillColor = "black";
        this.strokeColor = "yellow";
        this.strokeWidth = 5;
        let reelWidth = this.width / 3;
        for (let i = 0; i < 3; i++)
            this.allReels.push(new RegularReel(this.x + reelWidth * i, this.y, reelWidth, this.height));
    }
}
