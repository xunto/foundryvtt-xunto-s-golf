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
            distance = distance - (targetPos.substract(newPos)).length();
            positions.push(newPos);
            positions = positions.concat(this._process(newPos, collision.normal, distance));
        } else {
            positions = [newPos];
        }

        return positions;
    }

    static process(targetPos: Vector, direction: Vector, distance: number, checkCollision: CollisionChecker): Vector[] {
        return new Movement(checkCollision)._process(targetPos, direction, distance);
    }
}
