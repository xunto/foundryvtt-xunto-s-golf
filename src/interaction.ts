import { Vector } from "ts-matrix";
import { pointToVector, vectorToPoint } from "./vectors";
import { sleep } from "./utils";
import { Collision, Movement } from "./physics";

const MAX_PUSH_DISTANCE = 10;

export function push(actor: any, target: any, power: number) {
    let actorPos = pointToVector(actor.position);
    let targetPos = pointToVector(target.position);

    let distance = getPushDistance(power);
    let direction = getPushDirection(actorPos, targetPos);

    let points = Movement.initiate(
        targetPos,
        direction,
        distance,
        checkFoundryCollision
    ).map(vectorToPoint);

    // Render ball movement.
    let promise = Promise.resolve();
    for (let point of points) {
        promise = promise.then(() => {
            target.document.update(point);
            return sleep(2000);
        });
    }
}

function checkFoundryCollision(start: Vector, end: Vector): Collision | null {
    let ray = new Ray(vectorToPoint(start), vectorToPoint(end));
    let collisions: any[] = game.canvas.walls.checkCollision(ray, { "type": "move" });

    if (collisions.length === 0) {
        return null;
    }

    let collision = collisions[0];
    let normal = getNormal(collision, end.substract(start));

    return { "normal": normal, "pos": pointToVector(collision) }
}

function getPushDirection(actorPos: Vector, targetPos: Vector): Vector {
    return targetPos.substract(actorPos).normalize();
}

function getPushDistance(power: number): number {
    let gridSize = game.canvas.scene.grid.size;
    let maxDistance = MAX_PUSH_DISTANCE * gridSize;
    return maxDistance * (power / 100);
}

function getNormal(collision: any, direction: Vector): Vector {
    var surface = getSurfaceVector(collision);

    return new Vector([-surface.values[1], surface.values[0]]).normalize();
}

function getSurfaceVector(collision: any): Vector {
    let edge = collision.edges.first();

    let a = pointToVector(edge.A);
    let b = pointToVector(edge.B);

    return b.substract(a);
}
