import { Vector } from "ts-matrix";
import * as PIXI from 'pixi.js';

const MAX_PUSH_DISTANCE = 10;

type Collision = { normal: Vector, pos: Vector };
type CollisionChecker = (start: Vector, end: Vector) => Collision;

export function pushTarget(actor: any, target: any, power: number) {
    let actorPos = pointToVector(actor.position);
    let targetPos = pointToVector(target.position);

    let distance = calculatePushDistance(power);
    let direction = targetPos.substract(actorPos).normalize();

    let points = processMovement(targetPos, direction, distance, checkFoundryCollision).map(vectorToPoint);

    target.document.update(points[0]);
}

function processMovement(targetPos: Vector, direction: Vector, distance: number, checkCollision: CollisionChecker): Vector[] {
    let movement = direction.scale(distance);
    let newPos = targetPos.add(movement);
    let collision = checkCollision(targetPos, newPos);

    if (collision !== null) {
        newPos = collision.pos;
    }

    return [newPos]
}

function checkFoundryCollision(start: Vector, end: Vector): Collision {
    let ray = new Ray(vectorToPoint(start), vectorToPoint(end));
    let collision = game.canvas.walls.checkCollision(ray, { "type": "move" });
    return { "normal": new Vector([1, 1]), "pos": pointToVector(collision[0]) }
}

function calculatePushDistance(power: number): number {
    let gridSize = game.canvas.scene.grid.size;
    let maxDistance = MAX_PUSH_DISTANCE * gridSize;
    return maxDistance * (power / 100);
}

function pointToVector(point: PIXI.Point): Vector {
    return new Vector([point.x, point.y]);
}

function vectorToPoint(vector: Vector): PIXI.Point {
    let pos = vector.values;
    return new PIXI.Point(pos[0], pos[1]);
}
