import { Vector } from "ts-matrix";

export function pushTarget(actor: any, target: any, power: number) {
    let actorPos = new Vector([actor.x, actor.y]);
    let targetPos = new Vector([target.x, target.y]);

    let movement = targetPos.substract(actorPos).normalize().scale(500);

    let newPos = targetPos.add(movement);

    target.update({"x": newPos.values[0], "y": newPos.values[1]});
}
