import { CanvasUtil } from "./CanvasUtil";

export class CanvasObject
{
    protected x: number = 0;
    protected y: number = 0;
    protected width: number = 0;
    protected height: number = 0;

    private static observers: CanvasObject[] = [];

    constructor(){ CanvasObject.attachObserver(this); }

    private static attachObserver(observer: CanvasObject){
        CanvasObject.observers.push(observer);
    }

    private static detachObserver(observer: CanvasObject){
        CanvasObject.observers.push(observer);
    }

    public static drawObservers()
    {
        CanvasObject.observers.forEach(observer => {
            observer.draw(CanvasUtil.Ctx);
        });
    }

    protected draw(ctx: CanvasRenderingContext2D)
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
    }
}