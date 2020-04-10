import { CanvasUtil } from "./CanvasUtil";
export class CanvasObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        CanvasObject.attachObserver(this);
    }
    static attachObserver(observer) {
        CanvasObject.observers.push(observer);
    }
    static detachObserver(observer) {
        CanvasObject.observers.push(observer);
    }
    static drawObservers() {
        CanvasObject.observers.forEach(observer => {
            observer.draw(CanvasUtil.Ctx);
        });
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
    }
}
CanvasObject.observers = [];
