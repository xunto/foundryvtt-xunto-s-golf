import { Vector } from "ts-matrix";
import * as PIXI from 'pixi.js';

const MAX_PUSH_DISTANCE = 10;

export function pushTarget(actor: any, target: any, power: number) {
    let distance = calculatePushDistance(power);

    let actorPos = pointToVector(actor.position);
    let targetPos = pointToVector(target.position);

    let movement = targetPos.substract(actorPos).normalize().scale(distance);

    let newPos = targetPos.add(movement);

    console.log(target.checkCollision(vectorToPoint(newPos)));

    target.document.update(vectorToPoint(newPos));
}

function calculatePushDistance(power: number): number {
    let gridSize = game.canvas.scene.grid.size;
    let maxDistance = MAX_PUSH_DISTANCE * gridSize;
    return maxDistance * (power/100);
}

function pointToVector(point: PIXI.Point): Vector {
    return new Vector([point.x, point.y]);
}

function vectorToPoint(vector: Vector): PIXI.Point {
    let pos = vector.values;
    return new PIXI.Point(pos[0], pos[1]);
}
