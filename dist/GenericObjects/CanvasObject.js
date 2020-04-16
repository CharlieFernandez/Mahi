import { Canvas } from "../Tools/Canvas";
import { FadeAnimations } from "../Enumerations/Animations/FadeAnimations";
import { SlideAnimations } from "../Enumerations/Animations/SlideAnimation";
import { FPSManager } from "../Tools/FPSManager";
export class CanvasObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.alpha = 1;
        this.soundMap = new Map();
        CanvasObject.attachObserver(this);
        this.animations = [];
    }
    get X() { return this.x; }
    get Y() { return this.y; }
    get Width() { return this.width; }
    get Height() { return this.height; }
    get SoundMap() { return this.soundMap; }
    ;
    //#region Observer Pattern
    static attachObserver(observer) {
        CanvasObject.observers.push(observer);
    }
    static detachObserver(observer) {
        const index = CanvasObject.observers.indexOf(observer);
        if (index != -1)
            CanvasObject.observers.splice(index, 1);
        // let animIndex = this.animations.findIndex(() => animationMethod);
        //     if(animIndex != -1){
    }
    static drawObservers() {
        CanvasObject.observers.forEach(observer => {
            observer.draw();
        });
        Canvas.Ctx.globalAlpha = 1;
        Canvas.ReelCtx.globalAlpha = 1;
    }
    //#region Generic Animation Methods
    doAnimations() {
        Canvas.Ctx.globalAlpha = 1;
        Canvas.ReelCtx.globalAlpha = 1;
        this.animations.forEach((animFunc, index) => {
            animFunc();
        });
    }
    startAnimationTimer(animationMethod, animationEndMethod, durationInSeconds) {
        let durationInMilliseconds = durationInSeconds * 1000;
        setTimeout(() => {
            let animIndex = this.animations.findIndex(() => animationMethod);
            if (animIndex != -1) {
                animationEndMethod();
                this.animations.splice(animIndex, 1);
                return;
            }
        }, durationInMilliseconds);
    }
    //#endregion
    //#region Fade
    fade(animation, durationInSeconds) {
        switch (animation) {
            case FadeAnimations.FadeIn:
                this.alpha = 0;
                if (CanvasObject.observers.find((observer) => observer == this) == undefined)
                    CanvasObject.attachObserver(this);
                break;
            case FadeAnimations.FadeOut:
                this.alpha = 1;
            //Stop interaction
        }
        console.log(durationInSeconds);
        this.animations.push(() => this.fadeLoop(animation, durationInSeconds));
        this.startAnimationTimer(() => this.fadeLoop(animation, durationInSeconds), () => this.fadeEnd(animation), durationInSeconds);
    }
    fadeLoop(animation, durationInSeconds) {
        let alphaDelta = 1 / durationInSeconds / FPSManager.Fps;
        switch (animation) {
            case FadeAnimations.FadeIn:
                alphaDelta = Math.abs(alphaDelta);
                break;
            case FadeAnimations.FadeOut:
                alphaDelta = -Math.abs(alphaDelta);
        }
        Canvas.Ctx.globalAlpha = this.alpha;
        Canvas.ReelCtx.globalAlpha = this.alpha;
        this.alpha += alphaDelta;
        console.log(this.alpha);
    }
    fadeEnd(animation) {
        if (animation == FadeAnimations.FadeIn)
            this.alpha = 1;
        else {
            this.alpha = 0;
            CanvasObject.detachObserver(this);
        }
    }
    //#endregion
    //#region Slide
    slide(animation, xDistanceTravel, yDistanceTravel, durationInSeconds) {
        if (animation == SlideAnimations.SlideToCurrentPosition) {
            this.x -= xDistanceTravel;
            this.y -= yDistanceTravel;
        }
        let toX = this.x + xDistanceTravel;
        let toY = this.y + yDistanceTravel;
        this.animations.push(() => this.slideLoop(xDistanceTravel, yDistanceTravel, toX, toY, durationInSeconds));
        this.startAnimationTimer(() => this.slideLoop(xDistanceTravel, yDistanceTravel, toX, toY, durationInSeconds), () => this.slideEnd(toX, toY), durationInSeconds);
    }
    slideLoop(xDistanceTravel, yDistanceTravel, toX, toY, durationInSeconds) {
        let framePercentage = 1 / durationInSeconds / FPSManager.Fps;
        let xVelocityDelta = framePercentage * xDistanceTravel;
        let yVelocityDelta = framePercentage * yDistanceTravel;
        this.x += xVelocityDelta;
        this.y += yVelocityDelta;
    }
    slideEnd(toXPosition, toYPosition) {
        this.x = toXPosition;
        this.y = toYPosition;
    }
    //#endregion
    //#region Scale
    scale(fromScaleRatio, toScaleRatio, durationInSeconds) {
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
        this.startAnimationTimer(() => this.scaleLoop(widthDifference, heightDifference, durationInSeconds, toWidth, toHeight), () => this.scaleEnd(toX, toY, toWidth, toHeight), durationInSeconds);
    }
    scaleLoop(widthDifference, heightDifference, toWidth, toHeight, durationInSeconds) {
        let widthScaleRate = (1 / durationInSeconds / FPSManager.Fps) * widthDifference;
        let heightScaleRate = (1 / durationInSeconds / FPSManager.Fps) * heightDifference;
        let width = this.width + widthScaleRate;
        let height = this.height + heightScaleRate;
        if ((widthDifference >= 0 && width < toWidth) || (widthDifference < 0 && width > toWidth)) {
            this.x -= widthScaleRate / 2;
            this.y -= heightScaleRate / 2;
            this.width = width;
            this.height = height;
        }
        else {
            this.x -= (toWidth - this.width) / 2;
            this.y -= (toHeight - this.height) / 2;
            this.width = toWidth;
            this.height = toHeight;
        }
    }
    scaleEnd(toX, toY, toWidth, toHeight) {
        this.x = toX;
        this.y = toY;
        this.width = toWidth;
        this.height = toHeight;
    }
    //#endregion
    sendMouseEvent(method) {
        if (this.alpha == 1) {
            Canvas.addMouseEvent((mouse, canvasScale) => {
                let mouseX = mouse.offsetX;
                let mouseY = mouse.offsetY;
                let buttonX = this.x * canvasScale;
                let buttonY = this.y * canvasScale;
                let buttonXWidth = (this.x + this.width) * canvasScale;
                let buttonYHeight = (this.y + this.height) * canvasScale;
                if (mouseX >= buttonX && mouseX <= buttonXWidth && mouseY >= buttonY && mouseY <= buttonYHeight) {
                    method();
                    Canvas.removeMouseEvent(method);
                }
            });
        }
    }
}
CanvasObject.observers = [];
