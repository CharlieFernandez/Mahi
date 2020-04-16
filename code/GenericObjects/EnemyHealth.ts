import { Rect } from "./Rect";
import { Monster } from "../Monsters/Monster";
import { Canvas } from "../Tools/Canvas";

export class EnemyHealth extends Rect
{
    
    constructor(private associatedMonster: Monster)
    {
        super(862.5, 125, associatedMonster.Health * 2, 10, "red", "black", 2);
    }

    protected draw()
    {
        if(Monster.ActiveMonster.Health > 0){
            let ctx = Canvas.Ctx;

            ctx.beginPath();
            ctx.rect(this.x, this.y, this.associatedMonster.Health * 2, this.height);
            ctx.fillStyle = this.fillColor;
            ctx.fill();
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.strokeColor;
            ctx.stroke();
            ctx.closePath();
        }
    }
}