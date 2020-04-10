import { Reel } from "./Reel";

export class RegularReel extends Reel
{
    private symbols: any //Later will be Score Symbol

    constructor(x: number, y: number, width: number, height: number)
    {
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