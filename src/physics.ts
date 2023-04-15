import { Vector } from "ts-matrix";


export type Collision = { normal: Vector, pos: Vector };
export type CollisionChecker = (start: Vector, end: Vector) => Collision;


const MAX_DEPTH = 50;

export class BallMovement {
    private depth: number = 0;
    private checkCollision: CollisionChecker;

    private constructor(checkCollision: CollisionChecker) {
        this.checkCollision = checkCollision;
    }

    private processMovement(pos: Vector, direction: Vector, distance: number): Vector[] {
        this.depth++;

        if (this.depth > MAX_DEPTH) {
            console.warn("Golf ball processing depth exceeded.")
            return [];
        }

        let positions: Vector[] = [];

        let movement = direction.scale(distance);
        let newPos = pos.add(movement);
        let collision = this.checkCollision(pos.add(direction), newPos);

        if (collision !== null) {
            newPos = collision.pos;
            positions.push(newPos);

            // Process reflection.
            let distanceLeft = distance - (pos.substract(newPos)).length();
            let newDirection = this.reflect(direction, collision.normal);
            positions = positions.concat(this.processMovement(
                newPos,
                newDirection,
                distanceLeft
            ));
        } else {
            positions.push(newPos);
        }

        return positions;
    }

    private reflect(direction: Vector, surfaceNormal: Vector): Vector {
        return direction.substract(surfaceNormal.scale(2 * direction.dot(surfaceNormal)));
    }

    static initiate(
        targetPos: Vector,
        direction: Vector,
        distance: number,
        checkCollision: CollisionChecker,
    ): Vector[] {
        return new BallMovement(checkCollision).processMovement(targetPos, direction, distance);
    }
}
