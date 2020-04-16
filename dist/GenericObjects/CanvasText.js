var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Canvas } from "../Tools/Canvas";
import { CanvasDrawing } from "./CanvasDrawing";
export class CanvasText extends CanvasDrawing {
    constructor(x, y, message, fontSize, fontStyle, fillColor, strokeColor, padding) {
        super();
        this.x = x;
        this.y = y;
        this.message = message;
        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.padding = padding;
        Canvas.Ctx.font = `${this.fontSize}px ${this.fontStyle}`;
        this.width = Canvas.Ctx.measureText(this.message).width;
        this.height = fontSize;
    }
    get Padding() { return this.padding; }
    extractValuesForButton() {
        let textMap = new Map();
        textMap.set("x", this.x);
        textMap.set("y", this.y);
        textMap.set("width", this.width);
        textMap.set("height", this.height);
        textMap.set("fillColor", this.fillColor);
        textMap.set("strokeColor", this.strokeColor);
        textMap.set("strokeWidth", this.strokeWidth);
        textMap.set("padding", this.padding);
        return textMap;
    }
    draw() {
        this.doAnimations();
        Canvas.Ctx.fillText("", 0, 0);
        this.drawText();
    }
    drawText() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield true) {
                Canvas.Ctx.fillStyle = (this.fillColor instanceof Array)
                    ? `rgba(${this.fillColor[0]}, ${this.fillColor[1]}, ${this.fillColor[2]}, ${this.alpha})` : this.fillColor;
                Canvas.Ctx.font = `${this.fontSize}px ${this.fontStyle}`;
                Canvas.Ctx.fillText(this.message, this.x, this.y);
            }
        });
    }
}
