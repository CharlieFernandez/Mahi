export class FPSManager
{
    private static framesPassed = 0;
    private static animFrameRequest = 0;
    private static fps: number = 0;

    public static get Fps() {return FPSManager.fps;};

    private static startTime = 0;
    private static frameNumber = 0;

    public static startUpFPS(framesToPass: number): boolean
    {        
        FPSManager.framesPassed++;
        FPSManager.calculateFPS();
    
        if(FPSManager.framesPassed == framesToPass)
            return true;

        return false;
    }
    
    public static calculateFPS()
    {
        FPSManager.frameNumber++;
        let d = performance.now();	

        let currentTime = ( d - FPSManager.startTime ) / 1000;			
        let result = Math.floor( ( FPSManager.frameNumber / currentTime ));	

        if( currentTime > 1 ){			
            FPSManager.startTime = performance.now();			
            FPSManager.frameNumber = 0;		
        }

        FPSManager.fps = result;
    }
}