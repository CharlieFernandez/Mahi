export class Canvas {
    static get GameCanvas() { return this.gameCanvas; }
    static get Ctx() { return this.ctx; }
    static get ReelCanvas() { return this.reelCanvas; }
    static get ReelCtx() { return this.reelCtx; }
    static get CurrentScale() { return this.currentScale; }
    static startUpCanvases() {
        this.gameCanvas = document.getElementById("main-canvas");
        this.ctx = this.gameCanvas.getContext("2d");
        this.reelCanvas = document.getElementById("reel-canvas");
        this.reelCtx = this.reelCanvas.getContext("2d");
        Canvas.senseClick();
        this.resizeMainCanvas();
        window.addEventListener('resize', () => this.resizeMainCanvas());
    }
    static senseClick() {
        this.gameCanvas.addEventListener("click", (mouse) => {
            if (this.interactionEnabled)
                this.allEvents.forEach((event) => event(mouse, this.CurrentScale));
        });
    }
    static addMouseEvent(method) {
        this.allEvents.push(method);
    }
    static removeMouseEvent(method) {
        this.allEvents.find((ele, index) => {
            if (ele == method)
                this.allEvents.splice(index, 1);
            return;
        });
    }
    static resizeMainCanvas() {
        this.gameCanvas.width = innerWidth - 5;
        this.gameCanvas.height = innerHeight - 5;
        let personalWidth = 1280;
        let personalHeight = 886;
        let newScaleWidth = (personalWidth - (personalWidth - innerWidth)) / personalWidth;
        let newScaleHeight = (personalHeight - (personalHeight - innerHeight)) / personalHeight;
        if (newScaleWidth < newScaleHeight)
            this.currentScale = newScaleHeight;
        else
            this.currentScale = newScaleWidth;
        this.ctx.scale(this.currentScale, this.currentScale);
    }
    static setCanvasReelSize(width, height) {
        this.reelCanvas.width = width;
        this.reelCanvas.height = height;
    }
    static clearCanvases() {
        this.ctx.clearRect(0, 0, 4000, 4000);
        this.reelCtx.clearRect(0, 0, this.reelCanvas.width, this.reelCanvas.height);
    }
}
Canvas.interactionEnabled = true;
Canvas.allEvents = [];
