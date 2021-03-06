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
import { EnemyHealth } from "./GenericObjects/EnemyHealth";
import { AudioManager } from "./Tools/AudioManager";
let regularSlotMachine;
let titleText;
let gameText;
let gameTextButton;
let spinText;
let spinButton;
let monster;
let enemyHealth;
let enemyHealthBackground;
let enemyCurrentHealth;
let enemyTotalHealth;
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
                case GameStates.Result:
                    GameManager.result();
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
        titleText = new CanvasText(500, 75, "Elemental Slots", 48, "Arial", [255, 255, 255], "black", 3, 25);
        gameText = new CanvasText(600, 225, "START", 36, "Arial", [255, 255, 255], "darkgrey", 2, 25);
        let textValues = gameText.extractValuesForButton();
        gameTextButton = Rect.createButton(textValues, "rgba(0, 0, 0, 0)", "white", 0.01);
        gameTextButton.sendMouseEvent(this.launchGame);
    }
    static titleToRegular() {
        if (regularSlotMachine == null) {
            regularSlotMachine = new RegularSlotMachine();
            regularSlotMachine.fade(FadeAnimations.FadeIn, 3);
            spinText = new CanvasText(625, 400, "Spin", 30, "Arial", [255, 255, 255], "white", 2, 25);
            let textValues = spinText.extractValuesForButton();
            spinButton = Rect.createButton(textValues, "darkblue", "white", 1);
            spinButton.sendMouseEvent(() => {
                regularSlotMachine.startSlotMachine();
            });
            [testingButtons, testingImages] = Testing.createTestingButtons(regularSlotMachine);
        }
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
        enemyHealthBackground = new Rect(862.5, 125, 200, 10, "rgba(0,0,0,204)", "", 0.01);
        enemyHealth = new EnemyHealth(monster);
        enemyHealth.fade(FadeAnimations.FadeIn, 1);
        enemyCurrentHealth = new CanvasText(enemyHealth.X + 50, enemyHealth.Y - 10, "", 18, "Arial", "white", "", 0.01, 0);
        enemyTotalHealth = new CanvasText(enemyHealth.X + 80, enemyHealth.Y - 10, " / 100", 18, "Arial", "white", "", 0.01, 0);
        GameManager.GameState = GameStates.RegularRound;
    }
    static regularRoundState() {
        RegularReel.RegularReels.forEach((reel) => reel.performAction());
        if (monster.Health <= 0)
            GameManager.GameState = GameStates.Result;
    }
    static result() {
        enemyHealth.fade(FadeAnimations.FadeOut, 1);
        enemyHealthBackground.fade(FadeAnimations.FadeOut, 1);
        enemyHealth.fade(FadeAnimations.FadeOut, 1);
        enemyCurrentHealth.fade(FadeAnimations.FadeOut, 1);
        setTimeout(() => GameManager.GameState = GameStates.RegularRound, 1100);
    }
    static launchGame() {
        titleText.fade(FadeAnimations.FadeOut, 0.33);
        gameText.fade(FadeAnimations.FadeOut, 0.33);
        gameTextButton.fade(FadeAnimations.FadeOut, 0.33);
        setTimeout(() => GameManager.GameState = GameStates.RegularRound, 333);
    }
}
GameManager.gameState = GameStates.None;
window.onload = () => {
    AudioManager.initializeSharedAudio();
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
