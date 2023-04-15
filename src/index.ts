// CONFIG.debug.hooks = true

import { createKickDialog } from "./dialog";


Hooks.on("ready", function() {
    dnd5e.config.weaponProperties["golf"] = "xunto-s-golf.golf-club";
})

Hooks.on("dnd5e.useItem", function(item: any) {
    if (!item.system.properties.golf) return;

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
