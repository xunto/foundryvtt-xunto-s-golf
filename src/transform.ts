import { Vector } from "ts-matrix";
import { getGridSize } from "./vtt_scene";
import { pointToVector } from "./vectors";

export function transformToTokenCenter(token: any, tokenPos: Vector): Vector {
    let shift = getTokenShift(token);
    return tokenPos.add(shift);
}

export function transformToTokenPos(token: any, centerPos: Vector): Vector {
    let shift = getTokenShift(token);
    return centerPos.substract(shift);
}

function getTokenShift(token: any): Vector {
    let gridSize = getGridSize();
    let document = token.document;

    let shiftY = (document.height * gridSize) * 0.5; 
    let shiftX = (document.width * gridSize) * 0.5;
    
    return new Vector([shiftX, shiftY]);
}
