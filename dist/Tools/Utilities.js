export class Utilities {
    static get Fps() { return Utilities.fps; }
    ;
    static startUpFPS(framesToPass) {
        Utilities.framesPassed++;
        Utilities.calculateFPS();
        if (Utilities.framesPassed == framesToPass)
            return true;
        return false;
    }
    static calculateFPS() {
        Utilities.frameNumber++;
        let d = performance.now();
        let currentTime = (d - Utilities.startTime) / 1000;
        let result = Math.floor((Utilities.frameNumber / currentTime));
        if (currentTime > 1) {
            Utilities.startTime = performance.now();
            Utilities.frameNumber = 0;
        }
        Utilities.fps = result;
    }
}
Utilities.framesPassed = 0;
Utilities.animFrameRequest = 0;
Utilities.fps = 0;
Utilities.startTime = 0;
Utilities.frameNumber = 0;
