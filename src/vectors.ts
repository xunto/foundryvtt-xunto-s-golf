import { Vector } from "ts-matrix";
import * as PIXI from 'pixi.js';

export function pointToVector(point: PIXI.Point): Vector {
    return new Vector([point.x, point.y]);
}

export function vectorToPoint(vector: Vector): PIXI.Point {
    let pos = vector.values;
    return new PIXI.Point(pos[0], pos[1]);
}
