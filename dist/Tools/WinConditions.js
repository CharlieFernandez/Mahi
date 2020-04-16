import { SlotSymbol } from "../Machine/Symbols/SlotSymbol";
import { SoundFX } from "../Enumerations/SoundFX";
import { AudioManager } from "./AudioManager";
import { Monster } from "../Monsters/Monster";
import { Testing } from "./Testing";
import { ScoreSymbol } from "../Machine/Symbols/ScoreSymbols/ScoreSymbol";
import { Canvas } from "./Canvas";
export class WinConditions {
    static checkResults() {
        let importantPositions = SlotSymbol.AllSymbols.filter((symbol) => symbol.Y >= 0);
        let importantPositionsSorted = importantPositions.sort((symbolA, symbolB) => (symbolA.X + symbolA.Y) - (symbolB.X + symbolB.Y));
        let [rows, cols, diagonals] = this.retrieveDimensions(importantPositionsSorted);
        let allWinnings = [];
        allWinnings.push(...this.checkForWins(rows));
        // allWinnings.push(...this.checkForWins(cols));
        allWinnings.push(...this.checkForWins(diagonals));
        if (allWinnings.length > 0)
            this.checkForWinningSymbols(allWinnings);
    }
    static retrieveDimensions(symbolsArray) {
        let col = [];
        let row = [];
        let diagonals = [];
        for (let i = 0; i < 2; i++)
            diagonals.push([]);
        for (let i = 0; i < 3; i++) {
            col.push([]);
            for (let j = 0; j < 3; j++) {
                if (i == 0)
                    row.push([]);
                row[j].push(symbolsArray[i * 3 + j]);
                col[i].push(symbolsArray[i * 3 + j]);
                if (i == j)
                    diagonals[0].push(symbolsArray[i * 3 + j]);
                if (i + j == 2)
                    diagonals[1].push(symbolsArray[i * 3 + j]);
            }
        }
        return [row, col, diagonals];
    }
    static checkForWins(dimension) {
        let wins = [];
        dimension.forEach((group) => {
            let sameSymbols = true;
            let firstSymbol = group[0].Type;
            for (let i = 1; i < 3; i++) {
                if (group[i].Type != firstSymbol)
                    sameSymbols = false;
            }
            if (sameSymbols) {
                group.forEach((symbol) => {
                    wins.push(symbol);
                });
            }
        });
        return wins;
    }
    static checkForWinningSymbols(allWinnings) {
        let operators = {
            "==": (a, b) => { return a == b; },
            "!=": (a, b) => { return a != b; }
        };
        debugger;
        let filteredWinnings = new Set();
        filteredWinnings = this.filterWinningSymbols(allWinnings, operators["=="], Monster.ActiveMonster.Weakness);
        if (filteredWinnings.size > 0)
            return;
        filteredWinnings = this.filterWinningSymbols(allWinnings, operators["!="], Monster.ActiveMonster.Element);
        if (filteredWinnings.size > 0)
            return;
        filteredWinnings = this.filterWinningSymbols(allWinnings, operators["=="], Monster.ActiveMonster.Element);
    }
    static filterWinningSymbols(allWinnings, operation, monsterElement) {
        let filteredWinnings = allWinnings.filter((symbol) => {
            return operation(symbol.Type, monsterElement);
        });
        this.checkForFinalResult(filteredWinnings);
        return new Set(filteredWinnings);
    }
    static checkForFinalResult(filteredWinnings) {
        if (filteredWinnings.length > 0) {
            let milliSecondsTillWinAnimation = 500;
            if (Testing.AllSelectedButtons.find((button) => button) == undefined)
                milliSecondsTillWinAnimation = 0;
            setTimeout(() => this.playWinningAnimation(filteredWinnings), milliSecondsTillWinAnimation);
        }
        Canvas.interactionEnabled = false;
    }
    static playWinningAnimation(filteredWinnings) {
        console.log("Here");
        let winningSymbol = filteredWinnings.find((symbol) => symbol.Type == Monster.ActiveMonster.Weakness);
        if (winningSymbol != undefined) {
            Monster.ActiveMonster.dealDamage(ScoreSymbol.Value * 2);
        }
        else {
            winningSymbol = filteredWinnings.find((symbol) => symbol.Type == Monster.ActiveMonster.Element);
            if (winningSymbol != undefined)
                Monster.ActiveMonster.dealDamage(ScoreSymbol.Value / 2);
            else
                Monster.ActiveMonster.dealDamage(ScoreSymbol.Value);
        }
        filteredWinnings = filteredWinnings.filter((symbol) => symbol.Type == (winningSymbol === null || winningSymbol === void 0 ? void 0 : winningSymbol.Type));
        setTimeout(() => {
            Canvas.interactionEnabled = true;
        }, 1000);
        filteredWinnings.forEach((symbol) => {
            symbol.scale(1, 1.6, 0.2);
            setTimeout(() => symbol.scale(1, 0.625, 0.2), 250);
            if (winningSymbol.Type == 0)
                AudioManager.playAudio(AudioManager.SoundMap.get(SoundFX.FireSound), 0.25);
            else if (winningSymbol.Type == 1)
                AudioManager.playAudio(AudioManager.SoundMap.get(SoundFX.WaterSound), 0.25);
            else if (winningSymbol.Type == 2)
                AudioManager.playAudio(AudioManager.SoundMap.get(SoundFX.GrassSound), 0.25);
        });
        AudioManager.playAudio(AudioManager.SoundMap.get(SoundFX.Win), 0.25);
    }
}
