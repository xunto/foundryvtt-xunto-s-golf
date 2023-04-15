import { push } from "./vtt_physics";
import { DEFAULT, MAX, MIN, MiniGame as GolfMiniGame } from "./minigame";

const GOLF_ID = "golf_minigame_input";

var opened = false

export function createKickDialog(actor: any, target: any) {
  if (opened) {
    ui.notifications.error("Hit dialog is already opened!")
    return;
  }

  let minigame = new GolfMiniGame(GOLF_ID);

  new Dialog({
    title: "Hit Force",
    content: minigame.getMinigameHtml(),
    buttons: {
      button1: {
        label: "KICK!",
        callback: (html: any) => {
          let power = minigame.getResult();
          push(actor, target, power);
        },
        icon: `<i class="fas fa-check"></i>`
      }
    },
    render: () => {
      minigame.start(),
      opened = true;
    },
    close: () => {
      minigame.stop();
      opened = false;
    },
  }).render(true);
}
