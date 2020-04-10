import { Rect } from "./Rect";

export class Reel extends Rect
{
    protected static speed: number;
    protected static lastReelStopped: Reel;

    constructor()
    {
        super();
    }

    static setLastReelStopped(reelStopped: Reel)
    {
        this.lastReelStopped = reelStopped;
    }
}