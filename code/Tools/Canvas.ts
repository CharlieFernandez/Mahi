export class Canvas
{
    private static gameCanvas: HTMLCanvasElement;
    private static ctx: CanvasRenderingContext2D;
    private static reelCanvas: HTMLCanvasElement;
    private static reelCtx: CanvasRenderingContext2D;    

    public static get GameCanvas(): HTMLCanvasElement { return this.gameCanvas; }
    public static get Ctx(): CanvasRenderingContext2D { return this.ctx; }
    public static get ReelCanvas(): HTMLCanvasElement { return this.reelCanvas; }
    public static get ReelCtx(): CanvasRenderingContext2D { return this.reelCtx; }

    public static interactionEnabled = true;

    private static currentScale: number;
    public static get CurrentScale() { return this.currentScale; }

    private static allEvents: any[] = [];

    public static startUpCanvases() {
        this.gameCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;
        this.ctx = this.gameCanvas.getContext("2d") as CanvasRenderingContext2D;
        this.reelCanvas = document.getElementById("reel-canvas") as HTMLCanvasElement;
        this.reelCtx = this.reelCanvas.getContext("2d") as CanvasRenderingContext2D;

        Canvas.senseClick();

        this.resizeMainCanvas()
        window.addEventListener('resize', () => this.resizeMainCanvas());
    }

    public static senseClick()
    {
            this.gameCanvas.addEventListener("click", (mouse: MouseEvent)=>
            {
                if(this.interactionEnabled)
                    this.allEvents.forEach((event) => event(mouse, this.CurrentScale));
            });        
    }

    public static addMouseEvent(method: any)
    {
        this.allEvents.push(method);
    }

    public static removeMouseEvent(method: any)
    {
        this.allEvents.find((ele, index) =>
        { 
            if(ele == method)
                this.allEvents.splice(index, 1);
            return;
        });
    }

    public static resizeMainCanvas()
    {
        this.gameCanvas.width = innerWidth - 5;
        this.gameCanvas.height = innerHeight - 5;

        let personalWidth = 1280;
        let personalHeight = 886;

        let newScaleWidth = (personalWidth - (personalWidth - innerWidth)) / personalWidth;
        let newScaleHeight = (personalHeight - (personalHeight - innerHeight)) / personalHeight;

        if(newScaleWidth < newScaleHeight)
            this.currentScale = newScaleHeight;
        else
            this.currentScale = newScaleWidth;

        this.ctx.scale(this.currentScale, this.currentScale)
    }

    public static setCanvasReelSize(width: number, height: number)
    {
        this.reelCanvas.width = width;
        this.reelCanvas.height = height;
    }

    public static clearCanvases() {
        this.ctx.clearRect(0, 0, 4000, 4000);
        this.reelCtx.clearRect(0, 0, this.reelCanvas.width, this.reelCanvas.height);
    }
}