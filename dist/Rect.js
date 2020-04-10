import { CanvasObject } from "./CanvasObject";
export class Rect extends CanvasObject {
    constructor() {
        super();
        this.fillColor = "";
        this.strokeColor = "";
        this.strokeWidth = 1;
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }
}
