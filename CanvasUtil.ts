export class CanvasUtil //CHANGE TO CANVAS CLASS
{
    private static canvas: HTMLCanvasElement;
    private static ctx: CanvasRenderingContext2D;

    static get Ctx(): CanvasRenderingContext2D { return this.ctx; }

    static initiateCanvas() {
        this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.resizeCanvas()
        window.addEventListener('resize', () => this.resizeCanvas());

        this.eraseThisLater();
    }

    static resizeCanvas()
    {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

    static clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static eraseThisLater()
    {
        let img = document.querySelector('img') as HTMLImageElement;

        window.addEventListener("load", () =>
        {
            this.ctx.drawImage(img, 700, 150, 125, 250);
        });        
    }
}