import { Vector } from "ts-matrix";
import { pointToVector, vectorToPoint } from "./vectors";
import { sleep } from "./utils";
import { BallMovement } from "./physics";
import { transformToTokenCenter, transformToTokenPos } from "./transform";
import { getGridSize } from "./vtt_scene";
import { checkFoundryCollision } from "./vtt_collision";
import { Animator } from "./animator";

const MAX_PUSH_DISTANCE = 10;

export function push(actor: any, target: any, power: number) {
    let actorPos = transformToTokenCenter(
        actor,
        pointToVector(actor.position),
    );
    let targetPos = transformToTokenCenter(
        target,
        pointToVector(target.position),
    );

    let distance = getPushDistance(power);
    let direction = getPushDirection(actorPos, targetPos);

    let points = new BallMovement(checkFoundryCollision).process(
        targetPos,
        direction,
        distance
    ).map(vectorToPoint);

    new Animator(target, points).animate();
}

function getPushDirection(actorPos: Vector, targetPos: Vector): Vector {
    return targetPos.substract(actorPos).normalize();
}

function getPushDistance(power: number): number {
    let gridSize = getGridSize();
    let maxDistance = MAX_PUSH_DISTANCE * gridSize;
    return maxDistance * power;
}
