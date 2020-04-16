import { CanvasObject } from "./CanvasObject";
import { Canvas } from "../Tools/Canvas";
import { SlotMachine } from "../Machine/SlotMachines/SlotMachine";
import { Rect } from "./Rect";

export class Sprite extends CanvasObject
{    
    protected width: number = 0;
    protected height: number = 0;

    protected imgElement: HTMLImageElement;
    protected imgPath: string = "";

    constructor(imgPath: string)
    {
        super();
        this.imgPath = imgPath;
        this.imgElement = Sprite.createNewImage(imgPath);
    }

    public static createNewImage(imgPath: string): HTMLImageElement
    {
        let newImg = document.createElement("img");
        newImg.classList.add("hidden");
        newImg.src = imgPath;
        document.body.appendChild(newImg);
        return newImg;
    }

    public applyFieldsForTesting(testingButton: Rect)
    {
        this.x = testingButton.X;
        this.y = testingButton.Y;
        this.width = testingButton.Width;
        this.height = testingButton.Height;
    }

    protected draw()
    {        
        this.doAnimations();

        if(this.alpha > 0)
            Canvas.Ctx.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
    }
}