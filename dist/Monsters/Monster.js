import { Sprite } from "../GenericObjects/Sprite";
import { Elements } from "../Enumerations/Elements";
import { Canvas } from "../Tools/Canvas";
import { FadeAnimations } from "../Enumerations/Animations/FadeAnimations";
export class Monster extends Sprite {
    constructor(imgPath) {
        super(imgPath);
        this.startingHealth = 100;
        this.element = Elements.Unknown;
        this.weakness = Elements.Unknown;
        [this.x, this.y, this.width, this.height] = Monster.createMonsterValues();
        this.health = this.startingHealth;
        let monsterAnims = Monster.monsterAnimations;
        monsterAnims.jitter.startingXPos = this.x;
        monsterAnims.death.endingYPos = this.y + this.height / 2;
        Monster.activeMonster = this;
    }
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
    hurtAnimation() {
        let jitterAnim = Monster.monsterAnimations.jitter;
        jitterAnim.currentJitter = 0;
        this.animations.push(() => this.hurtLoop(jitterAnim));
    }
    hurtLoop(jitterAnim) {
        this.x += jitterAnim.intensity * jitterAnim.direction;
        if (jitterAnim.timer % jitterAnim.length == 0)
            jitterAnim.direction *= -1;
        if (jitterAnim.timer == jitterAnim.animDuration) {
            this.x = jitterAnim.startingXPos;
            this.deathAnimation();
            return true;
        }
        jitterAnim.timer++;
        return false;
    }
    deathAnimation() {
        let deathAnim = Monster.monsterAnimations.death;
        this.fade(FadeAnimations.FadeOut, 0.05);
        this.animations.push(() => this.deathLoop(deathAnim, Canvas.Ctx));
    }
    deathLoop(deathAnim, ctx) {
        if (deathAnim.timer < deathAnim.riseTimer)
            this.y -= deathAnim.yRise;
        else
            return true;
        deathAnim.timer++;
        return false;
    }
}
Monster.monsterAnimations = {
    timer: 0,
    jitter: {
        timer: 0,
        startingXPos: undefined,
        direction: 1,
        length: 3,
        intensity: 5,
        animDuration: 40
    },
    death: {
        timer: 0,
        riseTimer: 35,
        yRise: 3,
        endingYPos: undefined,
    }
};
