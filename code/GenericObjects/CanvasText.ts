import { Canvas } from "../Tools/Canvas";
import { CanvasDrawing } from "./CanvasDrawing";
import { Monster } from "../Monsters/Monster";

export class CanvasText extends CanvasDrawing
{
    public get Padding() { return this.padding; }

    constructor(protected x: number, protected y: number, private message: string, private fontSize: number, private fontStyle: string,
        protected fillColor: string | number[], protected strokeColor: string, protected strokeWidth: number, private padding: number){

        super();
        Canvas.Ctx.font = `${this.fontSize}px ${this.fontStyle}`;
        
        this.width = Canvas.Ctx.measureText(this.message).width;
        this.height = fontSize;
    }

    public extractValuesForButton():Map<any, any>
    {
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

    protected draw()
    {
        this.doAnimations();

        Canvas.Ctx.fillText("", 0, 0);
        this.drawText();
        
    }

    private async drawText()
    {
        if(await true)
        {
            Canvas.Ctx.fillStyle = (this.fillColor instanceof Array)
                ? `rgba(${this.fillColor[0]}, ${this.fillColor[1]}, ${this.fillColor[2]}, ${this.alpha})`: this.fillColor;
            Canvas.Ctx.font = `${this.fontSize}px ${this.fontStyle}`;
            if(this.message != "")
                Canvas.Ctx.fillText(this.message, this.x, this.y);
            else
                Canvas.Ctx.fillText(Monster.ActiveMonster.Health.toString(), this.x, this.y);
        }
    }
}