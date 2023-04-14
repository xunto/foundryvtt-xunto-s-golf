// CONFIG.debug.hooks = true

import { createKickDialog } from "./dialog";


Hooks.on("ready", function() {
    dnd5e.config.weaponProperties["golf"] = "xunto-s-golf.golf-club";
})

Hooks.on("dnd5e.useItem", function(item: any) {
    if (!item.system.properties.golf) return;

    let actor = getActorDocument(item.parent);
    let target = getTargetDocument();
    
    if (target === null) {
        ui.notifications.error("No ball targeted!")
        return;
    }

    createKickDialog(actor, target);
})

function getActorDocument(actor: any) {
    return actor.getActiveTokens()[0].document;
}

function getTargetDocument() {
    let token = game.user.targets.first() || null;

    if (token === null) {
        return null;
    }

    return token.document;
}
