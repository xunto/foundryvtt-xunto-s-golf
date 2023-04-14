import { Vector } from "ts-matrix";

export function pushTarget(actor: any, target: any, power: number) {
    let gridSize = game.canvas.scene.grid.size;
    let maxDistance = 10 * gridSize;
    let actualDistance = maxDistance * (power/100);

    let actorPos = new Vector([actor.x, actor.y]);
    let targetPos = new Vector([target.x, target.y]);

    let movement = targetPos.substract(actorPos).normalize().scale(actualDistance);

    let newPos = targetPos.add(movement);

    target.update({"x": newPos.values[0], "y": newPos.values[1]});
}
