import { Sprite } from "../GenericObjects/Sprite";
import { IElemental } from "../Interfaces/IElemental";
import { Elements } from "../Enumerations/Elements";
import { Canvas } from "../Tools/Canvas";
import { FadeAnimations } from "../Enumerations/Animations/FadeAnimations";

export class Monster extends Sprite implements IElemental
{
    private startingHealth: number = 100;
    protected health: number;

    private static activeMonster: Monster;
    public static get ActiveMonster() { return this.activeMonster; }

    protected element: Elements = Elements.Unknown;
    protected weakness: Elements = Elements.Unknown;

    public get Element(): Elements {return this.element; }
    public get Weakness(): Elements {return this.weakness; }

    private static monsterAnimations: any =
    {
        timer: 0,

        jitter:
        {
            timer: 0,
            startingXPos: undefined,        
            direction: 1,
            length: 3,
            intensity: 5,
            animDuration: 40
        },

        death:
        {     
            timer: 0,
            riseTimer: 35,
            yRise: 3,
            endingYPos: undefined,
        }
    }

    constructor(imgPath: string)
    {       
        super(imgPath);
        [this.x, this.y, this.width, this.height] = Monster.createMonsterValues()
        this.health = this.startingHealth;
        let monsterAnims = Monster.monsterAnimations;
        monsterAnims.jitter.startingXPos = this.x;
        monsterAnims.death.endingYPos = this.y + this.height / 2;
        Monster.activeMonster = this;
    }

    private static createMonsterValues(): [number, number, number, number]
    {
        let x = 900;
        let y = 150; 
        let width = 125;
        let height = 250;

        return [x, y, width, height];
    }

    public hurtAnimation()
    {
        let jitterAnim = Monster.monsterAnimations.jitter;
        jitterAnim.currentJitter = 0;
        this.animations.push(() => this.hurtLoop(jitterAnim));
    }

    private hurtLoop(jitterAnim: any): boolean
    {
        this.x += jitterAnim.intensity * jitterAnim.direction;   

        if(jitterAnim.timer % jitterAnim.length == 0)
            jitterAnim.direction *= -1;
        
        if(jitterAnim.timer == jitterAnim.animDuration)
        {
            this.x = jitterAnim.startingXPos;
            this.deathAnimation();
            return true;
        }
        jitterAnim.timer++;

        return false;
    }

    private deathAnimation()
    {
        let deathAnim = Monster.monsterAnimations.death;
        this.fade(FadeAnimations.FadeOut, 0.05);
        this.animations.push(() => this.deathLoop(deathAnim, Canvas.Ctx));
    }

    private deathLoop(deathAnim: any, ctx: CanvasRenderingContext2D): boolean
    {
        if(deathAnim.timer < deathAnim.riseTimer)
            this.y -= deathAnim.yRise;
        else
            return true;

        deathAnim.timer++;
        return false;
    }
}