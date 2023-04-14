// CONFIG.debug.hooks = true

import { Vector } from "ts-matrix";

declare var Hooks: any;
declare var dnd5e: any;
declare var game: any;
declare var ui: any;


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

    pushTarget(actor, target);
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

function pushTarget(actor: any, target: any) {
    let actorPos = new Vector([actor.x, actor.y]);
    let targetPos = new Vector([target.x, target.y]);

    let movement = targetPos.substract(actorPos).normalize().scale(500);

    let newPos = targetPos.add(movement);

    target.update({"x": newPos.values[0], "y": newPos.values[1]});
}
