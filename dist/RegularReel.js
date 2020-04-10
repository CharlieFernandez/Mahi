import { Reel } from "./Reel";
export class RegularReel extends Reel {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = "#CCCCCC";
        this.strokeColor = "black";
        this.strokeWidth = 3;
    }
}
