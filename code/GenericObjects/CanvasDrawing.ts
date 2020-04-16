import { CanvasObject } from "./CanvasObject";

export abstract class CanvasDrawing extends CanvasObject
{
    protected fillColor: string | number[] = "0";
    protected strokeColor: string = "";
    protected strokeWidth: number = 1;

    constructor(){ super(); }

    protected abstract draw(): void;
}