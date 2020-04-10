import { Rect } from "./Rect";
export class Reel extends Rect {
    constructor() {
        super();
    }
    static setLastReelStopped(reelStopped) {
        this.lastReelStopped = reelStopped;
    }
}
