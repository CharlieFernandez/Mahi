import { RegularSlotMachine } from "./RegularSlotMachine";
import { CanvasUtil } from "./CanvasUtil";
import { CanvasObject } from "./CanvasObject";

CanvasUtil.initiateCanvas();
let regularSlotMachine = new RegularSlotMachine();


function gameLoop() {
    requestAnimationFrame(gameLoop);
    CanvasObject.drawObservers();
}

window.onload = () => {
    gameLoop();
};

class GameManager
{

}