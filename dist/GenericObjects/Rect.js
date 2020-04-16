import { Canvas } from "../Tools/Canvas";
import { CanvasDrawing } from "./CanvasDrawing";
export class Rect extends CanvasDrawing {
    constructor(x, y, width, height, fillColor, strokeColor, strokeWidth) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }
    draw() {
        this.doAnimations();
        let ctx = Canvas.Ctx;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
        ctx.closePath();
    }
    static createButton(textMap, fillColor, strokeColor, strokeWidth) {
        let padding = textMap.get("padding");
        let x = textMap.get("x") - padding / 2;
        let y = textMap.get("y") - textMap.get("height") - padding / 2;
        let width = textMap.get("width") + padding;
        let height = textMap.get("height") + padding;
        return new Rect(x, y, width, height, fillColor, strokeColor, strokeWidth);
    }
    toggleSelection() {
        if (this.strokeColor == "white") {
            this.strokeColor = "black";
            this.strokeWidth = 0.01;
        }
        else {
            this.strokeColor = "white";
            this.strokeWidth = 1;
        }
    }
}
