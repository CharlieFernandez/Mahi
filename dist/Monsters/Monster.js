import { Sprite } from "../GenericObjects/Sprite";
import { Elements } from "../Enumerations/Elements";
import { FadeAnimations } from "../Enumerations/Animations/FadeAnimations";
import { SlideAnimations } from "../Enumerations/Animations/SlideAnimation";
export class Monster extends Sprite {
    constructor(imgPath) {
        super(imgPath);
        this.startingHealth = 100;
        this.element = Elements.Unknown;
        this.weakness = Elements.Unknown;
        [this.x, this.y, this.width, this.height] = Monster.createMonsterValues();
        this.health = this.startingHealth;
        this.startingXPosition = this.x;
        Monster.activeMonster = this;
    }
    get Health() { return this.health; }
    static get ActiveMonster() { return this.activeMonster; }
    get Element() { return this.element; }
    get Weakness() { return this.weakness; }
    static createMonsterValues() {
        let x = 900;
        let y = 150;
        let width = 125;
        let height = 250;
        return [x, y, width, height];
    }
    setAssociatedHealth(enemyHealth) {
        this.associatedHealth = enemyHealth;
    }
    dealDamage(damageDealt) {
        console.log("IM HURT");
        this.health -= damageDealt;
        this.hurtAnimation();
    }
    hurtAnimation() {
        this.animations.push(() => this.hurtLoop());
        this.startAnimationTimer(() => this.hurtLoop(), () => this.hurtEnd(), 1);
    }
    hurtLoop() {
        this.alpha = (this.alpha == 1) ? 0 : 1;
    }
    hurtEnd() {
        this.alpha = 1;
        this.x = this.startingXPosition;
        if (this.health <= 0)
            this.deathAnimation();
    }
    deathAnimation() {
        this.slide(SlideAnimations.SlideFromCurrentPosition, 0, -50, 0.5);
        this.fade(FadeAnimations.FadeOut, 0.5);
    }
}
