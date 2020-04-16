import { Sprite } from "../GenericObjects/Sprite";
import { IElemental } from "../Interfaces/IElemental";
import { Elements } from "../Enumerations/Elements";
import { FadeAnimations } from "../Enumerations/Animations/FadeAnimations";
import { EnemyHealth } from "../GenericObjects/EnemyHealth";
import { SlideAnimations } from "../Enumerations/Animations/SlideAnimation";

export class Monster extends Sprite implements IElemental
{
    private startingHealth: number = 100;
    protected health: number;
    public get Health(){ return this.health; }

    private static activeMonster: Monster;
    public static get ActiveMonster() { return this.activeMonster; }

    protected element: Elements = Elements.Unknown;
    protected weakness: Elements = Elements.Unknown;

    public get Element(): Elements {return this.element; }
    public get Weakness(): Elements {return this.weakness; }

    private associatedHealth?: EnemyHealth;
    private startingXPosition: number;

    constructor(imgPath: string)
    {       
        super(imgPath);
        [this.x, this.y, this.width, this.height] = Monster.createMonsterValues()
        this.health = this.startingHealth;
        this.startingXPosition = this.x;
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

    public setAssociatedHealth(enemyHealth: EnemyHealth)
    {
        this.associatedHealth = enemyHealth;
    }

    public dealDamage(damageDealt: number)
    {
        console.log("IM HURT");
        this.health -= damageDealt;
        this.hurtAnimation();
    }

    public hurtAnimation()
    {
        this.animations.push(() => this.hurtLoop());
        this.startAnimationTimer(() => this.hurtLoop(), () => this.hurtEnd(), 1);
    }

    private hurtLoop()
    {
        this.alpha = (this.alpha == 1) ? 0 : 1;
    }

    private hurtEnd()
    {
        this.alpha = 1;
        this.x = this.startingXPosition;

        if(this.health <= 0)
            this.deathAnimation();
    }

    private deathAnimation()
    {
        this.slide(SlideAnimations.SlideFromCurrentPosition, 0, -50, 0.5)
        this.fade(FadeAnimations.FadeOut, 0.5);
    }
}