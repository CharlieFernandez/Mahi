import { Canvas } from "../Tools/Canvas";
import { FadeAnimations } from "../Enumerations/Animations/FadeAnimations";
import { SlideAnimations } from "../Enumerations/Animations/SlideAnimation";
import { FPSManager } from "../Tools/FPSManager";
import { SoundFX } from "../Enumerations/SoundFX";

export abstract class CanvasObject
{
    protected x: number = 0;
    protected y: number = 0;
    protected width: number = 0;
    protected height: number = 0;

    public get X() {return this.x; }
    public get Y()  {return this.y; }
    public get Width() { return this.width; }
    public get Height() { return this.height; }

    protected alpha: number = 1;

    protected soundMap = new Map<SoundFX, HTMLAudioElement>();
    public get SoundMap() { return this.soundMap; }

    private static observers: CanvasObject[] = [];
    protected animations: (() => void)[];

    constructor(){
        CanvasObject.attachObserver(this);
        this.animations = [];
    };

    //#region Observer Pattern
    private static attachObserver(observer: CanvasObject){
        CanvasObject.observers.push(observer);
    }

    private static detachObserver(observer: CanvasObject){
        const index = CanvasObject.observers.indexOf(observer);
        if(index != -1) CanvasObject.observers.splice(index, 1);

        // let animIndex = this.animations.findIndex(() => animationMethod);
            
        //     if(animIndex != -1){
    }

    public static drawObservers()
    {
        CanvasObject.observers.forEach(observer => {
            observer.draw();
        });
        
        Canvas.Ctx.globalAlpha = 1;
        Canvas.ReelCtx.globalAlpha = 1;
    }
    //#endregion

    protected abstract draw(): void;

    //#region Generic Animation Methods
    protected doAnimations()
    {
        Canvas.Ctx.globalAlpha = 1;
        Canvas.ReelCtx.globalAlpha = 1;

        this.animations.forEach((animFunc, index) => 
        {
            animFunc();
        });            
    }

    protected startAnimationTimer(animationMethod: ((...params:any[]) => void), animationEndMethod: ((...params:any[]) => void), durationInSeconds: number)
    {
        let durationInMilliseconds = durationInSeconds * 1000;

        setTimeout(() => 
        {
            let animIndex = this.animations.findIndex(() => animationMethod);
            
            if(animIndex != -1){
                animationEndMethod();
                this.animations.splice(animIndex, 1);
                return;
            }
        }, durationInMilliseconds);
    }
    //#endregion

    //#region Fade
    public fade(animation: FadeAnimations, durationInSeconds: number)
    {
        switch(animation)
        {
            case FadeAnimations.FadeIn:
                this.alpha = 0;
                if(CanvasObject.observers.find((observer) => observer == this) == undefined)
                    CanvasObject.attachObserver(this);
                break;
            case FadeAnimations.FadeOut:
                this.alpha = 1;
                //Stop interaction
        }
        
        this.animations.push(() => this.fadeLoop(animation, durationInSeconds));
        this.startAnimationTimer(() => this.fadeLoop(animation, durationInSeconds),
            () => this.fadeEnd(animation),
            durationInSeconds);
    }

    private fadeLoop(animation: FadeAnimations, durationInSeconds: number): void
    {
        let alphaDelta = 1 / durationInSeconds / FPSManager.Fps;

        switch(animation)
        {
            case FadeAnimations.FadeIn:
                alphaDelta = Math.abs(alphaDelta);
                break;
            case FadeAnimations.FadeOut:
                alphaDelta = -Math.abs(alphaDelta);
        }

        Canvas.Ctx.globalAlpha = this.alpha;
        Canvas.ReelCtx.globalAlpha = this.alpha;
        this.alpha += alphaDelta;
    }

    private fadeEnd(animation: FadeAnimations)
    {
        if(animation == FadeAnimations.FadeIn)
            this.alpha = 1;
        else
        {
            this.alpha = 0;
            CanvasObject.detachObserver(this);
        }
    }
    //#endregion

