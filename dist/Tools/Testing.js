import { Sprite } from "../GenericObjects/Sprite";
import { Rect } from "../GenericObjects/Rect";
import { FireSymbol } from "../Machine/Symbols/ScoreSymbols/FireSymbol";
import { Elements } from "../Enumerations/Elements";
import { WaterSymbol } from "../Machine/Symbols/ScoreSymbols/WaterSymbol";
import { GrassSymbol } from "../Machine/Symbols/ScoreSymbols/GrassSymbol";
import { FadeAnimations } from "../Enumerations/Animations/FadeAnimations";
export class Testing {
    static get AllSelectedButtons() { return this.allSelectedButtons; }
    static createTestingButtons(slotMachine) {
        let image;
        let spacing = 5;
        let offsetX = slotMachine.X + 82.5;
        let offsetY = slotMachine.Y - 100;
        let length = 25;
        let allButtons = [];
        let allImages = [];
        for (let i = 0; i < 3; i++) {
            if (i != 0)
                offsetX += slotMachine.AllReels[0].Width;
            for (let j = 0; j < 3; j++) {
                let currentRow = i * 9 + j * 3;
                allButtons.push(new Rect(offsetX, offsetY + (spacing + length) * j, length, length, "maroon", "black", 0.01));
                allButtons[allButtons.length - 1].sendMouseEvent(() => {
                    Testing.testButtonClickEvent(allButtons, currentRow);
                });
                image = new Sprite("../../images/Fire Symbol.png");
                image.applyFieldsForTesting(allButtons[allButtons.length - 1]);
                allImages.push(image);
                allButtons.push(new Rect(offsetX + spacing + length, offsetY + (spacing + length) * j, length, length, "darkblue", "black", 0.01));
                allButtons[allButtons.length - 1].sendMouseEvent(() => {
                    Testing.testButtonClickEvent(allButtons, currentRow + 1);
                });
                image = new Sprite("../../images/Water Symbol.png");
                image.applyFieldsForTesting(allButtons[allButtons.length - 1]);
                allImages.push(image);
                allButtons.push(new Rect(offsetX + (spacing + length) * 2, offsetY + (spacing + length) * j, length, length, "darkgreen", "black", 0.01));
                allButtons[allButtons.length - 1].sendMouseEvent(() => {
                    Testing.testButtonClickEvent(allButtons, currentRow + 2);
                });
                image = new Sprite("../../images/Grass Symbol.png");
                image.applyFieldsForTesting(allButtons[allButtons.length - 1]);
                allImages.push(image);
                for (let k = allButtons.length - 3; k < allButtons.length; k++) {
                    this.allSelectedButtons[k] = false;
                }
            }
        }
        return [allButtons, allImages];
    }
    static testButtonClickEvent(allButtons, index) {
        switch (index % 3) {
            case 0:
                Testing.turnOffRelatedButtons(allButtons, index, 1, 2, 1);
                break;
            case 1:
                Testing.turnOffRelatedButtons(allButtons, index, -1, 1, 2);
                break;
            case 2:
                Testing.turnOffRelatedButtons(allButtons, index, -2, -1, 1);
                break;
        }
        Testing.addButtonToList(allButtons, index);
    }
    static turnOffRelatedButtons(allButtons, index, startIndex, endIndex, iteration) {
        for (let i = startIndex; i <= endIndex; i += iteration) {
            if (Testing.AllSelectedButtons[index + i] == true) {
                allButtons[index + i].toggleSelection();
                Testing.AllSelectedButtons[index + i] = false;
            }
        }
    }
    static addButtonToList(allButtons, buttonIndex) {
        allButtons[buttonIndex].toggleSelection();
        if (Testing.allSelectedButtons[buttonIndex] == true)
            Testing.allSelectedButtons[buttonIndex] = false;
        else
            Testing.allSelectedButtons[buttonIndex] = true;
    }
    static checkForSelectedSymbol(reelIndex, symbolsOnReel) {
        symbolsOnReel = symbolsOnReel.filter((symbol) => symbol.Y >= 0);
        symbolsOnReel = symbolsOnReel.sort((a, b) => a.Y - b.Y);
        let selectedButtonIndexes = [];
        for (let i = reelIndex * 9; i < reelIndex * 9 + 9; i++) {
            if (Testing.allSelectedButtons[i] == true) {
                selectedButtonIndexes.push(i);
            }
        }
        if (selectedButtonIndexes.length > 0)
            this.findScoreSymbolChanges(reelIndex, symbolsOnReel, selectedButtonIndexes);
    }
    static findScoreSymbolChanges(reelIndex, symbolsOnReel, selectedButtonIndexes) {
        for (let i = 0; i < selectedButtonIndexes.length; i++) {
            let currentSymbol;
            let selectedButtonType = selectedButtonIndexes[i] % 3;
            if (selectedButtonIndexes[i] < reelIndex * 9 + 3)
                currentSymbol = symbolsOnReel[0];
            else if (selectedButtonIndexes[i] < reelIndex * 9 + 6)
                currentSymbol = symbolsOnReel[1];
            else
                currentSymbol = symbolsOnReel[2];
            switch (selectedButtonType) {
                case 0:
                    if (currentSymbol.Type != selectedButtonType)
                        this.swapSymbols(() => currentSymbol.setNewValuesForTesting(FireSymbol.ImgPath, Elements.Fire, Testing.millisecondsSwapChange), currentSymbol);
                    break;
                case 1:
                    if (currentSymbol.Type != selectedButtonType)
                        this.swapSymbols(() => currentSymbol.setNewValuesForTesting(WaterSymbol.ImgPath, Elements.Water, Testing.millisecondsSwapChange), currentSymbol);
                    break;
                case 2:
                    if (currentSymbol.Type != selectedButtonType)
                        this.swapSymbols(() => currentSymbol.setNewValuesForTesting(GrassSymbol.ImgPath, Elements.Grass, Testing.millisecondsSwapChange), currentSymbol);
                    break;
            }
        }
    }
    static swapSymbols(valuesSwapMethod, currentSymbol) {
        let secondsDuration = Testing.millisecondsSwapChange / 1000;
        valuesSwapMethod();
        currentSymbol.fade(FadeAnimations.FadeOut, secondsDuration);
        setTimeout(() => {
            currentSymbol.fade(FadeAnimations.FadeIn, secondsDuration);
        }, Testing.millisecondsSwapChange);
    }
}
Testing.allSelectedButtons = [];
Testing.millisecondsSwapChange = 500;
