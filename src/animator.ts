import * as PIXI from 'pixi.js';

const BALL_MOVE_SPEED = 7;

export class Animator {

    private token: any;
    private points: PIXI.Point[];

    constructor(token: any, points: PIXI.Point[]) {
        this.token = token;
        this.points = points;
    }

    private buildSequencer() {
        let points = this.points.slice();
        let end = points.pop();

        let sequence = new Sequence();
        for (let point of points) {
            sequence = this.buildPart(sequence, point);
        }

        sequence = this.buildPart(sequence, end, "easeOutSine");

        return sequence;
    }

    private buildPart(sequence: any, point: PIXI.Point, ease: string = "linear") {
        return sequence
            .animation()
            .on(this.token)
            .moveTowards(point, {
                "ease": ease,
                "relativeToCenter": true,
            })
            .moveSpeed(BALL_MOVE_SPEED)
            .waitUntilFinished();
    }

    animate(): void {
        this.buildSequencer().play();
    }
}