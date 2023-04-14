import { DEFAULT, MAX, MIN, MiniGame as GolfMiniGame } from "./minigame";
import { pushTarget } from "./physics";

const GOLF_ID = "golf_minigame_input";

const myContent = `
  <input id="${GOLF_ID}" type="range" value="${DEFAULT}" min="${MIN}" max="${MAX}" />
`;

export function createKickDialog(actor: any, target: any) {
    let minigame = new GolfMiniGame(GOLF_ID);

    new Dialog({
        title: "Hit Force",
        content: myContent,
        buttons: {
          button1: {
            label: "KICK!",
            callback: (html: any) => {
                let power = minigame.getResult(); 
                pushTarget(actor, target, power);
            },
            icon: `<i class="fas fa-check"></i>`
          }
        },
        render: () => minigame.start(),
        close: () => minigame.stop(),
      }).render(true);
}
