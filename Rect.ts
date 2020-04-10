import { CanvasObject } from "./CanvasObject";

export class Rect extends CanvasObject
{
    protected fillColor: string = "";
    protected strokeColor: string = "";
    protected strokeWidth: number = 1;

    constructor(){ super(); }

    protected draw(ctx: CanvasRenderingContext2D)
    {
        super.draw(ctx);
        
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }
}