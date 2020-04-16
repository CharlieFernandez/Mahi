import { CanvasObject } from "./CanvasObject";
import { Canvas } from "../Tools/Canvas";
export class Sprite extends CanvasObject {
    constructor(imgPath) {
        super();
        this.width = 0;
        this.height = 0;
        this.imgPath = "";
        this.imgPath = imgPath;
        this.imgElement = Sprite.createNewImage(imgPath);
    }
    static createNewImage(imgPath) {
        let newImg = document.createElement("img");
        newImg.classList.add("hidden");
        newImg.src = imgPath;
        document.body.appendChild(newImg);
        return newImg;
    }
    applyFieldsForTesting(testingButton) {
        this.x = testingButton.X;
        this.y = testingButton.Y;
        this.width = testingButton.Width;
        this.height = testingButton.Height;
    }
    draw() {
        this.doAnimations();
        if (this.alpha > 0)
            Canvas.Ctx.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
    }
}
