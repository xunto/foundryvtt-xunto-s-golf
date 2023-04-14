import { Vector } from "ts-matrix";

const MAX_PUSH_DISTANCE = 10;

export function pushTarget(actor: any, target: any, power: number) {
    let distance = calculatePushDistance(power);

    let actorPos = new Vector([actor.x, actor.y]);
    let targetPos = new Vector([target.x, target.y]);

    let movement = targetPos.substract(actorPos).normalize().scale(distance);

    let newPos = targetPos.add(movement);

    target.update({"x": newPos.values[0], "y": newPos.values[1]});
}

function calculatePushDistance(power: number): number {
    let gridSize = game.canvas.scene.grid.size;
    let maxDistance = MAX_PUSH_DISTANCE * gridSize;
    return maxDistance * (power/100);
}
