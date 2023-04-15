// CONFIG.debug.hooks = true

import { createKickDialog } from "./dialog";

const GAME_ACTION_TYPE = "golf";

Hooks.on("ready", function() {
    dnd5e.config.itemActionTypes[GAME_ACTION_TYPE] = "xunto-s-golf.golf";
})

Hooks.on("dnd5e.useItem", function(item: any) {
    console.log(item);
    if (item.system.actionType !== GAME_ACTION_TYPE) return;

    let actor = getActorToken(item.parent);
    let target = getTargetToken();

    if (target === null) {
        ui.notifications.error("No ball targeted!")
        return;
    }

    createKickDialog(actor, target);
})

function getActorToken(actor: any) {
    return actor.getActiveTokens()[0];
}

function getTargetToken() {
    return game.user.targets.first() || null;
}
