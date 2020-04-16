export class FPSManager {
    static get Fps() { return FPSManager.fps; }
    ;
    static startUpFPS(framesToPass) {
        FPSManager.framesPassed++;
        FPSManager.calculateFPS();
        if (FPSManager.framesPassed == framesToPass)
            return true;
        return false;
    }
    static calculateFPS() {
        FPSManager.frameNumber++;
        let d = performance.now();
        let currentTime = (d - FPSManager.startTime) / 1000;
        let result = Math.floor((FPSManager.frameNumber / currentTime));
        if (currentTime > 1) {
            FPSManager.startTime = performance.now();
            FPSManager.frameNumber = 0;
        }
        FPSManager.fps = result;
    }
}
FPSManager.framesPassed = 0;
FPSManager.animFrameRequest = 0;
FPSManager.fps = 0;
FPSManager.startTime = 0;
FPSManager.frameNumber = 0;
