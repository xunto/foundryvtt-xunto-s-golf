// CONFIG.debug.hooks = true

import { Vector } from "ts-matrix";

Hooks.on("ready", function() {
    dnd5e.config.weaponProperties["golf"] = "xunto-s-golf.golf-club";
})

Hooks.on("dnd5e.useItem", function(item) {
    if (!item.system.properties.golf) return;

    let actor = getActorDocument(item.parent);
    let target = getTargetDocument();
    
    if (target === null) {
        ui.notifications.error("No ball targeted!")
        return;
    }

    pushTarget(actor, target);
})

function getActorDocument(actor) {
    return actor.getActiveTokens()[0].document;
}

function getTargetDocument() {
    let token = game.user.targets.first() || null;

    if (token === null) {
        return null;
    }

    return token.document;
}

function pushTarget(actor, target) {
    let actorPos = new Vector([actor.x, actor.y]);
    let targetPos = new Vector([target.x, target.y]);

    let movement = targetPos.substract(actorPos).normalize().scale(500);

    let newPos = targetPos.add(movement);

    target.update({"x": newPos.values[0], "y": newPos.values[1]});
}
