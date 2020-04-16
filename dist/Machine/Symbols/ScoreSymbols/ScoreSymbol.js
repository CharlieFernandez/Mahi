import { SlotSymbol } from "../SlotSymbol";
export class ScoreSymbol extends SlotSymbol //implements IElemental
 {
    constructor(imgPath, length, element) {
        super(imgPath, length, element);
        this.element = element;
    }
    static get Value() { return this.value; }
    setNewValuesForTesting(imgPath, element, secondsOfDuration) {
        this.imgPath = imgPath;
        this.element = element;
        this.type = element;
        setTimeout(() => this.imgElement.src = imgPath, secondsOfDuration);
    }
}
ScoreSymbol.value = 30;
