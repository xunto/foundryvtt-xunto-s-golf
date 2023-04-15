import { Vector } from "ts-matrix";
import { pointToVector, vectorToPoint } from "./vectors";
import { sleep } from "./utils";


export type Collision = { normal: Vector, pos: Vector };
export type CollisionChecker = (start: Vector, end: Vector) => Collision;


export function processMovement(targetPos: Vector, direction: Vector, distance: number, checkCollision: CollisionChecker): Vector[] {
    let movement = direction.scale(distance);
    let newPos = targetPos.add(movement);
    let collision = checkCollision(targetPos, newPos);

    if (collision !== null) {
        newPos = collision.pos;
    }

    return [newPos];
}