    //#region Slide
    public slide(animation: SlideAnimations, xDistanceTravel: number, yDistanceTravel:number, durationInSeconds: number)
    {
        if(animation == SlideAnimations.SlideToCurrentPosition)
        {
            this.x -= xDistanceTravel;
            this.y -= yDistanceTravel;            
        }
        
        let toX = this.x + xDistanceTravel;
        let toY = this.y + yDistanceTravel;
        
        this.animations.push(() => this.slideLoop(xDistanceTravel, yDistanceTravel, toX, toY, durationInSeconds));
        this.startAnimationTimer(() => this.slideLoop(xDistanceTravel, yDistanceTravel, toX, toY, durationInSeconds),
            () => this.slideEnd(toX, toY),
            durationInSeconds);
    }

    private slideLoop(xDistanceTravel: number, yDistanceTravel: number, toX: number, toY: number, durationInSeconds: number)
    {
        let framePercentage = 1 / durationInSeconds / FPSManager.Fps;
        let xVelocityDelta = framePercentage * xDistanceTravel;
        let yVelocityDelta = framePercentage * yDistanceTravel;
        
        this.x += xVelocityDelta;
        this.y += yVelocityDelta;
    }

    private slideEnd(toXPosition: number, toYPosition: number)
    {
        this.x = toXPosition;
        this.y = toYPosition;
    }
    //#endregion

    //#region Scale
    public scale(fromScaleRatio: number, toScaleRatio: number, durationInSeconds: number)
    {
        let toWidth = this.width * toScaleRatio;
        let toHeight = this.height * toScaleRatio;

        let widthStartUpDifferenceFrom = this.width - (this.width * fromScaleRatio);
        let heightStartUpDifferenceFrom = this.height - (this.height * fromScaleRatio);

        let widthStartUpDifferenceTo = this.width - (this.width * toScaleRatio);
        let heightStartUpDifferenceTo = this.height - (this.height * toScaleRatio);
        let toX = this.x + widthStartUpDifferenceTo / 2;
        let toY = this.y + heightStartUpDifferenceTo / 2;

        this.width *= fromScaleRatio;
        this.height *= fromScaleRatio;

        this.x += widthStartUpDifferenceFrom / 2;
        this.y += heightStartUpDifferenceFrom / 2;

        let widthDifference = this.width * (toScaleRatio - fromScaleRatio);
        let heightDifference = this.height * (toScaleRatio - fromScaleRatio);
        
        this.animations.push(() => this.scaleLoop(widthDifference, heightDifference, toWidth, toHeight, durationInSeconds));
        this.startAnimationTimer(() => this.scaleLoop(widthDifference, heightDifference, durationInSeconds, toWidth, toHeight),
            () => this.scaleEnd(toX, toY, toWidth, toHeight),
            durationInSeconds);
    }

    private scaleLoop(widthDifference: number, heightDifference: number, toWidth: number, toHeight: number, durationInSeconds: number)
    {        
        let widthScaleRate = (1 / durationInSeconds / FPSManager.Fps) * widthDifference;
        let heightScaleRate = (1 / durationInSeconds / FPSManager.Fps) * heightDifference;
        
        let width = this.width + widthScaleRate;
        let height = this.height + heightScaleRate;

        if((widthDifference >= 0 && width < toWidth) || (widthDifference < 0 && width > toWidth))
        {
            this.x -= widthScaleRate / 2;
            this.y -= heightScaleRate / 2;
    
            this.width = width;
            this.height = height;
        }
        else
        {
            this.x -= (toWidth - this.width) / 2;
            this.y -= (toHeight - this.height) / 2;
            this.width = toWidth;
            this.height = toHeight;
        }
    }

    private scaleEnd(toX: number, toY: number, toWidth: number, toHeight: number)
    {
        this.x = toX;
        this.y = toY;
        this.width = toWidth;
        this.height = toHeight;
    }
    //#endregion

    public sendMouseEvent(method: any)
    {
        if(this.alpha == 1)
        {
            Canvas.addMouseEvent((mouse: MouseEvent, canvasScale: number) => 
            {
                let mouseX = mouse.offsetX;
                let mouseY = mouse.offsetY;

                let buttonX = this.x * canvasScale;
                let buttonY = this.y * canvasScale;

                let buttonXWidth = (this.x + this.width) * canvasScale;
                let buttonYHeight = (this.y + this.height) * canvasScale;

                if(mouseX >= buttonX && mouseX <= buttonXWidth && mouseY >= buttonY && mouseY <= buttonYHeight)
                {
                    method();
                    Canvas.removeMouseEvent(method);
                }
            });
        }
    }    
}