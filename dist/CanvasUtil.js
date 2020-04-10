export class CanvasUtil //CHANGE TO CANVAS CLASS
 {
    static get Ctx() { return this.ctx; }
    static initiateCanvas() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.eraseThisLater();
    }
    static resizeCanvas() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }
    static clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    static eraseThisLater() {
        let img = document.querySelector('img');
        window.addEventListener("load", () => {
            this.ctx.drawImage(img, 700, 150, 125, 250);
        });
    }
}
