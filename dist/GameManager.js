import { RegularSlotMachine } from "./Machine/SlotMachines/RegularSlotMachine";
import { Canvas } from "./Tools/Canvas";
import { CanvasObject } from "./GenericObjects/CanvasObject";
import { GameStates } from "./Enumerations/GameStates";
import { WaterMonster } from "./Monsters/WaterMonster";
import { RegularReel } from "./Machine/Reels/RegularReel";
import { FPSManager } from "./Tools/FPSManager";
import { CanvasText } from "./GenericObjects/CanvasText";
import { Rect } from "./GenericObjects/Rect";
import { FadeAnimations } from "./Enumerations/Animations/FadeAnimations";
import { GrassMonster } from "./Monsters/GrassMonster";
import { FireMonster } from "./Monsters/FireMonster";
import { SlideAnimations } from "./Enumerations/Animations/SlideAnimation";
import { Testing } from "./Tools/Testing";
let regularSlotMachine;
let gameText;
let gameTextButton;
let spinText;
let spinButton;
let monster;
let testingButtons;
let testingImages;
export class GameManager {
    static get GameState() { return this.gameState; }
    ;
    static set GameState(gameState) {
        if (this.gameState != gameState) {
            this.gameState = gameState;
            switch (GameManager.gameState) {
                case GameStates.Title:
                    GameManager.noneToTitle();
                    break;
                case GameStates.RegularRound:
                    GameManager.titleToRegular();
                    break;
            }
        }
    }
    static gameLoop() {
        Canvas.clearCanvases();
        CanvasObject.drawObservers();
        requestAnimationFrame(() => {
            FPSManager.calculateFPS();
            GameManager.gameLoop();
        });
        switch (GameManager.gameState) {
            case GameStates.RegularRound:
                GameManager.regularRoundState();
                break;
        }
    }
    static noneToTitle() {
        gameText = new CanvasText(500, 225, "Launch Game", 30, "Arial", [255, 255, 255], "white", 25);
        let textValues = gameText.extractValuesForButton();
        gameTextButton = Rect.createButton(textValues, "darkblue", "white", 1);
        gameTextButton.sendMouseEvent(this.launchGame);
    }
    static titleToRegular() {
        regularSlotMachine = new RegularSlotMachine();
        regularSlotMachine.fade(FadeAnimations.FadeIn, 3);
        switch (Math.ceil(Math.random() * 3)) {
            case 1:
                monster = new FireMonster();
                break;
            case 2:
                monster = new WaterMonster();
                break;
            case 3:
                monster = new GrassMonster();
                break;
        }
        monster.fade(FadeAnimations.FadeIn, 1);
        monster.slide(SlideAnimations.SlideToCurrentPosition, -100, 50, 1);
        spinText = new CanvasText(800, 100, "Spin", 30, "Arial", [255, 255, 255], "white", 25);
        let textValues = spinText.extractValuesForButton();
        spinButton = Rect.createButton(textValues, "darkblue", "white", 1);
        spinButton.sendMouseEvent(() => {
            regularSlotMachine.startSlotMachine();
        });
        [testingButtons, testingImages] = Testing.createTestingButtons(regularSlotMachine);
        GameManager.GameState = GameStates.RegularRound;
    }
    static regularRoundState() {
        //gameText.fade(FadeAnimations.FadeOut, 1);
        RegularReel.RegularReels.forEach((reel) => reel.performAction());
    }
    static launchGame() {
        gameText.fade(FadeAnimations.FadeOut, 0.33);
        gameTextButton.fade(FadeAnimations.FadeOut, 0.33);
        setTimeout(() => GameManager.GameState = GameStates.RegularRound, 333);
    }
}
GameManager.gameState = GameStates.None;
window.onload = () => {
    Canvas.startUpCanvases();
    prepareGame();
};
function prepareGame() {
    let methodID = requestAnimationFrame(prepareGame);
    let gameIsReady = FPSManager.startUpFPS(10);
    if (gameIsReady) {
        cancelAnimationFrame(methodID);
        GameManager.GameState = GameStates.Title;
        GameManager.gameLoop();
    }
}
