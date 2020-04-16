import { CanvasObject } from "./CanvasObject";
export class CanvasDrawing extends CanvasObject {
    constructor() {
        super();
        this.fillColor = "0";
        this.strokeColor = "";
        this.strokeWidth = 1;
    }
}
