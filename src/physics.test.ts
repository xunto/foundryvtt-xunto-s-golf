import { Vector } from "ts-matrix";
import { BallMovement, Collision } from "./physics";


function createChecker(generator: () => Generator<Collision>) {
    let i = generator();

    return function (): Collision {
        return i.next().value;
    }
}

describe('BallMovement', () => {
    test('check basic collision', () => {
        let checker = createChecker(function* (): Generator<Collision> {
            yield { "normal": new Vector([-1, 0]), "pos": new Vector([1, 1]) }

            return null;
        })

        let result = BallMovement.initiate(
            new Vector([0, 0]),
            new Vector([1, 1]),
            5,
            checker,
        );

        expect(result).toEqual([
            new Vector([1, 1]),
            new Vector([
                -3.585786437626905,
                5.585786437626905,
            ]),
        ]);
    });
});
