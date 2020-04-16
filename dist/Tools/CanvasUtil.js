export class CanvasUtil {
    static get Canvas() { return this.canvas; }
    static get Ctx() { return this.ctx; }
    static get ReelCanvas() { return this.reelCanvas; }
    static get ReelCtx() { return this.reelCtx; }
    static startUpCanvases() {
        this.canvas = document.getElementById("main-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.reelCanvas = document.getElementById("reel-canvas");
        this.reelCtx = this.reelCanvas.getContext("2d");
        this.resizeMainCanvas();
        window.addEventListener('resize', () => this.resizeMainCanvas());
    }
    static resizeMainCanvas() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        let personalWidth = 1280;
        let personalHeight = 529;
        let newScaleWidth = (personalWidth - (personalWidth - innerWidth)) / personalWidth;
        let newScaleHeight = (personalHeight - (personalHeight - innerHeight)) / personalHeight;
        let newScale;
        if (newScaleWidth < newScaleHeight)
            newScale = newScaleHeight;
        else
            newScale = newScaleWidth;
        //this.ctx.scale(newScale, newScale)
    }
    static setCanvasReelSize(width, height) {
        this.reelCanvas.width = width;
        this.reelCanvas.height = height;
    }
    static clearCanvases() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.reelCtx.clearRect(0, 0, this.reelCanvas.width, this.reelCanvas.height);
    }
}
