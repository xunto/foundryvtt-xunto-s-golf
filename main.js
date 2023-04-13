// CONFIG.debug.hooks = true

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
    console.log(actor);
    console.log(target);

    let vx = target.x - actor.x;
    let vy = target.y - actor.y;
    let magnitude = Math.sqrt(vx * vx + vy * vy);

    vx /= magnitude;
    vy /= magnitude;

    vx *= 500;
    vy *= 500;

    target.update({"x": target.x + vx, "y": target.y + vy});
}
