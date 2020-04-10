import { Rect } from "./Rect";
import { Reel } from "./Reel";

export class SlotMachine extends Rect
{
    protected allReels: Reel[] = [];

    constructor(){ super(); }
}