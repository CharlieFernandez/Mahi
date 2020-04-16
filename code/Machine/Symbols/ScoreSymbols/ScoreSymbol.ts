import { SlotSymbol } from "../SlotSymbol";
import { Elements } from "../../../Enumerations/Elements";

export class ScoreSymbol extends SlotSymbol //implements IElemental
{
    protected value: number = 10;

    constructor(imgPath: string, length: number, protected element: Elements)
    {
        super(imgPath, length, element);
    }

    public setNewValuesForTesting(imgPath: string, element: Elements, secondsOfDuration: number): void
    {
        this.imgPath = imgPath;        
        this.element = element;
        this.type = element;
        
        setTimeout(() => this.imgElement.src = imgPath, secondsOfDuration);
    }
}