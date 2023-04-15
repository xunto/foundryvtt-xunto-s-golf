import { Vector } from "ts-matrix";
import { pointToVector, vectorToPoint } from "./vectors";
import { Collision } from "./physics";

export function checkFoundryCollision(start: Vector, end: Vector): Collision | null {
    let ray = new Ray(vectorToPoint(start), vectorToPoint(end));
    let collisions: any[] = game.canvas.walls.checkCollision(ray, { "type": "move" });

    if (collisions.length === 0) {
        return null;
    }

    let collision = collisions[0];
    let normal = getCollisionNormal(collision, end.substract(start));

    return { "normal": normal, "pos": pointToVector(collision) }
}

function getCollisionNormal(collision: any, direction: Vector): Vector {
    var surface = getSurfaceVector(collision);

    return new Vector([-surface.values[1], surface.values[0]]).normalize();
}

function getSurfaceVector(collision: any): Vector {
    let edge = collision.edges.first();

    let a = pointToVector(edge.A);
    let b = pointToVector(edge.B);

    return b.substract(a);
}
