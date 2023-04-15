import { Vector } from "ts-matrix";
import { pointToVector, vectorToPoint } from "./vectors";
import { sleep } from "./utils";
import { Collision, Movement, processMovement } from "./physics";

const MAX_PUSH_DISTANCE = 10;

export function push(actor: any, target: any, power: number) {
    let actorPos = pointToVector(actor.position);
    let targetPos = pointToVector(target.position);

    let distance = calculatePushDistance(power);
    let direction = targetPos.substract(actorPos).normalize();

    let vectors = Movement.process(targetPos, direction, distance, checkFoundryCollision);
    let points = vectors.map(vectorToPoint);

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
    let collision: any[] = game.canvas.walls.checkCollision(ray, { "type": "move" });

    if (collision.length === 0) {
        return null;
    }

    let normal = new Vector([1,1]).normalize();

    return { "normal": normal, "pos": pointToVector(collision[0]) }
}

function calculatePushDistance(power: number): number {
    let gridSize = game.canvas.scene.grid.size;
    let maxDistance = MAX_PUSH_DISTANCE * gridSize;
    return maxDistance * (power / 100);
}

