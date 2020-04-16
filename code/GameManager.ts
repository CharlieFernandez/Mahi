import { RegularSlotMachine } from "./Machine/SlotMachines/RegularSlotMachine";
import { Canvas } from "./Tools/Canvas";
import { CanvasObject } from "./GenericObjects/CanvasObject";
import { GameStates } from "./Enumerations/GameStates";
import { SlotMachine } from "./Machine/SlotMachines/SlotMachine";
import { WaterMonster } from "./Monsters/WaterMonster";
import { RegularReel } from "./Machine/Reels/RegularReel";
import { FPSManager } from "./Tools/FPSManager";
import { CanvasText } from "./GenericObjects/CanvasText";
import { Rect } from "./GenericObjects/Rect";
import { FadeAnimations } from "./Enumerations/Animations/FadeAnimations";
import { GrassMonster } from "./Monsters/GrassMonster";
import { FireMonster } from "./Monsters/FireMonster";
import { Monster } from "./Monsters/Monster";
import { SlideAnimations } from "./Enumerations/Animations/SlideAnimation";
import { Sprite } from "./GenericObjects/Sprite";
import { Testing } from "./Tools/Testing";

let regularSlotMachine: SlotMachine;
let gameText: CanvasText;
let gameTextButton: Rect;
let spinText: CanvasText;
let spinButton: Rect;
let monster: Monster;
let testingButtons: Rect[];
let testingImages: Sprite[];

export class GameManager
{
    private static gameState: GameStates = GameStates.None;

    public static get GameState(){ return this.gameState };
    public static set GameState(gameState: GameStates)
    {
        if(this.gameState != gameState)
        {
            this.gameState = gameState;

            switch(GameManager.gameState)
            {
                case GameStates.Title:
                    GameManager.noneToTitle();
                    break;
                case GameStates.RegularRound:
                    GameManager.titleToRegular();
                    break;
            }
        }
    }

    public static gameLoop()
    {
        Canvas.clearCanvases();
        CanvasObject.drawObservers();

        requestAnimationFrame(() => 
        {
            FPSManager.calculateFPS();
            GameManager.gameLoop();
        });

        switch(GameManager.gameState)
        {
            case GameStates.RegularRound:
                GameManager.regularRoundState();
                break;
        }        
    }

    private static noneToTitle()
    {        
        gameText = new CanvasText(500, 225, "Launch Game", 30, "Arial", [255, 255, 255], "white", 25);
        let textValues = gameText.extractValuesForButton();
        gameTextButton = Rect.createButton(textValues, "darkblue", "white", 1);
        gameTextButton.sendMouseEvent(this.launchGame);
    }

    private static titleToRegular()
    {
        regularSlotMachine = new RegularSlotMachine();
        regularSlotMachine.fade(FadeAnimations.FadeIn, 3);

        switch(Math.ceil(Math.random() * 3))
        {
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
        spinButton.sendMouseEvent(() =>
        {            
            regularSlotMachine.startSlotMachine();
        });

        [testingButtons, testingImages] = Testing.createTestingButtons(regularSlotMachine);
        
        GameManager.GameState = GameStates.RegularRound;
    }

    private static regularRoundState()
    {        
        //gameText.fade(FadeAnimations.FadeOut, 1);
        RegularReel.RegularReels.forEach((reel) => reel.performAction());
    }

    private static launchGame()
    {
        gameText.fade(FadeAnimations.FadeOut, 0.33);
        gameTextButton.fade(FadeAnimations.FadeOut, 0.33);
        
        setTimeout(() => GameManager.GameState = GameStates.RegularRound, 333);
    }
}

window.onload = () =>
{
    Canvas.startUpCanvases();
    prepareGame();
};

function prepareGame()
{
    let methodID = requestAnimationFrame(prepareGame);
    
    let gameIsReady = FPSManager.startUpFPS(10);

    if(gameIsReady)
    {
        cancelAnimationFrame(methodID);
        GameManager.GameState = GameStates.Title;
        GameManager.gameLoop();
    }
}