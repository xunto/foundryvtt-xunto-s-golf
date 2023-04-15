import { Vector } from "ts-matrix";


export type Collision = { normal: Vector, pos: Vector };
export type CollisionChecker = (start: Vector, end: Vector) => Collision;


const MAX_DEPTH = 50;

export class Movement {
    depth: number = 0;
    checkCollision: CollisionChecker;

    private constructor(checkCollision: CollisionChecker) {
        this.checkCollision = checkCollision;
    }

    private _process(targetPos: Vector, direction: Vector, distance: number): Vector[] {
        this.depth++;

        if (this.depth > MAX_DEPTH) {
            console.warn("Golf ball processing depth exceeded.")
            return [];
        }

        let positions: Vector[] = [];

        let movement = direction.scale(distance);
        let newPos = targetPos.add(movement);
        let collision = this.checkCollision(targetPos, newPos);

        if (collision !== null) {
            newPos = collision.pos;
            positions.push(newPos);
            
            // Process reflection.
            distance = distance - (targetPos.substract(newPos)).length();
            let normal = collision.normal;
            let newDirection = direction.substract(normal.scale(2* direction.dot(normal)));
            positions = positions.concat(this._process(newPos.add(newDirection), newDirection, distance));
        } else {
            positions.push(newPos);
        }

        return positions;
    }

    static process(targetPos: Vector, direction: Vector, distance: number, checkCollision: CollisionChecker): Vector[] {
        return new Movement(checkCollision)._process(targetPos, direction, distance);
    }
}
